class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="py-4 px-6 fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(10,10,26,0.7)] border-b border-[rgba(255,255,255,0.08)] transition-all duration-300">
                <div class="container mx-auto flex justify-between items-center">
                    <a href="#" class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                        AzhanFizz
                    </a>
                    
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="#" class="nav-link relative">Home</a>
                        <a href="#about" class="nav-link relative">About</a>
                        <a href="#skills" class="nav-link relative">Skills</a>
                        <a href="#projects" class="nav-link relative">Projects</a>
                        <a href="#experience" class="nav-link relative">Experience</a>
                        <a href="#contact" class="nav-link relative">Contact</a>
                        
                        <div class="flex items-center ml-6 space-x-4">
                            <div class="theme-toggle-container" data-tooltip="Change theme mode here">
                                <input type="checkbox" class="togglesw" id="themeToggle">
                                <label for="themeToggle" class="switch">
                                    <span class="indicator left"></span>
                                    <span class="indicator right"></span>
                                    <span class="button"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <button id="mobileMenuButton" class="md:hidden focus:outline-none">
                        <i data-feather="menu" class="w-6 h-6"></i>
                    </button>
                </div>
                
                <div id="mobileMenu" class="mobile-menu md:hidden px-6 max-h-0 overflow-hidden transition-all duration-300">
                    <div class="py-4 flex flex-col space-y-4">
                        <a href="#" class="nav-link relative">Home</a>
                        <a href="#about" class="nav-link relative">About</a>
                        <a href="#skills" class="nav-link relative">Skills</a>
                        <a href="#projects" class="nav-link relative">Projects</a>
                        <a href="#experience" class="nav-link relative">Experience</a>
                        <a href="#contact" class="nav-link relative">Contact</a>
                        
                        <div class="flex items-center pt-4">
                            <span class="mr-3">Theme</span>
                            <div class="theme-toggle-container" data-tooltip="Change theme mode here">
                                <input type="checkbox" class="togglesw" id="mobileThemeToggle">
                                <label for="mobileThemeToggle" class="switch">
                                    <span class="indicator left"></span>
                                    <span class="indicator right"></span>
                                    <span class="button"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `;
        
        // Get all elements
        const nav = this.querySelector('nav');
        const mobileMenuButton = this.querySelector('#mobileMenuButton');
        const mobileMenu = this.querySelector('#mobileMenu');
        const themeToggle = this.querySelector('#themeToggle');
        const mobileThemeToggle = this.querySelector('#mobileThemeToggle');
        const navLinks = this.querySelectorAll('.nav-link');
        
        // Mobile menu toggle
        mobileMenuButton.addEventListener('click', () => {
            const isOpen = mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== '0px';
            mobileMenu.style.maxHeight = isOpen ? '0px' : '500px';
            const icon = mobileMenuButton.querySelector('i');
            icon.setAttribute('data-feather', isOpen ? 'menu' : 'x');
            feather.replace();
        });
        
        // Theme toggle
        let darkMode = true;
        const toggleTheme = () => {
            darkMode = !darkMode;
            
            // Sync both toggles
            themeToggle.checked = !darkMode;
            mobileThemeToggle.checked = !darkMode;
            
            if (darkMode) {
                document.body.className = 'bg-[#0a0a1a] text-white font-space-grotesk transition-colors duration-500';
                document.body.classList.remove('light-mode');
                nav.style.backgroundColor = 'rgba(10, 10, 26, 0.7)';
                nav.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                navLinks.forEach(link => link.style.color = 'white');
            } else {
                document.body.className = 'bg-white text-gray-900 font-space-grotesk transition-colors duration-500 light-mode';
                nav.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                nav.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                navLinks.forEach(link => link.style.color = '#1f2937');
            }
            handleScroll(); // Reapply active link colors
        };
        
        themeToggle.addEventListener('change', toggleTheme);
        mobileThemeToggle.addEventListener('change', toggleTheme);
        
        // Active link highlighting
        const setActiveLink = (sectionId) => {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${sectionId}` || (sectionId === 'home' && href === '#')) {
                    link.style.color = darkMode ? '#818cf8' : '#6366f1';
                    link.style.setProperty('--underline-width', '100%');
                } else {
                    link.style.color = darkMode ? 'white' : '#1f2937';
                    link.style.setProperty('--underline-width', '0%');
                }
            });
        };
        
        // Scroll functionality
        const handleScroll = () => {
            // Enhanced background on scroll
            if (window.scrollY > 50) {
                if (darkMode) {
                    nav.style.backgroundColor = 'rgba(10, 10, 26, 0.95)';
                } else {
                    nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                }
                nav.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            } else {
                if (darkMode) {
                    nav.style.backgroundColor = 'rgba(10, 10, 26, 0.7)';
                } else {
                    nav.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                }
                nav.style.boxShadow = 'none';
            }
            
            // Active section detection
            if (window.scrollY < 100) {
                setActiveLink('home');
                return;
            }
            
            const sections = ['about', 'skills', 'projects', 'experience', 'contact'];
            const scrollPosition = window.scrollY + 100;
            
            for (const sectionId of sections) {
                const section = document.getElementById(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        setActiveLink(sectionId);
                        return;
                    }
                }
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        
        // Smooth scrolling on link click
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    
                    if (href === '#') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        const targetSection = document.querySelector(href);
                        if (targetSection) {
                            targetSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                    
                    // Close mobile menu
                    mobileMenu.style.maxHeight = '0px';
                    const icon = mobileMenuButton.querySelector('i');
                    icon.setAttribute('data-feather', 'menu');
                    feather.replace();
                }
            });
        });
        
        // Add underline animation styles
        const style = document.createElement('style');
        style.textContent = `
            .nav-link::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                width: var(--underline-width, 0%);
                height: 2px;
                background: linear-gradient(to right, #818cf8, #6366f1);
                transition: width 0.3s ease;
            }
            .nav-link:hover::after {
                width: 100% !important;
            }
        `;
        document.head.appendChild(style);
        
        // Initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
        
        // Auto-hide tooltip after 5 seconds
        const tooltipContainer = this.querySelector('.theme-toggle-container');
        setTimeout(() => {
            if (tooltipContainer) {
                tooltipContainer.classList.add('hide-tooltip');
            }
        }, 5000);
    }
}

customElements.define('custom-navbar', CustomNavbar);