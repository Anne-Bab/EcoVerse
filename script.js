// DOM Content Loaded - DOM na-load na
document.addEventListener('DOMContentLoaded', function() {
    // I-initialize ang tanan nga interactive features
    initNavigation();
    initScrollEffects();
    initCycleTabs();
    initAnimations();
    initFloatingElements();
    initQuiz();
    initMetrics();
    initCalculator();
    initThemeToggle();
});

// Navigation functionality - Navigation nga functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // I-toggle ang mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // I-close ang mobile menu kung mag-click sa link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling para sa navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // I-account para sa fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // I-change ang navbar background kung mag-scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (isDarkMode) {
                navbar.style.background = 'rgba(26, 26, 46, 0.98)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            }
        } else {
            navbar.classList.remove('scrolled');
            if (isDarkMode) {
                navbar.style.background = 'rgba(26, 26, 46, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
    });
}

// Scroll effects ug animations
function initScrollEffects() {
    // Intersection Observer para sa fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.profile-card, .goals-card, .issues-card, .message-card, .mdg-card, .concept-card, .cycle-panel');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Cycle tabs functionality
function initCycleTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const cyclePanels = document.querySelectorAll('.cycle-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCycle = this.textContent.toLowerCase().replace(' cycle', '');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            cyclePanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetCycle + '-cycle');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Animation functions
function initAnimations() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-icon');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 500);
    }
}

// Floating elements animation
function initFloatingElements() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + (index * 500));
    });
}

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Interactive food chain visualization
function initFoodChainInteraction() {
    const trophicLevels = document.querySelectorAll('.trophic-level');
    
    trophicLevels.forEach(level => {
        level.addEventListener('click', function() {
            // Add pulse effect
            this.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
            
            // Show information about this trophic level
            showTrophicLevelInfo(this);
        });
    });
}

function showTrophicLevelInfo(element) {
    const levelType = element.classList[1]; // primary, producer, consumer, decomposer
    const info = getTrophicLevelInfo(levelType);
    
    // Create info modal
    const modal = document.createElement('div');
    modal.className = 'trophic-info-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>${info.title}</h3>
            <p>${info.description}</p>
            <div class="info-details">
                <h4>Key Characteristics:</h4>
                <ul>
                    ${info.characteristics.map(char => `<li>${char}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function getTrophicLevelInfo(levelType) {
    const info = {
        primary: {
            title: 'Solar Energy Source',
            description: 'The primary energy source that powers the entire Solaria Prime ecosystem.',
            characteristics: [
                'Provides unlimited clean energy',
                'Captured by bio-solar panels',
                'Converts to chemical energy',
                'Zero waste energy source'
            ]
        },
        producer: {
            title: 'Sky Corals (Producers)',
            description: 'Bio-engineered organisms that convert solar energy into chemical energy through photosynthesis.',
            characteristics: [
                'Convert solar energy to glucose',
                'Release oxygen as byproduct',
                'Form the base of the food web',
                'Self-repairing and adaptive'
            ]
        },
        consumer: {
            title: 'Solar Gliders (Primary Consumers)',
            description: 'Aerial organisms that feed on sky corals and other producers.',
            characteristics: [
                'Feed on sky coral biomass',
                'Convert energy to movement',
                'Maintain ecosystem balance',
                'AI-monitored populations'
            ]
        },
        decomposer: {
            title: 'AI Decomposers',
            description: 'Intelligent systems that break down organic matter and recycle nutrients.',
            characteristics: [
                'Break down dead organisms',
                'Recycle nutrients back to soil',
                'Maintain nutrient cycles',
                'AI-optimized decomposition'
            ]
        }
    };
    
    return info[levelType] || info.primary;
}

// Interactive cycle visualization
function initCycleInteraction() {
    const cycleSteps = document.querySelectorAll('.cycle-step');
    
    cycleSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Initialize interactive features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFoodChainInteraction();
    initCycleInteraction();
});

// Add CSS for modal
const modalCSS = `
.trophic-info-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease-out;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    animation: slideIn 0.3s ease-out;
    color: #333;
}

.modal-content h3 {
    color: #2E8B57;
    margin-bottom: 15px;
    font-size: 1.5rem;
}

.modal-content h4 {
    color: #20B2AA;
    margin: 20px 0 10px 0;
    font-size: 1.1rem;
}

.close-modal {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    transition: color 0.3s ease;
}

.close-modal:hover {
    color: #333;
}

.info-details ul {
    list-style: none;
    padding: 0;
}

.info-details li {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    color: #666;
}

.info-details li:last-child {
    border-bottom: none;
}

/* Dark mode styles for modal */
[data-theme="dark"] .trophic-info-modal {
    background: rgba(0, 0, 0, 0.9);
}

[data-theme="dark"] .modal-content {
    background: #2C2C2C;
    color: #E8E8E8;
    border: 1px solid rgba(46, 139, 87, 0.3);
}

[data-theme="dark"] .modal-content h3 {
    color: #4CAF50;
}

[data-theme="dark"] .modal-content h4 {
    color: #20B2AA;
}

[data-theme="dark"] .close-modal {
    color: #ccc;
}

[data-theme="dark"] .close-modal:hover {
    color: #fff;
}

[data-theme="dark"] .info-details li {
    color: #ccc;
    border-bottom: 1px solid #444;
}

.info-details li {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 20px;
}

.info-details li:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #2E8B57;
    font-weight: bold;
}

@keyframes slideIn {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
`;

// Inject modal CSS
const style = document.createElement('style');
style.textContent = modalCSS;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations here
}, 16)); // ~60fps

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingCSS = `
body:not(.loaded) {
    overflow: hidden;
}

body:not(.loaded)::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

body:not(.loaded)::after {
    content: 'Loading EcoVerse...';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    z-index: 10000;
    animation: pulse 1.5s infinite;
}
`;

const loadingStyle = document.createElement('style');
loadingStyle.textContent = loadingCSS;
document.head.appendChild(loadingStyle);

// Quiz functionality - Quiz nga functionality
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let shuffledQuestions = [];
let questionsPerRound = 5; // Number of questions per quiz round

const quizData = [
    {
        question: "What is the primary energy source in Solaria Prime?",
        options: ["Wind Energy", "Solar Energy", "Nuclear Energy", "Geothermal Energy"],
        correct: 1
    },
    {
        question: "Which technology is used for nitrogen fixation in Solaria Prime?",
        options: ["Solar panels", "Aerial microbes", "Wind turbines", "Water filters"],
        correct: 1
    },
    {
        question: "What percentage of waste is recycled in Solaria Prime?",
        options: ["85%", "90%", "95%", "100%"],
        correct: 3
    },
    {
        question: "What is the main purpose of AI Decomposers?",
        options: ["Generate energy", "Break down organic matter", "Filter water", "Monitor air quality"],
        correct: 1
    },
    {
        question: "How much water can Atmospheric Water Harvesters produce per day?",
        options: ["500L", "750L", "1000L", "1500L"],
        correct: 2
    },
    {
        question: "What type of organisms are Sky Corals?",
        options: ["Bio-engineered producers", "Natural consumers", "Artificial decomposers", "Mechanical filters"],
        correct: 0
    },
    {
        question: "What is the main function of Solar Gliders?",
        options: ["Primary consumers", "Secondary consumers", "Producers", "Decomposers"],
        correct: 0
    },
    {
        question: "Which law of thermodynamics applies to energy conversion in Solaria Prime?",
        options: ["1st Law only", "2nd Law only", "Both 1st and 2nd Law", "Neither law applies"],
        correct: 2
    },
    {
        question: "What maintains homeostasis in the Solaria Prime ecosystem?",
        options: ["Manual controls", "AI sensors", "Natural processes", "Random events"],
        correct: 1
    },
    {
        question: "What is the main benefit of the closed-loop system in Solaria Prime?",
        options: ["Reduced costs", "Zero waste", "Faster production", "Less maintenance"],
        correct: 1
    },
    {
        question: "Which cycle is most important for nutrient recycling in Solaria Prime?",
        options: ["Carbon cycle", "Nitrogen cycle", "Water cycle", "All cycles are equally important"],
        correct: 3
    },
    {
        question: "What technology captures solar energy in Solaria Prime?",
        options: ["Traditional solar panels", "Bio-solar panels", "Wind turbines", "Hydroelectric dams"],
        correct: 1
    },
    {
        question: "How do Sky Corals contribute to the ecosystem?",
        options: ["They consume other organisms", "They convert solar energy to chemical energy", "They decompose waste", "They filter water"],
        correct: 1
    },
    {
        question: "What is the role of Solar Gliders in the food chain?",
        options: ["Primary producers", "Primary consumers", "Secondary consumers", "Tertiary consumers"],
        correct: 1
    },
    {
        question: "Which technology ensures water sustainability in Solaria Prime?",
        options: ["Traditional wells", "Atmospheric Water Harvesters", "River systems", "Underground storage"],
        correct: 1
    }
];

// Function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function initQuiz() {
    // Initialize with shuffled questions
    startNewQuiz();
    
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectAnswer(this);
        });
    });
}

function startNewQuiz() {
    // Shuffle all questions and select the first 5
    shuffledQuestions = shuffleArray(quizData).slice(0, questionsPerRound);
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    document.getElementById('score').textContent = '0';
    document.getElementById('next-btn').textContent = 'Next Question';
    updateQuestion();
}

function selectAnswer(button) {
    // Remove selected class from all buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    button.classList.add('selected');
    selectedAnswer = parseInt(button.dataset.answer);
}

function nextQuestion() {
    if (selectedAnswer === null) {
        alert('Please select an answer before proceeding.');
        return;
    }
    
    // Check if answer is correct
    if (selectedAnswer === shuffledQuestions[currentQuestion].correct) {
        score++;
        document.querySelectorAll('.option-btn')[selectedAnswer].classList.add('correct');
    } else {
        document.querySelectorAll('.option-btn')[selectedAnswer].classList.add('incorrect');
        document.querySelectorAll('.option-btn')[shuffledQuestions[currentQuestion].correct].classList.add('correct');
    }
    
    // Update score
    document.getElementById('score').textContent = score;
    
    // Move to next question
    currentQuestion++;
    
    if (currentQuestion < shuffledQuestions.length) {
        setTimeout(() => {
            updateQuestion();
        }, 2000);
    } else {
        setTimeout(() => {
            showQuizResults();
        }, 2000);
    }
}

function updateQuestion() {
    const question = shuffledQuestions[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('current-q').textContent = currentQuestion + 1;
    
    const options = document.querySelectorAll('.option-btn');
    options.forEach((option, index) => {
        option.textContent = question.options[index];
        option.classList.remove('selected', 'correct', 'incorrect');
        option.dataset.answer = index;
    });
    
    selectedAnswer = null;
    
    if (currentQuestion === shuffledQuestions.length - 1) {
        document.getElementById('next-btn').textContent = 'Finish Quiz';
    }
}

function showQuizResults() {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    let message = '';
    
    if (percentage >= 80) {
        message = 'Excellent! You have a deep understanding of Solaria Prime!';
    } else if (percentage >= 60) {
        message = 'Good job! You know quite a bit about environmental science.';
    } else {
        message = 'Keep learning! Environmental science is fascinating!';
    }
    
    document.querySelector('.quiz-content').innerHTML = `
        <div class="quiz-results">
            <h3>Quiz Complete!</h3>
            <div class="final-score">
                <h2>${score}/${shuffledQuestions.length}</h2>
                <p>${percentage}%</p>
            </div>
            <p class="result-message">${message}</p>
            <button class="btn btn-primary" onclick="restartQuiz()">Take Quiz Again</button>
        </div>
    `;
}

function restartQuiz() {
    // Start a new quiz with different randomized questions
    startNewQuiz();
}

// Metrics animation
function initMetrics() {
    const metricValues = document.querySelectorAll('.metric-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    metricValues.forEach(value => {
        observer.observe(value);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Calculator functionality
function initCalculator() {
    // Calculator is already set up with onclick handlers
}

function calculateImpact() {
    const energyUsage = parseFloat(document.getElementById('energy-usage').value) || 0;
    const waterUsage = parseFloat(document.getElementById('water-usage').value) || 0;
    const wasteProduction = parseFloat(document.getElementById('waste-production').value) || 0;
    
    // Calculate carbon footprint (simplified calculation)
    const carbonFootprint = (energyUsage * 0.4 + wasteProduction * 0.5).toFixed(1);
    document.getElementById('carbon-result').textContent = carbonFootprint + ' kg CO₂/day';
    
    // Calculate water efficiency
    const waterEfficiency = waterUsage > 0 ? Math.max(0, 100 - (waterUsage - 100) * 0.5) : 0;
    document.getElementById('water-result').textContent = waterEfficiency.toFixed(1) + '%';
    
    // Calculate waste score
    const wasteScore = Math.max(0, 100 - wasteProduction * 10);
    document.getElementById('waste-result').textContent = wasteScore.toFixed(1) + '%';
    
    // Calculate overall rating
    const overallRating = (parseFloat(carbonFootprint) + waterEfficiency + wasteScore) / 3;
    let rating = '';
    if (overallRating >= 80) rating = 'Excellent 🌟';
    else if (overallRating >= 60) rating = 'Good 👍';
    else if (overallRating >= 40) rating = 'Fair ⚠️';
    else rating = 'Needs Improvement 📈';
    
    document.getElementById('overall-result').textContent = rating;
    
    // Generate recommendations
    generateRecommendations(energyUsage, waterUsage, wasteProduction);
}

function generateRecommendations(energy, water, waste) {
    const recommendations = [];
    
    if (energy > 30) {
        recommendations.push('Consider using energy-efficient appliances');
    }
    if (water > 200) {
        recommendations.push('Install water-saving fixtures and devices');
    }
    if (waste > 5) {
        recommendations.push('Implement a recycling and composting system');
    }
    if (energy < 20 && water < 150 && waste < 3) {
        recommendations.push('You\'re doing great! Keep up the sustainable practices!');
    }
    
    const list = document.getElementById('recommendations-list');
    list.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
}

// Theme toggle functionality
function initThemeToggle() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add transition class for smooth animation
    const navbar = document.querySelector('.navbar');
    navbar.style.transition = 'all 0.3s ease';
    
    // Set the new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Use setTimeout to ensure CSS transitions work properly
    setTimeout(() => {
        const isScrolled = window.scrollY > 50;
        
        if (newTheme === 'dark') {
            if (isScrolled) {
                navbar.style.background = 'rgba(26, 26, 46, 0.98)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            } else {
                navbar.style.background = 'rgba(26, 26, 46, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            }
        } else {
            if (isScrolled) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
    }, 10);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}
