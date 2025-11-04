// Digital Clock Functionality
function updateClock() {
    const now = new Date();
    
    // Time formatting
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    
    // Add leading zeros
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    
    // Update header clock display
    document.getElementById('header-clock').textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    
    // Date formatting for header
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    document.getElementById('header-date').textContent = dateString;
}

// Initialize clock and update every second
updateClock();
setInterval(updateClock, 1000);

// Mobile Menu Functionality
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.classList.toggle('hidden');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.classList.add('hidden');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileNav = document.getElementById('mobile-nav');
        const hamburgerBtn = document.getElementById('hamburger-btn');
        
        if (!mobileNav.contains(event.target) && !hamburgerBtn.contains(event.target) && !mobileNav.classList.contains('hidden')) {
            closeMobileMenu();
        }
    });
});

// AOS Initialization
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Particles Animation
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

// Navigation Functions
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
    closeMobileMenu();
}

function downloadCV() {
    alert('Please replace this with your actual CV file path');
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

// Scroll effect for header
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

// Typewriter effect
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

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});