// WALL-E Terra Nova Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Add WALL-E sound effects and enhanced animations
    addWallESoundEffects();
    createFloatingWasteParticles();
    addRobotBeepSounds();
    initializeScrollAnimations();
    initializeHeroAnimations();
    initializeCardAnimations();
    initializeProgressIndicator();
    initializeTypingEffect();
    // Navigation functionality
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    console.log('Navigation elements found:', {
        navButtons: navButtons.length,
        contentSections: contentSections.length,
        mobileMenuBtn: !!mobileMenuBtn,
        navbarMenu: !!navbarMenu
    });
    
    // Test function to manually trigger mobile menu
    window.testMobileMenu = function() {
        if (mobileMenuBtn && navbarMenu) {
            mobileMenuBtn.classList.toggle('active');
            navbarMenu.classList.toggle('active');
            console.log('Mobile menu toggled manually');
        }
    };

    // Mobile menu toggle
    if (mobileMenuBtn && navbarMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu clicked');
            this.classList.toggle('active');
            navbarMenu.classList.toggle('active');
            console.log('Mobile menu classes:', {
                buttonActive: this.classList.contains('active'),
                menuActive: navbarMenu.classList.contains('active')
            });
        });
    } else {
        console.log('Mobile menu elements not found:', { mobileMenuBtn, navbarMenu });
    }
    
    // Add click handler to document to close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navbarMenu && navbarMenu.classList.contains('active')) {
            if (!navbarMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navbarMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                console.log('Mobile menu closed by outside click');
            }
        }
    });

    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const targetSection = this.getAttribute('data-section');
            console.log('Nav button clicked:', targetSection);
            
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and target section
            this.classList.add('active');
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
                console.log('Section activated:', targetSection);
            } else {
                console.log('Target section not found:', targetSection);
            }
            
            // Close mobile menu if open
            if (navbarMenu && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
            
            // Add WALL-E sound effect (visual feedback)
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

// Enhanced Animation Functions
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation delays
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
                
                // Add special effects for different elements
                if (entry.target.classList.contains('card')) {
                    addCardRevealEffect(entry.target);
                } else if (entry.target.classList.contains('cycle-section')) {
                    addCycleRevealEffect(entry.target);
                } else if (entry.target.classList.contains('chain-level')) {
                    addChainRevealEffect(entry.target);
                }
            }
        });
    }, { threshold: 0.1 });

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.section-header, .terrain-card, .species-item, .card, .cycle-section, .chain-level, .feature-card, .goal-card, .message-card'
    );

    animatableElements.forEach(el => observer.observe(el));
}

// Add card reveal effect
function addCardRevealEffect(card) {
    card.style.transform = 'translateY(50px) rotateX(20deg)';
    card.style.opacity = '0';
    card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
        card.style.transform = 'translateY(0) rotateX(0deg)';
        card.style.opacity = '1';
    }, 100);
}

// Add cycle reveal effect
function addCycleRevealEffect(cycle) {
    cycle.style.transform = 'translateX(-100px) rotateY(45deg)';
    cycle.style.opacity = '0';
    cycle.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
        cycle.style.transform = 'translateX(0) rotateY(0deg)';
        cycle.style.opacity = '1';
    }, 200);
}

// Add chain reveal effect
function addChainRevealEffect(chain) {
    chain.style.transform = 'translateY(100px) scale(0.8)';
    chain.style.opacity = '0';
    chain.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
        chain.style.transform = 'translateY(0) scale(1)';
        chain.style.opacity = '1';
    }, 150);
}

function initializeHeroAnimations() {
    // Hero content animations
    const heroContent = document.querySelector('.hero-content');
    const heroSlogan = document.querySelector('.hero-slogan');
    const heroDescription = document.querySelector('.hero-description');
    const heroScroll = document.querySelector('.hero-scroll');

    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (heroSlogan) {
        setTimeout(() => heroSlogan.style.opacity = '1', 400);
    }
    
    if (heroDescription) {
        setTimeout(() => heroDescription.style.opacity = '1', 700);
    }
    
    if (heroScroll) {
        setTimeout(() => heroScroll.style.opacity = '1', 1000);
    }
}

function initializeCardAnimations() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click animations to terrain and species cards
    const interactiveCards = document.querySelectorAll('.terrain-card, .species-item');
    
    interactiveCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05) translateY(-5px)';
            }, 150);
        });
    });
}

// Enhanced waste particle system
function createEnhancedWasteParticles() {
    const container = document.getElementById('waste-particles-container');
    if (!container) return;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'waste-particle';
        
        const icons = ['♻️', '🗑️', '📦', '🔋', '⚡', '🌱', '👢', '🤖', '🪳', '👽', '💨', '☀️', '🌍', '💫', '✨'];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        
        particle.innerHTML = randomIcon;
        particle.style.position = 'absolute';
        particle.style.fontSize = Math.random() * 20 + 10 + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100vh';
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        particle.style.animationDuration = Math.random() * 10 + 5 + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animation = 'floatUp linear infinite';
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 15000);
    }

    // Create initial particles
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 200);
    }

    // Continuously create new particles
    setInterval(createParticle, 1000);
}

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(50px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .waste-particle {
        pointer-events: none;
        user-select: none;
        z-index: 1;
    }
`;
document.head.appendChild(style);

// Initialize enhanced particles
createEnhancedWasteParticles();
});


    // Enhanced WALL-E world simulation
    function createWALLEWorldSimulation() {
        const chainLevels = document.querySelectorAll('.chain-level');
        const organisms = document.querySelectorAll('.organism');
        
        chainLevels.forEach((level, index) => {
            level.addEventListener('click', function() {
                // Add enhanced pulsing animation
                this.style.animation = 'chainPulse 0.8s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 800);
                
                // Add glow effect
                this.style.boxShadow = '0 0 30px rgba(52, 152, 219, 0.8)';
                setTimeout(() => {
                    this.style.boxShadow = '';
                }, 1000);
                
                // Show energy flow information
                showEnergyFlowInfo(index);
            });
        });
        
        // Add individual organism animations
        organisms.forEach((organism, index) => {
            organism.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Create particle effect
                createParticleEffect(this);
                
                // Add bounce animation
                this.style.animation = 'organismBounce 0.6s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
                
                // Show detailed organism info
                showDetailedOrganismInfo(this.textContent);
            });
        });
    }
    
    // Create particle effect for organisms
    function createParticleEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.background = '#3498db';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            const angle = (i / 8) * Math.PI * 2;
            const velocity = 100 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            particle.style.transform = `translate(${vx}px, ${vy}px)`;
            particle.style.opacity = '1';
            particle.style.transition = 'all 0.8s ease-out';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.style.opacity = '0';
                particle.style.transform = `translate(${vx * 2}px, ${vy * 2}px) scale(0)`;
            }, 50);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 800);
        }
    }
    
    // Add CSS for new animations
    const organismStyle = document.createElement('style');
    organismStyle.textContent = `
        @keyframes chainPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes organismBounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0) scale(1);
            }
            40% {
                transform: translateY(-15px) scale(1.1);
            }
            60% {
                transform: translateY(-8px) scale(1.05);
            }
        }
    `;
    document.head.appendChild(organismStyle);

    function showEnergyFlowInfo(levelIndex) {
        const energyInfo = [
            "Solar Energy: Primary energy source from the sun, converted to electrical energy",
            "Photosynthesis: Plants convert solar energy to chemical energy (glucose)",
            "WALL-E Processing: Robots consume plant matter and organic waste for energy",
            "Decomposition: AI decomposers break down organic matter, releasing nutrients",
            "Recycling: Nutrients return to soil, completing the cycle"
        ];
        
        showModal(`Energy Flow Level ${levelIndex + 1}`, energyInfo[levelIndex]);
    }
    
    function showDetailedOrganismInfo(organismName) {
        const organismDetails = {
            "☀️ Sun → Energy": "The primary energy source that powers all life on Earth. WALL-E's solar panels convert this energy to electricity for his operations. Without the sun, there would be no photosynthesis, no life, and no hope for Earth's restoration.",
            "🌱👢 Plant → Oxygen": "A miraculous discovery! This tiny plant represents hope for Earth's restoration. It produces oxygen through photosynthesis and could support human life when they return. The plant in the boot is the key to reversing Earth's environmental damage.",
            "🤖 WALL-E → Waste Management": "The last robot on Earth! WALL-E tirelessly compacts waste, cares for the plant, and maintains environmental systems. His solar-powered design allows continuous operation. He represents the bridge between technology and nature.",
            "🪳 Cockroaches → Decomposition": "Nature's recyclers! These resilient creatures break down organic matter, releasing nutrients back into the soil for plant growth. They survived Earth's environmental collapse and help maintain the ecosystem's balance.",
            "👽 EVE → Plant Detection": "EVE (Extraterrestrial Vegetation Evaluator) is an advanced probe designed to search for signs of life. She discovered the precious plant and works with WALL-E to protect it. EVE represents advanced technology working in harmony with nature.",
            "💨 Dust Storms → Atmosphere": "Dust storms are a major environmental challenge in WALL-E's world. They carry pollutants and create harsh conditions, but also help distribute nutrients and seeds across the landscape, playing a role in Earth's natural restoration process."
        };
        
        const detail = organismDetails[organismName] || "This component plays a vital role in WALL-E's world ecosystem! Each element works together to create a balanced environment where life can thrive and Earth can be restored.";
        showModal(`🌍 ${organismName}`, detail);
    }

    // Interactive food web
    function createInteractiveFoodWeb() {
        const webNodes = document.querySelectorAll('.node');
        
        webNodes.forEach(node => {
            node.addEventListener('click', function() {
                const fullText = this.textContent;
                showDetailedOrganismInfo(fullText);
            });
        });
    }


    // Interactive biogeochemical cycles
    function createInteractiveCycles() {
        const cycleSteps = document.querySelectorAll('.cycle-step');
        
        cycleSteps.forEach(step => {
            step.addEventListener('click', function() {
                const stepText = this.querySelector('.step-text').textContent;
                showCycleStepInfo(stepText);
            });
        });
    }

    function showCycleStepInfo(stepText) {
        const cycleInfo = {
            "Solar Energy": "Primary energy input driving all WALL-E world processes",
            "Photosynthesis": "Plants convert CO₂ and water into glucose using solar energy",
            "WALL-E Processing": "Robots process organic matter, maintaining nutrient cycles",
            "Carbon Storage": "Carbon sequestered in soil and biomass for long-term storage",
            "Nitrogen Fixation": "Conversion of atmospheric nitrogen to usable forms",
            "Plant Uptake": "Plants absorb nitrogen for growth and development",
            "Waste Processing": "Organic nitrogen compounds broken down by WALL-E units",
            "Decomposition": "Microorganisms convert organic nitrogen back to inorganic forms",
            "Atmospheric Collection": "Water vapor collected from the atmosphere",
            "Purification": "Water filtered and treated for WALL-E world use",
            "Plant Irrigation": "Water distributed to plants through efficient systems",
            "Evaporation": "Water returns to atmosphere through natural processes"
        };
        
        showModal(`${stepText} Process`, cycleInfo[stepText] || "Process information not available");
    }

    // Modal functionality
    function showModal(title, content) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <p>${content}</p>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn">🤖 WALL-E Understood!</button>
                </div>
            </div>
        `;

        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;

        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: linear-gradient(135deg, #2c3e50, #34495e);
            border: 2px solid #3498db;
            border-radius: 15px;
            padding: 25px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            animation: slideIn 0.3s ease;
        `;

        const modalHeader = modal.querySelector('.modal-header');
        modalHeader.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #3498db;
        `;

        const modalTitle = modal.querySelector('h3');
        modalTitle.style.cssText = `
            color: #3498db;
            font-family: 'Orbitron', monospace;
            margin: 0;
        `;

        const closeBtn = modal.querySelector('.close');
        closeBtn.style.cssText = `
            color: #e74c3c;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.3s ease;
        `;

        const modalBody = modal.querySelector('.modal-body');
        modalBody.style.cssText = `
            margin-bottom: 20px;
            line-height: 1.6;
        `;

        const modalFooter = modal.querySelector('.modal-footer');
        modalFooter.style.cssText = `
            text-align: center;
        `;

        const modalBtn = modal.querySelector('.modal-btn');
        modalBtn.style.cssText = `
            background: linear-gradient(45deg, #e74c3c, #c0392b);
            border: none;
            color: white;
            padding: 12px 25px;
            border-radius: 25px;
            cursor: pointer;
            font-family: 'Orbitron', monospace;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
        `;

        // Add event listeners
        closeBtn.addEventListener('click', () => modal.remove());
        modalBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .modal-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
            }
            .close:hover {
                color: #c0392b;
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(modal);
    }

    // WALL-E robot animation
    function createWallEAnimation() {
        const wallEIcon = document.querySelector('.wall-e-icon');
        if (wallEIcon) {
            wallEIcon.addEventListener('click', function() {
                this.style.animation = 'none';
                setTimeout(() => {
                    this.style.animation = 'float 3s ease-in-out infinite';
                }, 10);
                
                // Show WALL-E greeting
                showModal("WALL-E Greeting", "Hello! I'm WALL-E, your environmental companion. I help turn waste into resources and maintain our world's balance. Click on different parts of WALL-E's world to learn more!");
            });
        }
    }

    // WALL-E's world monitoring simulation
    function createWALLEWorldMonitoring() {
        const monitoringData = {
            soilPH: 6.8,
            moistureLevel: 75,
            carbonStorage: 1200,
            energyEfficiency: 94
        };

        // Update monitoring data every 5 seconds
        setInterval(() => {
            updateMonitoringData(monitoringData);
        }, 5000);
    }

    function updateMonitoringData(data) {
        // Simulate real-time data changes
        data.soilPH += (Math.random() - 0.5) * 0.1;
        data.moistureLevel += (Math.random() - 0.5) * 2;
        data.carbonStorage += Math.floor((Math.random() - 0.5) * 10);
        data.energyEfficiency += (Math.random() - 0.5) * 1;

        // Keep values within realistic ranges
        data.soilPH = Math.max(6.0, Math.min(7.5, data.soilPH));
        data.moistureLevel = Math.max(60, Math.min(90, data.moistureLevel));
        data.carbonStorage = Math.max(1000, Math.min(1500, data.carbonStorage));
        data.energyEfficiency = Math.max(85, Math.min(100, data.energyEfficiency));

        // Update display if monitoring panel exists
        updateMonitoringDisplay(data);
    }

    function updateMonitoringDisplay(data) {
        // This would update a monitoring panel if it existed
        console.log('WALL-E World Status:', data);
    }

    // Interactive cycle animations
    function createCycleAnimations() {
        const cycleSteps = document.querySelectorAll('.cycle-step');
        const cycleArrows = document.querySelectorAll('.cycle-arrow');
        
        // Add click animations to cycle steps
        cycleSteps.forEach((step, index) => {
            step.addEventListener('click', function() {
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(52, 152, 219, 0.6)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                ripple.style.width = '100px';
                ripple.style.height = '100px';
                ripple.style.marginLeft = '-50px';
                ripple.style.marginTop = '-50px';
                ripple.style.pointerEvents = 'none';
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
                
                // Show step information
                const stepText = this.querySelector('.step-text').textContent;
                showCycleStepInfo(stepText);
                
                // Add bounce animation
                this.style.animation = 'bounce 0.6s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            });
        });
        
        // Add hover effects to cycle arrows
        cycleArrows.forEach(arrow => {
            arrow.addEventListener('mouseenter', function() {
                this.style.animation = 'pulse 0.5s ease-in-out infinite';
            });
            
            arrow.addEventListener('mouseleave', function() {
                this.style.animation = '';
            });
        });
    }
    
    // Add CSS for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0) scale(1);
            }
            40% {
                transform: translateY(-10px) scale(1.1);
            }
            60% {
                transform: translateY(-5px) scale(1.05);
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Initialize all interactive features
    function initializeWALLEWorld() {
        createWALLEWorldSimulation();
        createInteractiveFoodWeb();
        createInteractiveCycles();
        createWallEAnimation();
        createWALLEWorldMonitoring();
        createCycleAnimations();
        
        console.log('🤖 WALL-E World initialized successfully!');
    }

    // Start the application
    initializeWALLEWorld();

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal');
            if (modal) modal.remove();
        }
        
        // Number keys for navigation
        if (e.key >= '1' && e.key <= '4') {
            const sectionIndex = parseInt(e.key) - 1;
            const sections = ['profile', 'education', 'ecosystem', 'cycles'];
            if (sections[sectionIndex]) {
                const targetButton = document.querySelector(`[data-section="${sections[sectionIndex]}"]`);
                if (targetButton) targetButton.click();
            }
        }
    });

    // Add touch support for mobile
    if ('ontouchstart' in window) {
        document.querySelectorAll('.interactive-element').forEach(element => {
            element.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.click();
            });
        });
    }

// WALL-E Sound Effects
function addWallESoundEffects() {
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // WALL-E beep sound
    function playBeep(frequency = 800, duration = 200) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    }
    
    // Add beep sounds to interactive elements
    document.querySelectorAll('.nav-btn, .organism, .node, .step-icon').forEach(element => {
        element.addEventListener('click', () => {
            playBeep(600 + Math.random() * 400, 150);
        });
    });
}

// Floating waste particles animation
function createFloatingWasteParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    const wasteIcons = ['♻️', '🗑️', '📦', '🔋', '⚡', '🌱', '👢', '🤖', '🪳', '👽', '💨', '☀️', '🌍', '💫', '✨', '🌟', '💎', '🔮', '🎯', '🚀', '⭐', '💫', '✨', '🌈'];
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.textContent = wasteIcons[Math.floor(Math.random() * wasteIcons.length)];
        const size = Math.random() * 20 + 10;
        const duration = Math.random() * 10 + 15;
        const opacity = Math.random() * 0.5 + 0.3;
        const rotation = Math.random() * 360;
        const scale = 0.8 + Math.random() * 0.4;
        
        particle.style.cssText = `
            position: absolute;
            font-size: ${size}px;
            left: ${Math.random() * 100}%;
            top: 100%;
            animation: floatUp ${duration}s linear forwards, particlePulse 2s ease-in-out infinite;
            opacity: ${opacity};
            transform: rotate(${rotation}deg) scale(${scale});
            filter: drop-shadow(0 0 10px rgba(52, 152, 219, 0.5));
            transition: all 0.3s ease;
            cursor: pointer;
        `;
        
        // Add interactive effects
        particle.addEventListener('mouseenter', function() {
            this.style.transform = `rotate(${rotation + 180}deg) scale(${scale * 1.5})`;
            this.style.filter = 'drop-shadow(0 0 20px rgba(52, 152, 219, 1))';
            this.style.opacity = '1';
        });
        
        particle.addEventListener('mouseleave', function() {
            this.style.transform = `rotate(${rotation}deg) scale(${scale})`;
            this.style.filter = 'drop-shadow(0 0 10px rgba(52, 152, 219, 0.5))';
            this.style.opacity = opacity;
        });
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 25000);
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(particleContainer);
    
    // Create particles periodically
    setInterval(createParticle, 3000);
}

// Robot beep sounds for different actions
function addRobotBeepSounds() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playRobotSound(type) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        let frequency, duration;
        
        switch(type) {
            case 'success':
                frequency = 1000;
                duration = 300;
                break;
            case 'error':
                frequency = 200;
                duration = 500;
                break;
            case 'info':
                frequency = 600;
                duration = 200;
                break;
            case 'warning':
                frequency = 400;
                duration = 400;
                break;
            default:
                frequency = 500;
                duration = 200;
        }
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    }
    
    // Add different sounds for different interactions
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => playRobotSound('info'));
    });
    
    document.querySelectorAll('.organism').forEach(org => {
        org.addEventListener('click', () => playRobotSound('success'));
    });
    
    document.querySelectorAll('.node').forEach(node => {
        node.addEventListener('click', () => playRobotSound('info'));
    });
    
    document.querySelectorAll('.step-icon').forEach(icon => {
        icon.addEventListener('click', () => playRobotSound('success'));
    });
}

// Enhanced WALL-E greeting with animation
function createEnhancedWallEGreeting() {
    const wallEIcon = document.querySelector('.wall-e-icon');
    if (wallEIcon) {
        wallEIcon.addEventListener('click', function() {
            // Play special greeting sound
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Create a melody
            const melody = [523, 659, 784, 1047]; // C, E, G, C
            let time = audioContext.currentTime;
            
            melody.forEach((freq, index) => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                
                osc.connect(gain);
                gain.connect(audioContext.destination);
                
                osc.frequency.setValueAtTime(freq, time);
                osc.type = 'sine';
                
                gain.gain.setValueAtTime(0.3, time);
                gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
                
                osc.start(time);
                osc.stop(time + 0.3);
                
                time += 0.2;
            });
            
            // Show enhanced greeting
            showModal("🤖 WALL-E Greeting", "Hello! I'm WALL-E (Waste Allocation Load Lifter - Earth Class)! I'm the last robot on Earth, working to clean up our planet. I found a precious plant growing in an old boot - it could save humanity! Click on different parts of my world to learn about environmental science and how we can restore Earth! 👢🌱");
        });
    }
}

// Progress Indicator Functionality
function initializeProgressIndicator() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (!progressFill || !progressText) return;
    
    const sections = ['profile', 'education', 'ecosystem', 'cycles'];
    const progressTexts = [
        'Exploring WALL-E\'s Earth Profile',
        'Learning Environmental Education',
        'Simulating Ecosystem Dynamics',
        'Mapping Biogeochemical Cycles'
    ];
    
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressFill.style.width = scrollPercent + '%';
        
        // Update text based on current section
        const currentSection = getCurrentSection();
        const sectionIndex = sections.indexOf(currentSection);
        if (sectionIndex !== -1) {
            progressText.textContent = progressTexts[sectionIndex];
        }
    }
    
    function getCurrentSection() {
        const sections = document.querySelectorAll('.content-section');
        let currentSection = 'profile';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.id;
            }
        });
        
        return currentSection;
    }
    
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
}


// Advanced Typing Effect for Main Title
function initializeTypingEffect() {
    const mainTitle = document.querySelector('.task-title h1');
    if (!mainTitle) return;
    
    const text = mainTitle.textContent;
    mainTitle.textContent = '';
    mainTitle.style.borderRight = '2px solid #3498db';
    mainTitle.style.animation = 'typingBlink 1s infinite';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            mainTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                mainTitle.style.borderRight = 'none';
                mainTitle.style.animation = 'none';
            }, 1000);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 2000);
}
