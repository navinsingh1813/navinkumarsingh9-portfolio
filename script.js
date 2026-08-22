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

// 2. Target Interactive 3D Tilt Elements
document.querySelectorAll('.skill-card, .cert-card, .badge-wrapper, .about-col-1 img').forEach((card) => {
    
    card.addEventListener('mouseenter', () => {
        // Pause badge floating smoothly if hovering over badge
        if (card.classList.contains('badge-wrapper')) {
            badgeFloat.pause();
        }
    });

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Calculate exact center distance
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Smooth spring-like tilt
        gsap.to(card, {
            rotationY: x * 0.08,
            rotationX: -y * 0.08,
            transformPerspective: 1000,
            ease: "power2.out", // Smooth easing prevents corner jitter
            duration: 0.4,
            overwrite: "auto"
        });
    });

    card.addEventListener('mouseleave', () => {
        // Reset tilt position
        gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            y: 0,
            ease: "power2.out",
            duration: 0.6,
            onComplete: () => {
                // Resume gentle floating if leaving the badge
                if (card.classList.contains('badge-wrapper')) {
                    badgeFloat.resume();
                }
            }
        });
    });
});

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