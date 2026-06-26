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
        if (mobileMenu.classList.contains("active")) {
            mobileToggle.innerHTML = '<i class="fa-solid fa-xmark text-[20px]"></i>';
        } else {
            mobileToggle.textContent = 'Q';
        }
    });
}

window.scrollToSection = function(id) {
    document.getElementById(id).scrollIntoView({behavior: 'smooth'});
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
let isHeroTypingPaused = false; 

const typeContainer = document.getElementById("typewriter-text");
const subText = document.getElementById("typewriter-sub");

function typeWriterLoop() {
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

const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isHeroTypingPaused = !entry.isIntersecting;
        });
    }, { threshold: 0.1 });
    heroObserver.observe(heroSection);
}
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
                backgroundColor: ['rgba(255, 255, 255, 0.1)', 'rgba(66, 133, 244, 0.9)'],
                borderColor: ['rgba(255, 255, 255, 0.2)', 'rgb(66, 133, 244)'],
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
                        label: function(context) { return context.parsed.y + ' mins daily'; }
                    }
                }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false }, ticks: { font: { size: 12 } } },
                x: { grid: { display: false, drawBorder: false }, ticks: { font: { weight: '500', size: 14, family: "'Fira Code', monospace" }, color: '#e2e8f0' } }
            }
        }
    };
    new Chart(ctx, config);
});

// 9. Main n8n Webhook Form Submission
const subscribeForm = document.getElementById('n8n-subscribe-form');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const name = document.getElementById('subscriber-name').value;
        const email = document.getElementById('subscriber-email').value;
        const interest = document.getElementById('subscriber-interest').value; 
        const wantsUpdates = document.getElementById('subscriber-updates').checked; 
        
        const btn = document.getElementById('subscribe-btn');
        const btnText = document.getElementById('btn-text');
        const btnIcon = document.getElementById('btn-icon');
        const statusText = document.getElementById('form-status');
        
        // --- REPLACE WITH YOUR PikaPods n8n PRODUCTION WEBHOOK URL ---
        const webhookUrl ="https://myn8n.pikapod.net/webhook-test/register "; 
        btn.disabled = true;
        btn.classList.add('opacity-70', 'cursor-not-allowed');
        btnText.textContent = "Authenticating...";
        btnIcon.className = "fa-solid fa-circle-notch fa-spin text-sm";
        statusText.classList.add('hidden');
        // Honeypot Check
const trapField = document.getElementById('bot-trap').value;
if (trapField !== "") {
    // It's a bot! Silently reject them without hitting your n8n server.
    console.log("Bot detected. Silently dropping request.");
    btn.disabled = false;
    btn.classList.remove('opacity-70', 'cursor-not-allowed');
    btnText.textContent = "Verify Your Email"; // Fake success message to fool the bot
    return; 
}
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: name, 
                    email: email, 
                    interest: interest,
                    wantsUpdates: wantsUpdates 
                }) 
            });


if (response.ok) {
    // Change text to clearly state the next action
    btnText.textContent = "Check Your Inbox"; 
    
    // Stop the spinner. Change the icon to a static envelope or checkmark
    // Assuming you are using FontAwesome based on your previous code
    btnIcon.className = "fa-solid fa-envelope text-sm"; 
    
    btn.classList.remove('btn-glass-blue', 'opacity-70', 'cursor-not-allowed');
    btn.classList.add('bg-green-500/20', 'border-green-500/40', 'text-green-400');

    statusText.textContent = "Don't be a Pending User! Check your inbox for the verification link.";
    statusText.className = "text-sm font-mono text-center mt-3 text-orange-400 block animate-pulse";
    
    subscribeForm.reset();
}

else {
     throw new Error('Server rejected request');
            }
        } catch (error) {
            btn.disabled = false;
            btn.classList.remove('opacity-70', 'cursor-not-allowed');
            btnText.textContent = "Connection Failed - Try Again";
            btnIcon.className = "fa-solid fa-triangle-exclamation text-sm";
            statusText.textContent = "Error communicating with server. Please try again.";
            statusText.className = "text-sm font-mono text-center mt-3 text-red-400 block";
        }
    });
}

// 10. Modal Logic & n8n Webhook Revoke Form Submission
const revokeModal = document.getElementById('revoke-modal');
const revokeModalContent = document.getElementById('revoke-modal-content');
const openRevokeBtn = document.getElementById('open-revoke-modal');
const closeRevokeBtn = document.getElementById('close-revoke-modal');
const revokeForm = document.getElementById('n8n-revoke-form');

// Handle Modal Open/Close
if (openRevokeBtn && revokeModal && closeRevokeBtn) {
    openRevokeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        revokeModal.classList.remove('opacity-0', 'pointer-events-none');
        revokeModalContent.classList.remove('scale-95');
        revokeModalContent.classList.add('scale-100');
    });

    closeRevokeBtn.addEventListener('click', () => {
        revokeModal.classList.add('opacity-0', 'pointer-events-none');
        revokeModalContent.classList.remove('scale-100');
        revokeModalContent.classList.add('scale-95');
    });
    
    // Close modal if user clicks outside the box
    revokeModal.addEventListener('click', (e) => {
        if (e.target === revokeModal) {
            closeRevokeBtn.click();
        }
    });
}

// Handle Revoke Form Submission
if (revokeForm) {
    revokeForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const name = document.getElementById('revoke-name').value;
        const email = document.getElementById('revoke-email').value;
        const reason = document.getElementById('revoke-reason').value;
        
        const btn = document.getElementById('revoke-btn');
        const btnText = document.getElementById('revoke-btn-text');
        const btnIcon = document.getElementById('revoke-btn-icon');
        const statusText = document.getElementById('revoke-form-status');
        
        // --- REPLACE WITH YOUR SECOND n8n WEBHOOK URL (For the Deletion Workflow) ---
        const revokeWebhookUrl = "YOUR_REVOKE_WEBHOOK_URL_HERE"; 
        
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
        btnText.textContent = "Processing...";
        btnIcon.className = "fa-solid fa-circle-notch fa-spin text-xs";
        statusText.classList.add('hidden');
        
        try {
            const response = await fetch(revokeWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, email: email, reason: reason }) 
            });
            
            if (response.ok) {
                btnText.textContent = "Wipe Executed";
                btnIcon.className = "fa-solid fa-check text-xs";
                
                statusText.textContent = "Data queued for deletion. Closing terminal...";
                statusText.className = "text-xs font-mono text-center mt-3 text-red-400 block animate-pulse";
                
                revokeForm.reset(); 
                
                // Auto close modal after success
                setTimeout(() => {
                    closeRevokeBtn.click();
                    btn.disabled = false;
                    btn.classList.remove('opacity-50', 'cursor-not-allowed');
                    btnText.textContent = "Execute Data Wipe";
                    btnIcon.className = "fa-solid fa-skull text-xs";
                    statusText.classList.add('hidden');
                }, 3000);
                
            } else {
                throw new Error('Server rejected request');
            }
        } catch (error) {
            btn.disabled = false;
            btn.classList.remove('opacity-50', 'cursor-not-allowed');
            btnText.textContent = "Failed - Try Again";
            btnIcon.className = "fa-solid fa-triangle-exclamation text-xs";
            
            statusText.textContent = "Error connecting to servers.";
            statusText.className = "text-xs font-mono text-center mt-3 text-red-400 block";
        }
    });
}
