// ==================================================================
// PHẦN 1: QUẢN LÝ DỮ LIỆU VÀ TRẠNG THÁI (Không thay đổi)
// ==================================================================
const defaultScheduleData = [
    { id: 1, day: 'mon', time: '6:45 - 7:45', title: '🏸 Cầu lông 1', location: 'Nhà thi đấu', type: 'school', description: 'Môn thể chất tự chọn, rèn luyện sức khỏe.' },
    { id: 2, day: 'mon', time: '8:25 - 10:05', title: '💻 PP tính & MATLAB', location: 'D9-201', type: 'school', teacher: 'PGS. TS. ABC', description: 'Học các phương pháp tính toán số và sử dụng phần mềm MATLAB để mô phỏng.', link: 'https://classroom.google.com/' },
    { id: 3, day: 'mon', time: '14:10 - 15:50', title: '💻 PP tính & MATLAB', location: 'TVTQB-922', type: 'school', teacher: 'PGS. TS. ABC', description: 'Thực hành trên máy các thuật toán đã học.', link: 'https://classroom.google.com/' },
    { id: 4, day: 'mon', time: '23:00 - 24:00', title: '🎮 Parsec', location: 'Online', type: 'personal', description: 'Chơi game cùng bạn bè.' },
    { id: 5, day: 'tue', time: '6:45 - 8:15', title: '⚡ Vật lý ĐC II', location: 'D9-301', type: 'school' },
    { id: 6, day: 'tue', time: '8:25 - 10:05', title: '📊 LT Xác suất thống kê', location: 'D9-101', type: 'school' },
    { id: 7, day: 'tue', time: '10:15 - 11:45', title: '📊 BT Xác suất thống kê', location: 'D9-101', type: 'school' },
    { id: 8, day: 'tue', time: '13:00 - 15:05', title: '⚡ Vật lý ĐC II', location: 'D3-506', type: 'school' },
    { id: 9, day: 'tue', time: '15:05 - 17:30', title: '📡 Tín hiệu & hệ thống', location: 'D4-404', type: 'school' },
    { id: 10, day: 'tue', time: '17:50 - 18:30', title: '🏸 Lab', location: 'Lab', type: 'school' },
    { id: 11, day: 'tue', time: '19:00 - 21:00', title: '📚 Gia sư Bình', location: 'Bình Công', type: 'tutor' },
    { id: 12, day: 'wed', time: '8:25 - 10:05', title: '⚡ BT Vật lý ĐC II', location: 'D3-405', type: 'school' },
    { id: 13, day: 'wed', time: '14:00 - 15:30', title: '🔌 LT mạch điện I', location: 'C7-E303', type: 'school' },
    { id: 14, day: 'wed', time: '15:30 - 16:30', title: '🏓 Bóng bàn 1', location: 'Nhà thi đấu', type: 'school' },
    { id: 15, day: 'wed', time: '19:30 - 21:30', title: '📚 Gia sư Linh', location: '????', type: 'tutor' },
    { id: 16, day: 'wed', time: '23:00 - 24:00', title: '🎮 Parsec', location: 'Online', type: 'personal' },
    { id: 17, day: 'thu', time: '6:45 - 9:10', title: '📖 TT Hồ Chí Minh', location: 'D3-5-301', type: 'school' },
    { id: 18, day: 'thu', time: '9:15 - 11:30', title: '📡 TN Tín hiệu & hệ thống', location: 'C7-E412', type: 'school' },
    { id: 19, day: 'thu', time: '12:30 - 14:55', title: '💼 Kỹ năng mềm', location: 'D5-304', type: 'school' },
    { id: 20, day: 'thu', time: '15:05 - 17:30', title: '🔌 LT mạch điện I', location: 'D7-203', type: 'school' },
    { id: 21, day: 'thu', time: '19:00 - 21:00', title: '📚 Gia sư Bình', location: 'Bình Công', type: 'tutor' },
    { id: 22, day: 'thu', time: '23:00 - 24:00', title: '🎮 Parsec', location: 'Online', type: 'personal' },
    { id: 23, day: 'fri', isSpecial: true, specialText: '✨<br>Relax Day!' },
    { id: 24, day: 'fri', time: '19:00 - 21:00', title: '📚 Gia sư Chi', location: 'Lĩnh Nam', type: 'personal' },
    { id: 25, day: 'sat', time: '14:00 - 16:00', title: '📚 Gia sư Vy', location: 'Đê La Thành', type: 'tutor' },
    { id: 26, day: 'sat', time: '23:00 - 24:00', title: '🎮 Parsec', location: 'Online', type: 'personal' },
    { id: 27, day: 'sun', isSpecial: true, specialText: '💖<br>Me Time!' },
    { id: 28, day: 'sun', time: '23:00 - 24:00', title: '🎮 Parsec', location: 'Online', type: 'personal' },
];
let scheduleData = [];
const editModal = document.getElementById('event-modal');
const form = document.getElementById('event-form');
const cancelBtn = document.getElementById('cancel-btn');
const isSpecialCheckbox = document.getElementById('is-special-event');
const normalEventFields = document.getElementById('normal-event-fields');
const specialEventFields = document.getElementById('special-event-fields');
const modalTitle = document.getElementById('modal-title');
const detailsModal = document.getElementById('details-modal');
const closeDetailsBtn = document.getElementById('close-details-btn');
const editEventBtn = document.getElementById('edit-event-btn');

function saveData() { localStorage.setItem('quantumSchedule', JSON.stringify(scheduleData)); }
function loadData() { const savedData = localStorage.getItem('quantumSchedule'); if (savedData && JSON.parse(savedData).length > 0) { scheduleData = JSON.parse(savedData); } else { scheduleData = defaultScheduleData; } }

// ==================================================================
// PHẦN 2: RENDER GIAO DIỆN (Không thay đổi)
// ==================================================================
function renderSchedule() {
    document.querySelectorAll('.event-card, .special-day').forEach(el => el.remove());
    scheduleData.forEach(event => {
        const column = document.querySelector(`.day-column[data-day="${event.day}"]`);
        if (!column) return;
        const cardElement = document.createElement('div');
        cardElement.dataset.id = event.id;
        if (event.isSpecial) {
            cardElement.className = 'event-card special-day';
            cardElement.innerHTML = `<div class="special-text">${event.specialText}</div><button class="delete-event-btn">×</button>`;
        } else {
            cardElement.className = `event-card ${event.type}`;
            cardElement.innerHTML = `<div class="event-badge"></div><div class="event-time">${event.time}</div><div class="event-title">${event.title}</div><div class="event-location">${event.location}</div><button class="delete-event-btn">×</button>`;
        }
        column.appendChild(cardElement);
    });
    addHoverListeners();
}

// ==================================================================
// PHẦN 3: XỬ LÝ SỰ KIỆN NGƯỜI DÙNG (Cập nhật lớn)
// ==================================================================

function showEditModal(day, eventId = null) {
    form.reset();
    isSpecialCheckbox.checked = false;
    isSpecialCheckbox.dispatchEvent(new Event('change'));
    if (eventId) {
        modalTitle.textContent = 'Chỉnh Sửa Sự Kiện';
        const eventToEdit = scheduleData.find(event => event.id === eventId);
        if (eventToEdit) populateForm(eventToEdit);
    } else {
        modalTitle.textContent = 'Thêm Sự Kiện Mới';
        form.querySelector('#event-day').value = day;
    }
    editModal.classList.add('visible');
}

function hideEditModal() { editModal.classList.remove('visible'); }

// CẬP NHẬT: Hàm này giờ sẽ điền tất cả các trường dữ liệu
function populateForm(event) {
    form.querySelector('#event-id').value = event.id;
    form.querySelector('#event-day').value = event.day;
    if (event.isSpecial) {
        isSpecialCheckbox.checked = true;
        specialEventFields.querySelector('#special-text').value = event.specialText;
    } else {
        isSpecialCheckbox.checked = false;
        normalEventFields.querySelector('#event-time').value = event.time;
        normalEventFields.querySelector('#event-title').value = event.title;
        normalEventFields.querySelector('#event-location').value = event.location;
        normalEventFields.querySelector('#event-type').value = event.type;
        // Điền các trường mới, nếu không có thì điền chuỗi rỗng
        normalEventFields.querySelector('#event-teacher').value = event.teacher || '';
        normalEventFields.querySelector('#event-description').value = event.description || '';
        normalEventFields.querySelector('#event-link').value = event.link || '';
    }
    isSpecialCheckbox.dispatchEvent(new Event('change'));
}

function showDetailsModal(eventId) {
    const event = scheduleData.find(e => e.id === eventId);
    if (!event) return;
    if (event.isSpecial) { showEditModal(null, eventId); return; }
    document.getElementById('details-title').textContent = event.title;
    document.getElementById('details-time').textContent = event.time;
    document.getElementById('details-location').textContent = event.location;
    const teacherWrapper = document.getElementById('details-teacher-wrapper');
    if (event.teacher) { document.getElementById('details-teacher').textContent = event.teacher; teacherWrapper.style.display = 'block'; } else { teacherWrapper.style.display = 'none'; }
    const descriptionWrapper = document.getElementById('details-description-wrapper');
    if (event.description) { document.getElementById('details-description').textContent = event.description; descriptionWrapper.style.display = 'block'; } else { descriptionWrapper.style.display = 'none'; }
    const linkBtn = document.getElementById('details-link');
    if (event.link) { linkBtn.href = event.link; linkBtn.classList.remove('hidden'); } else { linkBtn.classList.add('hidden'); }
    editEventBtn.dataset.eventId = eventId;
    detailsModal.classList.add('visible');
}

function hideDetailsModal() { detailsModal.classList.remove('visible'); }

document.querySelectorAll('.add-event-btn').forEach(btn => { btn.addEventListener('click', (e) => { e.stopPropagation(); showEditModal(btn.dataset.day); }); });
cancelBtn.addEventListener('click', hideEditModal);
editModal.addEventListener('click', (e) => { if (e.target === editModal) hideEditModal(); });
closeDetailsBtn.addEventListener('click', hideDetailsModal);
detailsModal.addEventListener('click', (e) => { if (e.target === detailsModal) hideDetailsModal(); });
editEventBtn.addEventListener('click', (e) => { const eventId = Number(e.target.dataset.eventId); hideDetailsModal(); showEditModal(null, eventId); });

isSpecialCheckbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    normalEventFields.style.display = isChecked ? 'none' : 'block';
    specialEventFields.style.display = isChecked ? 'block' : 'none';
    normalEventFields.querySelectorAll('input[required], select[required]').forEach(el => el.required = !isChecked);
    specialEventFields.querySelector('input').required = isChecked;
});

// CẬP NHẬT: Hàm submit giờ sẽ đọc và lưu tất cả các trường
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const eventId = Number(formData.get('id'));
    const isSpecial = formData.get('isSpecial') === 'on';
    let eventData;
    if (isSpecial) {
        eventData = { id: eventId || Date.now(), day: formData.get('day'), isSpecial: true, specialText: formData.get('specialText') };
    } else {
        eventData = {
            id: eventId || Date.now(),
            day: formData.get('day'),
            time: formData.get('time'),
            title: formData.get('title'),
            location: formData.get('location'),
            type: formData.get('type'),
            teacher: formData.get('teacher'),
            description: formData.get('description'),
            link: formData.get('link'),
        };
    }
    if (eventId) {
        const eventIndex = scheduleData.findIndex(event => event.id === eventId);
        if (eventIndex > -1) scheduleData[eventIndex] = eventData;
    } else {
        scheduleData.push(eventData);
    }
    saveData();
    renderSchedule();
    hideEditModal();
});

document.getElementById('timetable-container').addEventListener('click', (e) => {
    const card = e.target.closest('.event-card, .special-day');
    if (!card) return;
    const deleteBtn = e.target.closest('.delete-event-btn');
    if (deleteBtn) {
        const eventId = Number(card.dataset.id);
        scheduleData = scheduleData.filter(event => event.id !== eventId);
        saveData();
        renderSchedule();
    } else {
        const eventId = Number(card.dataset.id);
        showDetailsModal(eventId);
    }
});

// ==================================================================
// PHẦN 3.1: LOGIC CHO RESPONSIVE TABS (Thêm mới)
// ==================================================================
const mobileNavButtons = document.querySelectorAll('.mobile-nav .nav-btn');
const dayColumns = document.querySelectorAll('.timetable-container .day-column');

function setActiveDay(day) {
    // Cập nhật trạng thái active cho các nút nav
    mobileNavButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.day === day);
    });

    // Cập nhật trạng thái active cho các cột ngày
    dayColumns.forEach(col => {
        col.classList.toggle('active', col.dataset.day === day);
    });
}

mobileNavButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        setActiveDay(btn.dataset.day);
    });
});

// Hàm khởi tạo trạng thái ban đầu cho mobile
function initializeMobileView() {
    if (window.innerWidth <= 1024) {
        // Mặc định hiển thị thứ Hai khi vào trang trên mobile
        setActiveDay('mon');
    } else {
        // Trên desktop, hiển thị tất cả các cột
        dayColumns.forEach(col => col.classList.remove('active'));
    }
}


// ==================================================================
// PHẦN 4: KHỞI TẠO VÀ CÁC HIỆU ỨNG GỐC (Không thay đổi)
// ==================================================================
const loader = document.getElementById('loader'); 
const clock = document.getElementById('clock'); 
const cursor = document.querySelector('.cursor'); 
const auroraCanvas = document.getElementById('aurora-canvas'); 
const particleCanvas = document.getElementById('particle-canvas'); 
const pCtx = particleCanvas.getContext('2d'); 
const gl = auroraCanvas.getContext('webgl'); 
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; 
let particles = []; 
let isHyperspaceActive = false; 

function init() { 
    setTimeout(() => loader.classList.add('hidden'), 1000); 
    updateClock(); 
    setInterval(updateClock, 1000); 
    loadData();
    renderSchedule();
    initializeMobileView();
    window.addEventListener('mousemove', onMouseMove); 
    window.addEventListener('mousedown', () => { isHyperspaceActive = true; }); 
    window.addEventListener('mouseup', () => { isHyperspaceActive = false; }); 
    initWebGL(); 
    resize(); 
    window.addEventListener('resize', resize); 
    animate(); 
} 

function resize() { 
    auroraCanvas.width = particleCanvas.width = window.innerWidth; 
    auroraCanvas.height = particleCanvas.height = window.innerHeight; 
    if (gl) gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); 
    createParticles(); 
    initializeMobileView();
} 

function updateClock() { 
    clock.textContent = new Date().toLocaleTimeString('en-GB'); 
} 

function onMouseMove(e) { 
    mouse.x = e.clientX; 
    mouse.y = e.clientY; 
    gsap.to(cursor, { duration: 0.3, x: mouse.x, y: mouse.y, ease: "power2.out" }); 
} 

function addHoverListeners() { 
    document.querySelectorAll('.event-card, .day-header, .add-event-btn, .delete-event-btn, .form-buttons button, .btn-link').forEach(el => { 
        el.addEventListener('mouseenter', () => cursor.classList.add('grow')); 
        el.addEventListener('mouseleave', () => cursor.classList.remove('grow')); 
    }); 
} 

function createParticles() { 
    particles = []; 
    let numberOfParticles = (particleCanvas.width * particleCanvas.height) / 15000; 
    for (let i = 0; i < numberOfParticles; i++) { 
        particles.push(new Particle()); 
    } 
} 

class Particle { 
    constructor() { this.x = Math.random() * particleCanvas.width; this.y = Math.random() * particleCanvas.height; this.size = Math.random() * 1.5 + 0.5; this.speedX = (Math.random() * 0.4) - 0.2; this.speedY = (Math.random() * 0.4) - 0.2; this.opacity = Math.random() * 0.5 + 0.3; this.prevX = this.x; this.prevY = this.y; } 
    update() { this.prevX = this.x; this.prevY = this.y; if (isHyperspaceActive) { let dx = mouse.x - this.x; let dy = mouse.y - this.y; this.speedX += dx * 0.005; this.speedY += dy * 0.005; this.speedX *= 0.95; this.speedY *= 0.95; } else { const mouseRadius = 150; let dx = mouse.x - this.x; let dy = mouse.y - this.y; let distance = Math.sqrt(dx * dx + dy * dy); if (distance < mouseRadius) { const force = (mouseRadius - distance) / mouseRadius; this.x -= (dx / distance) * force * 2; this.y -= (dy / distance) * force * 2; } } this.x += this.speedX; this.y += this.speedY; if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1; if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1; } 
    draw() { if (isHyperspaceActive) { pCtx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`; pCtx.lineWidth = this.size; pCtx.beginPath(); pCtx.moveTo(this.prevX, this.prevY); pCtx.lineTo(this.x, this.y); pCtx.stroke(); } else { pCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; pCtx.beginPath(); pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2); pCtx.fill(); } } 
} 

function connectParticles() { const connectDistance = particleCanvas.width / 10; for (let a = 0; a < particles.length; a++) { for (let b = a; b < particles.length; b++) { let dx = particles[a].x - particles[b].x; let dy = particles[a].y - particles[b].y; let distance = Math.sqrt(dx * dx + dy * dy); if (distance < connectDistance) { const opacity = 1 - (distance / connectDistance); pCtx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`; pCtx.lineWidth = 0.5; pCtx.beginPath(); pCtx.moveTo(particles[a].x, particles[a].y); pCtx.lineTo(particles[b].x, particles[b].y); pCtx.stroke(); } } } } 

function handleCanvas2D() { pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height); for (let i = 0; i < particles.length; i++) { particles[i].update(); particles[i].draw(); } if (!isHyperspaceActive) { connectParticles(); } } 

let time = 0, program, uTime, uResolution; 

function initWebGL() { if (!gl) return; const vsSource = document.getElementById('vertex-shader').textContent; const fsSource = document.getElementById('fragment-shader').textContent; const vs = compileShader(gl.VERTEX_SHADER, vsSource); const fs = compileShader(gl.FRAGMENT_SHADER, fsSource); program = gl.createProgram(); gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program); gl.useProgram(program); const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW); const aPosition = gl.getAttribLocation(program, 'a_position'); gl.enableVertexAttribArray(aPosition); gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0); uTime = gl.getUniformLocation(program, 'u_time'); uResolution = gl.getUniformLocation(program, 'u_resolution'); } 

function compileShader(type, source) { const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader); return shader; } 

function renderWebGL(now) { if (!gl) return; time = now / 1000; gl.uniform1f(uTime, time); gl.uniform2f(uResolution, gl.canvas.width, gl.canvas.height); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); } 

function animate(now) { handleCanvas2D(); renderWebGL(now); requestAnimationFrame(animate); } 

init();