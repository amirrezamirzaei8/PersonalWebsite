document.addEventListener("DOMContentLoaded", function() {
    console.log("Document loaded. Ready to add functionality!");

    // Floating animation for header elements
    const helloText = document.querySelector('.home-content h1');
    const nameText = document.querySelector('.home-content h2');
    let textAngle = 0;

    function floatText() {
        const y = Math.sin(textAngle) * 5; // 5px vertical movement
        const rotation = Math.sin(textAngle * 0.5) * 2; // ±2deg rotation
        
        // Apply to both elements
        helloText.style.transform = `translateY(${y}px) rotateZ(${rotation}deg)`;
        nameText.style.transform = `translateY(${y}px) rotateZ(${rotation}deg)`;
        
        textAngle += 0.08;
        requestAnimationFrame(floatText);
    }

    // Start text animation
    floatText();

    // Hover interaction for header text
    [helloText, nameText].forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'transform 0.3s ease';
            element.style.transform = 'translateY(0) rotateZ(0)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transition = '';
            textAngle = 0; // Reset animation position
        });
    });

    // Separator Animation System
    function animateSeparators() {
        const separators = document.querySelectorAll('hr');
        let separatorAngle = 0;

        function floatSeparators() {
            separators.forEach(separator => {
                const y = Math.sin(separatorAngle) * 2;
                const scale = 1 + Math.sin(separatorAngle * 1.5) * 0.05;
                separator.style.transform = `translateY(${y}px) scaleX(${scale})`;
            });
            
            separatorAngle += 0.05;
            requestAnimationFrame(floatSeparators);
        }

        // Start separator animation
        floatSeparators();

        // Add hover interactions
        separators.forEach(separator => {
            separator.addEventListener('mouseenter', () => {
                separator.style.transition = 'all 0.3s ease';
                separator.style.transform = 'scaleX(1.1)';
                separator.style.opacity = '0.8';
            });

            separator.addEventListener('mouseleave', () => {
                separator.style.transition = 'all 0.5s ease';
                separator.style.transform = 'scaleX(1)';
                separator.style.opacity = '1';
            });
        });
    }

    // Start separator animations
    animateSeparators();

    // Theme Toggle System
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Check saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        updateDarkModeElements();
    }

    // Theme toggle event
    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        updateDarkModeElements();
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Dark mode element updater
    function updateDarkModeElements() {
        const sidebar = document.querySelector('.sidebar');
        const footer = document.querySelector('footer');
        const projects = document.querySelectorAll('.project');
        const navLinks = document.querySelectorAll('.nav-links a');

        sidebar.classList.toggle('dark-mode');
        footer.classList.toggle('dark-mode');

        projects.forEach(project => {
            project.classList.toggle('dark-mode');
        });

        navLinks.forEach(link => {
            link.classList.toggle('dark-mode');
        });

        // Update separator animations for dark mode
        const separators = document.querySelectorAll('hr');
        separators.forEach(separator => {
            separator.style.background = body.classList.contains('dark-mode') 
                ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0.8) 80%, transparent 100%)'
                : 'linear-gradient(90deg, transparent 0%, #005AFF 20%, #005AFF 80%, transparent 100%)';
        });
    }

    // Performance optimization
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
    });

    // Initialize smooth transitions
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
});


// Mobile menu functionality
const menuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');
const body = document.body;

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  body.classList.toggle('menu-open');
});

// Close menu when clicking outside
document.querySelector('.sidebar-overlay').addEventListener('click', () => {
  sidebar.classList.remove('active');
  body.classList.remove('menu-open');
});