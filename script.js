document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const handleNavbarScroll = () => {
        const navbar = document.querySelector('.transparent-nav');
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Listen for scroll events
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Create particles for the hero background
    const createParticles = () => {
        const particles = document.querySelector('.particles');
        if (!particles) return;
        
        // Clear existing particles
        particles.innerHTML = '';
        
        // Create new particles
        for (let i = 0; i < 80; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 4 + 1;
            
            // Random opacity
            const opacity = Math.random() * 0.4 + 0.1;
            
            // Random animation duration
            const duration = Math.random() * 25 + 15;
            
            // Set styles
            particle.style.cssText = `
                position: absolute;
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(255, 255, 255, ${opacity});
                border-radius: 50%;
                pointer-events: none;
                animation: float-particle ${duration}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            particles.appendChild(particle);
        }
        
        // Add keyframes for particle animation
        if (!document.querySelector('#particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes float-particle {
                    0%, 100% {
                        transform: translate(0, 0);
                    }
                    25% {
                        transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px);
                    }
                    50% {
                        transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px);
                    }
                    75% {
                        transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    // Call once on load
    createParticles();
    
    // Typing animation
    const typingAnimation = () => {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) {
            console.log('Typing element not found');
            return;
        }
        
        const words = ['research papers.', 'exam preparation.', 'note taking.', 'assignment help.', 'time management.', 'study planning.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        const type = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Deleting text
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // Typing text
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            // If word is complete
            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at the end of the word
                isDeleting = true;
                typingSpeed = 1500;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        };
        
        // Start typing
        setTimeout(type, 1000);
    };
    
    // Call typing animation with a delay to ensure DOM is fully loaded
    setTimeout(typingAnimation, 500);
    
    // Animate features on scroll
    const animateFeatures = () => {
        const featureCards = document.querySelectorAll('.feature-card');
        if (!featureCards.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        featureCards.forEach(card => {
            observer.observe(card);
        });
    };
    
    // Call feature animations
    animateFeatures();
    
    // Animate journey steps on scroll
    const animateJourney = () => {
        const journeySteps = document.querySelectorAll('.journey-step');
        if (!journeySteps.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Get the step number
                    const stepNumber = entry.target.getAttribute('data-step');
                    
                    // Highlight the corresponding dot
                    const dot = document.querySelector(`.dot-${stepNumber}`);
                    if (dot) {
                        document.querySelectorAll('.path-dot').forEach(d => {
                            d.classList.remove('active-dot');
                        });
                        dot.classList.add('active-dot');
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        journeySteps.forEach(step => {
            observer.observe(step);
        });
    };
    
    // Call journey animations
    animateJourney();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile navigation toggle
    const createMobileNav = () => {
        const nav = document.querySelector('nav');
        if (!nav.querySelector('.mobile-toggle')) {
            const mobileToggle = document.createElement('div');
            mobileToggle.className = 'mobile-toggle';
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            const navLinks = document.querySelector('.nav-links');
            const originalDisplay = window.getComputedStyle(navLinks).display;
            
            navLinks.style.display = window.innerWidth <= 768 ? 'none' : originalDisplay;
            
            mobileToggle.addEventListener('click', function() {
                if (navLinks.style.display === 'none') {
                    navLinks.style.display = 'flex';
                    this.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    navLinks.style.display = 'none';
                    this.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
            
            nav.insertBefore(mobileToggle, nav.firstChild);
        }
    };

    // Call once on load
    if (window.innerWidth <= 768) {
        createMobileNav();
    }

    // Update on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            createMobileNav();
        } else {
            const mobileToggle = document.querySelector('.mobile-toggle');
            const navLinks = document.querySelector('.nav-links');
            
            if (mobileToggle) {
                mobileToggle.remove();
            }
            
            if (navLinks) {
                navLinks.style.display = 'flex';
            }
        }
    });

    // Enhanced testimonial carousel
    const initTestimonialCarousel = () => {
        const carousel = document.querySelector('.testimonial-carousel');
        const dots = document.querySelectorAll('.carousel-dots .dot');
        const prevArrow = document.querySelector('.prev-arrow');
        const nextArrow = document.querySelector('.next-arrow');
        
        if (!carousel || !dots.length) return;
        
        let currentIndex = 0;
        let autoplayInterval;
        const totalSlides = dots.length;
        
        // Function to update carousel position
        const updateCarousel = (index) => {
            carousel.style.transform = `translateX(-${index * 100}%)`;
            
            // Update active dot
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            currentIndex = index;
        };
        
        // Set up dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                updateCarousel(index);
                resetAutoplay();
            });
        });
        
        // Set up arrow navigation
        if (prevArrow) {
            prevArrow.addEventListener('click', () => {
                const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateCarousel(newIndex);
                resetAutoplay();
            });
        }
        
        if (nextArrow) {
            nextArrow.addEventListener('click', () => {
                const newIndex = (currentIndex + 1) % totalSlides;
                updateCarousel(newIndex);
                resetAutoplay();
            });
        }
        
        // Start autoplay
        const startAutoplay = () => {
            autoplayInterval = setInterval(() => {
                const newIndex = (currentIndex + 1) % totalSlides;
                updateCarousel(newIndex);
            }, 5000);
        };
        
        // Reset autoplay
        const resetAutoplay = () => {
            clearInterval(autoplayInterval);
            startAutoplay();
        };
        
        // Initialize
        startAutoplay();
        
        // Pause autoplay on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            startAutoplay();
        });
    };
    
    // Initialize testimonial carousel
    initTestimonialCarousel();
    
    // FAQ toggle functionality
    const initFaqToggle = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    // Toggle active class on the clicked item
                    item.classList.toggle('active');
                    
                    // Update the icon
                    const icon = question.querySelector('.faq-toggle i');
                    if (icon) {
                        if (item.classList.contains('active')) {
                            icon.className = 'fas fa-minus';
                        } else {
                            icon.className = 'fas fa-plus';
                        }
                    }
                });
            }
        });
    };
    
    // Initialize FAQ toggle
    initFaqToggle();
    
    // Benefits Tabs Functionality
    const initBenefitsTabs = () => {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        if (!tabButtons.length || !tabPanels.length) return;
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get the tab to show
                const tabToShow = button.getAttribute('data-tab');
                
                // Hide all panels
                tabPanels.forEach(panel => {
                    panel.classList.remove('active');
                });
                
                // Show the selected panel
                document.getElementById(`${tabToShow}-panel`).classList.add('active');
            });
        });
    };
    
    // Initialize Benefits Tabs
    initBenefitsTabs();
    
    // Testimonial carousel removed
    
    // Animate benefit stats on scroll
    const animateBenefitStats = () => {
        const statCircles = document.querySelectorAll('.stat-circle');
        if (!statCircles.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = entry.target.querySelector('.stat-circle-fill');
                    if (circle) {
                        // Get the stroke-dasharray value
                        const dashArray = circle.getAttribute('stroke-dasharray');
                        if (dashArray) {
                            // Reset the animation by removing and re-adding the attribute
                            circle.setAttribute('stroke-dasharray', '0, 100');
                            setTimeout(() => {
                                circle.setAttribute('stroke-dasharray', dashArray);
                            }, 50);
                        }
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        statCircles.forEach(circle => {
            observer.observe(circle);
        });
    };
    
    // Call stat animations
    animateBenefitStats();
    
    // Smooth scrolling for sidebar links
    const initSidebarNavigation = () => {
        const sidebarLinks = document.querySelectorAll('.sidebar-section a');
        if (!sidebarLinks.length) return;
        
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Only process links with hash
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // Remove active class from all links
                        sidebarLinks.forEach(link => link.classList.remove('active'));
                        
                        // Add active class to clicked link
                        this.classList.add('active');
                        
                        // Scroll to the target element
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    };
    
    // Initialize sidebar navigation
    initSidebarNavigation();
    
    // Developers page animations
    const initDevelopersPage = () => {
        // Check if we're on the developers page
        const devHeader = document.querySelector('.dev-header');
        if (!devHeader) return;
        
        // Animate tech icons on scroll
        const techItems = document.querySelectorAll('.tech-item');
        if (techItems.length) {
            const animateTechItems = () => {
                techItems.forEach((item, index) => {
                    const itemTop = item.getBoundingClientRect().top;
                    const itemBottom = item.getBoundingClientRect().bottom;
                    
                    if (itemTop < window.innerHeight - 100 && itemBottom > 0) {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 50);
                    }
                });
            };
            
            // Set initial state
            techItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'all 0.5s ease';
            });
            
            // Run on scroll
            window.addEventListener('scroll', animateTechItems);
            // Run once on load
            animateTechItems();
        }
        
        // Animate workflow items on scroll
        const workflowItems = document.querySelectorAll('.workflow-item');
        if (workflowItems.length) {
            const animateWorkflowItems = () => {
                workflowItems.forEach((item, index) => {
                    const itemTop = item.getBoundingClientRect().top;
                    const itemBottom = item.getBoundingClientRect().bottom;
                    
                    if (itemTop < window.innerHeight - 100 && itemBottom > 0) {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 100);
                    }
                });
            };
            
            // Set initial state
            workflowItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                item.style.transition = 'all 0.6s ease';
            });
            
            // Run on scroll
            window.addEventListener('scroll', animateWorkflowItems);
            // Run once on load
            animateWorkflowItems();
        }
        
        // Animate project cards on scroll
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length) {
            const animateProjectCards = () => {
                projectCards.forEach((card, index) => {
                    const cardTop = card.getBoundingClientRect().top;
                    const cardBottom = card.getBoundingClientRect().bottom;
                    
                    if (cardTop < window.innerHeight - 100 && cardBottom > 0) {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                });
            };
            
            // Set initial state
            projectCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';
            });
            
            // Run on scroll
            window.addEventListener('scroll', animateProjectCards);
            // Run once on load
            animateProjectCards();
        }
        
        // Generate random floating code particles
        const generateCodeParticles = () => {
            const codeParticles = document.querySelector('.code-particles');
            if (!codeParticles) return;
            
            const codeSnippets = [
                'const future = await AI.transform("education");',
                'function innovate() { return new Ideas(); }',
                'class Aithrive extends Education { }',
                'import { intelligence } from "future";',
                'const learning = new AdaptiveSystem();',
                'if (passion && skills) { joinUs(); }',
                'export default class SmartLearning { }',
                'const impact = students.map(transform);',
                'async function buildTomorrow() { }',
                'for (let i in challenges) { solve(i); }'
            ];
            
            // Add 10 random code snippets
            for (let i = 0; i < 10; i++) {
                const codeElement = document.createElement('div');
                codeElement.className = 'code-line';
                codeElement.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                
                // Random position and delay
                const top = 10 + Math.random() * 80; // 10-90%
                const left = Math.random() * 85; // 0-85%
                const delay = Math.random() * 3; // 0-3s
                
                codeElement.style.setProperty('--top', `${top}%`);
                codeElement.style.setProperty('--left', `${left}%`);
                codeElement.style.setProperty('--delay', `${delay}s`);
                
                codeParticles.appendChild(codeElement);
            }
        };
        
        // Run code particles generator
        generateCodeParticles();
    };
    
    // Initialize developers page
    initDevelopersPage();
    
    // Initialize developers page sliders and interactive elements
    const initDevelopersSliders = () => {
        // Check if we're on the developers page
        const devHeader = document.querySelector('.dev-header');
        if (!devHeader) return;
        
        // Typing animation for hero section
        const initTypingAnimation = () => {
            const typingText = document.getElementById('dev-typing-text');
            if (!typingText) return;
            
            const words = ['Education', 'Learning', 'AI Solutions', 'Experiences', 'Future'];
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;
            
            const type = () => {
                const currentWord = words[wordIndex];
                
                if (isDeleting) {
                    typingText.textContent = currentWord.substring(0, charIndex - 1);
                    charIndex--;
                    typingSpeed = 50;
                } else {
                    typingText.textContent = currentWord.substring(0, charIndex + 1);
                    charIndex++;
                    typingSpeed = 100;
                }
                
                if (!isDeleting && charIndex === currentWord.length) {
                    isDeleting = true;
                    typingSpeed = 1000; // Pause at end of word
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    typingSpeed = 300; // Pause before starting new word
                }
                
                setTimeout(type, typingSpeed);
            };
            
            // Start typing animation
            setTimeout(type, 1000);
        };
        
        // Initialize build slider
        const initBuildSlider = () => {
            const slider = document.querySelector('.build-slider');
            if (!slider) return;
            
            const slides = slider.querySelectorAll('.build-slide');
            const prevBtn = document.getElementById('build-prev');
            const nextBtn = document.getElementById('build-next');
            const pagination = document.getElementById('build-pagination');
            
            let currentSlide = 0;
            const slidesToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3;
            
            // Create pagination dots
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('pagination-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                pagination.appendChild(dot);
            });
            
            // Update slider position
            const updateSlider = () => {
                const slideWidth = 100 / slidesToShow;
                const offset = -currentSlide * slideWidth;
                slider.style.transform = `translateX(${offset}%)`;
                
                // Update pagination
                const dots = pagination.querySelectorAll('.pagination-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            };
            
            // Go to specific slide
            const goToSlide = (index) => {
                currentSlide = Math.max(0, Math.min(index, slides.length - slidesToShow));
                updateSlider();
            };
            
            // Next slide
            const nextSlide = () => {
                if (currentSlide < slides.length - slidesToShow) {
                    currentSlide++;
                    updateSlider();
                }
            };
            
            // Previous slide
            const prevSlide = () => {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlider();
                }
            };
            
            // Event listeners
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            
            // Initialize slider
            updateSlider();
            
            // Handle touch events for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            const handleSwipe = () => {
                const swipeThreshold = 50;
                if (touchEndX < touchStartX - swipeThreshold) {
                    nextSlide();
                } else if (touchEndX > touchStartX + swipeThreshold) {
                    prevSlide();
                }
            };
        };
        
        // Initialize projects slider
        const initProjectsSlider = () => {
            const slider = document.querySelector('.projects-slider');
            if (!slider) return;
            
            const slides = slider.querySelectorAll('.project-slide');
            const prevBtn = document.getElementById('projects-prev');
            const nextBtn = document.getElementById('projects-next');
            const pagination = document.getElementById('projects-pagination');
            
            let currentSlide = 0;
            const slidesToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3;
            
            // Create pagination dots
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('pagination-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                pagination.appendChild(dot);
            });
            
            // Update slider position
            const updateSlider = () => {
                const slideWidth = 100 / slidesToShow;
                const offset = -currentSlide * slideWidth;
                slider.style.transform = `translateX(${offset}%)`;
                
                // Update pagination
                const dots = pagination.querySelectorAll('.pagination-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            };
            
            // Go to specific slide
            const goToSlide = (index) => {
                currentSlide = Math.max(0, Math.min(index, slides.length - slidesToShow));
                updateSlider();
            };
            
            // Next slide
            const nextSlide = () => {
                if (currentSlide < slides.length - slidesToShow) {
                    currentSlide++;
                    updateSlider();
                }
            };
            
            // Previous slide
            const prevSlide = () => {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlider();
                }
            };
            
            // Event listeners
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            
            // Initialize slider
            updateSlider();
            
            // Handle touch events for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            const handleSwipe = () => {
                const swipeThreshold = 50;
                if (touchEndX < touchStartX - swipeThreshold) {
                    nextSlide();
                } else if (touchEndX > touchStartX + swipeThreshold) {
                    prevSlide();
                }
            };
        };
        
        // Initialize workflow tabs
        const initWorkflowTabs = () => {
            const tabs = document.querySelectorAll('.workflow-tab');
            const tabContents = document.querySelectorAll('.workflow-tab-content');
            
            if (!tabs.length || !tabContents.length) return;
            
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remove active class from all tabs and contents
                    tabs.forEach(t => t.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));
                    
                    // Add active class to clicked tab and corresponding content
                    tab.classList.add('active');
                    const tabId = tab.getAttribute('data-tab');
                    document.getElementById(`tab-${tabId}`).classList.add('active');
                });
            });
        };
        
        // Initialize position filters
        const initPositionFilters = () => {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const positionCards = document.querySelectorAll('.position-card');
            
            if (!filterBtns.length || !positionCards.length) return;
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    btn.classList.add('active');
                    
                    // Filter positions
                    const filter = btn.getAttribute('data-filter');
                    
                    positionCards.forEach(card => {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        };
        
        // Initialize mobile menu
        const initMobileMenu = () => {
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            const navCenter = document.querySelector('.nav-center');
            
            if (!menuToggle || !navLinks) return;
            
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                if (navCenter) navCenter.classList.toggle('active');
            });
            
            // Close menu when clicking on a link
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    if (navCenter) navCenter.classList.remove('active');
                });
            });
        };
        
        // Initialize all components
        initTypingAnimation();
        initBuildSlider();
        initProjectsSlider();
        initWorkflowTabs();
        initPositionFilters();
        initMobileMenu();
    };
    
    // Run developers page sliders initialization
    initDevelopersSliders();

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        });
    }

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .step, .pricing-plan, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .step, .pricing-plan, .testimonial-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .step.animate, .pricing-plan.animate, .testimonial-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card:nth-child(2), .step:nth-child(2), .pricing-plan:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .feature-card:nth-child(3), .step:nth-child(3), .pricing-plan:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .feature-card:nth-child(4), .step:nth-child(4) {
            transition-delay: 0.6s;
        }
    `;
    document.head.appendChild(style);

    // Call once on load and then on scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});