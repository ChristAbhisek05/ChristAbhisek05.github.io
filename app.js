'use strict';
// ═══════════════════════════════════════
//  PrivateTunes — app.js
//  GitHub Pages optimized (HTTPS = IndexedDB works perfectly)
// ═══════════════════════════════════════

// ─── CREDENTIALS ───
const CREDS = {
  admin: { pw: 'admin123', label: 'Admin', role: 'admin' },
  user:  { pw: 'SWEETY',   label: 'User',  role: 'user'  }
};

// ─── STATE ───
let role = null, curSel = 'admin', cur = -1;
let tracks = [];
let currentObjURL = null;

const aud = new Audio();
aud.volume = 0.8;
aud.setAttribute('controlslist', 'nodownload noremoteplayback');

// ═══════════════════════════════════════════
// ██  IndexedDB DATABASE  ██
// GitHub Pages = HTTPS = Full IndexedDB support
// ═══════════════════════════════════════════
const DB_NAME = 'PrivateTunesDB';
const DB_VER  = 1;
const STORE   = 'tracks';
let db = null;

function initDB() {
  return new Promise((res, rej) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = e => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains(STORE)) {
        d.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = e => { db = e.target.result; res(); };
    req.onerror   = e => rej(e.target.error);
  });
}

function dbSave(track) {
  return new Promise((res, rej) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(track);
    tx.oncomplete = () => res();
    tx.onerror    = e => rej(e.target.error);
  });
}

function dbDelete(id) {
  return new Promise((res, rej) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => res();
    tx.onerror    = e => rej(e.target.error);
  });
}

function dbLoadAll() {
  return new Promise((res, rej) => {
    const tx  = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = e => res(e.target.result || []);
    req.onerror   = e => rej(e.target.error);
  });
}

function dbGetOne(id) {
  return new Promise((res, rej) => {
    const tx  = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).get(id);
    req.onsuccess = e => res(e.target.result);
    req.onerror   = e => rej(e.target.error);
  });
}

async function getDBSize() {
  try {
    if (navigator.storage && navigator.storage.estimate) {
      const est = await navigator.storage.estimate();
      return fmtSz(est.usage || 0) + ' used';
    }
  } catch(e) {}
  return 'Unknown';
}

// ─── INIT on page load ───
initDB().then(async () => {
  const el = document.getElementById('dbStatus');
  if (el) { el.textContent = '🗄️ DB Ready'; el.style.color = '#10b981'; }
  const loaded = await dbLoadAll();
  tracks = loaded.map(t => ({ ...t, blob: null }));
}).catch(err => {
  const el = document.getElementById('dbStatus');
  if (el) { el.textContent = '⚠️ DB Error'; el.style.color = '#f43f5e'; }
  console.error('IndexedDB init failed:', err);
  toast('❌ DB Error: ' + err.message, 'err');
});

// ═══════════════════════════════════════════
// ██  SECURITY SYSTEM  ██
// ═══════════════════════════════════════════

// 1. Right-click block
document.addEventListener('contextmenu', e => {
  e.preventDefault();
  toast('🚫 Right-click is not allowed!', 'warn');
});

// 2. Keyboard shortcuts block
document.addEventListener('keydown', e => {
  const isInput = document.activeElement.tagName === 'INPUT';
  const blocked = [
    e.ctrlKey && e.key === 's',
    e.ctrlKey && e.key === 'u',
    e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'),
    e.key === 'F12',
    e.key === 'PrintScreen',
    e.ctrlKey && e.key === 'p',
    (!isInput && e.ctrlKey && e.key === 'a'),
    (!isInput && e.ctrlKey && e.key === 'c'),
  ];
  if (blocked.some(Boolean)) {
    e.preventDefault(); e.stopPropagation();
    if (e.key !== 'PrintScreen') toast('🚫 This shortcut is not allowed!', 'warn');
    return false;
  }
  // Player controls
  if (!role || isInput) return;
  if (e.code === 'Space') { e.preventDefault(); if (cur >= 0) togglePlay(); }
  if (e.code === 'ArrowRight') nxt();
  if (e.code === 'ArrowLeft')  prev();
});

// 3. Drag block
document.addEventListener('dragstart', e => {
  if (e.target.tagName === 'AUDIO') e.preventDefault();
});

// 4. Tab visibility — pause on hide
document.addEventListener('visibilitychange', () => {
  if (document.hidden && cur >= 0 && !aud.paused) {
    aud.pause();
    toast('⏸ Tab switched — music paused', 'warn');
  }
});

// 5. Screen recording detection
if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
  const orig = navigator.mediaDevices.getDisplayMedia.bind(navigator.mediaDevices);
  navigator.mediaDevices.getDisplayMedia = async function(...a) {
    aud.pause();
    document.getElementById('secOverlay').classList.add('on');
    toast('🚫 Screen recording detected! Music paused.', 'err');
    try {
      const stream = await orig(...a);
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        document.getElementById('secOverlay').classList.remove('on');
        toast('✅ Recording stopped. Enjoy!', 'ok');
      });
      return stream;
    } catch(e2) {
      document.getElementById('secOverlay').classList.remove('on');
      throw e2;
    }
  };
}

// 6. Print block
window.addEventListener('beforeprint', e => {
  e.preventDefault();
  toast('🚫 Printing is not allowed!', 'warn');
});

// 7. DevTools detection
let devOpen = false;
setInterval(() => {
  const t1 = performance.now();
  debugger;
  const t2 = performance.now();
  if (t2 - t1 > 100 && !devOpen) {
    devOpen = true;
    if (cur >= 0 && !aud.paused) { aud.pause(); toast('⚠️ DevTools detected — music paused', 'warn'); }
  } else if (t2 - t1 < 100) { devOpen = false; }
}, 3000);

// 8. Download intercept
document.addEventListener('click', e => {
  const a = e.target.closest('a');
  if (a && (a.href.startsWith('data:') || a.download)) {
    e.preventDefault();
    toast('🚫 Download is not allowed!', 'err');
  }
});

// 9. Copy block
document.addEventListener('copy', e => { e.preventDefault(); toast('🚫 Copying is not allowed!', 'warn'); });
document.addEventListener('cut',  e => { e.preventDefault(); });

// ═══════════════════════════════════════════
// ██  AUTH  ██
// ═══════════════════════════════════════════

function selRole(r) {
  curSel = r;
  document.getElementById('rc-admin').classList.toggle('on', r === 'admin');
  document.getElementById('rc-user').classList.toggle('on',  r === 'user');
  document.getElementById('pwInput').value = '';
  document.getElementById('lerr').style.display = 'none';
}

function login() {
  const pw = document.getElementById('pwInput').value.trim();
  const c  = CREDS[curSel];
  if (pw === c.pw) {
    role = curSel;
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    document.getElementById('uLabel').textContent = c.label;
    const rp = document.getElementById('rPill');
    rp.textContent = role === 'admin' ? '👑 Admin' : '🎧 User';
    rp.className = 'rpill ' + role;
    if (role === 'admin') {
      document.getElementById('adminSec').style.display = 'block';
      document.getElementById('emptyMsg').textContent = 'No tracks yet. Upload one above!';
    } else {
      document.getElementById('adminSec').style.display = 'none';
      document.getElementById('emptyMsg').textContent = 'No tracks uploaded by Admin yet. Please wait! 😊';
    }
    render(); updateStats();
  } else {
    document.getElementById('lerr').style.display = 'block';
    document.getElementById('pwInput').value = '';
  }
}

function logout() {
  role = null; cur = -1;
  aud.pause(); aud.src = '';
  if (currentObjURL) { URL.revokeObjectURL(currentObjURL); currentObjURL = null; }
  document.getElementById('playerBar').classList.remove('on');
  document.getElementById('app').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('pwInput').value = '';
}

// ═══════════════════════════════════════════
// ██  FILE UPLOAD  ██
// ═══════════════════════════════════════════
let pending = [];

function onFiles(e) {
  const files = Array.from(e.target.files);
  if (!files.length) return;
  pending = files;
  document.getElementById('sName').value = files[0].name.replace(/\.[^.]+$/, '');
  document.getElementById('uf').style.display = 'block';
}

// Drag & drop
const uz = document.getElementById('uzone');
if (uz) {
  uz.addEventListener('dragover', e => { e.preventDefault(); uz.classList.add('drag'); });
  uz.addEventListener('dragleave', () => uz.classList.remove('drag'));
  uz.addEventListener('drop', e => {
    e.preventDefault(); uz.classList.remove('drag');
    const files = Array.from(e.dataTransfer.files)
      .filter(f => f.type.startsWith('audio/') || f.type === 'video/mp4');
    if (!files.length) return toast('❌ Only audio/MP4 files are allowed!', 'err');
    pending = files;
    document.getElementById('sName').value = files[0].name.replace(/\.[^.]+$/, '');
    document.getElementById('uf').style.display = 'block';
  });
}

function addTrack() {
  if (!pending.length) return;
  if (!db) { toast('⏳ Database loading... please wait!', 'warn'); return; }

  const btn = document.getElementById('addBtn');
  const pw  = document.getElementById('pw');
  const pf  = document.getElementById('pf');
  btn.disabled = true; pw.style.display = 'block';

  let i = 0;
  const go = async () => {
    if (i >= pending.length) {
      btn.disabled = false; pw.style.display = 'none'; pf.style.width = '0%';
      document.getElementById('uf').style.display = 'none';
      document.getElementById('fInput').value = '';
      document.getElementById('sName').value = '';
      document.getElementById('sArtist').value = '';
      pending = [];
      render(); updateStats();
      toast('✅ Track saved to database!', 'ok');
      return;
    }
    const f = pending[i];
    pf.style.width = ((i / pending.length) * 80) + '%';

    const nm = (i === 0 && document.getElementById('sName').value.trim())
      ? document.getElementById('sName').value.trim()
      : f.name.replace(/\.[^.]+$/, '');
    const ar = (i === 0 && document.getElementById('sArtist').value.trim())
      ? document.getElementById('sArtist').value.trim() : 'Unknown';

    const track = {
      id:      Date.now() + i,
      name:    nm,
      artist:  ar,
      size:    fmtSz(f.size),
      bytes:   f.size,
      mime:    f.type || 'audio/mpeg',
      isVideo: f.type === 'video/mp4',
      added:   new Date().toLocaleString('en-IN'),
      blob:    f   // Raw Blob — stored in IndexedDB
    };

    try {
      await dbSave(track);
      tracks.push({ ...track, blob: null }); // metadata only in memory
      pf.style.width = (((i + 1) / pending.length) * 100) + '%';
      i++;
      setTimeout(go, 200);
    } catch(err) {
      console.error('DB save error:', err);
      toast('❌ Storage error: ' + err.message, 'err');
      btn.disabled = false; pw.style.display = 'none';
    }
  };
  go();
}

// ═══════════════════════════════════════════
// ██  RENDER  ██
// ═══════════════════════════════════════════
const ARTS = ['🎵','🎶','🎸','🎹','🥁','🎺','🎻','🎤','🔥','💿','🌙','⚡','🎼','🌊','✨'];

function esc(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function render() {
  const grid  = document.getElementById('tgrid');
  const empty = document.getElementById('emptyDiv');
  const cnt   = document.getElementById('cBadge');
  const st    = document.getElementById('stTracks');

  cnt.textContent = tracks.length + ' track' + (tracks.length !== 1 ? 's' : '');
  if (st) st.textContent = tracks.length;

  if (!tracks.length) { empty.style.display = 'block'; grid.innerHTML = ''; return; }
  empty.style.display = 'none';

  grid.innerHTML = tracks.map((t, i) => `
    <div class="ti${cur === i ? ' playing' : ''}" onclick="play(${i})">
      <div class="tidx">
        ${cur === i
          ? `<div class="mbars"><div class="mb"></div><div class="mb"></div><div class="mb"></div></div>`
          : i + 1}
      </div>
      <div class="tart">${t.isVideo ? '🎬' : ARTS[i % ARTS.length]}</div>
      <div class="tmeta">
        <div class="tname">${esc(t.name)}</div>
        <div class="tby">
          ${t.isVideo
            ? '<span style="font-size:10px;color:#818cf8;font-weight:700;">🎬 MP4</span>'
            : esc(t.artist)}
          ${role === 'user'
            ? ' &nbsp;<span style="font-size:10px;color:#f59e0b;font-weight:700;">🔥 Deletes after play</span>'
            : ''}
        </div>
      </div>
      <div class="tsz">${t.size}</div>
      <div class="tact">
        <button class="bplay" onclick="event.stopPropagation();play(${i})">
          ${cur === i && !aud.paused ? '⏸' : '▶'}
        </button>
        ${role === 'admin'
          ? `<button class="bdel" onclick="event.stopPropagation();del(${i})">🗑</button>`
          : ''}
      </div>
    </div>`).join('');
}

async function updateStats() {
  const st = document.getElementById('stTracks');
  const ss = document.getElementById('stStorage');
  if (st) st.textContent = tracks.length;
  if (ss) ss.textContent = await getDBSize();
}

// ═══════════════════════════════════════════
// ██  PLAYER  ██
// ═══════════════════════════════════════════
async function play(i) {
  if (i < 0 || i >= tracks.length) return;
  const t = tracks[i]; cur = i;

  if (currentObjURL) { URL.revokeObjectURL(currentObjURL); currentObjURL = null; }

  try {
    const full = await dbGetOne(t.id);
    if (!full || !full.blob) { toast('❌ Track not found in database!', 'err'); return; }
    currentObjURL = URL.createObjectURL(full.blob);
    aud.src = currentObjURL;
    aud.play().catch(() => {});
    document.getElementById('plTitle').textContent  = t.name;
    document.getElementById('plArtist').textContent = t.isVideo ? '🎬 MP4 — Audio Only' : t.artist;
    document.getElementById('plArt').textContent    = t.isVideo ? '🎬' : ARTS[i % ARTS.length];
    document.getElementById('playerBar').classList.add('on');
    document.getElementById('bpm').textContent = '⏸';
    const bt = document.getElementById('burnTimer');
    if (bt) { bt.textContent = ''; bt.style.color = '#f59e0b'; }
    render();
  } catch(err) {
    toast('❌ Could not load track: ' + err.message, 'err');
  }
}

function togglePlay() {
  if (aud.paused) { aud.play(); document.getElementById('bpm').textContent = '⏸'; }
  else            { aud.pause(); document.getElementById('bpm').textContent = '▶'; }
  render();
}

function prev() { if (cur > 0) play(cur - 1); }
function nxt()  { play(cur < tracks.length - 1 ? cur + 1 : 0); }

// ── Audio events ──
aud.addEventListener('pause', () => { document.getElementById('bpm').textContent = '▶'; render(); });
aud.addEventListener('play',  () => { document.getElementById('bpm').textContent = '⏸'; render(); });

// ── AUTO-DELETE after listen (User only) ──
aud.addEventListener('ended', async () => {
  if (role === 'user' && cur >= 0 && cur < tracks.length) {
    const t    = tracks[cur];
    const name = t.name;
    if (currentObjURL) { URL.revokeObjectURL(currentObjURL); currentObjURL = null; }
    aud.src = '';
    document.getElementById('playerBar').classList.remove('on');
    try { await dbDelete(t.id); } catch(e) {}
    tracks.splice(cur, 1);
    cur = -1;
    render(); updateStats();
    showAutoDeleteNotice(name);
  } else {
    nxt();
  }
});

// ── Progress & Burn Timer ──
aud.addEventListener('timeupdate', () => {
  if (!aud.duration) return;
  const p = (aud.currentTime / aud.duration) * 100;
  document.getElementById('sfill').style.width = p + '%';
  document.getElementById('tCur').textContent  = fmt(aud.currentTime);
  document.getElementById('tTot').textContent  = fmt(aud.duration);

  if (role === 'user') {
    const rem  = aud.duration - aud.currentTime;
    const burn = document.getElementById('burnTimer');
    if (burn) {
      burn.textContent = rem > 0 ? '🔥 Deletes in ' + fmt(rem) : '';
      burn.style.opacity = rem < 30 ? '1' : '0.5';
      burn.style.color   = rem < 10 ? '#f43f5e' : '#f59e0b';
    }
  }
});

function seek(e) {
  const r = document.getElementById('strk').getBoundingClientRect();
  aud.currentTime = ((e.clientX - r.left) / r.width) * aud.duration;
}
function setVol(v) { aud.volume = parseFloat(v); }
function fmt(s) { return Math.floor(s/60) + ':' + Math.floor(s % 60).toString().padStart(2, '0'); }

// ── Self-Destruct Notice ──
function showAutoDeleteNotice(name) {
  const overlay = document.createElement('div');
  overlay.id = 'adOverlay';
  overlay.style.cssText = `position:fixed;inset:0;background:rgba(7,8,15,.95);z-index:9000;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    gap:16px;text-align:center;padding:24px;`;
  overlay.innerHTML = `
    <div style="font-size:56px">🔥</div>
    <h2 style="font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:700;color:#f43f5e;">
      Track Self-Destructed
    </h2>
    <p style="color:#a8aac8;font-size:14px;max-width:360px;line-height:1.7;">
      <strong style="color:#e2e4f0">"${name}"</strong> has been permanently deleted after listening.<br>
      This track no longer exists anywhere.
    </p>
    <div style="background:rgba(244,63,94,.08);border:1px solid rgba(244,63,94,.25);
      border-radius:10px;padding:10px 20px;font-size:12px;color:#f43f5e;font-weight:600;">
      🛡️ Auto-Delete Protection Active
    </div>
    <button onclick="document.getElementById('adOverlay').remove()"
      style="margin-top:8px;background:linear-gradient(135deg,#6366f1,#7c3aed);
      border:none;border-radius:12px;padding:12px 28px;color:#fff;
      font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;cursor:pointer;">
      OK, Got It
    </button>`;
  document.body.appendChild(overlay);
  setTimeout(() => { const el = document.getElementById('adOverlay'); if(el) el.remove(); }, 6000);
}

// ═══════════════════════════════════════════
// ██  DELETE (Admin only)  ██
// ═══════════════════════════════════════════
async function del(i) {
  if (role !== 'admin') return;
  if (!confirm(`Are you sure you want to delete "${tracks[i].name}"?`)) return;
  const id = tracks[i].id;
  if (cur === i) {
    if (currentObjURL) { URL.revokeObjectURL(currentObjURL); currentObjURL = null; }
    aud.pause(); aud.src = '';
    document.getElementById('playerBar').classList.remove('on'); cur = -1;
  } else if (cur > i) cur--;
  try { await dbDelete(id); } catch(e) {}
  tracks.splice(i, 1);
  render(); updateStats();
  toast('🗑 Track deleted from database', 'ok');
}

// ═══════════════════════════════════════════
// ██  HELPERS  ██
// ═══════════════════════════════════════════
function fmtSz(b) {
  if (b < 1024)        return b + ' B';
  if (b < 1048576)     return (b / 1024).toFixed(1) + ' KB';
  if (b < 1073741824)  return (b / 1048576).toFixed(1) + ' MB';
  return (b / 1073741824).toFixed(2) + ' GB';
}

function toast(msg, type = 'ok') {
  const t = document.getElementById('toast');
  t.className = `toast ${type}`; t.textContent = msg; t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 3500);
}
