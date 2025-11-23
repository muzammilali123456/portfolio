function updateClock() {
    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    
    document.getElementById('header-clock').textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    document.getElementById('header-date').textContent = dateString;
}

updateClock();
setInterval(updateClock, 1000);

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.classList.toggle('hidden');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    
    document.addEventListener('click', function(event) {
        const mobileNav = document.getElementById('mobile-nav');
        const hamburgerBtn = document.getElementById('hamburger-btn');
        
        if (!mobileNav.contains(event.target) && !hamburgerBtn.contains(event.target) && !mobileNav.classList.contains('hidden')) {
            closeMobileMenu();
        }
    });
});

AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.opacity = Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.2 + 0.3;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#6C63FF';
        ctx.fill();
        ctx.restore();
    }
}

function initParticles() {
    particles = [];
    const particleCount = Math.min(50, Math.floor(canvas.width / 20));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0D0D0D');
    gradient.addColorStop(1, '#1a0d2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    animationId = requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
    closeMobileMenu();
}

function downloadCV() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setProperties({
        title: 'Syed Muzammil Ali - CV',
        subject: 'Curriculum Vitae',
        author: 'Syed Muzammil Ali',
        keywords: 'CV, Resume, Full Stack Developer',
        creator: 'Syed Muzammil Ali Portfolio'
    });
    
    doc.setFontSize(22);
    doc.setTextColor(108, 99, 255);
    doc.text('SYED MUZAMMIL ALI', 20, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Full Stack Developer', 20, 40);
    doc.text('Phone: 03702440472 | Email: syedmuzammilail624@gmail.com', 20, 50);
    doc.text('GitHub: https://github.com/muzammilail123456', 20, 60);
    
    doc.setFontSize(16);
    doc.setTextColor(108, 99, 255);
    doc.text('ABOUT ME', 20, 80);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const aboutText = "Motivated and curious AI driven web developer and digital creator eager to join GNV.AI as a Vibe Coding Intern. Passionate about blending creativity, technology, and AI-assisted workflows to build modern digital solutions. Looking to grow through hands-on collaboration, real world projects, and community innovation.";
    doc.text(aboutText, 20, 90, { maxWidth: 170 });
    
    doc.setFontSize(16);
    doc.setTextColor(108, 99, 255);
    doc.text('SKILLS', 20, 130);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('• Web Development: HTML5, CSS3, Tailwind CSS, React, Node.js', 20, 140);
    doc.text('• Programming Languages: Python, JavaScript, C++', 20, 147);
    doc.text('• Databases: MySQL, SQL (Queries, Data Structuring, Optimization)', 20, 154);
    doc.text('• Cloud Technologies: Basic knowledge of cloud hosting, deployment, and database integration', 20, 161);
    doc.text('• AI & Automation: Familiar with AI tools, workflow automation, and prompt based development', 20, 168);
    doc.text('• CMS & Design: WordPress (Astra Theme Customization), Canva, Adobe Illustrator and Figma', 20, 175);
    doc.text('• Version Control: Git, GitHub', 20, 182);
    doc.text('• Productivity Tools: Microsoft Office, Meta Business Suite', 20, 189);
    
    doc.setFontSize(16);
    doc.setTextColor(108, 99, 255);
    doc.text('CERTIFICATES', 20, 210);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('• Web Development - Saylani Mass IT Training', 20, 220);
    doc.text('• Web Scraping in Python - Udemy (Frank Andrade)', 20, 227);
    
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(108, 99, 255);
    doc.text('PROJECTS / EXPERIENCE', 20, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    const projects = [
        {
            title: "Freelance Digital Marketer & Web Developer",
            description: "Developed and customized multiple WordPress websites for clothing brands, coaching institutes, and schools. Managed social media marketing campaigns for schools and clothing brands, improving brand visibility and engagement. Designed prototypes for educational websites using HTML, CSS, and JavaScript. Created marketing strategies, posts, and ad designs for Facebook & Instagram. Worked with clients like Sage School, Dzehra Clothing Brand, and ATS Group (Water Filtration Company). Conducted a WordPress training session for students, teaching website setup, theme customization, and basic development tools."
        },
        {
            title: "Web Scraping Intern - Swiss Tech Company",
            description: "Scraped multiple e-commerce websites using Python, Scrapy & Selenium. Ensured structured, clean, and accurate datasets for analysis. Collaborated remotely with team members to meet project deadlines."
        },
        {
            title: "School Website Prototype",
            description: "Designed and developed a functional website prototype for a school using HTML, CSS, and JavaScript, focusing on responsive design and easy navigation."
        },
        {
            title: "Coaching Institute Website and SMM",
            description: "Built a customized website for a coaching institute to showcase services, courses, and admission details with a modern UI/UX and also managed their social media."
        },
        {
            title: "Sage School",
            description: "Managed and executed Facebook and Instagram marketing campaigns for Sage School, including content creation, ad design, and audience targeting to boost engagement."
        },
        {
            title: "Dzehra Clothing Brand Website",
            description: "Developed a e-commerce website using HTML CSS JS REACT TALWAND SQL NODE.JS for Dzehra Clothing Brand and handled social media marketing, increasing brand visibility and customer engagement."
        },
        {
            title: "ATS Group",
            description: "Worked on brand development (using wordpress) and digital marketing strategies for ATS Group, a water filtration company, including creative content design and awareness campaigns."
        },
        {
            title: "Jarvis AI Virtual Assistant",
            description: "Developed a personal AI based assistant (Jarvis) using Python that can perform multiple automated tasks such as opening applications, browsing the internet, fetching information, sending emails, and responding to voice commands. The project showcases integration of speech recognition, text-to-speech, and automation libraries, reflecting strong problem-solving and programming skills."
        },
        {
            title: "Automated Web Interaction & Data Extraction System",
            description: "Selenium, Python, PostgreSQL Automated login, navigation, and form handling on JS-heavy sites using Selenium WebDriver. Extracted structured data with advanced wait strategies and stored in PostgreSQL. Implemented logging for resilient, hands-free scraping workflows."
        },
        {
            title: "End Cloud Data Pipeline (Batch ETL)",
            description: "Python, AWS S3, Snowflake, Apache Airflow Built a cloud-based ETL pipeline that extracts crypto data from CoinGecko API, transforms it using Python, and stores raw & cleaned data in AWS S3. Automated data ingestion into Snowflake with Apache Airflow on AWS EC2 for scheduling and orchestration. Designed Airflow DAGs ensuring reliable, production-grade data workflows."
        }
    ];
    
    let yPosition = 40;
    projects.forEach(project => {
        doc.setFontSize(11);
        doc.setTextColor(108, 99, 255);
        doc.text(project.title, 20, yPosition);
        
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        const lines = doc.splitTextToSize(project.description, 170);
        doc.text(lines, 20, yPosition + 7);
        
        yPosition += 7 + (lines.length * 5) + 5;
        
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 30;
        }
    });
    
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(108, 99, 255);
    doc.text('EDUCATION', 20, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('• GBSS mailr Kalaboard - Matriculation computer science (Completed)', 20, 40);
    doc.text('• Govt S.M College - Intermediate in computer science (In Progress)', 20, 47);
    
    doc.save('Syed_Muzammil_Ali_CV.pdf');
}

function viewProject(projectName) {
    alert(`Project link placeholder for: ${projectName}\nPlease replace with actual project URL.`);
}

function viewCode() {
    alert('Code repository link placeholder.\nPlease replace with actual GitHub URL.');
}

function sendMessage() {
    const subject = encodeURIComponent('Project Discussion');
    const body = encodeURIComponent('Hi Syed Muzammil Ali,\n\nI would like to discuss a project with you.\n\nBest regards');
    window.location.href = `mailto:syedmuzammilali624@gmail.com?subject=${subject}&body=${body}`;
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('backdrop-blur-lg');
        header.style.background = 'rgba(13, 13, 13, 0.9)';
    } else {
        header.classList.remove('backdrop-blur-lg');
        header.style.background = 'var(--glass-bg)';
    }
});

const typewriterText = "A Passionate Full Stack Developer";
const typewriterElement = document.querySelector('.typewriter');

function typeWriter(element, text, i = 0) {
    if (i < text.length) {
        element.innerHTML = text.substring(0, i + 1);
        setTimeout(() => typeWriter(element, text, i + 1), 100);
    }
}

window.addEventListener('load', function() {
    setTimeout(() => {
        if (typewriterElement) {
            typeWriter(typewriterElement, typewriterText);
        }
    }, 2000);
});

const dragonCanvas = document.getElementById('dragon-canvas');
const dragonCtx = dragonCanvas.getContext('2d');
const cursor = document.querySelector('.cursor');

dragonCanvas.width = window.innerWidth;
dragonCanvas.height = window.innerHeight;

let mouseX = dragonCanvas.width / 2;
let mouseY = dragonCanvas.height / 2;

class Dragon {
    constructor() {
        this.segments = [];
        this.segmentCount = 12;
        this.segmentLength = 25;
        
        for (let i = 0; i < this.segmentCount; i++) {
            this.segments.push({
                x: dragonCanvas.width / 2,
                y: dragonCanvas.height / 2,
                angle: 0
            });
        }
        
        this.wingFlap = 0;
        this.fireParticles = [];
    }
    
    update(targetX, targetY) {
        let dx = targetX - this.segments[0].x;
        let dy = targetY - this.segments[0].y;
        let angle = Math.atan2(dy, dx);
        
        this.segments[0].x += dx * 0.1;
        this.segments[0].y += dy * 0.1;
        this.segments[0].angle = angle;
        
        for (let i = 1; i < this.segmentCount; i++) {
            let seg = this.segments[i];
            let prevSeg = this.segments[i - 1];
            
            dx = prevSeg.x - seg.x;
            dy = prevSeg.y - seg.y;
            angle = Math.atan2(dy, dx);
            
            seg.x = prevSeg.x - Math.cos(angle) * this.segmentLength;
            seg.y = prevSeg.y - Math.sin(angle) * this.segmentLength;
            seg.angle = angle;
        }
        
        this.wingFlap += 0.15;
        
        if (Math.random() < 0.3) {
            this.fireParticles.push({
                x: this.segments[0].x,
                y: this.segments[0].y,
                vx: Math.cos(this.segments[0].angle) * 2 + (Math.random() - 0.5) * 2,
                vy: Math.sin(this.segments[0].angle) * 2 + (Math.random() - 0.5) * 2,
                life: 1,
                size: Math.random() * 6 + 3
            });
        }
        
        this.fireParticles = this.fireParticles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            p.size *= 0.97;
            return p.life > 0;
        });
    }
    
    draw() {
        this.fireParticles.forEach(p => {
            const gradient = dragonCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            gradient.addColorStop(0, `rgba(255, 200, 50, ${p.life})`);
            gradient.addColorStop(0.5, `rgba(255, 100, 0, ${p.life * 0.5})`);
            gradient.addColorStop(1, `rgba(255, 0, 0, 0)`);
            
            dragonCtx.fillStyle = gradient;
            dragonCtx.beginPath();
            dragonCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            dragonCtx.fill();
        });
        
        for (let i = this.segmentCount - 1; i >= 0; i--) {
            const seg = this.segments[i];
            const size = 20 - (i * 1.2);
            
            const gradient = dragonCtx.createRadialGradient(seg.x, seg.y, 0, seg.x, seg.y, size);
            gradient.addColorStop(0, '#ff4757');
            gradient.addColorStop(0.5, '#d63031');
            gradient.addColorStop(1, '#8b0000');
            
            dragonCtx.fillStyle = gradient;
            dragonCtx.beginPath();
            dragonCtx.arc(seg.x, seg.y, size, 0, Math.PI * 2);
            dragonCtx.fill();
            
            dragonCtx.strokeStyle = '#550000';
            dragonCtx.lineWidth = 2;
            dragonCtx.stroke();
            
            if (i % 3 === 0 && i > 0) {
                dragonCtx.fillStyle = '#8b0000';
                dragonCtx.beginPath();
                dragonCtx.moveTo(seg.x, seg.y);
                dragonCtx.lineTo(
                    seg.x + Math.cos(seg.angle + Math.PI / 2) * size * 0.7,
                    seg.y + Math.sin(seg.angle + Math.PI / 2) * size * 0.7
                );
                dragonCtx.lineTo(
                    seg.x + Math.cos(seg.angle) * size * 1.5,
                    seg.y + Math.sin(seg.angle) * size * 1.5
                );
                dragonCtx.closePath();
                dragonCtx.fill();
            }
        }
        
        const head = this.segments[0];
        const headSize = 22;
        
        const headGradient = dragonCtx.createRadialGradient(head.x, head.y, 0, head.x, head.y, headSize);
        headGradient.addColorStop(0, '#ff6348');
        headGradient.addColorStop(0.7, '#e74c3c');
        headGradient.addColorStop(1, '#c0392b');
        
        dragonCtx.fillStyle = headGradient;
        dragonCtx.beginPath();
        dragonCtx.arc(head.x, head.y, headSize, 0, Math.PI * 2);
        dragonCtx.fill();
        
        dragonCtx.fillStyle = '#ffeb3b';
        dragonCtx.beginPath();
        dragonCtx.arc(
            head.x + Math.cos(head.angle + 0.3) * 12,
            head.y + Math.sin(head.angle + 0.3) * 12,
            4, 0, Math.PI * 2
        );
        dragonCtx.fill();
        
        dragonCtx.fillStyle = '#000';
        dragonCtx.beginPath();
        dragonCtx.arc(
            head.x + Math.cos(head.angle + 0.3) * 12,
            head.y + Math.sin(head.angle + 0.3) * 12,
            2, 0, Math.PI * 2
        );
        dragonCtx.fill();
        
        dragonCtx.fillStyle = '#8b0000';
        dragonCtx.beginPath();
        dragonCtx.moveTo(
            head.x + Math.cos(head.angle - 0.5) * 15,
            head.y + Math.sin(head.angle - 0.5) * 15
        );
        dragonCtx.lineTo(
            head.x + Math.cos(head.angle - 0.3) * 25,
            head.y + Math.sin(head.angle - 0.3) * 25
        );
        dragonCtx.lineTo(
            head.x + Math.cos(head.angle) * 20,
            head.y + Math.sin(head.angle) * 20
        );
        dragonCtx.closePath();
        dragonCtx.fill();
        
        dragonCtx.beginPath();
        dragonCtx.moveTo(
            head.x + Math.cos(head.angle + 0.5) * 15,
            head.y + Math.sin(head.angle + 0.5) * 15
        );
        dragonCtx.lineTo(
            head.x + Math.cos(head.angle + 0.3) * 25,
            head.y + Math.sin(head.angle + 0.3) * 25
        );
        dragonCtx.lineTo(
            head.x + Math.cos(head.angle) * 20,
            head.y + Math.sin(head.angle) * 20
        );
        dragonCtx.closePath();
        dragonCtx.fill();
        
        for (let i = 1; i < 4; i++) {
            const seg = this.segments[i * 2];
            const wingSize = 30 - (i * 5);
            const flapOffset = Math.sin(this.wingFlap) * 0.5;
            
            dragonCtx.fillStyle = 'rgba(139, 0, 0, 0.6)';
            dragonCtx.beginPath();
            dragonCtx.moveTo(seg.x, seg.y);
            dragonCtx.lineTo(
                seg.x + Math.cos(seg.angle + Math.PI / 2 + flapOffset) * wingSize,
                seg.y + Math.sin(seg.angle + Math.PI / 2 + flapOffset) * wingSize
            );
            dragonCtx.lineTo(
                seg.x + Math.cos(seg.angle + Math.PI / 3 + flapOffset) * wingSize * 1.5,
                seg.y + Math.sin(seg.angle + Math.PI / 3 + flapOffset) * wingSize * 1.5
            );
            dragonCtx.closePath();
            dragonCtx.fill();
            
            dragonCtx.beginPath();
            dragonCtx.moveTo(seg.x, seg.y);
            dragonCtx.lineTo(
                seg.x + Math.cos(seg.angle - Math.PI / 2 - flapOffset) * wingSize,
                seg.y + Math.sin(seg.angle - Math.PI / 2 - flapOffset) * wingSize
            );
            dragonCtx.lineTo(
                seg.x + Math.cos(seg.angle - Math.PI / 3 - flapOffset) * wingSize * 1.5,
                seg.y + Math.sin(seg.angle - Math.PI / 3 - flapOffset) * wingSize * 1.5
            );
            dragonCtx.closePath();
            dragonCtx.fill();
        }
    }
}

const dragon = new Dragon();

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

window.addEventListener('resize', () => {
    dragonCanvas.width = window.innerWidth;
    dragonCanvas.height = window.innerHeight;
});

function animateDragon() {
    dragonCtx.clearRect(0, 0, dragonCanvas.width, dragonCanvas.height);
    
    dragon.update(mouseX, mouseY);
    dragon.draw();
    
    requestAnimationFrame(animateDragon);
}

animateDragon();