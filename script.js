// ==========================================
// DATA STRUCTURES & STATE MANAGEMENT
// ==========================================

// Student-Section mapping (Admin assigns)
let studentSections = {};

function showAssignSection() {
    const formArea = document.getElementById('studentFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Assign Section & Mentor</h2>
                <button class="back-btn" onclick="document.getElementById('studentFormArea').innerHTML=''">← Back</button>
            </div>
            
            <form onsubmit="assignSectionAndMentor(event)">
                <div class="form-section">
                    <h3>Select Student</h3>
                    <div class="form-group">
                        <label>Student Roll Number *</label>
                        <select name="rollNo" required>
                            <option value="">Select Student</option>
                            ${students.map(s => `<option value="${s.rollNo}">${s.rollNo} - ${s.studentName}</option>`).join('')}
                        </select>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3>Assign Section</h3>
                    <div class="form-group">
                        <label>Section *</label>
                        <select name="section" required>
                            <option value="">Select Section</option>
                            <option value="A">Section A</option>
                            <option value="B">Section B</option>
                            <option value="C">Section C</option>
                            <option value="D">Section D</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3>Assign Mentor</h3>
                    <div class="form-group">
                        <label>Select Staff Member *</label>
                        <select name="assignedStaff" required>
                            <option value="">Select Mentor</option>
                            ${staff.map(s => `<option value="${s.staffId}">${s.fullName} (${s.designation})</option>`).join('')}
                        </select>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Assign</button>
                    <button type="button" class="btn-secondary" onclick="document.getElementById('studentFormArea').innerHTML=''">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

// YE BHI ADD KARO (showAssignSection ke just neeche):
function assignSectionAndMentor(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const rollNo = formData.get('rollNo');
    const section = formData.get('section');
    const assignedStaff = formData.get('assignedStaff');
    
    const student = students.find(s => s.rollNo === rollNo);
    if (!student) {
        alert('Student not found!');
        return;
    }
    
    // Update student data
    student.section = section;
    student.assignedStaff = assignedStaff;
    
    // Store in studentSections
    studentSections[rollNo] = {
        staffId: assignedStaff,
        assignedDate: new Date().toISOString().split('T')[0]
    };
    
    const staffMember = staff.find(s => s.staffId === assignedStaff);
    
    document.getElementById('studentFormArea').innerHTML = `
        <div class="message success-message">
            ✅ Section & Mentor assigned successfully!<br>
            Student: ${student.studentName}<br>
            Section: ${section}<br>
            Mentor: ${staffMember.fullName}
        </div>
    `;
    
    setTimeout(() => {
        document.getElementById('studentFormArea').innerHTML = '';
    }, 3000);
}

// Add these new data structures after existing ones:

let classTimetable = {
};

let attendanceReminders = []; // Store pending attendance notifications for students
let currentUser = null;
students = [
    { 
        rollNo: '01', 
        studentName: 'Rahul Kumar',
        fatherName: 'Ram Kumar',
        motherName: 'Sita Devi',
        email: 'rahul@test.com',
        contactNo: '9876543210',
        address: 'Delhi, India',           
        educationLevel: 'Graduation',
        class: '1st Year',
        stream: 'Science',
        totalFees: 12300,
        paidFees: 0,
        section: '',
        assignedStaff: '',
        admissionDate: '2024-01-15',
        dob: '2005-05-10',
        gender: 'Male',
        bloodGroup: 'B+',
        caste: 'General',
        religion: 'Hindu',
        nationality: 'Indian'
    }
];

// Line 28-37 mein:
staff = [
    {
        staffId: '01',
        fullName: 'Dr. Amit Sharma',
        designation: 'Professor',
        qualification: 'Ph.D. in Computer Science',
        joiningDate: '2020-01-15',
        email: 'amit@test.com',
        contactNo: '9876543211',
        whatsappNo: '9876543211',  // YE ADD KARO
        netSalary: 0
    }
];
let attendance = [];
let menteeGroups = {}; // { staffId: [rollNo1, rollNo2, ...] }
let classGroups = {
    // Education Level -> Class -> Stream -> [rollNos]
    'Intermediate': {
        '1st Year': {
            'Science': [],
            'Commerce': [],
            'Arts': []
        },
        '2nd Year': {
            'Science': [],
            'Commerce': [],
            'Arts': []
        }
    },
    'Graduation': {
        '1st Year': {
            'Science': [],
            'Commerce': [],
            'Arts': []
        },
        '2nd Year': {
            'Science': [],
            'Commerce': [],
            'Arts': []
        },
        '3rd Year': {
            'Science': [],
            'Commerce': [],
            'Arts': []
        }
    },
    'Post Graduate': {
        '1st Year': {
            'Science': [],
            'Commerce': [],
            'Arts': []
        },
        '2nd Year': {
            'Science': [],
            'Commerce': [],
            'Arts': []
        }
    },
};

// Fixed Credentials
const credentials = {
    administrative: { username: 'admin', password: 'admin123' },
    student: { password: 'student123' },
    library: { username: 'library', password: 'library123' },
    staff: { password: 'staff123' }
};

// Education Structure
const educationStructure = {
    'Intermediate': {
        classes: ['1st Year', '2nd Year'],
        streams: ['Science', 'Commerce', 'Arts'],
        departments: []
    },
    'Graduation': {
        classes: ['1st Year', '2nd Year', '3rd Year'],
        streams: ['Science', 'Commerce', 'Arts'],
        departments: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'Economics', 'History']
    },
    'Post Graduate': {
        classes: ['1st Year', '2nd Year'],
        streams: ['Science', 'Commerce', 'Arts'],
        departments: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'Economics', 'History', 'English']
    },
};

// Fee Structure
const feeStructure = {
    'Intermediate': {
        admission: 5000,
        examination: 1000,
        sports: 500,
        laboratory: 0
    },
    'Graduation': {
        admission: 8000,
        examination: 1500,
        sports: 800,
        laboratory: 2000
    },
    'Post Graduate': {
        admission: 12000,
        examination: 2000,
        sports: 1000,
        laboratory: 3000
    },
};

// Salary Structure
const salaryStructure = {
    'Principal': 80000,
    'HOD': 60000,
    'Professor': 45000,
    'Lab Incharge': 35000,
    'Support Staff': 25000
};

const priorityColors = {
    'High': '#e74c3c',      // Red
    'Medium': '#f39c12',    // Orange
    'Low': '#27ae60'        // Green
};

// Bank Details (Auto-fill based on bank name)
const bankDetails = {
    'State Bank of India': { ifsc: 'SBIN0001234', branch: 'Main Branch' },
    'HDFC Bank': { ifsc: 'HDFC0001234', branch: 'Central Branch' },
    'ICICI Bank': { ifsc: 'ICIC0001234', branch: 'City Branch' },
    'Punjab National Bank': { ifsc: 'PUNB0001234', branch: 'Regional Branch' },
    'Bank of Baroda': { ifsc: 'BARB0001234', branch: 'District Branch' }
};

// ==========================================
// AUTHENTICATION
// ==========================================

function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    let isValid = false;

    // Auto-detect user type based on username/password
    
    // Check Admin
    if (username === credentials.administrative.username && password === credentials.administrative.password) {
        currentUser = {
            type: 'administrative',
            username: username,
            name: 'Administrator'
        };
        isValid = true;
    }
    // Check Library
    else if (username === credentials.library.username && password === credentials.library.password) {
        currentUser = {
            type: 'library',
            username: username,
            name: 'Library User'
        };
        isValid = true;
    }
    // Check Student
    else if (password === credentials.student.password) {
        const student = students.find(s => s.rollNo === username);
        if (student) {
            currentUser = {
                type: 'student',
                username: username,
                name: student.studentName,
                data: student
            };
            isValid = true;
        }
    }
    // Check Staff
    else if (password === credentials.staff.password) {
        const staffMember = staff.find(s => s.staffId === username);
        if (staffMember) {
            currentUser = {
                type: 'staff',
                username: username,
                name: staffMember.fullName,
                data: staffMember
            };
            isValid = true;
        }
    }

    if (isValid) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('dashboard').classList.add('active');
        errorDiv.classList.remove('active');
        initializeDashboard();
    } else {
        showError(errorDiv, 'Invalid username or password');
    }
}

function showError(element, message) {
    element.textContent = message;
    element.classList.add('active');
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        document.getElementById('loginPage').style.display = 'block';
        document.getElementById('dashboard').classList.remove('active');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('loginError').classList.remove('active');
    }
}
// ==========================================
// DASHBOARD INITIALIZATION
// ==========================================

function initializeDashboard() {
    document.getElementById('userInfo').textContent = `Welcome, ${currentUser.name}`;
    
    const menuItems = document.getElementById('menuItems');
    menuItems.innerHTML = '';

    // Administrative user - Sab kuch access

   if (currentUser.type === 'administrative') {
    menuItems.innerHTML = `
        <div class="menu-item" onclick="showModule('students')">👨‍🎓 Student Management</div>
        <div class="menu-item" onclick="showModule('staff')">👨‍🏫 Staff Management</div>
        <div class="menu-item" onclick="showModule('library')">📚 Library Management</div>
        <div class="menu-item" onclick="showModule('notices')">📢 Notice Board</div>
         <div class="menu-item" onclick="showModule('timetable')">🕒 Class Timetable</div>
    `;
}
    
    // Library User - Sirf library aur notices
    else if (currentUser.type === 'library') {
        menuItems.innerHTML = `
            <div class="menu-item" onclick="showModule('library')">📚 Library Management</div>
            <div class="menu-item" onclick="showModule('notices')">📢 Notice Board</div>
        `;
    } 
    
  // Student - Sirf view access
else if (currentUser.type === 'student') {
    menuItems.innerHTML = `
        <div class="menu-item" onclick="showModule('profile')">👤 My Profile</div>
         <div class="menu-item" onclick="showModule('attendance')" id="attendanceMenuItem">
            📅 My Attendance 
            <span id="attendanceBadge" class="notification-badge" style="display: none;">!</span>
        </div>
        <div class="menu-item" onclick="showModule('library')">📚 View Library</div>
        <div class="menu-item" onclick="showModule('notices')">📢 Notice Board</div>
        <div class="menu-item" onclick="showModule('mybooks')">📖 My Issued Books</div>
        <div class="menu-item" onclick="showModule('mytimetable')">🕒 My Timetable</div>
    `;
        startAttendanceChecker();
}
    
else if (currentUser.type === 'staff') {
    menuItems.innerHTML = `
        <div class="menu-item" onclick="showModule('staffProfile')">👤 My Profile</div>
        <div class="menu-item" onclick="showModule('salary')">💰 My Salary Details</div>
        <div class="menu-item" onclick="showModule('students')">👥 Students</div>
        <div class="menu-item" onclick="showModule('attendanceRegister')">📝 Attendance Register</div>
        <div class="menu-item" onclick="showModule('library')">📚 Library Management</div>
        <div class="menu-item" onclick="showModule('notices')">📢 Notice Board</div>
        <div class="menu-item" onclick="showModule('postNotice')">✍️ Post Notice</div>
    `;
}

    // Show default content based on user type
    if (currentUser.type === 'staff') {
        showModule('salary');
    } else if (currentUser.type === 'student') {
        showModule('library');
    } else {
        showModule(currentUser.type === 'administrative' ? 'students' : 'library');
    }
}

function showModule(module, event) {
    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // ✅ IMPROVED VERSION
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    } else {
        // Programmatically call hua hai to first item active karo
        const firstItem = document.querySelector('.menu-item');
        if (firstItem) firstItem.classList.add('active');
    }

    const mainContent = document.getElementById('mainContent');
    const contentTitle = document.getElementById('contentTitle');
    const contentSubtitle = document.getElementById('contentSubtitle');

    // Student Management Module
  // Students Module ka condition modify karo
if (module === 'students') {
    contentTitle.textContent = 'Student Management';
    
    if (currentUser.type === 'administrative') {
        contentSubtitle.textContent = 'Manage student records, admissions, and fees';
        showStudentSubmenu();
    } else if (currentUser.type === 'staff') {
        contentSubtitle.textContent = 'View and manage your students';
        showStaffStudentsSubmenu();
    }
}

    // Staff Management Module
    else if (module === 'staff') {
        contentTitle.textContent = 'Staff Management';
        contentSubtitle.textContent = 'Manage staff records and salary generation';
        showStaffSubmenu();
    } 
    
    // Library Management Module
    else if (module === 'library') {
        contentTitle.textContent = 'Library Management';
        contentSubtitle.textContent = 'Manage books, issue and return operations';
        showLibrarySubmenu();
    } 
    
    // Notice Board Module
    else if (module === 'notices') {
        contentTitle.textContent = 'Notice Board';
        contentSubtitle.textContent = 'View and manage college notices';
        showNoticeBoard();
    } 
    
    // My Issued Books - Student specific
    else if (module === 'mybooks') {
        contentTitle.textContent = 'My Issued Books';
        contentSubtitle.textContent = 'View your currently issued books';
        showMyIssuedBooks();
    }
    
   // Staff Salary - Staff specific
    else if (module === 'salary') {
        contentTitle.textContent = 'My Salary Details';
        contentSubtitle.textContent = 'View your salary breakdown and payment details';
        showStaffSalaryDetails();
    }
     // Student Profile
   else if (module === 'profile') {
    contentTitle.textContent = 'My Profile';
    contentSubtitle.textContent = 'View and manage your profile information';
    showStudentProfile();
}
    
    // Student Attendance
    else if (module === 'attendance') {
        contentTitle.textContent = 'My Attendance';
        contentSubtitle.textContent = 'View your attendance records';
        showStudentAttendance();
    }
    
    // Staff Profile
    else if (module === 'staffProfile') {
        contentTitle.textContent = 'My Profile';
        contentSubtitle.textContent = 'View and manage your profile information';
        showStaffProfile();
    }
    
    // Post Notice (Staff only)
    // Post Notice (Staff only)
    else if (module === 'postNotice') {
        contentTitle.textContent = 'Post Notice';
        contentSubtitle.textContent = 'Create notices for students';
        showStaffPostNotice();
    }
    
    // Mark Attendance (Staff only)
    else if (module === 'markAttendance') {
        contentTitle.textContent = 'Mark Attendance';
        contentSubtitle.textContent = 'Mark student attendance for today';
        showMarkAttendance();
    }
    
    // Attendance Register (Staff only)
else if (module === 'attendanceRegister') {
    contentTitle.textContent = 'Attendance Register';
    contentSubtitle.textContent = 'Mark student attendance for your class';
    showAttendanceRegister();
}
// Class Timetable Module (Admin only)
    else if (module === 'timetable') {
        contentTitle.textContent = 'Class Timetable Management';
        contentSubtitle.textContent = 'Set class schedules and timings';
        showTimetableModule();
    }
    
    // Student Timetable View
    else if (module === 'mytimetable') {
        contentTitle.textContent = 'My Class Timetable';
        contentSubtitle.textContent = 'View your weekly class schedule';
        showStudentTimetable();
    }
}
// ==========================================
// HELPER FUNCTIONS  👈 YE NAYA SECTION BANAO
// ==========================================

function getStaffName(staffId) {
    const staffMember = staff.find(s => s.staffId === staffId);
    return staffMember ? staffMember.fullName : 'Unknown';
}


// ==========================================
// STUDENT TIMETABLE VIEW
// ==========================================

function showStudentTimetable() {
    const mainContent = document.getElementById('mainContent');
    const student = currentUser.data;
    
   const timetable = classTimetable[student.educationLevel]?.[student.class]?.[student.stream]?.[student.section];

    
    if (!timetable) {
        mainContent.innerHTML = `
            <div class="empty-state">
                <h3>No Timetable Available</h3>
                <p>Your class timetable hasn't been created yet.</p>
            </div>
        `;
        return;
    }
    
    // Display day-wise timetable in a nice table format
    let html = '<div class="timetable-container">';
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    days.forEach(day => {
        if (timetable[day] && timetable[day].length > 0) {
            html += `
                <div class="day-schedule">
                    <h3>${day}</h3>
                    <div class="periods-list">
                        ${timetable[day].map(period => `
                            <div class="period-card">
                                <strong>${period.subject}</strong>
                                <span>${period.time} (${period.duration} mins)</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    });
    
    html += '</div>';
    mainContent.innerHTML = html;
}

// ==========================================
// STUDENT MODULE
// ==========================================

function showStudentSubmenu() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="submenu-grid">
            <button class="submenu-btn" onclick="showAddStudentForm()">➕ Add Student</button>
            <button class="submenu-btn" onclick="showSearchStudent()">🔍 Search Student</button>
            <button class="submenu-btn" onclick="displayAllStudents()">📋 Display All Students</button>
            <button class="submenu-btn" onclick="showModifyStudent()">✏️ Modify Student</button>
            <button class="submenu-btn" onclick="showDeleteStudent()">🗑️ Delete Student</button>
            <button class="submenu-btn" onclick="showCollectFees()">💵 Collect Fees</button>
            <button class="submenu-btn" onclick="showExportToExcel()">📊 Export to Excel</button>

        </div>
        <div id="studentFormArea"></div>
    `;
}

function showAddStudentForm() {
    const formArea = document.getElementById('studentFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Add New Student</h2>
                <button class="back-btn" onclick="document.getElementById('studentFormArea').innerHTML=''">← Back</button>
            </div>

            <form onsubmit="addStudent(event)" id="studentForm">
                <div class="form-section">
                    <h3>Basic Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Roll Number *</label>
                            <input type="text" name="rollNo" required>
                        </div>
                        <div class="form-group">
                            <label>Admission Date *</label>
                            <input type="date" name="admissionDate" required>
                        </div>
                        <div class="form-group">
                            <label>Education Level *</label>
                            <select name="educationLevel" required onchange="updateEducationFields(this.value)">
                                <option value="">Select Level</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Graduation">Graduation</option>
                                <option value="Post Graduate">Post Graduate</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Class *</label>
                            <select name="class" id="classSelect" required disabled>
                                <option value="">Select Education Level First</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Stream *</label>
                            <select name="stream" id="streamSelect" required disabled>
                                <option value="">Select Education Level First</option>
                            </select>
                        </div>
                        <div class="form-group" id="departmentGroup" style="display: none;">
                            <label>Department *</label>
                            <select name="department" id="departmentSelect">
                                <option value="">Select Department</option>
                            </select>
                        </div>
                    </div>
                </div>

                
                <div class="form-section">
    <h3>Section & Mentor Assignment</h3>
    <div class="form-grid">
        <div class="form-group">
            <label>Section</label>
            <input type="text" name="section" placeholder="e.g., A, B, C">
        </div>
        <div class="form-group">
            <label>Assign Mentor (Staff)</label>
            <select name="assignedStaff">
                <option value="">Select Staff Member</option>
                <!-- Staff list dynamically populate karo -->
            </select>
        </div>
    </div>
</div>

                <div class="form-section">
                    <h3>Personal Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Student Name *</label>
                            <input type="text" name="studentName" required>
                        </div>
                        <div class="form-group">
                            <label>Father's Name *</label>
                            <input type="text" name="fatherName" required>
                        </div>
                        <div class="form-group">
                            <label>Mother's Name *</label>
                            <input type="text" name="motherName" required>
                        </div>
                        <div class="form-group">
                            <label>Date of Birth *</label>
                            <input type="date" name="dob" required>
                        </div>
                        <div class="form-group">
                            <label>Gender *</label>
                            <select name="gender" required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Blood Group</label>
                            <select name="bloodGroup">
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Caste *</label>
                            <select name="caste" required>
                                <option value="">Select Caste</option>
                                <option value="General">General</option>
                                <option value="OBC">OBC</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Religion *</label>
                            <input type="text" name="religion" required>
                        </div>
                        <div class="form-group">
                            <label>Nationality *</label>
                            <input type="text" name="nationality" value="Indian" required>
                        </div>
                    </div>
                </div>






                <div class="form-section">
    <h3>Contact Information</h3>
    <div class="form-grid">
        <div class="form-group">
            <label>Contact Number *</label>
            <input type="tel" name="contactNo" pattern="[0-9]{10}" required placeholder="10 digit number">
        </div>
        <div class="form-group">
            <label>Alternate Contact</label>
            <input type="tel" name="alternateContact" pattern="[0-9]{10}" placeholder="10 digit number">
        </div>
        <div class="form-group">
            <label>Email *</label>
            <input type="email" name="email" required>
        </div>
    </div>
</div>

<div class="form-section">
    <h3>Address Details</h3>
    <div class="form-grid">
        <div class="form-group">
            <label>House/Flat Number *</label>
            <input type="text" name="houseNumber" required placeholder="e.g., H.No. 123, Flat 4B">
        </div>
        <div class="form-group">
            <label>Street/Road Name *</label>
            <input type="text" name="streetName" required placeholder="e.g., MG Road, Street No. 5">
        </div>
        <div class="form-group">
            <label>Locality/Area *</label>
            <input type="text" name="locality" required placeholder="e.g., Sector 15, Gandhi Nagar">
        </div>
        <div class="form-group">
            <label>Village (for rural areas)</label>
            <input type="text" name="village" placeholder="Enter village name">
        </div>
        <div class="form-group">
            <label>Landmark</label>
            <input type="text" name="landmark" placeholder="e.g., Near City Hospital">
        </div>
        <div class="form-group">
            <label>City/Town *</label>
            <input type="text" name="city" required placeholder="e.g., Bhubaneswar">
        </div>
        <div class="form-group">
            <label>District *</label>
            <input type="text" name="district" required placeholder="e.g., Khordha">
        </div>
        <div class="form-group">
            <label>State *</label>
            <select name="state" required>
                <option value="">Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
            </select>
        </div>
        <div class="form-group">
            <label>PIN Code *</label>
            <input type="text" name="pinCode" pattern="[0-9]{6}" required placeholder="6 digit PIN code">
        </div>
        <div class="form-group">
            <label>Country *</label>
            <input type="text" name="country" value="India" required>
        </div>
    </div>
</div>

                <div class="form-section">
                    <h3>Academic Background</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Previous School Name *</label>
                            <input type="text" name="schoolName" required>
                        </div>
                        <div class="form-group">
                            <label>Board *</label>
                            <input type="text" name="board" required placeholder="e.g., CBSE, ICSE, State Board">
                        </div>
                        <div class="form-group">
                            <label>Total Marks *</label>
                            <input type="number" name="totalMarks" required>
                        </div>
                        <div class="form-group">
                            <label>Percentage *</label>
                            <input type="number" name="percentage" step="0.01" min="0" max="100" required>
                        </div>
                        <div class="form-group">
                            <label>Passing Year *</label>
                            <input type="number" name="passingYear" min="1990" max="2030" required>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Bank Details</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Bank Name</label>
                            <select name="bankName" onchange="fillBankDetails(this.value, 'student')">
                                <option value="">Select Bank</option>
                                <option value="State Bank of India">State Bank of India</option>
                                <option value="HDFC Bank">HDFC Bank</option>
                                <option value="ICICI Bank">ICICI Bank</option>
                                <option value="Punjab National Bank">Punjab National Bank</option>
                                <option value="Bank of Baroda">Bank of Baroda</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Account Number</label>
                            <input type="text" name="accountNo">
                        </div>
                        <div class="form-group">
                            <label>Branch</label>
                            <input type="text" name="branch" id="studentBranch" readonly>
                        </div>
                        <div class="form-group">
                            <label>IFSC Code</label>
                            <input type="text" name="ifsc" id="studentIfsc" readonly>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-primary">Add Student</button>
                    <button type="button" class="btn-secondary" onclick="document.getElementById('studentForm').reset(); document.getElementById('studentFormArea').innerHTML=''">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function updateEducationFields(level) {
    const classSelect = document.getElementById('classSelect');
    const streamSelect = document.getElementById('streamSelect');
    const departmentGroup = document.getElementById('departmentGroup');
    const departmentSelect = document.getElementById('departmentSelect');

    if (!level) {
        classSelect.disabled = true;
        streamSelect.disabled = true;
        departmentGroup.style.display = 'none';
        return;
    }

    const structure = educationStructure[level];
    
    // Populate classes
    classSelect.innerHTML = '<option value="">Select Class</option>';
    structure.classes.forEach(cls => {
        classSelect.innerHTML += `<option value="${cls}">${cls}</option>`;
    });
    classSelect.disabled = false;

    // Populate streams
    streamSelect.innerHTML = '<option value="">Select Stream</option>';
    structure.streams.forEach(stream => {
        streamSelect.innerHTML += `<option value="${stream}">${stream}</option>`;
    });
    streamSelect.disabled = false;

    // Show/hide departments
    if (structure.departments.length > 0) {
        departmentGroup.style.display = 'block';
        departmentSelect.innerHTML = '<option value="">Select Department</option>';
        structure.departments.forEach(dept => {
            departmentSelect.innerHTML += `<option value="${dept}">${dept}</option>`;
        });
        departmentSelect.required = true;
    } else {
        departmentGroup.style.display = 'none';
        departmentSelect.required = false;
    }
}

function fillBankDetails(bankName, type) {
    if (!bankName) return;
    
    const details = bankDetails[bankName];
    const branchInput = document.getElementById(type + 'Branch');
    const ifscInput = document.getElementById(type + 'Ifsc');
    
    if (branchInput && ifscInput && details) {
        branchInput.value = details.branch;
        ifscInput.value = details.ifsc;
    }
}

function addStudent(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const student = Object.fromEntries(formData);

    // Check if roll number already exists
    if (students.find(s => s.rollNo === student.rollNo)) {
        alert('Roll number already exists!');
        return;
    }

    // Calculate fees
    const fees = calculateStudentFees(student.educationLevel);
    student.totalFees = fees;
    student.paidFees = 0;

    students.push(student);
    
    document.getElementById('studentFormArea').innerHTML = `
        <div class="message success-message">
            ✅ Student added successfully! Roll No: ${student.rollNo}
        </div>
    `;

    setTimeout(() => {
        document.getElementById('studentFormArea').innerHTML = '';
    }, 3000);
}

function calculateStudentFees(level) {
    const fees = feeStructure[level];
    if (!fees) return 0;
    
    return fees.admission + fees.examination + fees.sports + fees.laboratory;
}

function showSearchStudent() {
    const formArea = document.getElementById('studentFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Search Student</h2>
                <button class="back-btn" onclick="document.getElementById('studentFormArea').innerHTML=''">← Back</button>
            </div>
            <div class="form-group" style="max-width: 400px;">
                <label>Enter Roll Number</label>
                <input type="text" id="searchRollNo" placeholder="Enter roll number">
            </div>
            <button class="btn-primary" onclick="searchStudent()" style="max-width: 200px; margin-top: 15px;">Search</button>
            <div id="searchResult" style="margin-top: 25px;"></div>
        </div>
    `;
}

function searchStudent() {
    const rollNo = document.getElementById('searchRollNo').value.trim();
    const resultDiv = document.getElementById('searchResult');

    if (!rollNo) {
        resultDiv.innerHTML = '<div class="message error-message-box">Please enter a roll number</div>';
        return;
    }

    const student = students.find(s => s.rollNo === rollNo);

    if (student) {
        resultDiv.innerHTML = renderStudentCard(student);
    } else {
        resultDiv.innerHTML = '<div class="message error-message-box">Student not found</div>';
    }
}

function renderStudentCard(student, showActions = false) {
    return `
        <div class="record-card">
            <div class="record-header">
                <h3>${student.studentName} (${student.rollNo})</h3>
                ${showActions ? `
                    <div class="record-actions">
                        <button class="btn-edit" onclick="editStudent('${student.rollNo}')">Edit</button>
                        <button class="btn-delete" onclick="deleteStudentConfirm('${student.rollNo}')">Delete</button>
                    </div>
                ` : ''}
            </div>
            <div class="record-details">
                <div class="record-field"><strong>Roll Number:</strong> <span>${student.rollNo}</span></div>
                <div class="record-field"><strong>Admission Date:</strong> <span>${student.admissionDate}</span></div>
                <div class="record-field"><strong>Education Level:</strong> <span>${student.educationLevel}</span></div>
                <div class="record-field"><strong>Class:</strong> <span>${student.class}</span></div>
                <div class="record-field"><strong>Stream:</strong> <span>${student.stream}</span></div>
                ${student.department ? `<div class="record-field"><strong>Department:</strong> <span>${student.department}</span></div>` : ''}
                <div class="record-field"><strong>Father's Name:</strong> <span>${student.fatherName}</span></div>
                <div class="record-field"><strong>Mother's Name:</strong> <span>${student.motherName}</span></div>
                <div class="record-field"><strong>Date of Birth:</strong> <span>${student.dob}</span></div>
                <div class="record-field"><strong>Gender:</strong> <span>${student.gender}</span></div>
                <div class="record-field"><strong>Blood Group:</strong> <span>${student.bloodGroup || 'N/A'}</span></div>
                <div class="record-field"><strong>Caste:</strong> <span>${student.caste}</span></div>
                <div class="record-field"><strong>Religion:</strong> <span>${student.religion}</span></div>
                <div class="record-field"><strong>Contact Number:</strong> <span>${student.contactNo}</span></div>
                <div class="record-field"><strong>Email:</strong> <span>${student.email}</span></div>
                <div class="record-field"><strong>Address:</strong> <span>${student.address}</span></div>
                <div class="record-field"><strong>School Name:</strong> <span>${student.schoolName}</span></div>
                <div class="record-field"><strong>Board:</strong> <span>${student.board}</span></div>
                <div class="record-field"><strong>Percentage:</strong> <span>${student.percentage}%</span></div>
                <div class="record-field"><strong>Passing Year:</strong> <span>${student.passingYear}</span></div>
                <div class="record-field"><strong>Total Fees:</strong> <span>₹${student.totalFees || 0}</span></div>
                <div class="record-field"><strong>Paid Fees:</strong> <span>₹${student.paidFees || 0}</span></div>
                <div class="record-field"><strong>Pending Fees:</strong> <span>₹${(student.totalFees || 0) - (student.paidFees || 0)}</span></div>
            </div>
        </div>
    `;
}

function displayAllStudents() {
    const formArea = document.getElementById('studentFormArea');
    
    if (students.length === 0) {
        formArea.innerHTML = `
            <div class="form-container active">
                <div class="form-header">
                    <h2>All Students</h2>
                    <button class="back-btn" onclick="document.getElementById('studentFormArea').innerHTML=''">← Back</button>
                </div>
                <div class="empty-state">
                    <h3>No Students Found</h3>
                    <p>Add your first student to get started</p>
                </div>
            </div>
        `;
        return;
    }

    let html = `
        <div class="form-container active">
            <div class="form-header">
                <h2>All Students (${students.length})</h2>
                <button class="back-btn" onclick="document.getElementById('studentFormArea').innerHTML=''">← Back</button>
            </div>
            <div class="records-list">
    `;

    students.forEach(student => {
        html += renderStudentCard(student, true);
    });

    html += '</div></div>';
    formArea.innerHTML = html;
}
                function showModifyStudent() {
    const formArea = document.getElementById('studentFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Modify Student</h2>
                <button class="back-btn" onclick="document.getElementById('studentFormArea').innerHTML=''">← Back</button>
            </div>
            <div class="form-group" style="max-width: 400px;">
                <label>Enter Roll Number</label>
                <input type="text" id="modifyRollNo" placeholder="Enter roll number">
            </div>
            <button class="btn-primary" onclick="loadStudentForEdit()" style="max-width: 200px; margin-top: 15px;">Load Student</button>
            <div id="modifyFormArea" style="margin-top: 25px;"></div>
        </div>
    `;
}

function loadStudentForEdit() {
    const rollNo = document.getElementById('modifyRollNo').value.trim();
    const formArea = document.getElementById('modifyFormArea');

    if (!rollNo) {
        formArea.innerHTML = '<div class="message error-message-box">Please enter a roll number</div>';
        return;
    }

    const student = students.find(s => s.rollNo === rollNo);

    if (!student) {
        formArea.innerHTML = '<div class="message error-message-box">Student not found</div>';
        return;
    }

    editStudent(rollNo);
}

function editStudent(rollNo) {
    const student = students.find(s => s.rollNo === rollNo);
    if (!student) return;

    const formArea = document.getElementById('studentFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Edit Student - ${student.studentName}</h2>
                <button class="back-btn" onclick="displayAllStudents()">← Back</button>
            </div>

            <form onsubmit="updateStudent(event, '${rollNo}')">
                <div class="form-section">
                    <h3>Basic Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Roll Number *</label>
                            <input type="text" name="rollNo" value="${student.rollNo}" readonly>
                        </div>
                        <div class="form-group">
                            <label>Student Name *</label>
                            <input type="text" name="studentName" value="${student.studentName}" required>
                        </div>
                        <div class="form-group">
                            <label>Contact Number *</label>
                            <input type="tel" name="contactNo" value="${student.contactNo}" pattern="[0-9]{10}" required>
                        </div>
                        <div class="form-group">
                            <label>Email *</label>
                            <input type="email" name="email" value="${student.email}" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Address *</label>
                        <textarea name="address" required rows="3">${student.address}</textarea>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-primary">Update Student</button>
                    <button type="button" class="btn-secondary" onclick="displayAllStudents()">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function updateStudent(event, rollNo) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedData = Object.fromEntries(formData);

    const index = students.findIndex(s => s.rollNo === rollNo);
    if (index !== -1) {
        students[index] = { ...students[index], ...updatedData };
        
        document.getElementById('studentFormArea').innerHTML = `
            <div class="message success-message">
                ✅ Student updated successfully!
            </div>
        `;

        setTimeout(() => {
            displayAllStudents();
        }, 2000);
    }
}

function showDeleteStudent() {
    const formArea = document.getElementById('studentFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Delete Student</h2>
                <button class="back-btn" onclick="document.getElementById('studentFormArea').innerHTML=''">← Back</button>
            </div>
            <div class="form-group" style="max-width: 400px;">
                <label>Enter Roll Number</label>
                <input type="text" id="deleteRollNo" placeholder="Enter roll number">
            </div>
            <button class="btn-primary" onclick="deleteStudentConfirm(document.getElementById('deleteRollNo').value)" style="max-width: 200px; margin-top: 15px; background: #e74c3c;">Delete Student</button>
            <div id="deleteResult" style="margin-top: 25px;"></div>
        </div>
    `;
}

function deleteStudentConfirm(rollNo) {
    if (!rollNo) {
        const resultDiv = document.getElementById('deleteResult');
        if (resultDiv) {
            resultDiv.innerHTML = '<div class="message error-message-box">Please enter a roll number</div>';
        }
        return;
    }

    const student = students.find(s => s.rollNo === rollNo);
    if (!student) {
        const resultDiv = document.getElementById('deleteResult');
        if (resultDiv) {
            resultDiv.innerHTML = '<div class="message error-message-box">Student not found</div>';
        }
        return;
    }

    if (confirm(`Are you sure you want to delete student ${student.studentName} (${rollNo})?`)) {
        const index = students.findIndex(s => s.rollNo === rollNo);
        students.splice(index, 1);
        
        const formArea = document.getElementById('studentFormArea');
        formArea.innerHTML = `
            <div class="message success-message">
                ✅ Student deleted successfully!
            </div>
        `;

        setTimeout(() => {
            formArea.innerHTML = '';
        }, 2000);
    }
}

function showCollectFees() {
    const formArea = document.getElementById('studentFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Collect Fees</h2>
                <button class="back-btn" onclick="document.getElementById('studentFormArea').innerHTML=''">← Back</button>
            </div>
            <div class="form-group" style="max-width: 400px;">
                <label>Enter Roll Number</label>
                <input type="text" id="feesRollNo" placeholder="Enter roll number">
            </div>
            <button class="btn-primary" onclick="loadStudentFees()" style="max-width: 200px; margin-top: 15px;">Load Student</button>
            <div id="feesArea" style="margin-top: 25px;"></div>
        </div>
    `;
}

function loadStudentFees() {
    const rollNo = document.getElementById('feesRollNo').value.trim();
    const feesArea = document.getElementById('feesArea');

    if (!rollNo) {
        feesArea.innerHTML = '<div class="message error-message-box">Please enter a roll number</div>';
        return;
    }

    const student = students.find(s => s.rollNo === rollNo);

    if (!student) {
        feesArea.innerHTML = '<div class="message error-message-box">Student not found</div>';
        return;
    }

    const baseFees = feeStructure[student.educationLevel];
    const totalBaseFees = baseFees.admission + baseFees.examination + baseFees.sports + baseFees.laboratory;

    feesArea.innerHTML = `
        <div class="record-card">
            <div class="record-header">
                <h3>${student.studentName} - Fee Collection</h3>
            </div>
            
            <form onsubmit="collectFees(event, '${rollNo}')">
                <div class="form-section">
                    <h3>Fee Breakdown</h3>
                    <div class="salary-row">
                        <span>Admission Fees:</span>
                        <strong>₹${baseFees.admission}</strong>
                    </div>
                    <div class="salary-row">
                        <span>Examination Fees:</span>
                        <strong>₹${baseFees.examination}</strong>
                    </div>
                    <div class="salary-row">
                        <span>Sports & Cultural Fees:</span>
                        <strong>₹${baseFees.sports}</strong>
                    </div>
                    <div class="salary-row">
                        <span>Laboratory Fees:</span>
                        <strong>₹${baseFees.laboratory}</strong>
                    </div>
                    <div class="salary-row total">
                        <span>Base Total:</span>
                        <strong>₹${totalBaseFees}</strong>
                    </div>

                    <h4 style="margin-top: 25px; margin-bottom: 15px; color: #667eea;">Optional Facilities</h4>
                    <div class="checkbox-group">
                        <label>
                            <input type="checkbox" name="hostel" value="25000" onchange="updateTotalFees()">
                            Hostel Facility (+₹25,000)
                        </label>
                        <label>
                            <input type="checkbox" name="bus" value="3000" onchange="updateTotalFees()">
                            Bus Facility (+₹3,000)
                        </label>
                    </div>

                    <div class="salary-row total" style="margin-top: 20px;">
                        <span>Total Fees:</span>
                        <strong id="totalFeesDisplay">₹${totalBaseFees}</strong>
                    </div>
                    <input type="hidden" name="totalFees" id="totalFeesInput" value="${totalBaseFees}">
                </div>

                <div class="form-section">
                    <h3>Payment Details</h3>
                    <div class="salary-row">
                        <span>Previously Paid:</span>
                        <strong>₹${student.paidFees || 0}</strong>
                    </div>
                    <div class="form-group" style="margin-top: 15px;">
                        <label>Amount to Pay Now *</label>
                        <input type="number" name="amountPaying" min="0" required>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-primary">Collect Fees</button>
                    <button type="button" class="btn-secondary" onclick="document.getElementById('studentFormArea').innerHTML=''">Cancel</button>
                </div>
            </form>
        </div>
    `;

    // Store base fees for calculation
    window.currentBaseFees = totalBaseFees;
}

function updateTotalFees() {
    const hostelCheckbox = document.querySelector('input[name="hostel"]');
    const busCheckbox = document.querySelector('input[name="bus"]');
    
    let total = window.currentBaseFees;
    
    if (hostelCheckbox && hostelCheckbox.checked) {
        total += parseInt(hostelCheckbox.value);
    }
    
    if (busCheckbox && busCheckbox.checked) {
        total += parseInt(busCheckbox.value);
    }

    document.getElementById('totalFeesDisplay').textContent = `₹${total}`;
    document.getElementById('totalFeesInput').value = total;
}

function collectFees(event, rollNo) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const amountPaying = parseInt(formData.get('amountPaying'));
    const totalFees = parseInt(formData.get('totalFees'));

    const student = students.find(s => s.rollNo === rollNo);
    if (!student) return;

    student.totalFees = totalFees;
    student.paidFees = (student.paidFees || 0) + amountPaying;

    document.getElementById('studentFormArea').innerHTML = `
        <div class="message success-message">
            ✅ Fees collected successfully! Amount: ₹${amountPaying}
        </div>
    `;

    setTimeout(() => {
        document.getElementById('studentFormArea').innerHTML = '';
    }, 3000);
}


// ==========================================
// STAFF MODULE
// ==========================================

function showStaffSubmenu() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="submenu-grid">
            <button class="submenu-btn" onclick="showAddStaffForm()">➕ Add Staff</button>
            <button class="submenu-btn" onclick="showSearchStaff()">🔍 Search Staff</button>
            <button class="submenu-btn" onclick="displayAllStaff()">📋 Display All Staff</button>
            <button class="submenu-btn" onclick="showModifyStaff()">✏️ Modify Staff</button>
            <button class="submenu-btn" onclick="showDeleteStaff()">🗑️ Delete Staff</button>
            <button class="submenu-btn" onclick="showGenerateSalary()">💰 Generate Salary</button>
        </div>
        <div id="staffFormArea"></div>
    `;
}

function showAddStaffForm() {
    const formArea = document.getElementById('staffFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Add New Staff Member</h2>
                <button class="back-btn" onclick="document.getElementById('staffFormArea').innerHTML=''">← Back</button>
            </div>

            <form onsubmit="addStaff(event)" id="staffForm">
                <div class="form-section">
                    <h3>Basic Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Staff ID *</label>
                            <input type="text" name="staffId" required>
                        </div>
                        <div class="form-group">
                            <label>First Name *</label>
                            <input type="text" name="firstName" required onchange="generateFullName()">
                        </div>
                        <div class="form-group">
                            <label>Middle Name</label>
                            <input type="text" name="middleName" onchange="generateFullName()">
                        </div>
                        <div class="form-group">
                            <label>Last Name *</label>
                            <input type="text" name="lastName" required onchange="generateFullName()">
                        </div>
                        <div class="form-group">
                            <label>Full Name (Auto-generated)</label>
                            <input type="text" name="fullName" id="fullNameField" readonly>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Professional Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Qualification *</label>
                            <input type="text" name="qualification" required placeholder="e.g., M.Sc., Ph.D.">
                        </div>
                        <div class="form-group">
                            <label>Designation *</label>
                            <select name="designation" required>
                                <option value="">Select Designation</option>
                                <option value="Principal">Principal</option>
                                <option value="HOD">HOD</option>
                                <option value="Professor">Professor</option>
                                <option value="Lab Incharge">Lab Incharge</option>
                                <option value="Support Staff">Support Staff</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Joining Date *</label>
                            <input type="date" name="joiningDate" required>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Personal Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Date of Birth *</label>
                            <input type="date" name="dob" required>
                        </div>
                        <div class="form-group">
                            <label>Blood Group</label>
                            <select name="bloodGroup">
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Gender *</label>
                            <select name="gender" required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Caste *</label>
                            <select name="caste" required>
                                <option value="">Select Caste</option>
                                <option value="General">General</option>
                                <option value="OBC">OBC</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Contact Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Contact Number *</label>
                            <input type="tel" name="contactNo" pattern="[0-9]{10}" required placeholder="10 digit number">
                        </div>
                        <div class="form-group">
                            <label>Email *</label>
                            <input type="email" name="email" required>
                        </div>
                        <div class="form-group">
    <label>WhatsApp Number *</label>
    <input type="tel" name="whatsappNo" pattern="[0-9]{10}" required placeholder="10 digit number">
</div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Bank Details</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Bank Name *</label>
                            <select name="bankName" required onchange="fillBankDetails(this.value, 'staff')">
                                <option value="">Select Bank</option>
                                <option value="State Bank of India">State Bank of India</option>
                                <option value="HDFC Bank">HDFC Bank</option>
                                <option value="ICICI Bank">ICICI Bank</option>
                                <option value="Punjab National Bank">Punjab National Bank</option>
                                <option value="Bank of Baroda">Bank of Baroda</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Account Number *</label>
                            <input type="text" name="accountNo" required>
                        </div>
                        <div class="form-group">
                            <label>Branch</label>
                            <input type="text" name="branch" id="staffBranch" readonly>
                        </div>
                        <div class="form-group">
                            <label>IFSC Code</label>
                            <input type="text" name="ifsc" id="staffIfsc" readonly>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-primary">Add Staff Member</button>
                    <button type="button" class="btn-secondary" onclick="document.getElementById('staffForm').reset(); document.getElementById('staffFormArea').innerHTML=''">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function generateFullName() {
    const firstName = document.querySelector('input[name="firstName"]').value.trim();
    const middleName = document.querySelector('input[name="middleName"]').value.trim();
    const lastName = document.querySelector('input[name="lastName"]').value.trim();
    
    let fullName = firstName;
    if (middleName) fullName += ' ' + middleName;
    if (lastName) fullName += ' ' + lastName;
    
    const fullNameField = document.getElementById('fullNameField');
    if (fullNameField) {
        fullNameField.value = fullName;
    }
}

function addStaff(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const staffMember = Object.fromEntries(formData);

    if (staff.find(s => s.staffId === staffMember.staffId)) {
        alert('Staff ID already exists!');
        return;
    }

    staffMember.netSalary = 0;
    staff.push(staffMember);
    
    document.getElementById('staffFormArea').innerHTML = `
        <div class="message success-message">
            ✅ Staff member added successfully! Staff ID: ${staffMember.staffId}
        </div>
    `;

    setTimeout(() => {
        document.getElementById('staffFormArea').innerHTML = '';
    }, 3000);
}

function showSearchStaff() {
    const formArea = document.getElementById('staffFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Search Staff</h2>
                <button class="back-btn" onclick="document.getElementById('staffFormArea').innerHTML=''">← Back</button>
            </div>
            <div class="form-group" style="max-width: 400px;">
                <label>Enter Staff ID</label>
                <input type="text" id="searchStaffId" placeholder="Enter staff ID">
            </div>
            <button class="btn-primary" onclick="searchStaff()" style="max-width: 200px; margin-top: 15px;">Search</button>
            <div id="searchStaffResult" style="margin-top: 25px;"></div>
        </div>
    `;
}

function searchStaff() {
    const staffId = document.getElementById('searchStaffId').value.trim();
    const resultDiv = document.getElementById('searchStaffResult');

    if (!staffId) {
        resultDiv.innerHTML = '<div class="message error-message-box">Please enter a staff ID</div>';
        return;
    }

    const staffMember = staff.find(s => s.staffId === staffId);

    if (staffMember) {
        resultDiv.innerHTML = renderStaffCard(staffMember);
    } else {
        resultDiv.innerHTML = '<div class="message error-message-box">Staff member not found</div>';
    }
}

function renderStaffCard(staffMember, showActions = false) {
    return `
        <div class="record-card">
            <div class="record-header">
                <h3>${staffMember.fullName} (${staffMember.staffId})</h3>
                ${showActions ? `
                    <div class="record-actions">
                        <button class="btn-edit" onclick="editStaff('${staffMember.staffId}')">Edit</button>
                        <button class="btn-delete" onclick="deleteStaffConfirm('${staffMember.staffId}')">Delete</button>
                    </div>
                ` : ''}
            </div>
            <div class="record-details">
                <div class="record-field"><strong>Staff ID:</strong> <span>${staffMember.staffId}</span></div>
                <div class="record-field"><strong>Full Name:</strong> <span>${staffMember.fullName}</span></div>
                <div class="record-field"><strong>Qualification:</strong> <span>${staffMember.qualification}</span></div>
                <div class="record-field"><strong>Designation:</strong> <span>${staffMember.designation}</span></div>
                <div class="record-field"><strong>Joining Date:</strong> <span>${staffMember.joiningDate}</span></div>
                <div class="record-field"><strong>Date of Birth:</strong> <span>${staffMember.dob}</span></div>
                <div class="record-field"><strong>Blood Group:</strong> <span>${staffMember.bloodGroup || 'N/A'}</span></div>
                <div class="record-field"><strong>Gender:</strong> <span>${staffMember.gender}</span></div>
                <div class="record-field"><strong>Caste:</strong> <span>${staffMember.caste}</span></div>
                <div class="record-field"><strong>Contact Number:</strong> <span>${staffMember.contactNo}</span></div>
                <div class="record-field"><strong>Email:</strong> <span>${staffMember.email}</span></div>
                <div class="record-field"><strong>Bank Account:</strong> <span>${staffMember.accountNo}</span></div>
                <div class="record-field"><strong>Bank Name:</strong> <span>${staffMember.bankName}</span></div>
                <div class="record-field"><strong>Net Salary:</strong> <span>₹${staffMember.netSalary || 0}</span></div>
            </div>
        </div>
    `;
}

function displayAllStaff() {
    const formArea = document.getElementById('staffFormArea');
    
    if (staff.length === 0) {
        formArea.innerHTML = `
            <div class="form-container active">
                <div class="form-header">
                    <h2>All Staff Members</h2>
                    <button class="back-btn" onclick="document.getElementById('staffFormArea').innerHTML=''">← Back</button>
                </div>
                <div class="empty-state">
                    <h3>No Staff Members Found</h3>
                    <p>Add your first staff member to get started</p>
                </div>
            </div>
        `;
        return;
    }

    let html = `
        <div class="form-container active">
            <div class="form-header">
                <h2>All Staff Members (${staff.length})</h2>
                <button class="back-btn" onclick="document.getElementById('staffFormArea').innerHTML=''">← Back</button>
            </div>
            <div class="records-list">
    `;

    staff.forEach(staffMember => {
        html += renderStaffCard(staffMember, true);
    });

    html += '</div></div>';
    formArea.innerHTML = html;
}

function showModifyStaff() {
    const formArea = document.getElementById('staffFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Modify Staff</h2>
                <button class="back-btn" onclick="document.getElementById('staffFormArea').innerHTML=''">← Back</button>
            </div>
            <div class="form-group" style="max-width: 400px;">
                <label>Enter Staff ID</label>
                <input type="text" id="modifyStaffId" placeholder="Enter staff ID">
            </div>
            <button class="btn-primary" onclick="loadStaffForEdit()" style="max-width: 200px; margin-top: 15px;">Load Staff</button>
            <div id="modifyStaffFormArea" style="margin-top: 25px;"></div>
        </div>
    `;
}

function loadStaffForEdit() {
    const staffId = document.getElementById('modifyStaffId').value.trim();
    const formArea = document.getElementById('modifyStaffFormArea');

    if (!staffId) {
        formArea.innerHTML = '<div class="message error-message-box">Please enter a staff ID</div>';
        return;
    }

    const staffMember = staff.find(s => s.staffId === staffId);

    if (!staffMember) {
        formArea.innerHTML = '<div class="message error-message-box">Staff member not found</div>';
        return;
    }

    editStaff(staffId);
}

function editStaff(staffId) {
    const staffMember = staff.find(s => s.staffId === staffId);
    if (!staffMember) return;

    const formArea = document.getElementById('staffFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Edit Staff - ${staffMember.fullName}</h2>
                <button class="back-btn" onclick="displayAllStaff()">← Back</button>
            </div>

            <form onsubmit="updateStaff(event, '${staffId}')">
                <div class="form-section">
                    <h3>Basic Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Staff ID *</label>
                            <input type="text" name="staffId" value="${staffMember.staffId}" readonly>
                        </div>
                        <div class="form-group">
                            <label>Full Name *</label>
                            <input type="text" name="fullName" value="${staffMember.fullName}" required>
                        </div>
                        <div class="form-group">
                            <label>Contact Number *</label>
                            <input type="tel" name="contactNo" value="${staffMember.contactNo}" pattern="[0-9]{10}" required>
                        </div>
                        <div class="form-group">
                            <label>Email *</label>
                            <input type="email" name="email" value="${staffMember.email}" required>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-primary">Update Staff</button>
                    <button type="button" class="btn-secondary" onclick="displayAllStaff()">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function updateStaff(event, staffId) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedData = Object.fromEntries(formData);

    const index = staff.findIndex(s => s.staffId === staffId);
    if (index !== -1) {
        staff[index] = { ...staff[index], ...updatedData };
        
        document.getElementById('staffFormArea').innerHTML = `
            <div class="message success-message">
                ✅ Staff member updated successfully!
            </div>
        `;

        setTimeout(() => {
            displayAllStaff();
        }, 2000);
    }
}

function showDeleteStaff() {
    const formArea = document.getElementById('staffFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Delete Staff</h2>
                <button class="back-btn" onclick="document.getElementById('staffFormArea').innerHTML=''">← Back</button>
            </div>
            <div class="form-group" style="max-width: 400px;">
                <label>Enter Staff ID</label>
                <input type="text" id="deleteStaffId" placeholder="Enter staff ID">
            </div>
            <button class="btn-primary" onclick="deleteStaffConfirm(document.getElementById('deleteStaffId').value)" style="max-width: 200px; margin-top: 15px; background: #e74c3c;">Delete Staff</button>
            <div id="deleteStaffResult" style="margin-top: 25px;"></div>
        </div>
    `;
}

function deleteStaffConfirm(staffId) {
    if (!staffId) {
        const resultDiv = document.getElementById('deleteStaffResult');
        if (resultDiv) {
            resultDiv.innerHTML = '<div class="message error-message-box">Please enter a staff ID</div>';
        }
        return;
    }

    const staffMember = staff.find(s => s.staffId === staffId);
    if (!staffMember) {
        const resultDiv = document.getElementById('deleteStaffResult');
        if (resultDiv) {
            resultDiv.innerHTML = '<div class="message error-message-box">Staff member not found</div>';
        }
        return;
    }

    if (confirm(`Are you sure you want to delete staff member ${staffMember.fullName} (${staffId})?`)) {
        const index = staff.findIndex(s => s.staffId === staffId);
        staff.splice(index, 1);
        
        const formArea = document.getElementById('staffFormArea');
        formArea.innerHTML = `
            <div class="message success-message">
                ✅ Staff member deleted successfully!
            </div>
        `;

        setTimeout(() => {
            formArea.innerHTML = '';
        }, 2000);
    }
}

function showGenerateSalary() {
    const formArea = document.getElementById('staffFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Generate Salary</h2>
                <button class="back-btn" onclick="document.getElementById('staffFormArea').innerHTML=''">← Back</button>
            </div>
            <div class="form-group" style="max-width: 400px;">
                <label>Enter Staff ID</label>
                <input type="text" id="salaryStaffId" placeholder="Enter staff ID">
            </div>
            <button class="btn-primary" onclick="loadStaffSalary()" style="max-width: 200px; margin-top: 15px;">Generate Salary</button>
            <div id="salaryArea" style="margin-top: 25px;"></div>
        </div>
    `;
}

function loadStaffSalary() {
    const staffId = document.getElementById('salaryStaffId').value.trim();
    const salaryArea = document.getElementById('salaryArea');

    if (!staffId) {
        salaryArea.innerHTML = '<div class="message error-message-box">Please enter a staff ID</div>';
        return;
    }

    const staffMember = staff.find(s => s.staffId === staffId);

    if (!staffMember) {
        salaryArea.innerHTML = '<div class="message error-message-box">Staff member not found</div>';
        return;
    }

    displaySalaryBreakdown(staffMember, salaryArea, true);
}

function displaySalaryBreakdown(staffMember, container, allowGenerate = false) {
    const basicSalary = salaryStructure[staffMember.designation] || 25000;
    const hra = Math.round(basicSalary * 0.10);
    const da = Math.round(basicSalary * 0.08);
    const ta = Math.round(basicSalary * 0.05);
    const pf = Math.round(basicSalary * 0.06);
    const it = Math.round(basicSalary * 0.10);
    
    const totalAllowances = hra + da + ta;
    const totalDeductions = pf + it;
    const netSalary = basicSalary + totalAllowances - totalDeductions;

    container.innerHTML = `
        <div class="salary-card">
            <h3>${staffMember.fullName} - Salary Breakdown</h3>
            <div class="salary-breakdown">
                <div class="salary-section">
                    <h4>Basic Information</h4>
                    <div class="salary-row">
                        <span>Staff ID:</span>
                        <strong>${staffMember.staffId}</strong>
                    </div>
                    <div class="salary-row">
                        <span>Designation:</span>
                        <strong>${staffMember.designation}</strong>
                    </div>
                </div>

                <div class="salary-section">
                    <h4>Salary Components</h4>
                    <div class="salary-row">
                        <span>Basic Salary:</span>
                        <strong>₹${basicSalary}</strong>
                    </div>
                </div>

                <div class="salary-section">
                    <h4>Allowances</h4>
                    <div class="salary-row">
                        <span>HRA (10%):</span>
                        <strong>₹${hra}</strong>
                    </div>
                    <div class="salary-row">
                        <span>DA (8%):</span>
                        <strong>₹${da}</strong>
                    </div>
                    <div class="salary-row">
                        <span>TA (5%):</span>
                        <strong>₹${ta}</strong>
                    </div>
                    <div class="salary-row total">
                        <span>Total Allowances:</span>
                        <strong>₹${totalAllowances}</strong>
                    </div>
                </div>

                <div class="salary-section">
                    <h4>Deductions</h4>
                    <div class="salary-row">
                        <span>PF (6%):</span>
                        <strong>₹${pf}</strong>
                    </div>
                    <div class="salary-row">
                        <span>IT (10%):</span>
                        <strong>₹${it}</strong>
                    </div>
                    <div class="salary-row total">
                        <span>Total Deductions:</span>
                        <strong>₹${totalDeductions}</strong>
                    </div>
                </div>

                <div class="salary-row total" style="font-size: 20px; margin-top: 20px;">
                    <span>Net Salary:</span>
                    <strong>₹${netSalary}</strong>
                </div>
            </div>
        </div>
        ${allowGenerate ? `
            <button class="btn-primary" onclick="saveSalary('${staffMember.staffId}', ${netSalary})" style="margin-top: 20px;">
                Save & Generate Salary
            </button>
        ` : ''}
    `;
}

function saveSalary(staffId, netSalary) {
    const staffMember = staff.find(s => s.staffId === staffId);
    if (staffMember) {
        staffMember.netSalary = netSalary;
        
        document.getElementById('staffFormArea').innerHTML = `
            <div class="message success-message">
                ✅ Salary generated and saved successfully! Net Salary: ₹${netSalary}
            </div>
        `;

        setTimeout(() => {
            document.getElementById('staffFormArea').innerHTML = '';
        }, 3000);
    }
}

function showStaffSalaryDetails() {
    if (!currentUser.data) {
        document.getElementById('mainContent').innerHTML = `
            <div class="message error-message-box">
                Unable to load salary details. Please contact administration.
            </div>
        `;
        return;
    }

    const staffMember = staff.find(s => s.staffId === currentUser.username);
    if (!staffMember) {
        document.getElementById('mainContent').innerHTML = `
            <div class="message error-message-box">
                Your staff record was not found. Please contact administration.
            </div>
        `;
        return;
    }

    displaySalaryBreakdown(staffMember, document.getElementById('mainContent'), false);
}



// ==========================================
// TIMETABLE MODULE (Admin Only)
// ==========================================

function showTimetableModule() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="submenu-grid">
            <button class="submenu-btn" onclick="showCreateTimetable()">➕ Create Timetable</button>
            <button class="submenu-btn" onclick="showViewTimetables()">📋 View All Timetables</button>
            <button class="submenu-btn" onclick="showModifyTimetable()">✏️ Modify Timetable</button>
        </div>
        <div id="timetableFormArea"></div>
    `;
}

function showCreateTimetable() {
    const formArea = document.getElementById('timetableFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Create Class Timetable</h2>
                <button class="back-btn" onclick="document.getElementById('timetableFormArea').innerHTML=''">← Back</button>
            </div>
            
            <form onsubmit="saveTimetable(event)" id="timetableForm">
                <div class="form-section">
                    <h3>Select Class Details</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Education Level *</label>
                            <select name="educationLevel" id="ttEduLevel" required onchange="updateTimetableClassOptions()">
                                <option value="">Select Education Level</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Graduation">Graduation</option>
                                <option value="Post Graduate">Post Graduate</option>
                                <option value="BBA">BBA</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Class *</label>
                            <select name="class" id="ttClass" required onchange="updateTimetableStreamOptions()" disabled>
                                <option value="">Select Education Level First</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Stream *</label>
                            <select name="stream" id="ttStream" required disabled onchange="updateTimetableSectionVisibility(); updateTimetableDepartmentVisibility();">
                            
                                <option value="">Select Class First</option>
                            </select>
                        </div>
<div class="form-group" id="ttSectionGroup" style="display: none;">
    <label>Section</label>
    <select name="section" id="ttSection">
        <option value="">Select Section (Optional)</option>
        <option value="A">Section A</option>
        <option value="B">Section B</option>
        <option value="C">Section C</option>
        <option value="D">Section D</option>
    </select>
</div>
                        <div class="form-group" id="ttDepartmentGroup" style="display: none;">
                            <label>Department *</label>
                            <select name="department" id="ttDepartment">
                                <option value="">Select Department</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Day *</label>
                            <select name="day" id="ttDay" required>
                                <option value="">Select Day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3>Add Periods</h3>
                    <div id="periodsContainer">
                        <div class="period-input-group">
                            <div class="form-grid">
                                <div class="form-group">
                                    <label>Subject Name *</label>
                                    <input type="text" name="subject_0" required placeholder="e.g., Physics">
                                </div>
                                <div class="form-group">
                                    <label>Start Time *</label>
                                    <input type="time" name="time_0" required>
                                </div>
                                <div class="form-group">
                                    <label>Duration (minutes) *</label>
                                    <input type="number" name="duration_0" required min="30" max="180" placeholder="e.g., 60">
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn-secondary" onclick="addPeriodField()" style="margin-top: 15px; max-width: 200px;">+ Add Another Period</button>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Save Timetable</button>
                    <button type="button" class="btn-secondary" onclick="document.getElementById('timetableFormArea').innerHTML=''">Cancel</button>
                </div>
            </form>
        </div>
    `;
}


function updateTimetableClassOptions() {
    const eduLevel = document.getElementById('ttEduLevel').value;
    const classSelect = document.getElementById('ttClass');
    const streamSelect = document.getElementById('ttStream');
    const departmentGroup = document.getElementById('ttDepartmentGroup');
    const departmentSelect = document.getElementById('ttDepartment');
    
    // Reset karo
    classSelect.innerHTML = '<option value="">Select Class</option>';
    streamSelect.innerHTML = '<option value="">Select Class First</option>';
    classSelect.disabled = true;
    streamSelect.disabled = true;
    departmentGroup.style.display = 'none';
    
    if (!eduLevel) return;
    
    // educationStructure se classes nikalo
    const structure = educationStructure[eduLevel];
    if (!structure) return;
    
    // Classes populate karo
    structure.classes.forEach(cls => {
        classSelect.innerHTML += `<option value="${cls}">${cls}</option>`;
    });
    classSelect.disabled = false;
    
   // Department populate karo (but initially hide kar do)
    // Stream select hone pe decide hoga show/hide
    if (eduLevel === 'Graduation' || eduLevel === 'Post Graduate') {
        departmentSelect.innerHTML = '<option value="">Select Department</option>';
        structure.departments.forEach(dept => {
            departmentSelect.innerHTML += `<option value="${dept}">${dept}</option>`;
        });
        // Initially hide, stream selection pe show/hide hoga
        departmentGroup.style.display = 'none';
        departmentSelect.required = false;
    } else {
        departmentGroup.style.display = 'none';
        departmentSelect.required = false;
    }
}


function updateTimetableStreamOptions() {
    const eduLevel = document.getElementById('ttEduLevel').value;
    const streamSelect = document.getElementById('ttStream');
    
    streamSelect.innerHTML = '<option value="">Select Stream</option>';
    streamSelect.disabled = true;
    
    if (!eduLevel) return;
    
    const structure = educationStructure[eduLevel];
    if (!structure) return;
    
    // Streams populate karo
    structure.streams.forEach(stream => {
        streamSelect.innerHTML += `<option value="${stream}">${stream}</option>`;
    });
    streamSelect.disabled = false;
}

function updateTimetableDepartmentVisibility() {
    const eduLevel = document.getElementById('ttEduLevel').value;
    const stream = document.getElementById('ttStream').value;
    const departmentGroup = document.getElementById('ttDepartmentGroup');
    const departmentSelect = document.getElementById('ttDepartment');
    
    // Department sirf tab dikhao jab:
    // 1. Graduation ya Post Graduate ho
    // 2. AUR Stream Commerce NAHI ho
    
    if ((eduLevel === 'Graduation' || eduLevel === 'Post Graduate') && stream && stream !== 'Commerce') {
        // Science ya Arts mein department dikhao
        departmentGroup.style.display = 'block';
        departmentSelect.required = true;
    } else {
        // Commerce mein ya baaki cases mein department hide karo
        departmentGroup.style.display = 'none';
        departmentSelect.required = false;
        departmentSelect.value = ''; // Reset value
    }
}

function updateTimetableSectionVisibility() {
    const eduLevel = document.getElementById('ttEduLevel').value;
    const stream = document.getElementById('ttStream').value;
    const sectionGroup = document.getElementById('ttSectionGroup');
    
    // Section show karo sirf:
    // 1. Intermediate mein (all streams)
    // 2. Graduation/Post Graduate mein sirf Commerce stream ke liye
    
    if (eduLevel === 'Intermediate') {
        // Intermediate mein hamesha section dikhao
        sectionGroup.style.display = 'block';
    } else if ((eduLevel === 'Graduation' || eduLevel === 'Post Graduate') && stream === 'Commerce') {
        // Graduation/PG mein sirf Commerce ke liye section dikhao
        sectionGroup.style.display = 'block';
    } else {
        // Baaki sab cases mein section hide karo
        sectionGroup.style.display = 'none';
        document.getElementById('ttSection').value = ''; // Reset value
    }
}

function addPeriodField() {
    const container = document.getElementById('periodsContainer');
    const currentCount = container.children.length;
    
    const newPeriod = document.createElement('div');
    newPeriod.className = 'period-input-group';
    newPeriod.style.marginTop = '15px';
    newPeriod.style.paddingTop = '15px';
    newPeriod.style.borderTop = '2px solid #e0e0e0';
    
    newPeriod.innerHTML = `
        <div class="form-grid">
            <div class="form-group">
                <label>Subject Name *</label>
                <input type="text" name="subject_${currentCount}" required placeholder="e.g., Chemistry">
            </div>
            <div class="form-group">
                <label>Start Time *</label>
                <input type="time" name="time_${currentCount}" required>
            </div>
            <div class="form-group">
                <label>Duration (minutes) *</label>
                <input type="number" name="duration_${currentCount}" required min="30" max="180" placeholder="e.g., 60">
            </div>
        </div>
        <button type="button" class="btn-delete" onclick="this.parentElement.remove()" style="margin-top: 10px; max-width: 150px;">Remove Period</button>
    `;
    
    container.appendChild(newPeriod);
}



function saveTimetable(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const eduLevel = formData.get('educationLevel');
    const className = formData.get('class');
    const stream = formData.get('stream');
    const day = formData.get('day');
    
    // Periods collect karo
    const periods = [];
    let index = 0;
    
    while (formData.get(`subject_${index}`) !== null) {
        periods.push({
            subject: formData.get(`subject_${index}`),
            time: formData.get(`time_${index}`),
            duration: parseInt(formData.get(`duration_${index}`))
        });
        index++;
    }
    
    // Validate - at least 1 period hona chahiye
    if (periods.length === 0) {
        alert('Please add at least one period!');
        return;
    }
    
    // classTimetable object mein save karo
    if (!classTimetable[eduLevel]) {
        classTimetable[eduLevel] = {};
    }
    if (!classTimetable[eduLevel][className]) {
        classTimetable[eduLevel][className] = {};
    }
    if (!classTimetable[eduLevel][className][stream]) {
        classTimetable[eduLevel][className][stream] = {};
    }
    
    // Save periods for this day
    classTimetable[eduLevel][className][stream][day] = periods;
    
    // Success message
    document.getElementById('timetableFormArea').innerHTML = `
        <div class="message success-message">
            ✅ Timetable created successfully!<br>
            ${eduLevel} > ${className} > ${stream} > ${day}<br>
            ${periods.length} period(s) added
        </div>
    `;
    
    setTimeout(() => {
        document.getElementById('timetableFormArea').innerHTML = '';
    }, 3000);
}


function showViewTimetables() {
    const formArea = document.getElementById('timetableFormArea');
    
    // Check if koi timetable hai ya nahi
    if (Object.keys(classTimetable).length === 0) {
        formArea.innerHTML = `
            <div class="form-container active">
                <div class="form-header">
                    <h2>All Timetables</h2>
                    <button class="back-btn" onclick="document.getElementById('timetableFormArea').innerHTML=''">← Back</button>
                </div>
                <div class="empty-state">
                    <h3>No Timetables Created</h3>
                    <p>Create your first timetable to get started</p>
                </div>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="form-container active">
            <div class="form-header">
                <h2>All Class Timetables</h2>
                <button class="back-btn" onclick="document.getElementById('timetableFormArea').innerHTML=''">← Back</button>
            </div>
    `;
    
    // Loop through all timetables
    Object.keys(classTimetable).forEach(eduLevel => {
        html += `<div style="margin-bottom: 30px;">`;
        html += `<h3 style="color: #667eea; font-size: 22px; margin-bottom: 15px;">🎓 ${eduLevel}</h3>`;
        
        Object.keys(classTimetable[eduLevel]).forEach(className => {
            Object.keys(classTimetable[eduLevel][className]).forEach(stream => {
                const schedules = classTimetable[eduLevel][className][stream];
                
                html += `
                    <div class="salary-card" style="margin-bottom: 20px;">
                        <h3>📚 ${className} - ${stream}</h3>
                        <div class="timetable-container" style="background: white; padding: 20px; border-radius: 12px; margin-top: 15px;">
                `;
                
                // Days ke liye loop
                const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                days.forEach(day => {
                    if (schedules[day] && schedules[day].length > 0) {
                        html += `
                            <div class="day-schedule">
                                <h3>${day}</h3>
                                <div class="periods-list">
                                    ${schedules[day].map(period => `
                                        <div class="period-card">
                                            <strong>${period.subject}</strong>
                                            <span>${period.time} (${period.duration} mins)</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    }
                });
                
                html += `
                        </div>
                    </div>
                `;
            });
        });
        
        html += `</div>`;
    });
    
    html += '</div>';
    formArea.innerHTML = html;
}

function showModifyTimetable() {
    const formArea = document.getElementById('timetableFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Modify Timetable</h2>
                <button class="back-btn" onclick="document.getElementById('timetableFormArea').innerHTML=''">← Back</button>
            </div>
            
            <div class="form-section">
                <h3>Select Timetable to Modify</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Education Level *</label>
                        <select id="modifyEduLevel" onchange="loadModifyClasses()">
                            <option value="">Select Education Level</option>
                            ${Object.keys(classTimetable).map(level => 
                                `<option value="${level}">${level}</option>`
                            ).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Class *</label>
                        <select id="modifyClass" onchange="loadModifyStreams()" disabled>
                            <option value="">Select Education Level First</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Stream *</label>
                        <select id="modifyStream" onchange="loadModifyDays()" disabled>
                            <option value="">Select Class First</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Day *</label>
                        <select id="modifyDay" onchange="loadTimetableForEdit()" disabled>
                            <option value="">Select Stream First</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div id="modifyTimetableArea"></div>
        </div>
    `;
}

function loadModifyClasses() {
    const eduLevel = document.getElementById('modifyEduLevel').value;
    const classSelect = document.getElementById('modifyClass');
    const streamSelect = document.getElementById('modifyStream');
    const daySelect = document.getElementById('modifyDay');
    
    classSelect.innerHTML = '<option value="">Select Class</option>';
    streamSelect.innerHTML = '<option value="">Select Class First</option>';
    daySelect.innerHTML = '<option value="">Select Stream First</option>';
    classSelect.disabled = true;
    streamSelect.disabled = true;
    daySelect.disabled = true;
    
    if (!eduLevel) return;
    
    Object.keys(classTimetable[eduLevel] || {}).forEach(className => {
        classSelect.innerHTML += `<option value="${className}">${className}</option>`;
    });
    classSelect.disabled = false;
}

function loadModifyStreams() {
    const eduLevel = document.getElementById('modifyEduLevel').value;
    const className = document.getElementById('modifyClass').value;
    const streamSelect = document.getElementById('modifyStream');
    const daySelect = document.getElementById('modifyDay');
    
    streamSelect.innerHTML = '<option value="">Select Stream</option>';
    daySelect.innerHTML = '<option value="">Select Stream First</option>';
    streamSelect.disabled = true;
    daySelect.disabled = true;
    
    if (!eduLevel || !className) return;
    
    Object.keys(classTimetable[eduLevel][className] || {}).forEach(stream => {
        streamSelect.innerHTML += `<option value="${stream}">${stream}</option>`;
    });
    streamSelect.disabled = false;
}

function loadModifyDays() {
    const eduLevel = document.getElementById('modifyEduLevel').value;
    const className = document.getElementById('modifyClass').value;
    const stream = document.getElementById('modifyStream').value;
    const daySelect = document.getElementById('modifyDay');
    
    daySelect.innerHTML = '<option value="">Select Day</option>';
    daySelect.disabled = true;
    
    if (!eduLevel || !className || !stream) return;
    
    const schedules = classTimetable[eduLevel][className][stream];
    Object.keys(schedules || {}).forEach(day => {
        daySelect.innerHTML += `<option value="${day}">${day}</option>`;
    });
    daySelect.disabled = false;
}

function loadTimetableForEdit() {
    const eduLevel = document.getElementById('modifyEduLevel').value;
    const className = document.getElementById('modifyClass').value;
    const stream = document.getElementById('modifyStream').value;
    const day = document.getElementById('modifyDay').value;
    const modifyArea = document.getElementById('modifyTimetableArea');
    
    if (!eduLevel || !className || !stream || !day) {
        modifyArea.innerHTML = '';
        return;
    }
    
    const periods = classTimetable[eduLevel][className][stream][day] || [];
    
    if (periods.length === 0) {
        modifyArea.innerHTML = '<div class="message error-message-box">No periods found for this day</div>';
        return;
    }
    
    let html = `
        <div class="form-section" style="margin-top: 25px;">
            <h3>Edit Periods - ${day}</h3>
            <form onsubmit="updateTimetable(event, '${eduLevel}', '${className}', '${stream}', '${day}')">
                <div id="editPeriodsContainer">
    `;
    
    periods.forEach((period, index) => {
        html += `
            <div class="period-input-group" style="${index > 0 ? 'margin-top: 15px; padding-top: 15px; border-top: 2px solid #e0e0e0;' : ''}">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Subject Name *</label>
                        <input type="text" name="subject_${index}" value="${period.subject}" required>
                    </div>
                    <div class="form-group">
                        <label>Start Time *</label>
                        <input type="time" name="time_${index}" value="${period.time}" required>
                    </div>
                    <div class="form-group">
                        <label>Duration (minutes) *</label>
                        <input type="number" name="duration_${index}" value="${period.duration}" required min="30" max="180">
                    </div>
                </div>
                ${index > 0 ? '<button type="button" class="btn-delete" onclick="this.parentElement.remove()" style="margin-top: 10px; max-width: 150px;">Remove Period</button>' : ''}
            </div>
        `;
    });
    
    html += `
                </div>
                <button type="button" class="btn-secondary" onclick="addEditPeriodField()" style="margin-top: 15px; max-width: 200px;">+ Add Period</button>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Update Timetable</button>
                    <button type="button" class="btn-delete" onclick="deleteTimetable('${eduLevel}', '${className}', '${stream}', '${day}')">Delete This Day</button>
                </div>
            </form>
        </div>
    `;
    
    modifyArea.innerHTML = html;
}

function addEditPeriodField() {
    const container = document.getElementById('editPeriodsContainer');
    const currentCount = container.children.length;
    
    const newPeriod = document.createElement('div');
    newPeriod.className = 'period-input-group';
    newPeriod.style.marginTop = '15px';
    newPeriod.style.paddingTop = '15px';
    newPeriod.style.borderTop = '2px solid #e0e0e0';
    
    newPeriod.innerHTML = `
        <div class="form-grid">
            <div class="form-group">
                <label>Subject Name *</label>
                <input type="text" name="subject_${currentCount}" required>
            </div>
            <div class="form-group">
                <label>Start Time *</label>
                <input type="time" name="time_${currentCount}" required>
            </div>
            <div class="form-group">
                <label>Duration (minutes) *</label>
                <input type="number" name="duration_${currentCount}" required min="30" max="180">
            </div>
        </div>
        <button type="button" class="btn-delete" onclick="this.parentElement.remove()" style="margin-top: 10px; max-width: 150px;">Remove Period</button>
    `;
    
    container.appendChild(newPeriod);
}

function updateTimetable(event, eduLevel, className, stream, day) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const periods = [];
    let index = 0;
    
    while (formData.get(`subject_${index}`) !== null) {
        periods.push({
            subject: formData.get(`subject_${index}`),
            time: formData.get(`time_${index}`),
            duration: parseInt(formData.get(`duration_${index}`))
        });
        index++;
    }
    
    if (periods.length === 0) {
        alert('Please add at least one period!');
        return;
    }
    
    // Update timetable
    classTimetable[eduLevel][className][stream][day] = periods;
    
    document.getElementById('modifyTimetableArea').innerHTML = `
        <div class="message success-message">
            ✅ Timetable updated successfully!<br>
            ${periods.length} period(s) saved
        </div>
    `;
    
    setTimeout(() => {
        loadTimetableForEdit();
    }, 2000);
}

function deleteTimetable(eduLevel, className, stream, day) {
    if (confirm(`Delete timetable for ${day}?`)) {
        delete classTimetable[eduLevel][className][stream][day];
        
        document.getElementById('modifyTimetableArea').innerHTML = `
            <div class="message success-message">
                ✅ Timetable deleted successfully!
            </div>
        `;
        
        setTimeout(() => {
            showModifyTimetable();
        }, 2000);
    }
}

function saveTimetable(event) {
    // Save timetable to classTimetable object
    // Structure: classTimetable[level][class][stream][day] = [periods array]
}

// ==========================================
// LIBRARY MANAGEMENT MODULE
// ==========================================

let books = [];

function showLibrarySubmenu() {
    const mainContent = document.getElementById('mainContent');
    const canManage = currentUser.type === 'administrative' || currentUser.type === 'library';
    
    mainContent.innerHTML = `
        <div class="submenu-grid">
            ${canManage ? `
                <button class="submenu-btn" onclick="showAddBookForm()">➕ Add Book</button>
                <button class="submenu-btn" onclick="showIssueBook()">📤 Issue Book</button>
                <button class="submenu-btn" onclick="showReturnBook()">📥 Return Book</button>
            ` : ''}
            <button class="submenu-btn" onclick="displayAllBooks()">📋 All Books</button>
            <button class="submenu-btn" onclick="showSearchBook()">🔍 Search Book</button>
            ${canManage ? `
                <button class="submenu-btn" onclick="showIssuedBooks()">📊 Issued Books</button>
                <button class="submenu-btn" onclick="showDeleteBook()">🗑️ Delete Book</button>
            ` : ''}
        </div>
        <div id="libraryFormArea"></div>
    `;
}

function showAddBookForm() {
    const formArea = document.getElementById('libraryFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Add New Book</h2>
                <button class="back-btn" onclick="document.getElementById('libraryFormArea').innerHTML=''">← Back</button>
            </div>
            <form onsubmit="addBook(event)" id="bookForm">
                <div class="form-section">
                    <h3>Book Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Book ID *</label>
                            <input type="text" name="bookId" required placeholder="e.g., LIB001">
                        </div>

                        <div class="form-group">
                            <label>Book Title *</label>
                            <input type="text" name="title" required>
                        </div>
                        <div class="form-group">
                            <label>Author Name *</label>
                            <input type="text" name="author" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Category *</label>
                            <select name="category" required>
                                <option value="">Select Category</option>
                                <option value="Science">Science</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Commerce">Commerce</option>
                                <option value="Economics">Economics</option>
                                <option value="History">History</option>
                                <option value="English">English</option>
                                <option value="Literature">Literature</option>
                                <option value="Reference">Reference</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Total Copies *</label>
                            <input type="number" name="totalCopies" min="1" required value="1">
                        </div>

                    </div>

                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Add Book</button>
                    <button type="button" class="btn-secondary" onclick="document.getElementById('bookForm').reset(); document.getElementById('libraryFormArea').innerHTML=''">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function addBook(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const book = Object.fromEntries(formData);

    if (books.find(b => b.bookId === book.bookId)) {
        alert('Book ID already exists!');
        return;
    }

    book.availableCopies = parseInt(book.totalCopies);
    book.issuedTo = [];
    book.addedDate = new Date().toISOString().split('T')[0];

    books.push(book);

    document.getElementById('libraryFormArea').innerHTML = `
        <div class="message success-message">✅ Book added successfully! Book ID: ${book.bookId}</div>
    `;

    setTimeout(() => { 
        document.getElementById('libraryFormArea').innerHTML = ''; 
    }, 3000);
}

function showSearchBook() {
    const formArea = document.getElementById('libraryFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Search Book</h2>
                <button class="back-btn" onclick="document.getElementById('libraryFormArea').innerHTML=''">← Back</button>
            </div>
            <div class="form-grid" style="max-width: 800px;">
                <div class="form-group">
                    <label>Search by Book ID</label>
                    <input type="text" id="searchBookId" placeholder="Enter book ID">
                </div>
                <div class="form-group">
                    <label>Search by Title</label>
                    <input type="text" id="searchBookTitle" placeholder="Enter book title">
                </div>
                <div class="form-group">
                    <label>Search by Author</label>
                    <input type="text" id="searchBookAuthor" placeholder="Enter author name">
                </div>
            </div>
            <button class="btn-primary" onclick="searchBook()" style="max-width: 200px; margin-top: 15px;">Search</button>
            <div id="searchBookResult" style="margin-top: 25px;"></div>
        </div>
    `;
}

function searchBook() {
    const bookId = document.getElementById('searchBookId').value.trim().toLowerCase();
    const title = document.getElementById('searchBookTitle').value.trim().toLowerCase();
    const author = document.getElementById('searchBookAuthor').value.trim().toLowerCase();
    const resultDiv = document.getElementById('searchBookResult');

    if (!bookId && !title && !author) {
        resultDiv.innerHTML = '<div class="message error-message-box">Please enter at least one search criteria</div>';
        return;
    }

    const results = books.filter(book => {
        const matchId = !bookId || book.bookId.toLowerCase().includes(bookId);
        const matchTitle = !title || book.title.toLowerCase().includes(title);
        const matchAuthor = !author || book.author.toLowerCase().includes(author);
        return matchId && matchTitle && matchAuthor;
    });

    if (results.length > 0) {
        let html = '<div class="records-list">';
        results.forEach(book => { 
            html += renderBookCard(book); 
        });
        html += '</div>';
        resultDiv.innerHTML = html;
    } else {
        resultDiv.innerHTML = '<div class="message error-message-box">No books found</div>';
    }
}

function renderBookCard(book, showActions = false) {
    const canManage = currentUser.type === 'administrative' || currentUser.type === 'library';
    return `
        <div class="record-card">
            <div class="record-header">
                <h3>${book.title} (${book.bookId})</h3>
                ${showActions && canManage ? `
                    <div class="record-actions">
                        <button class="btn-delete" onclick="deleteBookConfirm('${book.bookId}')">Delete</button>
                    </div>
                ` : ''}
            </div>
            <div class="record-details">

            </div>
        </div>
    `;
}

function displayAllBooks() {
    const formArea = document.getElementById('libraryFormArea');

    if (books.length === 0) {
        formArea.innerHTML = `
            <div class="form-container active">
                <div class="form-header">
                    <h2>All Books</h2>
                    <button class="back-btn" onclick="document.getElementById('libraryFormArea').innerHTML=''">← Back</button>
                </div>
                <div class="empty-state">
                    <h3>No Books Found</h3>
                    <p>Add your first book to get started</p>
                </div>
            </div>
        `;
        return;
    }

    let html = `
        <div class="form-container active">
            <div class="form-header">
                <h2>All Books (${books.length})</h2>
                <button class="back-btn" onclick="document.getElementById('libraryFormArea').innerHTML=''">← Back</button>
            </div>
            <div class="records-list">
    `;

    books.forEach(book => { 
        html += renderBookCard(book, true); 
    });

    html += '</div></div>';
    formArea.innerHTML = html;
}

function showIssueBook() {
    const formArea = document.getElementById('libraryFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Issue Book</h2>
                <button class="back-btn" onclick="document.getElementById('libraryFormArea').innerHTML=''">← Back</button>
            </div>
            <form onsubmit="issueBook(event)">
                <div class="form-section">
                    <h3>Issue Details</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Book ID *</label>
                            <input type="text" name="bookId" required placeholder="Enter book ID">
                        </div>
                        <div class="form-group">
                            <label>Student Roll Number *</label>
                            <input type="text" name="rollNo" required placeholder="Enter student roll number">
                        </div>
                        <div class="form-group">
                            <label>Issue Date *</label>
                            <input type="date" name="issueDate" required value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-group">
                            <label>Due Date *</label>
                            <input type="date" name="dueDate" required>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Issue Book</button>
                    <button type="button" class="btn-secondary" onclick="document.getElementById('libraryFormArea').innerHTML=''">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function issueBook(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const issueData = Object.fromEntries(formData);

    const book = books.find(b => b.bookId === issueData.bookId);
    if (!book) { 
        alert('Book ID not found!'); 
        return; 
    }
    if (book.availableCopies <= 0) { 
        alert('No copies available for this book!'); 
        return; 
    }

    const student = students.find(s => s.rollNo === issueData.rollNo);
    if (!student) { 
        alert('Student roll number not found!'); 
        return; 
    }

    book.availableCopies--;
    book.issuedTo.push({ 
        rollNo: issueData.rollNo, 
        studentName: student.studentName, 
        issueDate: issueData.issueDate, 
        dueDate: issueData.dueDate, 
        returned: false 
    });

    document.getElementById('libraryFormArea').innerHTML = `
        <div class="message success-message">
            ✅ Book issued successfully to ${student.studentName} (${issueData.rollNo})!
        </div>
    `;

    setTimeout(() => { 
        document.getElementById('libraryFormArea').innerHTML = ''; 
    }, 3000);
}

function showReturnBook() {
    const formArea = document.getElementById('libraryFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Return Book</h2>
                <button class="back-btn" onclick="document.getElementById('libraryFormArea').innerHTML=''">← Back</button>
            </div>
            <form onsubmit="returnBook(event)">
                <div class="form-section">
                    <h3>Return Details</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Book ID *</label>
                            <input type="text" name="bookId" required placeholder="Enter book ID">
                        </div>
                        <div class="form-group">
                            <label>Student Roll Number *</label>
                            <input type="text" name="rollNo" required placeholder="Enter student roll number">
                        </div>
                        <div class="form-group">
                            <label>Return Date *</label>
                            <input type="date" name="returnDate" required value="${new Date().toISOString().split('T')[0]}">
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Return Book</button>
                    <button type="button" class="btn-secondary" onclick="document.getElementById('libraryFormArea').innerHTML=''">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function returnBook(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const returnData = Object.fromEntries(formData);

    const book = books.find(b => b.bookId === returnData.bookId);
    if (!book) { 
        alert('Book ID not found!'); 
        return; 
    }

    const issueRecord = book.issuedTo.find(i => i.rollNo === returnData.rollNo && !i.returned);
    if (!issueRecord) { 
        alert('No active issue record found for this student!'); 
        return; 
    }

    issueRecord.returned = true;
    issueRecord.returnDate = returnData.returnDate;
    book.availableCopies++;

    document.getElementById('libraryFormArea').innerHTML = `
        <div class="message success-message">
            ✅ Book returned successfully from ${issueRecord.studentName}!
        </div>
    `;

    setTimeout(() => { 
        document.getElementById('libraryFormArea').innerHTML = ''; 
    }, 3000);
}

function showIssuedBooks() {
    const formArea = document.getElementById('libraryFormArea');
    const issuedBooks = books.filter(book => book.issuedTo.some(issue => !issue.returned));

    if (issuedBooks.length === 0) {
        formArea.innerHTML = `
            <div class="form-container active">
                <div class="form-header">
                    <h2>Currently Issued Books</h2>
                    <button class="back-btn" onclick="document.getElementById('libraryFormArea').innerHTML=''">← Back</button>
                </div>
                <div class="empty-state">
                    <h3>No Issued Books</h3>
                    <p>All books are currently available</p>
                </div>
            </div>
        `;
        return;
    }

    let html = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Currently Issued Books</h2>
                <button class="back-btn" onclick="document.getElementById('libraryFormArea').innerHTML=''">← Back</button>
            </div>
            <div class="records-list">
    `;

    issuedBooks.forEach(book => {
        const activeIssues = book.issuedTo.filter(i => !i.returned);
        html += `
            <div class="record-card">
                <div class="record-header">
                    <h3>${book.title} (${book.bookId})</h3>
                </div>
                <div class="record-details">
                    <div class="record-field"><strong>Author:</strong> <span>${book.author}</span></div>
                    <div class="record-field"><strong>Category:</strong> <span>${book.category}</span></div>
                    <div class="record-field" style="grid-column: 1 / -1;">
                        <strong>Currently Issued To:</strong>
                        <div style="margin-top: 10px;">
        `;
        
        activeIssues.forEach(issue => {
            const isOverdue = new Date(issue.dueDate) < new Date();
            html += `
                <div style="padding: 10px; background: ${isOverdue ? '#fee' : '#f8f9fa'}; border-radius: 8px; margin-bottom: 8px;">
                    <strong>${issue.studentName}</strong> (${issue.rollNo})<br>
                    Issue Date: ${issue.issueDate} | Due Date: <span style="color: ${isOverdue ? '#e74c3c' : '#27ae60'}">${issue.dueDate}</span>
                    ${isOverdue ? ' <strong style="color: #e74c3c;">(OVERDUE)</strong>' : ''}
                </div>
            `;
        });
        
        html += `
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div></div>';
    formArea.innerHTML = html;
}

function showDeleteBook() {
    const formArea = document.getElementById('libraryFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Delete Book</h2>
                <button class="back-btn" onclick="document.getElementById('libraryFormArea').innerHTML=''">← Back</button>
            </div>
            <div class="form-group" style="max-width: 400px;">
                <label>Enter Book ID</label>
                <input type="text" id="deleteBookId" placeholder="Enter book ID">
            </div>
            <button class="btn-primary" onclick="deleteBookConfirm(document.getElementById('deleteBookId').value)" style="max-width: 200px; margin-top: 15px; background: #e74c3c;">Delete Book</button>
            <div id="deleteBookResult" style="margin-top: 25px;"></div>
        </div>
    `;
}

function deleteBookConfirm(bookId) {
    if (!bookId) {
        const resultDiv = document.getElementById('deleteBookResult');
        if (resultDiv) {
            resultDiv.innerHTML = '<div class="message error-message-box">Please enter a book ID</div>';
        }
        return;
    }

    const book = books.find(b => b.bookId === bookId);
    if (!book) {
        const resultDiv = document.getElementById('deleteBookResult');
        if (resultDiv) { 
            resultDiv.innerHTML = '<div class="message error-message-box">Book not found</div>'; 
        }
        return;
    }

    const hasActiveIssues = book.issuedTo.some(i => !i.returned);
    if (hasActiveIssues) { 
        alert('Cannot delete book! It has active issue records. Please return all copies first.'); 
        return; 
    }

    if (confirm(`Are you sure you want to delete book "${book.title}" (${bookId})?`)) {
        const index = books.findIndex(b => b.bookId === bookId);
        books.splice(index, 1);
        
        const formArea = document.getElementById('libraryFormArea');
        formArea.innerHTML = `
            <div class="message success-message">
                ✅ Book deleted successfully!
            </div>
        `;
        
        setTimeout(() => { 
            formArea.innerHTML = ''; 
        }, 2000);
    }
}

function showMyIssuedBooks() {
    const mainContent = document.getElementById('mainContent');

    if (!currentUser.data) {
        mainContent.innerHTML = `
            <div class="message error-message-box">
                Unable to load your book records. Please contact administration.
            </div>
        `;
        return;
    }

    const myBooks = books.filter(book => 
        book.issuedTo.some(issue => issue.rollNo === currentUser.username && !issue.returned)
    );

    if (myBooks.length === 0) {
        mainContent.innerHTML = `
            <div class="empty-state">
                <h3>No Books Issued</h3>
                <p>You haven't issued any books currently. Visit the library to issue books.</p>
            </div>
        `;
        return;
    }

    let html = '<div class="records-list">';

    myBooks.forEach(book => {
        const myIssue = book.issuedTo.find(i => i.rollNo === currentUser.username && !i.returned);
        const isOverdue = new Date(myIssue.dueDate) < new Date();
        const today = new Date();
        const dueDate = new Date(myIssue.dueDate);
        const daysRemaining = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        
        html += `
            <div class="record-card" style="border-left: 5px solid ${isOverdue ? '#e74c3c' : '#27ae60'};">
                <div class="record-header">
                    <h3>${book.title}</h3>
                    ${isOverdue ? 
                        '<span style="background: #e74c3c; color: white; padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 600;">⚠️ OVERDUE</span>' : 
                        daysRemaining <= 3 ? 
                        '<span style="background: #f39c12; color: white; padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 600;">⏰ DUE SOON</span>' :
                        '<span style="background: #27ae60; color: white; padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 600;">✓ ACTIVE</span>'
                    }
                </div>
                <div class="record-details">
                    <div class="record-field">
                        <strong>Book ID:</strong> 
                        <span>${book.bookId}</span>
                    </div>
                    <div class="record-field">
                        <strong>Author:</strong> 
                        <span>${book.author}</span>
                    </div>
                    <div class="record-field">
                        <strong>Category:</strong> 
                        <span>${book.category}</span>
                    </div>
                    <div class="record-field">
                        <strong>Issue Date:</strong> 
                        <span>${myIssue.issueDate}</span>
                    </div>
                    <div class="record-field">
                        <strong>Due Date:</strong> 
                        <span style="color: ${isOverdue ? '#e74c3c' : daysRemaining <= 3 ? '#f39c12' : '#27ae60'}; font-weight: 600;">
                            ${myIssue.dueDate}
                        </span>
                    </div>
                    <div class="record-field">
                        <strong>Days ${isOverdue ? 'Overdue' : 'Remaining'}:</strong> 
                        <span style="color: ${isOverdue ? '#e74c3c' : daysRemaining <= 3 ? '#f39c12' : '#27ae60'}; font-weight: 600;">
                            ${Math.abs(daysRemaining)} days
                        </span>
                    </div>
                    ${isOverdue ? `
                        <div class="record-field" style="grid-column: 1/-1;">
                            <div style="background: #fee; padding: 15px; border-radius: 8px; border-left: 4px solid #e74c3c;">
                                <strong style="color: #e74c3c;">⚠️ OVERDUE NOTICE:</strong>
                                <p style="margin-top: 5px; color: #721c24;">This book is overdue by ${Math.abs(daysRemaining)} days. Please return it to the library immediately to avoid penalties.</p>
                            </div>
                        </div>
                    ` : daysRemaining <= 3 ? `
                        <div class="record-field" style="grid-column: 1/-1;">
                            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #f39c12;">
                                <strong style="color: #856404;">⏰ REMINDER:</strong>
                                <p style="margin-top: 5px; color: #856404;">This book is due in ${daysRemaining} days. Please plan to return it on time.</p>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    });

    html += '</div>';

    const overdueCount = myBooks.filter(book => {
        const issue = book.issuedTo.find(i => i.rollNo === currentUser.username && !i.returned);
        return new Date(issue.dueDate) < new Date();
    }).length;

    const summaryHtml = `
        <div class="salary-card" style="margin-bottom: 25px;">
            <h3>📚 My Library Summary</h3>
            <div class="salary-breakdown">
                <div class="salary-row">
                    <span>Total Books Issued:</span>
                    <strong>${myBooks.length}</strong>
                </div>
                <div class="salary-row">
                    <span>Books Overdue:</span>
                    <strong style="color: ${overdueCount > 0 ? '#e74c3c' : '#27ae60'}">${overdueCount}</strong>
                </div>
                <div class="salary-row">
                    <span>Books On Time:</span>
                    <strong style="color: #27ae60">${myBooks.length - overdueCount}</strong>
                </div>
            </div>
        </div>
    `;

    mainContent.innerHTML = summaryHtml + html;
}


// ==========================================
// NOTICE BOARD MODULE
// ==========================================

let notices = [];

function showNoticeBoard() {
    const mainContent = document.getElementById('mainContent');
    const canManage = currentUser.type === 'administrative' || currentUser.type === 'library';
    
    mainContent.innerHTML = `
        ${canManage ? `
            <div class="submenu-grid">
                <button class="submenu-btn" onclick="showAddNoticeForm()">➕ Add Notice</button>
                <button class="submenu-btn" onclick="showDeleteNotice()">🗑️ Delete Notice</button>
            </div>
        ` : ''}
        <div id="noticeFormArea"></div>
        <div id="noticesDisplay">${displayNotices()}</div>
    `;
}

function showAddNoticeForm() {
    const formArea = document.getElementById('noticeFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Add New Notice</h2>
                <button class="back-btn" onclick="document.getElementById('noticeFormArea').innerHTML=''">← Back</button>
            </div>
            <form onsubmit="addNotice(event)">
                <div class="form-section">
                    <h3>Notice Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Category *</label>
                            <select name="category" required>
                                <option value="">Select Category</option>
                                <option value="Academic">Academic</option>
                                <option value="Examination">Examination</option>
                                <option value="Event">Event</option>
                                <option value="Holiday">Holiday</option>
                                <option value="General">General</option>
                                <option value="Admission">Admission</option>
                                <option value="Fee">Fee Related</option>
                                <option value="Sports">Sports & Cultural</option>
                            </select>
                        </div>
<div class="form-group">
    <label>Who Can View *</label>
    <select name="viewPermission" required>
        <option value="">Select Visibility</option>
        <option value="Everyone">Everyone (Public)</option>
        <option value="Students Only">Students Only</option>
        <option value="Staff Only">Staff Only</option>
        <option value="Admin Only">Admin Only</option>
    </select>
</div>
                        <div class="form-group">
                            <label>Date *</label>
                            <input type="date" name="date" required value="${new Date().toISOString().split('T')[0]}">
                        </div>
                    </div>
                   <div class="form-group">
                        <label>Notice Number *</label>
                        <input type="text" name="noticeNumber" required placeholder="Enter notice number (e.g., NOT-001)">
                    </div>
                    <div class="form-group">
                        <label>Notice Content *</label>
                        <textarea name="content" required rows="6" placeholder="Enter detailed notice content"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Posted By</label>
                        <input type="text" name="postedBy" value="${currentUser.name}" readonly>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Post Notice</button>
                    <button type="button" class="btn-secondary" onclick="document.getElementById('noticeFormArea').innerHTML=''">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function addNotice(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const notice = Object.fromEntries(formData);
     notice.noticeId = 'NOT' + Date.now();
    notice.timestamp = new Date().toISOString();
     notice.noticeId = 'NOT' + Date.now();
    notice.timestamp = new Date().toISOString();

    if (notices.find(n => n.noticeId === notice.noticeId)) { 
        alert('Notice ID already exists!'); 
        return; 
    }

    notice.timestamp = new Date().toISOString();
    notices.unshift(notice);

    document.getElementById('noticeFormArea').innerHTML = `
        <div class="message success-message">✅ Notice posted successfully!</div>
    `;

    setTimeout(() => {
        document.getElementById('noticeFormArea').innerHTML = '';
        document.getElementById('noticesDisplay').innerHTML = displayNotices();
    }, 2000);
}

function displayNotices() {
    if (notices.length === 0) {
        return `
            <div class="empty-state" style="margin-top: 30px;">
                <h3>No Notices</h3>
                <p>There are no notices to display</p>
            </div>
        `;
    }

    // Filter notices based on user type
    let filteredNotices = notices;
    if (currentUser.type === 'student') {
        filteredNotices = notices.filter(notice => {
            // Students can see: Everyone, Students Only, Mentee notices, and their class notices
            if (notice.viewPermission === 'Everyone' || notice.viewPermission === 'Students Only') {
                return true;
            }
            if (notice.noticeType === 'Mentee' && notice.viewPermission === 'Mentees Only') {
                return true; // Mentee logic - baad mein improve kar sakte ho
            }
            if (notice.noticeType === 'Class' && notice.targetClass === currentUser.data.class) {
                return true;
            }
            return false;
        });
    }

    if (filteredNotices.length === 0) {
        return `
            <div class="empty-state" style="margin-top: 30px;">
                <h3>No Notices</h3>
                <p>There are no notices for you at the moment</p>
            </div>
        `;
    }
    let html = '<div class="records-list" style="margin-top: 30px;">';

    filteredNotices.forEach(notice => {
        
        html += `
            <div class="record-card" style="border-left: 5px solid ${priorityColors[notice.priority]};">
                <div class="record-header">
                    <div>
                        <h3>${notice.noticeNumber}</h3>
                        <div style="display: flex; gap: 15px; margin-top: 8px; font-size: 13px; color: #666;">
                            <span style="background: ${priorityColors[notice.priority]}; color: white; padding: 4px 12px; border-radius: 12px; font-weight: 600;">${notice.priority} Priority</span>
                            <span style="background: #667eea; color: white; padding: 4px 12px; border-radius: 12px;">${notice.category}</span>
                            <span>📅 ${notice.date}</span>
                        </div>
                    </div>
                    ${(currentUser.type === 'administrative' || currentUser.type === 'library') ? `
                        <button class="btn-delete" onclick="deleteNoticeConfirm('${notice.noticeId}')">Delete</button>
                    ` : ''}
                </div>
                <div style="padding: 15px 0; white-space: pre-wrap; line-height: 1.6;">${notice.content}</div>
                <div style="padding-top: 15px; border-top: 1px solid #e0e0e0; font-size: 13px; color: #666;">
                    <strong>Posted by:</strong> ${notice.postedBy} | <strong>Notice ID:</strong> ${notice.noticeId}
                </div>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

function showDeleteNotice() {
    const formArea = document.getElementById('noticeFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Delete Notice</h2>
                <button class="back-btn" onclick="document.getElementById('noticeFormArea').innerHTML=''">← Back</button>
            </div>
            <div class="form-group" style="max-width: 400px;">
                <label>Enter Notice ID</label>
                <input type="text" id="deleteNoticeId" placeholder="Enter notice ID">
            </div>
            <button class="btn-primary" onclick="deleteNoticeConfirm(document.getElementById('deleteNoticeId').value)" style="max-width: 200px; margin-top: 15px; background: #e74c3c;">Delete Notice</button>
            <div id="deleteNoticeResult" style="margin-top: 25px;"></div>
        </div>
    `;
}

function deleteNoticeConfirm(noticeId) {
    if (!noticeId) {
        const resultDiv = document.getElementById('deleteNoticeResult');
        if (resultDiv) {
            resultDiv.innerHTML = '<div class="message error-message-box">Please enter a notice ID</div>';
        }
        return;
    }
    

    const notice = notices.find(n => n.noticeId === noticeId);
    if (!notice) {
        const resultDiv = document.getElementById('deleteNoticeResult');
        if (resultDiv) { 
            resultDiv.innerHTML = '<div class="message error-message-box">Notice not found</div>'; 
        }
        return;
    }

    if (confirm(`Are you sure you want to delete notice "${notice.noticeNumber}" (${noticeId})?`)) {
        const index = notices.findIndex(n => n.noticeId === noticeId);
        notices.splice(index, 1);
        
        document.getElementById('noticeFormArea').innerHTML = `
            <div class="message success-message">✅ Notice deleted successfully!</div>
        `;
        
        setTimeout(() => {
            document.getElementById('noticeFormArea').innerHTML = '';
            document.getElementById('noticesDisplay').innerHTML = displayNotices();
        }, 2000);
    }
}
    // ==========================================
// STUDENT PROFILE MODULE
// ==========================================

function showStudentProfile() {
    
    if (!currentUser.data) {
        document.getElementById('mainContent').innerHTML = `
            <div class="message error-message-box">
                Unable to load profile. Please contact administration.
            </div>
        `;
        return;
    }

    const student = students.find(s => s.rollNo === currentUser.username);
    if (!student) {
        document.getElementById('mainContent').innerHTML = `
            <div class="message error-message-box">
                Your profile was not found. Please contact administration.
            </div>
        `;
        return;
    }

    // Complete profile card with all fields
    document.getElementById('mainContent').innerHTML = `
        <div class="record-card">
            <div class="record-header">
                <h3>📋 My Profile</h3>
            </div>
            
            <!-- Basic Information -->
            <div style="margin-bottom: 25px;">
                <h4 style="color: #667eea; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #667eea;">🎓 Academic Information</h4>
                <div class="record-field">
    <strong>Section:</strong>
    <span>${student.section || 'Not Assigned'}</span>
</div>
<div class="record-field">
    <strong>Assigned Mentor:</strong>
    <span>${student.assignedStaff ? getStaffName(student.assignedStaff) : 'Not Assigned'}</span>
</div>
                <div class="record-details">
                    <div class="record-field">
                        <strong>Roll Number:</strong>
                        <span>${student.rollNo}</span>
                    </div>
                    <div class="record-field">
                        <strong>Education Level:</strong>
                        <span>${student.educationLevel}</span>
                    </div>
                    <div class="record-field">
                        <strong>Class:</strong>
                        <span>${student.class}</span>
                    </div>
                    <div class="record-field">
                        <strong>Stream:</strong>
                        <span>${student.stream}</span>
                    </div>
                    ${student.department ? `
                        <div class="record-field">
                            <strong>Department:</strong>
                            <span>${student.department}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <!-- Personal Information -->
            <div style="margin-bottom: 25px;">
                <h4 style="color: #667eea; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #667eea;">👤 Personal Information</h4>
                <div class="record-details">
                    <div class="record-field">
                        <strong>Student Name:</strong>
                        <span>${student.studentName}</span>
                    </div>
                    <div class="record-field">
                        <strong>Father's Name:</strong>
                        <span>${student.fatherName}</span>
                    </div>
                    <div class="record-field">
                        <strong>Mother's Name:</strong>
                        <span>${student.motherName}</span>
                    </div>
                    <div class="record-field">
                        <strong>Date of Birth:</strong>
                        <span>${student.dob || 'N/A'}</span>
                    </div>
                    <div class="record-field">
                        <strong>Gender:</strong>
                        <span>${student.gender || 'N/A'}</span>
                    </div>
                    <div class="record-field">
                        <strong>Blood Group:</strong>
                        <span>${student.bloodGroup || 'N/A'}</span>
                    </div>
                </div>
            </div>
            
            <!-- Contact Information -->
            <div style="margin-bottom: 25px;">
                <h4 style="color: #667eea; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #667eea;">📞 Contact Information</h4>
                <div class="record-details">
                    <div class="record-field">
                        <strong>Contact Number:</strong>
                        <span>${student.contactNo || 'N/A'}</span>
                    </div>
                    <div class="record-field">
                        <strong>Email:</strong>
                        <span>${student.email || 'N/A'}</span>
                    </div>
                    <div class="record-field">
                        <strong>Address:</strong>
                        <span>${student.address || 'N/A'}</span>
                    </div>
                </div>
            </div>
            
            <!-- Fee Information -->
            <div>
                <h4 style="color: #667eea; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #667eea;">💰 Fee Information</h4>
                <div class="record-details">
                    <div class="record-field">
                        <strong>Total Fees:</strong>
                        <span>₹${student.totalFees || 0}</span>
                    </div>
                    <div class="record-field">
                        <strong>Paid Fees:</strong>
                        <span style="color: #27ae60; font-weight: 600;">₹${student.paidFees || 0}</span>
                    </div>
                    <div class="record-field">
                        <strong>Pending Fees:</strong>
                        <span style="color: ${(student.totalFees || 0) - (student.paidFees || 0) > 0 ? '#e74c3c' : '#27ae60'}; font-weight: 600;">₹${(student.totalFees || 0) - (student.paidFees || 0)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}


// ==========================================
// ATTENDANCE MODULE
// ==========================================

function showStudentAttendance() {
    const mainContent = document.getElementById('mainContent');
    
    // Filter attendance for current student
    const myAttendance = attendance.filter(a => a.rollNo === currentUser.username);
    
    if (myAttendance.length === 0) {
        mainContent.innerHTML = `
            <div class="empty-state">
                <h3>No Attendance Records</h3>
                <p>Your attendance has not been marked yet.</p>
            </div>
        `;
        return;
    }
    
    // Calculate statistics
    const totalClasses = myAttendance.length;
    const present = myAttendance.filter(a => a.status === 'Present').length;
    const absent = myAttendance.filter(a => a.status === 'Absent').length;
    const leave = myAttendance.filter(a => a.status === 'Leave').length;
    const percentage = totalClasses > 0 ? Math.round((present / totalClasses) * 100) : 0;

    mainContent.innerHTML = `
        <div class="salary-card" style="margin-bottom: 25px;">
            <h3>📅 Attendance Summary</h3>
            <div class="salary-breakdown">
                <div class="salary-row">
                    <span>Total Classes:</span>
                    <strong>${totalClasses}</strong>
                </div>
                <div class="salary-row">
                    <span>Present:</span>
                    <strong style="color: #27ae60">${present}</strong>
                </div>
                <div class="salary-row">
                    <span>Absent:</span>
                    <strong style="color: #e74c3c">${absent}</strong>
                </div>
                <div class="salary-row">
                    <span>Leave:</span>
                    <strong style="color: #f39c12">${leave}</strong>
                </div>
                <div class="salary-row total">
                    <span>Attendance Percentage:</span>
                    <strong>${percentage}%</strong>
                </div>
            </div>
        </div>
        
        <div class="form-container active">
            <div class="form-header">
                <h2>Date-wise Attendance Records</h2>
            </div>
            <div class="records-list">
                ${myAttendance.map(record => `
                    <div class="record-card" style="border-left: 5px solid ${
                        record.status === 'Present' ? '#27ae60' : 
                        record.status === 'Absent' ? '#e74c3c' : '#f39c12'
                    };">
                        <div class="record-details">
                            <div class="record-field">
                                <strong>Date:</strong>
                                <span>${record.date}</span>
                            </div>
                            <div class="record-field">
                                <strong>Status:</strong>
                                <span style="color: ${
                                    record.status === 'Present' ? '#27ae60' : 
                                    record.status === 'Absent' ? '#e74c3c' : '#f39c12'
                                }; font-weight: 600;">${record.status}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}



// ==========================================
// STAFF PROFILE MODULE
// ==========================================

function showStaffProfile() {
    if (!currentUser.data) {
        document.getElementById('mainContent').innerHTML = `
            <div class="message error-message-box">
                Unable to load profile. Please contact administration.
            </div>
        `;
        return;
    }

    const staffMember = staff.find(s => s.staffId === currentUser.username);
    if (!staffMember) {
        document.getElementById('mainContent').innerHTML = `
            <div class="message error-message-box">
                Your profile was not found. Please contact administration.
            </div>
        `;
        return;
    }

    // Custom profile card - only show specific fields
    document.getElementById('mainContent').innerHTML = `
        <div class="record-card">
            <div class="record-header">
                <h3>My Profile</h3>
            </div>
            <div class="record-details">
                <div class="record-field">
                    <strong>Staff ID:</strong>
                    <span>${staffMember.staffId}</span>
                </div>
                <div class="record-field">
                    <strong>Full Name:</strong>
                    <span>${staffMember.fullName}</span>
                </div>
                <div class="record-field">
                    <strong>Designation:</strong>
                    <span>${staffMember.designation}</span>
                </div>
                <div class="record-field">
                    <strong>Qualification:</strong>
                    <span>${staffMember.qualification || 'N/A'}</span>
                </div>
                <div class="record-field">
                    <strong>Joining Date:</strong>
                    <span>${staffMember.joiningDate || 'N/A'}</span>
                </div>
                <div class="record-field">
                    <strong>Contact Number:</strong>
                    <span>${staffMember.contactNo}</span>
                </div>
                <div class="record-field">
                    <strong>Email:</strong>
                    <span>${staffMember.email}</span>
                </div>
            </div>
        </div>
    `;
}


// ==========================================
// STAFF POST NOTICE MODULE
// ==========================================

function showStaffPostNotice() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="submenu-grid">
            <button class="submenu-btn" onclick="showPostMenteeNotice()">👥 Post for Mentees</button>
            <button class="submenu-btn" onclick="showPostClassNotice()">🎓 Post for Class Students</button>
        </div>
        <div id="noticePostArea"></div>
    `;
}

function showPostMenteeNotice() {
    const formArea = document.getElementById('noticePostArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Post Notice for Mentees</h2>
                <button class="back-btn" onclick="document.getElementById('noticePostArea').innerHTML=''">← Back</button>
            </div>
            <form onsubmit="postMenteeNotice(event)">
                <div class="form-section">
                    <h3>Notice Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Category *</label>
                            <select name="category" required>
                                <option value="">Select Category</option>
                                <option value="Academic">Academic</option>
                                <option value="Examination">Examination</option>
                                <option value="Event">Event</option>
                                <option value="General">General</option>
                                <option value="Mentorship">Mentorship</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Priority *</label>
                            <select name="priority" required>
                                <option value="">Select Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Date *</label>
                            <input type="date" name="date" required value="${new Date().toISOString().split('T')[0]}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Notice Number *</label>
                        <input type="text" name="noticeNumber" required placeholder="Enter notice number (e.g., NOT-001)">
                    </div>
                    <div class="form-group">
                        <label>Notice Content *</label>
                        <textarea name="content" required rows="6" placeholder="Enter detailed notice content"></textarea>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Post Notice to Mentees</button>
                    <button type="button" class="btn-secondary" onclick="document.getElementById('noticePostArea').innerHTML=''">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function showPostClassNotice() {
    const formArea = document.getElementById('noticePostArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Post Notice for Class Students</h2>
                <button class="back-btn" onclick="document.getElementById('noticePostArea').innerHTML=''">← Back</button>
            </div>
            <form onsubmit="postClassNotice(event)">
                <div class="form-section">
                    <h3>Notice Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Select Class *</label>
                            <select name="targetClass" required>
                                <option value="">Select Class</option>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Category *</label>
                            <select name="category" required>
                                <option value="">Select Category</option>
                                <option value="Academic">Academic</option>
                                <option value="Examination">Examination</option>
                                <option value="Event">Event</option>
                                <option value="General">General</option>
                                <option value="Class Notice">Class Notice</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Priority *</label>
                            <select name="priority" required>
                                <option value="">Select Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Date *</label>
                            <input type="date" name="date" required value="${new Date().toISOString().split('T')[0]}">
                        </div>
                    </div>
                   <div class="form-group">
                        <label>Notice Number *</label>
                        <input type="text" name="noticeNumber" required placeholder="Enter notice number (e.g., NOT-001)">
                    </div>
                    <div class="form-group">
                        <label>Notice Content *</label>
                        <textarea name="content" required rows="6" placeholder="Enter detailed notice content"></textarea>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Post Notice to Class</button>
                    <button type="button" class="btn-secondary" onclick="document.getElementById('noticePostArea').innerHTML=''">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function postMenteeNotice(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const notice = Object.fromEntries(formData);
    
    notice.noticeId = 'MENT' + Date.now();
    notice.timestamp = new Date().toISOString();
    notice.postedBy = currentUser.name;
    notice.noticeType = 'Mentee';
    notice.viewPermission = 'Mentees Only';
    
    notices.unshift(notice);
    
    document.getElementById('noticePostArea').innerHTML = `
        <div class="message success-message">✅ Notice posted successfully to mentees!</div>
    `;
    
    setTimeout(() => {
        document.getElementById('noticePostArea').innerHTML = '';
    }, 2000);
}

function postClassNotice(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const notice = Object.fromEntries(formData);
    
    notice.noticeId = 'CLS' + Date.now();
    notice.timestamp = new Date().toISOString();
    notice.postedBy = currentUser.name;
    notice.noticeType = 'Class';
    
    notices.unshift(notice);
    
    document.getElementById('noticePostArea').innerHTML = `
        <div class="message success-message">✅ Notice posted successfully to ${notice.targetClass}!</div>
    `;
    
    setTimeout(() => {
        document.getElementById('noticePostArea').innerHTML = '';
    }, 2000);
}


// ==========================================
// ATTENDANCE MANAGEMENT MODULE
// ==========================================

function showMarkAttendance() {
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Mark Student Attendance</h2>
            </div>
            
            <form onsubmit="markAttendance(event)">
                <div class="form-section">
                    <h3>Attendance Details</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Date *</label>
                            <input type="date" name="date" required value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-group">
                            <label>Class *</label>
                            <select name="class" required onchange="loadStudentsForAttendance(this.value)">
                                <option value="">Select Class</option>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div id="studentAttendanceList"></div>
                
                <div class="form-actions" id="submitActions" style="display: none;">
                    <button type="submit" class="btn-primary">Save Attendance</button>
                    <button type="button" class="btn-secondary" onclick="showModule('markAttendance')">Reset</button>
                </div>
            </form>
        </div>
    `;
}

function loadStudentsForAttendance(selectedClass) {
    const studentList = document.getElementById('studentAttendanceList');
    const submitActions = document.getElementById('submitActions');
    
    if (!selectedClass) {
        studentList.innerHTML = '';
        submitActions.style.display = 'none';
        return;
    }
    
    const classStudents = students.filter(s => s.class === selectedClass);
    
    if (classStudents.length === 0) {
        studentList.innerHTML = `
            <div class="message error-message-box">
                No students found in ${selectedClass}
            </div>
        `;
        submitActions.style.display = 'none';
        return;
    }
    
    let html = `
        <div class="form-section">
            <h3>Students in ${selectedClass} (${classStudents.length})</h3>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #667eea; color: white;">
                            <th style="padding: 12px; text-align: left;">Roll No</th>
                            <th style="padding: 12px; text-align: left;">Student Name</th>
                            <th style="padding: 12px; text-align: center;">Present</th>
                            <th style="padding: 12px; text-align: center;">Absent</th>
                            <th style="padding: 12px; text-align: center;">Leave</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    classStudents.forEach(student => {
        html += `
            <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px;">${student.rollNo}</td>
                <td style="padding: 12px;">${student.studentName}</td>
                <td style="padding: 12px; text-align: center;">
                    <input type="radio" name="attendance_${student.rollNo}" value="Present" required>
                </td>
                <td style="padding: 12px; text-align: center;">
                    <input type="radio" name="attendance_${student.rollNo}" value="Absent">
                </td>
                <td style="padding: 12px; text-align: center;">
                    <input type="radio" name="attendance_${student.rollNo}" value="Leave">
                </td>
            </tr>
        `;
    });
    
    html += `
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    studentList.innerHTML = html;
    submitActions.style.display = 'flex';
}

function markAttendance(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const date = formData.get('date');
    const selectedClass = formData.get('class');
    
    let markedCount = 0;
    
    // Process each student's attendance
    students.forEach(student => {
        if (student.class === selectedClass) {
            const status = formData.get(`attendance_${student.rollNo}`);
            if (status) {
                attendance.push({
                    rollNo: student.rollNo,
                    studentName: student.studentName,
                    class: selectedClass,
                    date: date,
                    status: status,
                    markedBy: currentUser.name
                });
                markedCount++;
            }
        }
    });
    
    document.getElementById('mainContent').innerHTML = `
        <div class="message success-message">
            ✅ Attendance marked successfully for ${markedCount} students on ${date}!
        </div>
    `;
    
    setTimeout(() => {
        showModule('markAttendance');
    }, 2000);
}

function showAttendanceRegister() {
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
        <div class="attendance-register-container">
            <!-- Attendance Mode Selection -->
            <div class="mode-selector">
                <h3>Select Attendance Mode</h3>
                <div class="mode-buttons">
                    <button class="mode-btn active" onclick="switchAttendanceMode('facial')">
                        📸 Facial Recognition
                    </button>
                    <button class="mode-btn" onclick="switchAttendanceMode('manual')">
                        ✍️ Manual Entry
                    </button>
                </div>
            </div>

            <!-- Facial Recognition Mode -->
            <div id="facialMode" class="attendance-mode active">
                <div class="facial-container">
                    <div class="camera-section">
                        <h3>Live Camera Feed</h3>
                        <video id="cameraFeed" autoplay playsinline></video>
                        <canvas id="faceCanvas" style="display:none;"></canvas>
                        
                    <div class="camera-controls">
                            <button class="btn-primary" onclick="startCamera()">📷 Start Camera</button>
                            <button class="btn-secondary" onclick="stopCamera()">⏹️ Stop Camera</button>
                        </div>
                        
                        <div class="auto-detect-toggle" style="margin: 15px 0; display: flex; align-items: center; gap: 10px;">
                            <label class="toggle-switch">
                                <input type="checkbox" id="autoDetectToggle" onchange="toggleAutoDetection()">
                                <span class="toggle-slider"></span>
                            </label>
                            <span class="toggle-label" style="font-size: 16px; font-weight: 500;">🤖 Automatic Face Detection</span>
                        </div>
                        
                        <div id="detectionStatus" class="status-message"></div>
                        <div id="detectionInfo" class="detection-info" style="margin-top: 10px; padding: 10px; background: #f0f0f0; border-radius: 5px;">
                            <p style="margin: 5px 0;">📊 Scans Completed: <span id="detectionCount" style="font-weight: bold; color: #4CAF50;">0</span></p>
                            <p style="margin: 5px 0;">⏱️ Last Scan: <span id="lastScan" style="font-weight: bold;">Not started</span></p>
                            <p style="margin: 5px 0;">👥 Students Detected: <span id="studentsDetected" style="font-weight: bold; color: #2196F3;">0</span></p>
                        </div>
                    </div>

                    <div class="recognized-section">
                        <h3>Recognized Students</h3>
                        <div id="recognizedList"></div>
                    </div>
                </div>
            </div>

            <!-- Manual Mode -->
            <div id="manualMode" class="attendance-mode" style="display:none;">
                <div class="manual-container">
                    <div class="filter-section">
                        <h3>Select Class</h3>
                        <select id="classFilter" onchange="loadStudentsForAttendance()">
                            <option value="">Select Class</option>
                            ${generateClassOptions()}
                        </select>
                        
                        <input type="date" id="attendanceDate" value="${new Date().toISOString().split('T')[0]}">
                    </div>

                    <div id="studentAttendanceList" class="student-list"></div>
                    
                    <button class="btn-primary" onclick="submitManualAttendance()">💾 Submit Attendance</button>
                </div>
            </div>

            <!-- Today's Summary -->
            <div class="attendance-summary">
                <h3>Today's Attendance Summary</h3>
                <div id="todaySummary"></div>
            </div>
        </div>
    `;
}

function generateClassOptions() {
    let options = '';
    const uniqueClasses = new Set();
    
    students.forEach(student => {
        const classKey = `${student.educationLevel} - ${student.class} - ${student.stream}`;
        uniqueClasses.add(classKey);
    });
    
    uniqueClasses.forEach(classKey => {
        options += `<option value="${classKey}">${classKey}</option>`;
    });
    
    return options;
}

function switchAttendanceMode(mode) {
    const facialMode = document.getElementById('facialMode');
    const manualMode = document.getElementById('manualMode');
    const modeButtons = document.querySelectorAll('.mode-btn');
    
    modeButtons.forEach(btn => btn.classList.remove('active'));
    
    if (mode === 'facial') {
        facialMode.style.display = 'block';
        manualMode.style.display = 'none';
        modeButtons[0].classList.add('active');
    } else {
        facialMode.style.display = 'none';
        manualMode.style.display = 'block';
        modeButtons[1].classList.add('active');
    }
}
// Camera Functions
let cameraStream = null;
async function startCamera() {
    try {
        const video = document.getElementById('cameraFeed');
        // Check if browser supports camera
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            document.getElementById('detectionStatus').innerHTML = 
                '<span style="color: red;">❌ Your browser does not support camera access</span>';
            return;
        }
        // Request camera permission with better constraints
        cameraStream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'user',
                width: { ideal: 640 },
                height: { ideal: 480 }
            },
            audio: false
        });
        video.srcObject = cameraStream;
        // Wait for video to be ready
        video.onloadedmetadata = () => {
            video.play();
            document.getElementById('detectionStatus').innerHTML = 
                '<span style="color: green;">✅ Camera started successfully!</span>';
        };
        
    } catch (error) {
        console.error('Camera error:', error);
        
        let errorMsg = '';
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
            errorMsg = '❌ Camera permission denied. Please allow camera access in browser settings.';
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
            errorMsg = '❌ No camera found on this device.';
        } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
            errorMsg = '❌ Camera is already in use by another application.';
        } else {
            errorMsg = '❌ Camera access denied or unavailable. Error: ' + error.message;
        }
        
        document.getElementById('detectionStatus').innerHTML = 
            `<span style="color: red;">${errorMsg}</span>`;
    }
}

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
        document.getElementById('cameraFeed').srcObject = null;
        document.getElementById('detectionStatus').innerHTML = 
            '<span style="color: gray;">⏹️ Camera stopped</span>';
    }
}

function captureAttendance() {
    const video = document.getElementById('cameraFeed');
    const canvas = document.getElementById('faceCanvas');
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    // Simulate face detection (real implementation would use ML model)
    const detectedStudent = simulateFaceRecognition();
    
    if (detectedStudent) {
        markAttendanceForStudent(detectedStudent);
        updateRecognizedList(detectedStudent);
    } else {
        document.getElementById('detectionStatus').innerHTML = 
            '<span style="color: orange;">⚠️ No face detected or student not recognized</span>';
    }
}

function simulateFaceRecognition() {
    // Simulation - random student selection for demo
    if (students.length > 0) {
        return students[Math.floor(Math.random() * students.length)];
    }
    return null;
}

function markAttendanceForStudent(student) {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if already marked
    const existing = attendance.find(a => 
        a.rollNo === student.rollNo && a.date === today
    );
    
    if (!existing) {
        attendance.push({
            rollNo: student.rollNo,
            studentName: student.studentName,
            date: today,
            status: 'Present',
            markedBy: currentUser.username,
            method: 'Facial Recognition',
            timestamp: new Date().toLocaleTimeString()
        });
        
        document.getElementById('detectionStatus').innerHTML = 
            `<span style="color: green;">✅ Attendance marked for ${student.studentName}</span>`;
    } else {
        document.getElementById('detectionStatus').innerHTML = 
            `<span style="color: orange;">⚠️ ${student.studentName} already marked present today</span>`;
    }
}

function updateRecognizedList(student) {
    const list = document.getElementById('recognizedList');
    const time = new Date().toLocaleTimeString();
    
    list.innerHTML += `
        <div class="recognized-item">
            <span>✅ ${student.studentName} (${student.rollNo})</span>
            <small>${time}</small>
        </div>
    `;
}

// Manual Attendance Functions
function loadStudentsForAttendance() {
    const classFilter = document.getElementById('classFilter').value;
    const listDiv = document.getElementById('studentAttendanceList');
    
    if (!classFilter) {
        listDiv.innerHTML = '<p>Please select a class</p>';
        return;
    }
    
    const [educationLevel, classYear, stream] = classFilter.split(' - ');
    const filteredStudents = students.filter(s => 
        s.educationLevel === educationLevel && 
        s.class === classYear && 
        s.stream === stream
    );
    
    if (filteredStudents.length === 0) {
        listDiv.innerHTML = '<p>No students found for this class</p>';
        return;
    }
    
    let html = '<table class="attendance-table"><thead><tr><th>Roll No</th><th>Name</th><th>Present</th><th>Absent</th></tr></thead><tbody>';
    
    filteredStudents.forEach(student => {
        html += `
            <tr>
                <td>${student.rollNo}</td>
                <td>${student.studentName}</td>
                <td><input type="radio" name="attendance_${student.rollNo}" value="Present" checked></td>
                <td><input type="radio" name="attendance_${student.rollNo}" value="Absent"></td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    listDiv.innerHTML = html;
}

function submitManualAttendance() {
    const date = document.getElementById('attendanceDate').value;
    const radios = document.querySelectorAll('input[type="radio"]:checked');
    
    if (radios.length === 0) {
        alert('❌ Please select a class first!');
        return;
    }
    
    let marked = 0;
    radios.forEach(radio => {
        const rollNo = radio.name.replace('attendance_', '');
        const status = radio.value;
        const student = students.find(s => s.rollNo === rollNo);
        
        if (student) {
            // Check if already marked for this date
            const existing = attendance.find(a => 
                a.rollNo === rollNo && a.date === date
            );
            
            if (!existing) {
                attendance.push({
                    rollNo: rollNo,
                    studentName: student.studentName,
                    date: date,
                    status: status,
                    markedBy: currentUser.username,
                    method: 'Manual',
                    timestamp: new Date().toLocaleTimeString()
                });
                marked++;
            }
        }
    });
    
    alert(`✅ Attendance marked for ${marked} students!`);
    document.getElementById('studentAttendanceList').innerHTML = '';
    document.getElementById('classFilter').value = '';
}





// ==========================================
// CLASS STUDENTS MODULE
// ==========================================


// - showClassStudents() KE NEECHE
function showViewAllClassGroups() {
    const formArea = document.getElementById('classStudentsArea');
    
    let html = `
        <div class="form-container active">
            <div class="form-header">
                <h2>All Class Groups - Hierarchical View</h2>
                <button class="back-btn" onclick="document.getElementById('classStudentsArea').innerHTML=''">← Back</button>
            </div>
    `;
    
    Object.keys(classGroups).forEach(eduLevel => {
        html += `<div style="margin-bottom: 30px;">`;
        html += `<h3 style="color: #667eea; font-size: 22px; margin-bottom: 15px;">🎓 ${eduLevel}</h3>`;
        
        Object.keys(classGroups[eduLevel]).forEach(className => {
            Object.keys(classGroups[eduLevel][className]).forEach(stream => {
                const rollNumbers = classGroups[eduLevel][className][stream];
                const groupStudents = students.filter(s => rollNumbers.includes(s.rollNo));
                
                html += `
                    <div class="salary-card" style="margin-bottom: 15px;">
                        <h3>📚 ${className} - ${stream}</h3>
                        <div class="salary-breakdown">
                            <div class="salary-row">
                                <span>Total Students:</span>
                                <strong>${rollNumbers.length}</strong>
                            </div>
                            <div class="salary-row">
                                <span>Roll Numbers:</span>
                                <strong>${rollNumbers.length > 0 ? rollNumbers.join(', ') : 'No students'}</strong>
                            </div>
                        </div>
                    </div>
                `;
            });
        });
        
        html += `</div>`;
    });
    
    html += '</div>';
    formArea.innerHTML = html;
}

function showFilteredClassView() {
    const formArea = document.getElementById('classStudentsArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Filter Students by Level/Class/Stream</h2>
                <button class="back-btn" onclick="document.getElementById('classStudentsArea').innerHTML=''">← Back</button>
            </div>
            <div class="form-section">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Education Level *</label>
                        <select id="filterEduLevel" onchange="updateFilterClassOptions()">
                            <option value="">Select Education Level</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Graduation">Graduation</option>
                            <option value="Post Graduate">Post Graduate</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Class *</label>
                        <select id="filterClass" onchange="updateFilterStreamOptions()" disabled>
                            <option value="">Select Education Level First</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Stream *</label>
                        <select id="filterStream" disabled>
                            <option value="">Select Class First</option>
                        </select>
                    </div>
                </div>
                <button class="btn-primary" onclick="loadFilteredStudents()" style="max-width: 200px; margin-top: 15px;">Load Students</button>
            </div>
            <div id="filteredStudentsList" style="margin-top: 25px;"></div>
        </div>
    `;
}

function updateFilterClassOptions() {
    const eduLevel = document.getElementById('filterEduLevel').value;
    const classSelect = document.getElementById('filterClass');
    const streamSelect = document.getElementById('filterStream');
    
    if (!eduLevel) {
        classSelect.disabled = true;
        streamSelect.disabled = true;
        return;
    }
    
    classSelect.innerHTML = '<option value="">Select Class</option>';
    Object.keys(classGroups[eduLevel] || {}).forEach(className => {
        classSelect.innerHTML += `<option value="${className}">${className}</option>`;
    });
    classSelect.disabled = false;
    streamSelect.disabled = true;
}

function updateFilterStreamOptions() {
    const eduLevel = document.getElementById('filterEduLevel').value;
    const className = document.getElementById('filterClass').value;
    const streamSelect = document.getElementById('filterStream');
    
    if (!eduLevel || !className) {
        streamSelect.disabled = true;
        return;
    }
    
    streamSelect.innerHTML = '<option value="">Select Stream</option>';
    Object.keys(classGroups[eduLevel][className] || {}).forEach(stream => {
        streamSelect.innerHTML += `<option value="${stream}">${stream}</option>`;
    });
    streamSelect.disabled = false;
}

function loadFilteredStudents() {
    const eduLevel = document.getElementById('filterEduLevel').value;
    const className = document.getElementById('filterClass').value;
    const stream = document.getElementById('filterStream').value;
    const listDiv = document.getElementById('filteredStudentsList');
    
    if (!eduLevel || !className || !stream) {
        listDiv.innerHTML = '<div class="message error-message-box">Please select all filters</div>';
        return;
    }
    
    const rollNumbers = classGroups[eduLevel][className][stream] || [];
    const filteredStudents = students.filter(s => rollNumbers.includes(s.rollNo));
    
    if (filteredStudents.length === 0) {
        listDiv.innerHTML = `
            <div class="empty-state">
                <h3>No Students Found</h3>
                <p>No students in ${eduLevel} > ${className} > ${stream}</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="salary-card">
            <h3>📚 ${eduLevel} - ${className} - ${stream}</h3>
            <div class="salary-breakdown">
                <div class="salary-row">
                    <span>Total Students:</span>
                    <strong>${filteredStudents.length}</strong>
                </div>
                <div class="salary-row">
                    <span>Roll Numbers:</span>
                    <strong>${rollNumbers.join(', ')}</strong>
                </div>
            </div>
        </div>
        <div class="records-list">
    `;
    
    filteredStudents.forEach(student => {
        html += `
            <div class="record-card">
                <div class="record-header">
                    <h3>${student.studentName} (${student.rollNo})</h3>
                </div>
                <div class="record-details">
                    <div class="record-field">
                        <strong>Education Level:</strong>
                        <span>${student.educationLevel}</span>
                    </div>
                    <div class="record-field">
                        <strong>Class:</strong>
                        <span>${student.class}</span>
                    </div>
                    <div class="record-field">
                        <strong>Stream:</strong>
                        <span>${student.stream}</span>
                    </div>
                    ${student.department ? `
                        <div class="record-field">
                            <strong>Department:</strong>
                            <span>${student.department}</span>
                        </div>
                    ` : ''}
                    <div class="record-field">
                        <strong>Father's Name:</strong>
                        <span>${student.fatherName}</span>
                    </div>
                    <div class="record-field">
                        <strong>Mother's Name:</strong>
                        <span>${student.motherName}</span>
                    </div>
                    <div class="record-field">
                        <strong>Contact:</strong>
                        <span>${student.contactNo}</span>
                    </div>
                    <div class="record-field">
                        <strong>Email:</strong>
                        <span>${student.email}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    listDiv.innerHTML = html;
}



function showAddStudentToClass() {
    const formArea = document.getElementById('classStudentsArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Add Student to Class Group</h2>
                <button class="back-btn" onclick="document.getElementById('classStudentsArea').innerHTML=''">← Back</button>
            </div>
            <form onsubmit="addStudentToClassGroup(event)">
                <div class="form-section">
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Education Level *</label>
                            <select name="educationLevel" id="addEduLevel" required onchange="updateAddClassOptions()">
                                <option value="">Select Education Level</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Graduation">Graduation</option>
                                <option value="Post Graduate">Post Graduate</option>
                                <option value="BBA">BBA</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Class *</label>
                            <select name="className" id="addClassName" required onchange="updateAddStreamOptions()" disabled>
                                <option value="">Select Education Level First</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Stream *</label>
                            <select name="stream" id="addStream" required disabled>
                                <option value="">Select Class First</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Student Roll Number *</label>
                            <input type="text" name="rollNo" required placeholder="Enter roll number" list="availableStudents">
                            <datalist id="availableStudents">
                                ${students.map(s => 
                                    `<option value="${s.rollNo}">${s.studentName} - ${s.educationLevel} ${s.class} ${s.stream}</option>`
                                ).join('')}
                            </datalist>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Add to Class Group</button>
                    <button type="button" class="btn-secondary" onclick="document.getElementById('classStudentsArea').innerHTML=''">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function updateAddClassOptions() {
    const eduLevel = document.getElementById('addEduLevel').value;
    const classSelect = document.getElementById('addClassName');
    const streamSelect = document.getElementById('addStream');
    
    if (!eduLevel) {
        classSelect.disabled = true;
        streamSelect.disabled = true;
        return;
    }
    
    classSelect.innerHTML = '<option value="">Select Class</option>';
    Object.keys(classGroups[eduLevel] || {}).forEach(className => {
        classSelect.innerHTML += `<option value="${className}">${className}</option>`;
    });
    classSelect.disabled = false;
    streamSelect.disabled = true;
}

function updateAddStreamOptions() {
    const eduLevel = document.getElementById('addEduLevel').value;
    const className = document.getElementById('addClassName').value;
    const streamSelect = document.getElementById('addStream');
    
    if (!eduLevel || !className) {
        streamSelect.disabled = true;
        return;
    }
    
    streamSelect.innerHTML = '<option value="">Select Stream</option>';
    Object.keys(classGroups[eduLevel][className] || {}).forEach(stream => {
        streamSelect.innerHTML += `<option value="${stream}">${stream}</option>`;
    });
    streamSelect.disabled = false;
}

function addStudentToClassGroup(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const eduLevel = formData.get('educationLevel');
    const className = formData.get('className');
    const stream = formData.get('stream');
    const rollNo = formData.get('rollNo').trim();


    console.log('Adding student:', rollNo, 'to', eduLevel, className, stream);
    
    const student = students.find(s => s.rollNo === rollNo);
    if (!student) {
        alert('Student not found!');
        return;
    }
    
    // Initialize if needed
    if (!classGroups[eduLevel]) classGroups[eduLevel] = {};
    if (!classGroups[eduLevel][className]) classGroups[eduLevel][className] = {};
    if (!classGroups[eduLevel][className][stream]) classGroups[eduLevel][className][stream] = [];
    
    if (classGroups[eduLevel][className][stream].includes(rollNo)) {
        alert('Student is already in this group!');
        return;
    }
    
    classGroups[eduLevel][className][stream].push(rollNo);
    
    document.getElementById('classStudentsArea').innerHTML = `
        <div class="message success-message">
            ✅ ${student.studentName} (${rollNo}) added successfully!
            <br>Group: ${eduLevel} > ${className} > ${stream}
            <br>Total students in group: ${classGroups[eduLevel][className][stream].length}
        </div>
    `;
    
    setTimeout(() => {
        showViewAllClassGroups();
    }, 2500);
}


function showRemoveStudentFromClass() {
    const formArea = document.getElementById('classStudentsArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Remove Student from Class Group</h2>
                <button class="back-btn" onclick="document.getElementById('classStudentsArea').innerHTML=''">← Back</button>
            </div>
            <div class="form-section">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Education Level *</label>
                        <select id="removeEduLevel" onchange="updateRemoveClassOptions()">
                            <option value="">Select Education Level</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Graduation">Graduation</option>
                            <option value="Post Graduate">Post Graduate</option>
                            <option value="BBA">BBA</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Class *</label>
                        <select id="removeClassName" onchange="updateRemoveStreamOptions()" disabled>
                            <option value="">Select Education Level First</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Stream *</label>
                        <select id="removeStream" onchange="loadClassStudentsForRemoval()" disabled>
                            <option value="">Select Class First</option>
                        </select>
                    </div>
                </div>
                <div id="studentRemovalList" style="margin-top: 20px;"></div>
            </div>
        </div>
    `;
}

function updateRemoveClassOptions() {
    const eduLevel = document.getElementById('removeEduLevel').value;
    const classSelect = document.getElementById('removeClassName');
    const streamSelect = document.getElementById('removeStream');
    
    if (!eduLevel) {
        classSelect.disabled = true;
        streamSelect.disabled = true;
        document.getElementById('studentRemovalList').innerHTML = '';
        return;
    }
    
    classSelect.innerHTML = '<option value="">Select Class</option>';
    Object.keys(classGroups[eduLevel] || {}).forEach(className => {
        classSelect.innerHTML += `<option value="${className}">${className}</option>`;
    });
    classSelect.disabled = false;
    streamSelect.disabled = true;
    document.getElementById('studentRemovalList').innerHTML = '';
}

function updateRemoveStreamOptions() {
    const eduLevel = document.getElementById('removeEduLevel').value;
    const className = document.getElementById('removeClassName').value;
    const streamSelect = document.getElementById('removeStream');
    
    if (!eduLevel || !className) {
        streamSelect.disabled = true;
        document.getElementById('studentRemovalList').innerHTML = '';
        return;
    }
    
    streamSelect.innerHTML = '<option value="">Select Stream</option>';
    Object.keys(classGroups[eduLevel][className] || {}).forEach(stream => {
        streamSelect.innerHTML += `<option value="${stream}">${stream}</option>`;
    });
    streamSelect.disabled = false;
    document.getElementById('studentRemovalList').innerHTML = '';
}

function loadClassStudentsForRemoval() {
    const eduLevel = document.getElementById('removeEduLevel').value;
    const className = document.getElementById('removeClassName').value;
    const stream = document.getElementById('removeStream').value;
    const listDiv = document.getElementById('studentRemovalList');
    
    if (!eduLevel || !className || !stream) {
        listDiv.innerHTML = '';
        return;
    }
    
    const rollNumbers = classGroups[eduLevel][className][stream] || [];
    if (rollNumbers.length === 0) {
        listDiv.innerHTML = '<div class="message error-message-box">No students in this group</div>';
        return;
    }
    
    listDiv.innerHTML = `
        <div class="form-group">
            <label>Select Student to Remove *</label>
            <select id="studentToRemove">
                <option value="">Choose Student</option>
                ${rollNumbers.map(rollNo => {
                    const student = students.find(s => s.rollNo === rollNo);
                    return student ? `<option value="${rollNo}">${student.studentName} (${rollNo})</option>` : '';
                }).join('')}
            </select>
        </div>
        <button class="btn-primary" onclick="removeStudentFromClassGroup('${eduLevel}', '${className}', '${stream}')" style="max-width: 250px; margin-top: 15px; background: #e74c3c;">
            Remove from Group
        </button>
    `;
}
function removeStudentFromClassGroup(eduLevel, className, stream) {
    const rollNo = document.getElementById('studentToRemove').value;
    
    if (!rollNo) {
        alert('Please select a student');
        return;
    }
    
    const student = students.find(s => s.rollNo === rollNo);
    
    if (confirm(`Remove ${student.studentName} from ${eduLevel} > ${className} > ${stream} group?`)) {
        classGroups[eduLevel][className][stream] = classGroups[eduLevel][className][stream].filter(r => r !== rollNo);
        
        document.getElementById('classStudentsArea').innerHTML = `
            <div class="message success-message">
                ✅ ${student.studentName} removed from group successfully!
                <br>Remaining students: ${classGroups[eduLevel][className][stream].length}
            </div>
        `;
        
        setTimeout(() => {
            showViewAllClassGroups();
        }, 2000);
    }
}


function showClassStatistics() {
    const formArea = document.getElementById('classStudentsArea');
    
    let totalStudents = 0;
    let stats = {};
    
    // Calculate statistics
    Object.keys(classGroups).forEach(eduLevel => {
        stats[eduLevel] = { total: 0, classes: {} };
        
        Object.keys(classGroups[eduLevel]).forEach(className => {
            stats[eduLevel].classes[className] = { total: 0, streams: {} };
            
            Object.keys(classGroups[eduLevel][className]).forEach(stream => {
                const count = classGroups[eduLevel][className][stream].length;
                stats[eduLevel].classes[className].streams[stream] = count;
                stats[eduLevel].classes[className].total += count;
                stats[eduLevel].total += count;
                totalStudents += count;
            });
        });
    });
    
    let html = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Class Statistics</h2>
                <button class="back-btn" onclick="document.getElementById('classStudentsArea').innerHTML=''">← Back</button>
            </div>
            
            <div class="salary-card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <h3 style="color: white;">📊 Overall Statistics</h3>
                <div class="salary-breakdown">
                    <div class="salary-row total">
                        <span>Total Students in All Groups:</span>
                        <strong>${totalStudents}</strong>
                    </div>
                </div>
            </div>
    `;
    
    // Education Level wise stats
    Object.keys(stats).forEach(eduLevel => {
        html += `
            <div style="margin-bottom: 25px;">
                <h3 style="color: #667eea; font-size: 20px; margin: 20px 0 15px 0;">🎓 ${eduLevel}</h3>
                <div class="salary-card">
                    <div class="salary-breakdown">
                        <div class="salary-row">
                            <span>Total Students:</span>
                            <strong>${stats[eduLevel].total}</strong>
                        </div>
                    </div>
                </div>
        `;
        
        // Class wise stats
        Object.keys(stats[eduLevel].classes).forEach(className => {
            html += `
                <div style="margin-left: 20px; margin-top: 15px;">
                    <h4 style="color: #555; margin-bottom: 10px;">📚 ${className}</h4>
            `;
            
            // Stream wise stats
            Object.keys(stats[eduLevel].classes[className].streams).forEach(stream => {
                const count = stats[eduLevel].classes[className].streams[stream];
                html += `
                    <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 500;">${stream}</span>
                        <strong style="color: #667eea; font-size: 18px;">${count} students</strong>
                    </div>
                `;
            });
            
            html += `</div>`;
        });
        
        html += `</div>`;
    });
    
    html += '</div>';
    formArea.innerHTML = html;
}


// ==========================================
// STAFF STUDENTS MODULE
// ==========================================


function showMyMenteesModule() {
    const formArea = document.getElementById('staffStudentsArea');
    
    // Current staff ke assigned students filter karo
    const myMentees = students.filter(s => s.assignedStaff === currentUser.username);
    
    // Display karo in cards
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>My Mentees (${myMentees.length})</h2>
            </div>
            <div class="records-list">
                ${myMentees.map(student => renderStudentCard(student)).join('')}
            </div>
        </div>
    `;
}

function showStaffStudentsSubmenu() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="submenu-grid">
            <button class="submenu-btn" onclick="showMyClassStudents()">👥 My Class Students</button>
            <button class="submenu-btn" onclick="showMyMenteesModule()">🎓 My Mentees</button>
        </div>
        <div id="staffStudentsArea"></div>
    `;
}

function showMyClassStudents() {
    const formArea = document.getElementById('staffStudentsArea');
    formArea.innerHTML = `
        <div class="submenu-grid">
            <button class="submenu-btn" onclick="showAddClassStudent()">➕ Add Student</button>
            <button class="submenu-btn" onclick="showViewClassStudents()">👥 View All Students</button>
            <button class="submenu-btn" onclick="showRemoveClassStudent()">❌ Remove Student</button>
        </div>
        <div id="classStudentsArea"></div>
    `;
}

function showAddClassStudent() {
    const formArea = document.getElementById('classStudentsArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Add Student to My Class</h2>
                <button class="back-btn" onclick="showMyClassStudents()">← Back</button>
            </div>
            <form onsubmit="addClassStudent(event)">
                <div class="form-section">
                    <div class="form-group">
                        <label>Student Roll Number *</label>
                        <input type="text" name="rollNo" required placeholder="Enter student roll number" list="availableStudentsList">
                        <datalist id="availableStudentsList">
                            ${students.map(s => 
                                `<option value="${s.rollNo}">${s.studentName} - ${s.class} ${s.stream}</option>`
                            ).join('')}
                        </datalist>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Add Student</button>
                    <button type="button" class="btn-secondary" onclick="showMyClassStudents()">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function addClassStudent(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const rollNo = formData.get('rollNo').trim();
    
    const student = students.find(s => s.rollNo === rollNo);
    if (!student) {
        alert('Student not found!');
        return;
    }
    
    // Initialize staff class students storage
    if (!window.staffClassStudents) window.staffClassStudents = {};
    if (!window.staffClassStudents[currentUser.username]) {
        window.staffClassStudents[currentUser.username] = [];
    }
    
    if (window.staffClassStudents[currentUser.username].includes(rollNo)) {
        alert('This student is already in your class!');
        return;
    }
    
    window.staffClassStudents[currentUser.username].push(rollNo);
    
    document.getElementById('classStudentsArea').innerHTML = `
        <div class="message success-message">
            ✅ ${student.studentName} added to your class successfully!
        </div>
    `;
    
    setTimeout(() => {
        showViewClassStudents();
    }, 2000);
}

function showViewClassStudents() {
    const formArea = document.getElementById('classStudentsArea');
    
    if (!window.staffClassStudents) window.staffClassStudents = {};
    const myStudentsList = window.staffClassStudents[currentUser.username] || [];
    
    if (myStudentsList.length === 0) {
        formArea.innerHTML = `
            <div class="form-container active">
                <div class="form-header">
                    <h2>My Class Students</h2>
                    <button class="back-btn" onclick="showMyClassStudents()">← Back</button>
                </div>
                <div class="empty-state">
                    <h3>No Students Yet</h3>
                    <p>Add students to get started</p>
                </div>
            </div>
        `;
        return;
    }
    
    const myStudentsData = students.filter(s => myStudentsList.includes(s.rollNo));
    
    let html = `
        <div class="form-container active">
            <div class="form-header">
                <h2>My Class Students (${myStudentsData.length})</h2>
                <button class="back-btn" onclick="showMyClassStudents()">← Back</button>
            </div>
            <div class="records-list">
    `;
    
    myStudentsData.forEach(student => {
        html += `
            <div class="record-card">
                <div class="record-header">
                    <h3>${student.studentName} (${student.rollNo})</h3>
                    <button class="btn-delete" onclick="removeClassStudentConfirm('${student.rollNo}')">Remove</button>
                </div>
                <div class="record-details">
                    <div class="record-field">
                        <strong>Education Level:</strong>
                        <span>${student.educationLevel}</span>
                    </div>
                    <div class="record-field">
                        <strong>Class:</strong>
                        <span>${student.class}</span>
                    </div>
                    <div class="record-field">
                        <strong>Stream:</strong>
                        <span>${student.stream}</span>
                    </div>
                    ${student.department ? `
                        <div class="record-field">
                            <strong>Department:</strong>
                            <span>${student.department}</span>
                        </div>
                    ` : ''}
                    <div class="record-field">
                        <strong>Father's Name:</strong>
                        <span>${student.fatherName}</span>
                    </div>
                    <div class="record-field">
                        <strong>Mother's Name:</strong>
                        <span>${student.motherName}</span>
                    </div>
                    <div class="record-field">
                        <strong>Contact:</strong>
                        <span>${student.contactNo}</span>
                    </div>
                    <div class="record-field">
                        <strong>Email:</strong>
                        <span>${student.email}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div></div>';
    formArea.innerHTML = html;
}

function showRemoveClassStudent() {
    const formArea = document.getElementById('classStudentsArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Remove Student from My Class</h2>
                <button class="back-btn" onclick="showMyClassStudents()">← Back</button>
            </div>
            <div class="form-group" style="max-width: 400px;">
                <label>Student Roll Number</label>
                <input type="text" id="removeClassStudentRoll" placeholder="Enter roll number">
            </div>
            <button class="btn-primary" onclick="removeClassStudentConfirm(document.getElementById('removeClassStudentRoll').value)" style="max-width: 200px; margin-top: 15px; background: #e74c3c;">Remove Student</button>
        </div>
    `;
}

function removeClassStudentConfirm(rollNo) {
    if (!rollNo) {
        alert('Please enter a roll number');
        return;
    }
    
    if (!window.staffClassStudents) window.staffClassStudents = {};
    const myStudentsList = window.staffClassStudents[currentUser.username] || [];
    
    if (!myStudentsList.includes(rollNo)) {
        alert('This student is not in your class!');
        return;
    }
    
    const student = students.find(s => s.rollNo === rollNo);
    if (confirm(`Remove ${student.studentName} from your class?`)) {
        window.staffClassStudents[currentUser.username] = myStudentsList.filter(r => r !== rollNo);
        
        document.getElementById('classStudentsArea').innerHTML = `
            <div class="message success-message">
                ✅ Student removed successfully!
            </div>
        `;
        
        setTimeout(() => {
            showViewClassStudents();
        }, 2000);
    }
}



// ==========================================
// STAFF STUDENTS MODULE
// ==========================================

function showStaffStudentsSubmenu() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="submenu-grid">
            <button class="submenu-btn" onclick="showMyClassStudents()">👥 My Class Students</button>
            <button class="submenu-btn" onclick="showMyMenteesModule()">🎓 My Mentees</button>
        </div>
        <div id="staffStudentsArea"></div>
    `;
}

// ==========================================
// MY CLASS STUDENTS MODULE
// ==========================================

function showMyClassStudents() {
    const formArea = document.getElementById('staffStudentsArea');
    formArea.innerHTML = `
        <div class="submenu-grid">
            <button class="submenu-btn" onclick="showAddClassStudent()">➕ Add Student</button>
            <button class="submenu-btn" onclick="showViewClassStudents()">👥 View All Students</button>
            <button class="submenu-btn" onclick="showRemoveClassStudent()">❌ Remove Student</button>
        </div>
        <div id="classStudentsArea"></div>
    `;
}

function showAddClassStudent() {
    const formArea = document.getElementById('classStudentsArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Add Student to My Class</h2>
                <button class="back-btn" onclick="showMyClassStudents()">← Back</button>
            </div>
            <form onsubmit="addClassStudent(event)">
                <div class="form-section">
                    <div class="form-group">
                        <label>Student Roll Number *</label>
                        <input type="text" name="rollNo" required placeholder="Enter student roll number" list="availableStudentsList">
                        <datalist id="availableStudentsList">
                            ${students.map(s => 
                                `<option value="${s.rollNo}">${s.studentName} - ${s.class} ${s.stream}</option>`
                            ).join('')}
                        </datalist>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Add Student</button>
                    <button type="button" class="btn-secondary" onclick="showMyClassStudents()">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function addClassStudent(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const rollNo = formData.get('rollNo').trim();
    
    const student = students.find(s => s.rollNo === rollNo);
    if (!student) {
        alert('Student not found!');
        return;
    }
    
    // Initialize staff class students storage
    if (!window.staffClassStudents) window.staffClassStudents = {};
    if (!window.staffClassStudents[currentUser.username]) {
        window.staffClassStudents[currentUser.username] = [];
    }
    
    if (window.staffClassStudents[currentUser.username].includes(rollNo)) {
        alert('This student is already in your class!');
        return;
    }
    
    window.staffClassStudents[currentUser.username].push(rollNo);
    
    document.getElementById('classStudentsArea').innerHTML = `
        <div class="message success-message">
            ✅ ${student.studentName} added to your class successfully!
        </div>
    `;
    
    setTimeout(() => {
        showViewClassStudents();
    }, 2000);
}

function showViewClassStudents() {
    const formArea = document.getElementById('classStudentsArea');
    
    if (!window.staffClassStudents) window.staffClassStudents = {};
    const myStudentsList = window.staffClassStudents[currentUser.username] || [];
    
    if (myStudentsList.length === 0) {
        formArea.innerHTML = `
            <div class="form-container active">
                <div class="form-header">
                    <h2>My Class Students</h2>
                    <button class="back-btn" onclick="showMyClassStudents()">← Back</button>
                </div>
                <div class="empty-state">
                    <h3>No Students Yet</h3>
                    <p>Add students to get started</p>
                </div>
            </div>
        `;
        return;
    }
    
    const myStudentsData = students.filter(s => myStudentsList.includes(s.rollNo));
    
    let html = `
        <div class="form-container active">
            <div class="form-header">
                <h2>My Class Students (${myStudentsData.length})</h2>
                <button class="back-btn" onclick="showMyClassStudents()">← Back</button>
            </div>
            <div class="records-list">
    `;
    
    myStudentsData.forEach(student => {
        html += `
            <div class="record-card">
                <div class="record-header">
                    <h3>${student.studentName} (${student.rollNo})</h3>
                    <button class="btn-delete" onclick="removeClassStudentConfirm('${student.rollNo}')">Remove</button>
                </div>
                <div class="record-details">
                    <div class="record-field">
                        <strong>Education Level:</strong>
                        <span>${student.educationLevel}</span>
                    </div>
                    <div class="record-field">
                        <strong>Class:</strong>
                        <span>${student.class}</span>
                    </div>
                    <div class="record-field">
                        <strong>Stream:</strong>
                        <span>${student.stream}</span>
                    </div>
                    ${student.department ? `
                        <div class="record-field">
                            <strong>Department:</strong>
                            <span>${student.department}</span>
                        </div>
                    ` : ''}
                    <div class="record-field">
                        <strong>Father's Name:</strong>
                        <span>${student.fatherName}</span>
                    </div>
                    <div class="record-field">
                        <strong>Mother's Name:</strong>
                        <span>${student.motherName}</span>
                    </div>
                    <div class="record-field">
                        <strong>Contact:</strong>
                        <span>${student.contactNo}</span>
                    </div>
                    <div class="record-field">
                        <strong>Email:</strong>
                        <span>${student.email}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div></div>';
    formArea.innerHTML = html;
}

function showRemoveClassStudent() {
    const formArea = document.getElementById('classStudentsArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>Remove Student from My Class</h2>
                <button class="back-btn" onclick="showMyClassStudents()">← Back</button>
            </div>
            <div class="form-group" style="max-width: 400px;">
                <label>Student Roll Number</label>
                <input type="text" id="removeClassStudentRoll" placeholder="Enter roll number">
            </div>
            <button class="btn-primary" onclick="removeClassStudentConfirm(document.getElementById('removeClassStudentRoll').value)" style="max-width: 200px; margin-top: 15px; background: #e74c3c;">Remove Student</button>
        </div>
    `;
}

function removeClassStudentConfirm(rollNo) {
    if (!rollNo) {
        alert('Please enter a roll number');
        return;
    }
    
    if (!window.staffClassStudents) window.staffClassStudents = {};
    const myStudentsList = window.staffClassStudents[currentUser.username] || [];
    
    if (!myStudentsList.includes(rollNo)) {
        alert('This student is not in your class!');
        return;
    }
    
    const student = students.find(s => s.rollNo === rollNo);
    if (confirm(`Remove ${student.studentName} from your class?`)) {
        window.staffClassStudents[currentUser.username] = myStudentsList.filter(r => r !== rollNo);
        
        document.getElementById('classStudentsArea').innerHTML = `
            <div class="message success-message">
                ✅ Student removed successfully!
            </div>
        `;
        
        setTimeout(() => {
            showViewClassStudents();
        }, 2000);
    }
}
    // ==========================================
// ATTENDANCE NOTIFICATION SYSTEM
// ==========================================

let attendanceCheckInterval = null;

function startAttendanceChecker() {
    // Clear any existing interval
    if (attendanceCheckInterval) {
        clearInterval(attendanceCheckInterval);
    }
    
    // Check every minute if it's time for attendance
    attendanceCheckInterval = setInterval(() => {
        checkAttendanceTime();
    }, 60000); // Check every 1 minute
    
    // Also check immediately
    checkAttendanceTime();
}

function checkAttendanceTime() {
    if (!currentUser || currentUser.type !== 'student') return;
    
    const student = currentUser.data;
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Minutes since midnight
    const currentDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
    
    // Get student's timetable
    const timetable = classTimetable[student.educationLevel]?.[student.class]?.[student.stream]?.[currentDay];
    
    if (!timetable) return;
    
    // Check each period
    timetable.forEach(period => {
        const [hours, minutes] = period.time.split(':').map(Number);
        const periodStartTime = hours * 60 + minutes;
        
        // If current time is within 5 minutes before class starts
        if (currentTime >= periodStartTime - 5 && currentTime <= periodStartTime + 5) {
            showAttendanceNotification(period);
        }
    });
}

function showAttendanceNotification(period) {
    // Show notification badge
    const badge = document.getElementById('attendanceBadge');
    if (badge) {
        badge.style.display = 'inline-block';
    }
    
    // Show alert/prompt for attendance
    const message = `⏰ Class Time! ${period.subject} class is starting at ${period.time}. Please mark your attendance.`;
    
    // You can use browser notification API or custom modal
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Attendance Reminder', {
            body: message,
            icon: '🎓'
        });
    }
    
    // Also show in-app notification
    showInAppAttendanceAlert(message, period);
}

function showInAppAttendanceAlert(message, period) {
    // Create a modal/alert in the page
    const alertDiv = document.createElement('div');
    alertDiv.className = 'attendance-alert';
    alertDiv.innerHTML = `
        <div class="attendance-alert-content">
            <h3>⏰ Attendance Time!</h3>
            <p>${message}</p>
            <button onclick="markMyAttendance('${period.subject}', '${period.time}')">Mark Present</button>
            <button onclick="dismissAttendanceAlert()">Dismiss</button>
        </div>
    `;
    document.body.appendChild(alertDiv);
}

function markMyAttendance(subject, time) {
    // Auto-mark student as present
    const today = new Date().toISOString().split('T')[0];
    
    attendance.push({
        rollNo: currentUser.username,
        studentName: currentUser.data.studentName,
        class: currentUser.data.class,
        date: today,
        status: 'Present',
        subject: subject,
        time: time,
        markedBy: 'Self (Student)',
        autoMarked: true
    });
    
    dismissAttendanceAlert();
    alert('✅ Attendance marked successfully!');
}
function dismissAttendanceAlert() {
    const alert = document.querySelector('.attendance-alert');
    if (alert) alert.remove();
    
    const badge = document.getElementById('attendanceBadge');
    if (badge) badge.style.display = 'none';
}
// ==========================================
// EXPORT TO EXCEL FUNCTIONALITY
// ==========================================
function showExportToExcel() {
    const formArea = document.getElementById('studentFormArea');
    formArea.innerHTML = `
        <div class="form-container active">
            <div class="form-header">
                <h2>📊 Export Students to Excel</h2>
                <button class="back-btn" onclick="document.getElementById('studentFormArea').innerHTML=''">← Back</button>
            </div>
            
            <form onsubmit="exportStudentsToExcel(event)">
                <div class="form-section">
                    <h3>Select Filter Criteria</h3>
                    
                    <div class="form-group">
                        <label>Education Level *</label>
                        <select name="educationLevel" id="exportEducationLevel" required onchange="updateExportFields()">
                            <option value="">Select Education Level</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Graduation">Graduation</option>
                            <option value="Post Graduate">Post Graduate</option>
                            <option value="BBA">BBA</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Class *</label>
                        <select name="class" id="exportClassSelect" required disabled>
                            <option value="">Select Education Level First</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Stream *</label>
                        <select name="stream" id="exportStreamSelect" required disabled onchange="updateExportDepartmentSection()">
                            <option value="">Select Education Level First</option>
                        </select>
                    </div>
                    
                    <!-- Department field (only for Graduation/Post Graduate) -->
                    <div class="form-group" id="exportDepartmentGroup" style="display: none;">
                        <label>Department</label>
                        <select name="department" id="exportDepartmentSelect">
                            <option value="">All Departments</option>
                        </select>
                    </div>
                    
                    <!-- Section field (for Intermediate or Commerce in Graduation/PG) -->
                    <div class="form-group" id="exportSectionGroup" style="display: none;">
                        <label>Section</label>
                        <select name="section" id="exportSectionSelect">
                            <option value="">All Sections</option>
                            <option value="A">Section A</option>
                            <option value="B">Section B</option>
                            <option value="C">Section C</option>
                            <option value="D">Section D</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn-primary">📥 Download Excel</button>
                    <button type="button" class="btn-secondary" onclick="document.getElementById('studentFormArea').innerHTML=''">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function updateExportFields() {
    const educationLevel = document.getElementById('exportEducationLevel').value;
    const classSelect = document.getElementById('exportClassSelect');
    const streamSelect = document.getElementById('exportStreamSelect');
    const departmentGroup = document.getElementById('exportDepartmentGroup');
    const sectionGroup = document.getElementById('exportSectionGroup');
    
    // Reset all fields
    classSelect.disabled = true;
    streamSelect.disabled = true;
    departmentGroup.style.display = 'none';
    document.getElementById('ttSectionGroup').style.display = 'none';
    sectionGroup.style.display = 'none';
    
    if (educationLevel && educationStructure[educationLevel]) {
        // Update Class dropdown
        classSelect.disabled = false;
        classSelect.innerHTML = '<option value="">Select Class</option>' +
            educationStructure[educationLevel].classes.map(c => 
                `<option value="${c}">${c}</option>`
            ).join('');
        
        // Update Stream dropdown
        streamSelect.disabled = false;
        streamSelect.innerHTML = '<option value="">Select Stream</option>' +
            educationStructure[educationLevel].streams.map(s => 
                `<option value="${s}">${s}</option>`
            ).join('');
        
        // Show Section for Intermediate
        if (educationLevel === 'Intermediate') {
            sectionGroup.style.display = 'block';
        }
        
        // Show Department for Graduation/Post Graduate
        if (educationLevel === 'Graduation' || educationLevel === 'Post Graduate') {
            departmentGroup.style.display = 'block';
            const deptSelect = document.getElementById('exportDepartmentSelect');
            deptSelect.innerHTML = '<option value="">All Departments</option>' +
                educationStructure[educationLevel].departments.map(d => 
                    `<option value="${d}">${d}</option>`
                ).join('');
        }
    }
}

function updateExportDepartmentSection() {
    const educationLevel = document.getElementById('exportEducationLevel').value;
    const stream = document.getElementById('exportStreamSelect').value;
    const sectionGroup = document.getElementById('exportSectionGroup');
    
    // Show Section only for Commerce stream in Graduation/Post Graduate
    if ((educationLevel === 'Graduation' || educationLevel === 'Post Graduate') && stream === 'Commerce') {
        sectionGroup.style.display = 'block';
    } else if (educationLevel === 'Intermediate') {
        sectionGroup.style.display = 'block';
    } else {
        sectionGroup.style.display = 'none';
    }
}

function exportStudentsToExcel(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const filters = {
        educationLevel: formData.get('educationLevel'),
        class: formData.get('class'),
        stream: formData.get('stream'),
        department: formData.get('department') || '',
        section: formData.get('section') || ''
    };
    
    // Filter students based on criteria
    let filteredStudents = students.filter(student => {
        let match = true;
        
        if (filters.educationLevel && student.educationLevel !== filters.educationLevel) match = false;
        if (filters.class && student.class !== filters.class) match = false;
        if (filters.stream && student.stream !== filters.stream) match = false;
        if (filters.department && student.department !== filters.department) match = false;
        if (filters.section && student.section !== filters.section) match = false;
        
        return match;
    });
    
    if (filteredStudents.length === 0) {
        alert('No students found with the selected criteria!');
        return;
    }
    
    // Prepare data for Excel
    const excelData = filteredStudents.map(student => ({
        'Roll Number': student.rollNo,
        'Student Name': student.studentName,
        'Father Name': student.fatherName,
        'Mother Name': student.motherName,
        'Email': student.email,
        'Contact Number': student.contactNo,
        'Address': student.address,
        'Education Level': student.educationLevel,
        'Class': student.class,
        'Stream': student.stream,
        'Department': student.department || 'N/A',
        'Section': student.section || 'N/A',
        'Admission Date': student.admissionDate,
        'Date of Birth': student.dob,
        'Gender': student.gender,
        'Blood Group': student.bloodGroup,
        'Caste': student.caste,
        'Religion': student.religion,
        'Nationality': student.nationality,
        'Total Fees': student.totalFees,
        'Paid Fees': student.paidFees,
        'Pending Fees': student.totalFees - student.paidFees
    }));
    
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Students Data');
    
    // Generate filename
    const filename = `Students_${filters.educationLevel}_${filters.class}_${filters.stream}_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    // Download file
    XLSX.writeFile(wb, filename);
    // Show success message
    document.getElementById('studentFormArea').innerHTML = `
        <div class="message success-message">
            ✅ Excel file downloaded successfully!<br>
            Found ${filteredStudents.length} student(s)<br>
            File: ${filename}
        </div>
    `;
    
    setTimeout(() => {
        document.getElementById('studentFormArea').innerHTML = '';
    }, 3000);
}



// ==========================================
// AUTOMATIC FACE DETECTION SYSTEM
// ==========================================

let autoDetectionInterval = null;
let detectionCount = 0;
let isAutoDetecting = false;

function toggleAutoDetection() {
    const toggle = document.getElementById('autoDetectToggle');
    isAutoDetecting = toggle.checked;
    
    if (isAutoDetecting) {
        startAutoDetection();
    } else {
        stopAutoDetection();
    }
}

function startAutoDetection() {
    const video = document.getElementById('cameraFeed');
    
    if (!video || !video.srcObject) {
        alert('⚠️ Please start the camera first!');
        document.getElementById('autoDetectToggle').checked = false;
        isAutoDetecting = false;
        return;
    }
    
    document.getElementById('detectionStatus').innerHTML = 
        '<span style="color: #4CAF50;">✅ Automatic detection started! Scanning every 3 seconds...</span>';
    
    // Scan every 3 seconds
    autoDetectionInterval = setInterval(() => {
        if (isAutoDetecting) {
            autoDetectAndMark();
        }
    }, 3000);
}

function stopAutoDetection() {
    if (autoDetectionInterval) {
        clearInterval(autoDetectionInterval);
        autoDetectionInterval = null;
    }
    
    document.getElementById('detectionStatus').innerHTML = 
        '<span style="color: #FF9800;">⏸️ Automatic detection paused</span>';
}

function autoDetectAndMark() {
    const video = document.getElementById('cameraFeed');
    const canvas = document.getElementById('faceCanvas');
    const context = canvas.getContext('2d');
    
    // Capture frame
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    // Update scan count
    detectionCount++;
    document.getElementById('detectionCount').textContent = detectionCount;
    document.getElementById('lastScan').textContent = new Date().toLocaleTimeString();
    
    // Simulate face detection (In real app, you'd use face-api.js or similar)
    const detectedStudent = simulateFaceRecognition();
    
    if (detectedStudent) {
        const success = markAttendanceForStudent(detectedStudent);
        
        if (success) {
            updateRecognizedList(detectedStudent);
            
            // Update detected count
            const currentCount = parseInt(document.getElementById('studentsDetected').textContent);
            document.getElementById('studentsDetected').textContent = currentCount + 1;
            
            // Flash success
            const status = document.getElementById('detectionStatus');
            status.innerHTML = `<span style="color: #4CAF50;">✅ Detected: ${detectedStudent.studentName} - Attendance marked!</span>`;
            
            // Play success sound (optional)
            playNotificationSound();
        }
    }
}

function playNotificationSound() {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Update markAttendanceForStudent to return success status
function markAttendanceForStudent(student) {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if already marked
    const existing = attendance.find(a => 
        a.rollNo === student.rollNo && a.date === today
    );
    
    if (!existing) {
        attendance.push({
            rollNo: student.rollNo,
            studentName: student.studentName,
            date: today,
            status: 'Present',
            markedBy: currentUser.username,
            method: 'Automatic Facial Recognition',
            timestamp: new Date().toLocaleTimeString()
        });
        
        return true; // Success
    }
    
    return false; // Already marked
}

// Update stopCamera to also stop auto detection
const originalStopCamera = stopCamera;
stopCamera = function() {
    stopAutoDetection();
    document.getElementById('autoDetectToggle').checked = false;
    isAutoDetecting = false;
    
    if (typeof originalStopCamera === 'function') {
        originalStopCamera();
    } else {
        // Fallback stop camera code
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
            document.getElementById('cameraFeed').srcObject = null;
            document.getElementById('detectionStatus').innerHTML = 
                '<span style="color: gray;">⏹️ Camera stopped</span>';
        }
    }
};


