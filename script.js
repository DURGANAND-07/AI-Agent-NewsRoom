// 1. Set Current Year
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Navbar Glass Effect on Scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    const navContainer = nav.querySelector('div > div');
    if (window.scrollY > 20) {
        navContainer.classList.add('bg-surfaceDark/80', 'backdrop-blur-md', 'shadow-lg', 'border-surfaceBorder');
        navContainer.classList.remove('mt-4');
        navContainer.classList.add('mt-2');
    } else {
        navContainer.classList.remove('bg-surfaceDark/80', 'backdrop-blur-md', 'shadow-lg', 'border-surfaceBorder');
        navContainer.classList.remove('mt-2');
        navContainer.classList.add('mt-4');
    }
});

// 3. Mobile 'Q' Toggle Menu Logic
const mobileToggle = document.getElementById("mobile-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        
        // Swap text for 'X' icon during dropdown
        if (mobileMenu.classList.contains("active")) {
            mobileToggle.innerHTML = '<i class="fa-solid fa-xmark text-[20px]"></i>';
        } else {
            mobileToggle.textContent = 'Q';
        }
    });
}

// Function to handle clicking links in mobile menu
window.scrollToSection = function(id) {
    document.getElementById(id).scrollIntoView({behavior: 'smooth'});
    // Close the menu automatically
    if (mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        mobileToggle.textContent = 'Q';
    }
};

// 4. Framer Motion Style Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('motion-show');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.motion-hidden, .motion-scale').forEach((el) => {
    observer.observe(el);
});

// 5. Scroll-Aware Looping Terminal Typing Effect (HERO)
const heroWords = ["Tech Intelligence.", "AI Orchestration.", "Agentic Workflows.", "Zero Hallucinations."];
let heroWordIndex = 0;
let heroCharIndex = 0;
let isDeleting = false;
let isHeroTypingPaused = false; // Flag to pause typing off-screen

const typeContainer = document.getElementById("typewriter-text");
const subText = document.getElementById("typewriter-sub");

function typeWriterLoop() {
    // If scrolled out of view, pause loop to save resources & prevent reflow bugs
    if (isHeroTypingPaused) {
        setTimeout(typeWriterLoop, 500);
        return;
    }

    const currentWord = heroWords[heroWordIndex];
    
    if (isDeleting) {
        typeContainer.innerHTML = currentWord.substring(0, heroCharIndex - 1);
        heroCharIndex--;
    } else {
        typeContainer.innerHTML = currentWord.substring(0, heroCharIndex + 1);
        heroCharIndex++;
    }

    let typeSpeed = isDeleting ? 40 : Math.floor(Math.random() * (100 - 50 + 1)) + 50;

    if (!isDeleting && heroCharIndex === currentWord.length) {
        typeSpeed = 3000;
        isDeleting = true;
        if(heroWordIndex === 0 && subText) {
             subText.classList.remove('opacity-0'); 
        }
    } else if (isDeleting && heroCharIndex === 0) {
        isDeleting = false;
        heroWordIndex = (heroWordIndex + 1) % heroWords.length;
        typeSpeed = 500; 
    }

    setTimeout(typeWriterLoop, typeSpeed);
}

// Observer to pause Hero typing when out of view
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isHeroTypingPaused = !entry.isIntersecting;
        });
    }, { threshold: 0.1 });
    heroObserver.observe(heroSection);
}

// Start hero typing loop
setTimeout(typeWriterLoop, 600);

// 6. Scroll-Triggered Typing Effect for Problem Section
const problemTermText = "root_cause_analysis";
const problemTermContainer = document.getElementById("term-text");
let problemTermIndex = 0;

function typeProblemTerm() {
    if (problemTermIndex < problemTermText.length) {
        problemTermContainer.innerHTML += problemTermText.charAt(problemTermIndex);
        problemTermIndex++;
        setTimeout(typeProblemTerm, 60);
    }
}

const termObserver = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
        setTimeout(typeProblemTerm, 500);
        termObserver.disconnect(); 
    }
});
const problemTermEl = document.getElementById('problem-term');
if (problemTermEl) termObserver.observe(problemTermEl);

// 7. Vanilla JS Tilt Effect for Feature Cards
window.handleTilt = function(e, el) {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

window.resetTilt = function(el) {
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
}

// Trigger initial animations
setTimeout(() => {
    document.querySelectorAll('.motion-hidden, .motion-scale').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('motion-show');
        }
    });
}, 100);

// 8. Chart.js Implementation
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('performanceChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Inter', sans-serif";
    
    const data = {
        labels: ['Manual Read', 'Quatidian AI'],
        datasets: [
            {
                label: 'Time Spent (Minutes)',
                data: [120, 2],
                backgroundColor: [
                    'rgba(255, 255, 255, 0.1)', 
                    'rgba(66, 133, 244, 0.9)'   
                ],
                borderColor: [
                    'rgba(255, 255, 255, 0.2)',
                    'rgb(66, 133, 244)'
                ],
                borderWidth: 1,
                borderRadius: 6,
                barPercentage: 0.6
            }
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(10, 25, 47, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#cbd5e1',
                    borderColor: 'rgba(66, 133, 244, 0.4)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' mins daily';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
                    ticks: { font: { size: 12 } }
                },
                x: {
                    grid: { display: false, drawBorder: false },
                    ticks: { font: { weight: '500', size: 14, family: "'Fira Code', monospace" }, color: '#e2e8f0' }
                }
            }
        }
    };

    new Chart(ctx, config);
});