document.addEventListener('DOMContentLoaded', function() {
    // Tab switching function
    window.opentab = function(tabname) {
        var tablinks = document.getElementsByClassName("tab-links");
        var tabcontents = document.getElementsByClassName("tab-contents");

        for (var tablink of tablinks) {
            tablink.classList.remove("active-link");
        }
        for (var tabcontent of tabcontents) {
            tabcontent.classList.remove("active-tab");
        }
        
        if (event && event.currentTarget) {
            event.currentTarget.classList.add("active-link");
        }
        
        var targetContent = document.getElementById(tabname);
        if (targetContent) {
            targetContent.classList.add("active-tab");
        }
    };

    // Typed.js animation
    var typed = new Typed(".auto-input", {
        strings: ["Navin Kumar Singh", "Microsoft Certified", "Data Analyst"],
        typeSpeed: 100,
        backSpeed: 100,
        loop: true
    });
});

// Mobile menu toggle functions
window.openmenu = function() {
    var sidemenu = document.getElementById("sidemenu");
    if (sidemenu) {
        sidemenu.style.right = "0";
    }
};

window.closemenu = function() {
    var sidemenu = document.getElementById("sidemenu");
    if (sidemenu) {
        sidemenu.style.right = "-250px";
    }
};

// ==================== INTERACTIVE 3D TILT EFFECT ==================== //

// 1. Smooth GSAP Floating Animation for Microsoft Badge
const badgeFloat = gsap.to('.badge-wrapper', {
    y: -12,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// 2. Optimized 3D Tilt Elements (Desktop Only)
if (window.innerWidth > 768) {
    document.querySelectorAll('.skill-card, .cert-card, .badge-wrapper, .about-col-1 img').forEach((card) => {
        
        card.addEventListener('mouseenter', () => {
            if (card.classList.contains('badge-wrapper')) {
                badgeFloat.pause();
            }
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(card, {
                rotationY: x * 0.08,
                rotationX: -y * 0.08,
                transformPerspective: 1000,
                ease: "none",
                duration: 0.1,
                overwrite: "auto"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                y: 0,
                ease: "power2.out",
                duration: 0.4,
                onComplete: () => {
                    if (card.classList.contains('badge-wrapper')) {
                        badgeFloat.resume();
                    }
                }
            });
        });
    });
}

// ==================== GOOGLE SHEET CONTACT FORM ==================== //

const scriptURL = 'https://script.google.com/macros/s/AKfycbzYUk180F6elrLO0FcPLh_jwx2PtfG2Lsp_Hra6DSbGRhaxSPl74ATN7F3BBPKRvsQAeQ/exec'; // Replace with your copied Apps Script Web App URL
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        if (msg) msg.innerHTML = "Sending message...";

        // Added mode: 'no-cors' to bypass Google Apps Script redirect blocks
        fetch(scriptURL, { 
            method: 'POST', 
            mode: 'no-cors', 
            body: new FormData(form)
        })
        .then(() => {
            if (msg) {
                msg.innerHTML = "Message sent successfully!";
                setTimeout(() => { msg.innerHTML = ""; }, 5000);
            }
            form.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            if (msg) msg.innerHTML = "Something went wrong. Please try again.";
        });
    });
}

// ==================== CURSOR-REACTIVE BACKGROUND GRADIENT ==================== //
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        document.body.style.setProperty('--mouse-x', `${x.toFixed(2)}%`);
        document.body.style.setProperty('--mouse-y', `${y.toFixed(2)}%`);
    });
}

// ==================== DOWNLOAD RESUME PARTICLE BURST ==================== //
const resumeBtn = document.querySelector('.contact-left .btn');

if (resumeBtn) {
    resumeBtn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        
        // Spawn 8 lightweight particles around click center
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('span');
            particle.classList.add('btn-particle');
            
            // Position particle at the center of the button
            particle.style.left = `${rect.width / 2}px`;
            particle.style.top = `${rect.height / 2}px`;
            
            // Calculate random trajectory angles
            const angle = (i / 8) * (2 * Math.PI) + (Math.random() * 0.5);
            const distance = 40 + Math.random() * 30; // Explosion radius in pixels
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            
            particle.style.setProperty('--dx', `${dx}px`);
            particle.style.setProperty('--dy', `${dy}px`);
            
            this.appendChild(particle);
            
            // Clean up DOM element after animation ends
            setTimeout(() => {
                particle.remove();
            }, 600);
        }
    });
}

