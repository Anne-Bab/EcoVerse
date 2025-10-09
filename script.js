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
    initStatsAnimation();
    initEvolutionCards();
});

// Navigation functionality - Navigation nga functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.pokemon-menu');
    const navItems = document.querySelectorAll('.pokemon-nav-item');

    // I-toggle ang mobile menu
    if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    }

    // I-close ang mobile menu kung mag-click sa link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            }
            
            // Update active state
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scrolling
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // I-account para sa fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (hamburger && navMenu && 
            !hamburger.contains(e.target) && 
            !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
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
        question: "What is the primary energy source in PokéVerse?",
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
    
    // Attach event listeners to quiz buttons
    attachQuizEventListeners();
}

function attachQuizEventListeners() {
    const optionButtons = document.querySelectorAll('.option-btn-quiz');
    console.log('Found quiz buttons:', optionButtons.length);
    
    optionButtons.forEach((button, index) => {
        // Remove any existing event listeners
        button.removeEventListener('click', selectAnswer);
        // Add new event listener
        button.addEventListener('click', function() {
            console.log('Button clicked:', index);
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
    
    // Ensure event listeners are attached
    attachQuizEventListeners();
}

function selectAnswer(button) {
    console.log('Answer selected:', button.dataset.answer);
    
    // Remove selected class from all buttons
    document.querySelectorAll('.option-btn-quiz').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    button.classList.add('selected');
    selectedAnswer = parseInt(button.dataset.answer);
    
    console.log('Selected answer:', selectedAnswer);
}

function nextQuestion() {
    if (selectedAnswer === null) {
        alert('Please select an answer before proceeding.');
        return;
    }
    
    // Check if answer is correct
    if (selectedAnswer === shuffledQuestions[currentQuestion].correct) {
        score++;
        document.querySelectorAll('.option-btn-quiz')[selectedAnswer].classList.add('correct');
    } else {
        document.querySelectorAll('.option-btn-quiz')[selectedAnswer].classList.add('incorrect');
        document.querySelectorAll('.option-btn-quiz')[shuffledQuestions[currentQuestion].correct].classList.add('correct');
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
    const questionElement = document.getElementById('question-text-quiz') || document.getElementById('question-text');
    if (questionElement) {
        questionElement.textContent = question.question;
    }
    document.getElementById('current-q').textContent = currentQuestion + 1;
    
    const options = document.querySelectorAll('.option-btn-quiz');
    options.forEach((option, index) => {
        const optionText = option.querySelector('.option-text');
        if (optionText) {
            optionText.textContent = question.options[index];
        } else {
        option.textContent = question.options[index];
        }
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
        <div class="quiz-results-pokemon">
            <div class="quiz-results-header">
                <div class="pokemon-celebration">
                    <div class="pokemon-sprite-results">${score >= 4 ? '🏆' : score >= 2 ? '⭐' : '💪'}</div>
                    <div class="celebration-effects">
                        <div class="celebration-star">✨</div>
                        <div class="celebration-star">✨</div>
                        <div class="celebration-star">✨</div>
                        <div class="celebration-star">✨</div>
                        <div class="celebration-star">✨</div>
            </div>
                </div>
                <h3 class="quiz-complete-title">Quiz Complete!</h3>
                <p class="quiz-subtitle">Pokémon Battle Quiz Results</p>
            </div>
            
            <div class="quiz-score-display">
                <div class="score-circle">
                    <div class="score-number">${score}</div>
                    <div class="score-total">/${shuffledQuestions.length}</div>
                </div>
                <div class="score-percentage">${percentage}%</div>
                <div class="score-bar-container">
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            </div>
            
            <div class="quiz-result-message">
                <div class="result-icon">${score >= 4 ? '🎉' : score >= 2 ? '👍' : '💪'}</div>
                <p class="result-text">${message}</p>
            </div>
            
            <div class="quiz-achievements">
                <h4>🏆 Achievements Unlocked:</h4>
                <div class="achievement-list">
                    <div class="achievement-item ${score >= 1 ? 'unlocked' : 'locked'}">
                        <span class="achievement-icon">🥉</span>
                        <span class="achievement-text">First Answer</span>
                    </div>
                    <div class="achievement-item ${score >= 2 ? 'unlocked' : 'locked'}">
                        <span class="achievement-icon">🥈</span>
                        <span class="achievement-text">Getting Started</span>
                    </div>
                    <div class="achievement-item ${score >= 3 ? 'unlocked' : 'locked'}">
                        <span class="achievement-icon">🥇</span>
                        <span class="achievement-text">Pokémon Scholar</span>
                    </div>
                    <div class="achievement-item ${score >= 4 ? 'unlocked' : 'locked'}">
                        <span class="achievement-icon">💎</span>
                        <span class="achievement-text">Master Trainer</span>
                    </div>
                    <div class="achievement-item ${score >= 5 ? 'unlocked' : 'locked'}">
                        <span class="achievement-icon">👑</span>
                        <span class="achievement-text">Pokémon Professor</span>
                    </div>
                </div>
            </div>
            
            <div class="quiz-actions">
                <button class="btn-quiz-restart" onclick="restartQuiz()">
                    <span class="btn-icon">🔄</span>
                    <span class="btn-text">Take Quiz Again</span>
                </button>
                <button class="btn-quiz-home" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                    <span class="btn-icon">🏠</span>
                    <span class="btn-text">Back to Home</span>
                </button>
            </div>
        </div>
    `;
}

function restartQuiz() {
    // Restore the original quiz structure with correct class names
    document.querySelector('.quiz-content').innerHTML = `
        <div class="quiz-battle-arena">
            <div class="battle-pokemon-left">
                <div class="pokemon-sprite-quiz">⚡</div>
                <div class="pokemon-name-quiz">Pikachu</div>
            </div>
            <div class="quiz-center">
                <div class="vs-text-quiz">VS</div>
                <div class="question-number-quiz">Question <span id="current-q">1</span> of <span id="total-q">5</span></div>
            </div>
            <div class="battle-pokemon-right">
                <div class="pokemon-sprite-quiz">🔥</div>
                <div class="pokemon-name-quiz">Charmander</div>
            </div>
        </div>
        <div class="question-container-quiz">
            <div class="question-text-quiz" id="question-text-quiz">What is the primary energy source in PokéVerse?</div>
            <div class="options-quiz" id="options">
                <button class="option-btn-quiz" data-answer="0">
                    <span class="option-icon">💨</span>
                    <span class="option-text">Wind Energy</span>
                </button>
                <button class="option-btn-quiz" data-answer="1">
                    <span class="option-icon">☀️</span>
                    <span class="option-text">Solar Energy</span>
                </button>
                <button class="option-btn-quiz" data-answer="2">
                    <span class="option-icon">⚛️</span>
                    <span class="option-text">Nuclear Energy</span>
                </button>
                <button class="option-btn-quiz" data-answer="3">
                    <span class="option-icon">🌋</span>
                    <span class="option-text">Geothermal Energy</span>
                </button>
            </div>
        </div>
        <div class="quiz-controls-quiz">
            <button class="btn-quiz-primary" id="next-btn" onclick="nextQuestion()">
                <span class="btn-icon">➡️</span>
                <span class="btn-text">Next Question</span>
            </button>
            <div class="score-display-quiz">
                <div class="score-icon">🏆</div>
                <div class="score-text">Score: <span id="score">0</span>/5</div>
            </div>
        </div>
    `;
    
    // Re-attach event listeners to the new buttons
    attachQuizEventListeners();
    
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

// Pokémon Game Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Pokémon Navigation
    const navItems = document.querySelectorAll('.pokemon-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get section to scroll to
            const section = this.getAttribute('data-section');
            if (section) {
                scrollToSection(section);
            }
        });
    });

    // Pokémon Card Interactions
    const pokemonCards = document.querySelectorAll('.pokemon-card');
    pokemonCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add battle animation
            this.style.transform = 'translateY(-15px) rotate(5deg) scale(1.05)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 6px #FFD700';
            
            // Reset after animation
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 300);
        });
    });

    // Pokémon Search Functionality
    const searchInput = document.querySelector('.pokemon-search');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase();
            filterPokemonCards(searchTerm);
        });
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterPokemonCards(searchTerm);
        });
    }

    // Pokémon Battle Animations
    const battlePokemon = document.querySelectorAll('.pokemon-sprite-large');
    battlePokemon.forEach(pokemon => {
        pokemon.addEventListener('click', function() {
            // Trigger battle animation
            this.style.animation = 'pokemonBattle 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });

    // Pokémon Menu Options
    const menuOptions = document.querySelectorAll('.pokemon-option');
    menuOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            menuOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            this.style.background = 'rgba(255, 255, 255, 0.4)';
            setTimeout(() => {
                this.style.transform = '';
                this.style.background = '';
            }, 150);
            
            // Navigate to appropriate section based on option
            const optionText = this.textContent.trim();
            let targetSection = '';
            
            switch(optionText) {
                case 'START JOURNEY':
                    targetSection = 'home';
                    break;
                case 'POKÉDEX':
                    targetSection = 'profile';
                    break;
                case 'TRAINER CARD':
                    targetSection = 'education';
                    break;
                case 'BATTLE':
                    targetSection = 'ecosystem';
                    break;
            }
            
            if (targetSection) {
                const targetElement = document.getElementById(targetSection);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Filter Pokémon cards based on search term
function filterPokemonCards(searchTerm) {
    const cards = document.querySelectorAll('.pokemon-card');
    cards.forEach(card => {
        const pokemonName = card.querySelector('.pokemon-name').textContent.toLowerCase();
        const pokemonType = card.querySelector('.pokemon-type').textContent.toLowerCase();
        const pokemonDescription = card.querySelector('.pokemon-description p').textContent.toLowerCase();
        
        if (pokemonName.includes(searchTerm) || 
            pokemonType.includes(searchTerm) || 
            pokemonDescription.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'pokemonCardFloat 0.5s ease-in-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// Evolution tab switching functionality
function showEvolution(tabName) {
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.evolution-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Hide all panels
    const panels = document.querySelectorAll('.evolution-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    // Show selected panel based on tab name
    let selectedPanel;
    if (tabName === 'energy') {
        selectedPanel = document.getElementById('energy-flow');
    } else if (tabName === 'evolution') {
        selectedPanel = document.getElementById('evolution-chain');
    } else if (tabName === 'care') {
        selectedPanel = document.getElementById('pokemon-care');
    }
    
    if (selectedPanel) {
        selectedPanel.classList.add('active');
    }
    
    // Add active class to clicked tab
    const clickedTab = event.target;
    clickedTab.classList.add('active');
    
    // Add click effect
    clickedTab.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickedTab.style.transform = '';
    }, 150);
    
    // Re-attach event listeners for the newly shown panel
    setTimeout(() => {
        attachEvolutionEventListeners();
    }, 50);
}

// Add scroll listener to re-attach event listeners when cycles section is visible
window.addEventListener('scroll', function() {
    const cyclesSection = document.getElementById('cycles');
    if (cyclesSection) {
        const rect = cyclesSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            // Re-attach event listeners when section becomes visible
            attachEvolutionEventListeners();
        }
    }
});

// Add global click handler for dynamic content
document.addEventListener('click', function(e) {
    // Check if clicked element is an energy step
    if (e.target.closest('.energy-step')) {
        const energyStep = e.target.closest('.energy-step');
        console.log('Energy step clicked via global handler');
        showEnergyDialog(energyStep);
    }
    
    // Check if clicked element is a care step
    if (e.target.closest('.care-step')) {
        const careStep = e.target.closest('.care-step');
        console.log('Care step clicked via global handler');
        showCareDialog(careStep);
    }
    
    // Check if clicked element is an evolution stage
    if (e.target.closest('.pokemon-evolution-stage')) {
        const evolutionStage = e.target.closest('.pokemon-evolution-stage');
        console.log('Evolution stage clicked via global handler');
        showPokemonDialog(evolutionStage);
    }
});

// Evolution card click functionality
function initEvolutionCards() {
    // Add a small delay to ensure elements are loaded
    setTimeout(() => {
        attachEvolutionEventListeners();
    }, 100);
}

function attachEvolutionEventListeners() {
    // Evolution stages click functionality
    const evolutionStages = document.querySelectorAll('.pokemon-evolution-stage');
    console.log('Found evolution stages:', evolutionStages.length);
    evolutionStages.forEach(stage => {
        stage.addEventListener('click', function() {
            console.log('Evolution stage clicked');
            showPokemonDialog(this);
        });
    });
    
    // Energy flow step click functionality
    const energySteps = document.querySelectorAll('.energy-step');
    console.log('Found energy steps:', energySteps.length);
    energySteps.forEach(step => {
        step.addEventListener('click', function() {
            console.log('Energy step clicked');
            showEnergyDialog(this);
        });
    });
    
    // Care step click functionality
    const careSteps = document.querySelectorAll('.care-step');
    console.log('Found care steps:', careSteps.length);
    careSteps.forEach(step => {
        step.addEventListener('click', function() {
            console.log('Care step clicked');
            showCareDialog(this);
        });
    });
}

// Show Pokémon dialog when evolution card is clicked
function showPokemonDialog(evolutionStage) {
    const pokemonName = evolutionStage.querySelector('.pokemon-name-evolution').textContent;
    const pokemonSprite = evolutionStage.querySelector('.pokemon-sprite-evolution').textContent;
    const pokemonLevel = evolutionStage.querySelector('.evolution-level').textContent;
    
    // Create dialog content based on Pokémon
    let dialogContent = getPokemonDialogContent(pokemonName, pokemonSprite, pokemonLevel);
    
    // Create and show modal dialog
    showModalDialog(pokemonName, dialogContent);
}

// Get dialog content for specific Pokémon
function getPokemonDialogContent(name, sprite, level) {
    const pokemonData = {
        'Bulbasaur': {
            type: 'Grass/Poison',
            description: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
            abilities: ['Overgrow', 'Chlorophyll'],
            stats: { hp: 45, attack: 49, defense: 49, speed: 45 },
            evolution: 'Evolves into Ivysaur at Level 16'
        },
        'Ivysaur': {
            type: 'Grass/Poison',
            description: 'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.',
            abilities: ['Overgrow', 'Chlorophyll'],
            stats: { hp: 60, attack: 62, defense: 63, speed: 60 },
            evolution: 'Evolves into Venusaur at Level 32'
        },
        'Venusaur': {
            type: 'Grass/Poison',
            description: 'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.',
            abilities: ['Overgrow', 'Chlorophyll'],
            stats: { hp: 80, attack: 82, defense: 83, speed: 80 },
            evolution: 'Final evolution stage'
        },
        'Charmander': {
            type: 'Fire',
            description: 'It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.',
            abilities: ['Blaze', 'Solar Power'],
            stats: { hp: 39, attack: 52, defense: 43, speed: 65 },
            evolution: 'Evolves into Charmeleon at Level 16'
        },
        'Charmeleon': {
            type: 'Fire',
            description: 'It is very hotheaded by nature, so it constantly seeks opponents. It calms down only when it wins.',
            abilities: ['Blaze', 'Solar Power'],
            stats: { hp: 58, attack: 64, defense: 58, speed: 80 },
            evolution: 'Evolves into Charizard at Level 36'
        },
        'Charizard': {
            type: 'Fire/Flying',
            description: 'It spits fire that is hot enough to melt boulders. It is said to cause wildfires by accident.',
            abilities: ['Blaze', 'Solar Power'],
            stats: { hp: 78, attack: 84, defense: 78, speed: 100 },
            evolution: 'Final evolution stage'
        }
    };
    
    const data = pokemonData[name] || {
        type: 'Unknown',
        description: 'A mysterious Pokémon with unknown abilities.',
        abilities: ['Unknown'],
        stats: { hp: 50, attack: 50, defense: 50, speed: 50 },
        evolution: 'Evolution information unknown'
    };
    
    return `
        <div class="pokemon-dialog-content">
            <div class="pokemon-dialog-header">
                <div class="pokemon-dialog-sprite">${sprite}</div>
                <div class="pokemon-dialog-info">
                    <h3>${name}</h3>
                    <p class="pokemon-type">${data.type}</p>
                    <p class="pokemon-level">Level: ${level}</p>
                </div>
            </div>
            <div class="pokemon-dialog-body">
                <p class="pokemon-description">${data.description}</p>
                <div class="pokemon-abilities">
                    <h4>Abilities:</h4>
                    <div class="ability-list">
                        ${data.abilities.map(ability => `<span class="ability-badge">${ability}</span>`).join('')}
                    </div>
                </div>
                <div class="pokemon-stats-compact">
                    <div class="stats-row">
                        <div class="stat-compact">
                            <span class="stat-label">HP</span>
                            <span class="stat-value">${data.stats.hp}</span>
                        </div>
                        <div class="stat-compact">
                            <span class="stat-label">ATK</span>
                            <span class="stat-value">${data.stats.attack}</span>
                        </div>
                        <div class="stat-compact">
                            <span class="stat-label">DEF</span>
                            <span class="stat-value">${data.stats.defense}</span>
                        </div>
                        <div class="stat-compact">
                            <span class="stat-label">SPD</span>
                            <span class="stat-value">${data.stats.speed}</span>
                        </div>
                    </div>
                </div>
                <div class="pokemon-evolution-info">
                    <h4>Evolution:</h4>
                    <p>${data.evolution}</p>
                </div>
            </div>
        </div>
    `;
}

// Show energy flow dialog
function showEnergyDialog(energyStep) {
    const energyIcon = energyStep.querySelector('.energy-icon').textContent;
    const energyText = energyStep.querySelector('span').textContent.replace(/\n/g, ' ');
    
    const energyData = {
        '☀️': {
            title: 'Sun Energy',
            description: 'The primary energy source in the PokéVerse ecosystem. Solar energy provides the foundation for all life processes and powers the entire energy flow system.',
            details: [
                'Provides 100% of the ecosystem\'s energy needs',
                'Captured by Grass-type Pokémon through photosynthesis',
                'Converts light energy into chemical energy',
                'Sustains the entire food web and energy cycle'
            ],
            type: 'Primary Energy Source',
            efficiency: '100%'
        },
        '🌱': {
            title: 'Grass Pokémon Photosynthesis',
            description: 'Grass-type Pokémon like Bulbasaur, Oddish, and Bellsprout use photosynthesis to convert solar energy into chemical energy stored in their bodies.',
            details: [
                'Converts solar energy to glucose and oxygen',
                'Stores energy in leaves and body tissues',
                'Provides food for other Pokémon types',
                'Maintains atmospheric oxygen levels'
            ],
            type: 'Energy Conversion',
            efficiency: '85%'
        },
        '⚡': {
            title: 'Electric Pokémon Energy Storage',
            description: 'Electric-type Pokémon like Pikachu and Magnemite store and convert electrical energy, acting as living batteries in the ecosystem.',
            details: [
                'Stores electrical energy in specialized organs',
                'Converts chemical energy to electrical energy',
                'Provides power for technological systems',
                'Maintains electrical balance in the ecosystem'
            ],
            type: 'Energy Storage',
            efficiency: '90%'
        },
        '🔥': {
            title: 'Fire Pokémon Energy Release',
            description: 'Fire-type Pokémon like Charmander and Vulpix release thermal energy through controlled combustion, providing heat and power.',
            details: [
                'Releases stored energy as heat and light',
                'Provides warmth for cold environments',
                'Enables cooking and industrial processes',
                'Maintains temperature balance'
            ],
            type: 'Energy Release',
            efficiency: '75%'
        },
        '🔄': {
            title: 'Energy Recycling at Pokémon Centers',
            description: 'Pokémon Centers use advanced technology to recycle and redistribute energy throughout the ecosystem, ensuring no energy is wasted.',
            details: [
                'Recycles waste energy back into the system',
                'Distributes energy to areas in need',
                'Maintains energy balance across regions',
                'Prevents energy loss and waste'
            ],
            type: 'Energy Recycling',
            efficiency: '95%'
        }
    };
    
    const data = energyData[energyIcon] || {
        title: energyText,
        description: 'An important part of the Pokémon energy flow system.',
        details: ['Essential for ecosystem balance', 'Contributes to energy flow'],
        type: 'Energy Process',
        efficiency: '80%'
    };
    
    const dialogContent = `
        <div class="energy-dialog-content">
            <div class="energy-dialog-header">
                <div class="energy-dialog-icon">${energyIcon}</div>
                <div class="energy-dialog-info">
                    <h3>${data.title}</h3>
                    <p class="energy-type">${data.type}</p>
                    <p class="energy-efficiency">Efficiency: ${data.efficiency}</p>
                </div>
            </div>
            <div class="energy-dialog-body">
                <p class="energy-description">${data.description}</p>
                <div class="energy-details-compact">
                    <h4>Key Functions:</h4>
                    <div class="details-grid">
                        ${data.details.map(detail => `<div class="detail-item">• ${detail}</div>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    showModalDialog(data.title, dialogContent);
}

// Show care dialog
function showCareDialog(careStep) {
    const careIcon = careStep.querySelector('.care-icon').textContent;
    const careText = careStep.querySelector('span').textContent.replace(/\n/g, ' ');
    
    const careData = {
        '🍎': {
            title: 'Feeding & Nutrition',
            description: 'Proper nutrition is essential for Pokémon health and growth. Different Pokémon types require specific diets to maintain their energy levels and abilities.',
            details: [
                'Grass-types need sunlight and water',
                'Fire-types require high-energy foods',
                'Water-types need aquatic nutrition',
                'Electric-types need electrical supplements'
            ],
            importance: 'Critical for Health'
        },
        '💤': {
            title: 'Rest & Sleep',
            description: 'Pokémon need adequate rest to recover energy, heal from battles, and maintain their mental health. Sleep is crucial for their overall well-being.',
            details: [
                '8-10 hours of sleep per night',
                'Quiet, comfortable sleeping areas',
                'Regular sleep schedules',
                'Peaceful environment for rest'
            ],
            importance: 'Essential for Recovery'
        },
        '🏥': {
            title: 'Health Monitoring',
            description: 'Regular health checkups at Pokémon Centers ensure early detection of health issues and maintain optimal Pokémon condition.',
            details: [
                'Weekly health assessments',
                'Vaccination schedules',
                'Injury treatment and prevention',
                'Mental health evaluations'
            ],
            importance: 'Preventive Care'
        },
        '❤️': {
            title: 'Happiness & Bonding',
            description: 'Building strong emotional bonds with Pokémon through interaction, play, and affection is crucial for their happiness and performance.',
            details: [
                'Daily interaction and playtime',
                'Positive reinforcement training',
                'Emotional support and comfort',
                'Building trust and friendship'
            ],
            importance: 'Emotional Well-being'
        },
        '⚡': {
            title: 'Training & Growth',
            description: 'Regular training helps Pokémon develop their abilities, increase their stats, and reach their full potential in battles and competitions.',
            details: [
                'Daily exercise and training',
                'Skill development programs',
                'Battle practice sessions',
                'Physical and mental challenges'
            ],
            importance: 'Skill Development'
        }
    };
    
    const data = careData[careIcon] || {
        title: careText,
        description: 'An important aspect of Pokémon care and wellness.',
        details: ['Essential for Pokémon health', 'Contributes to overall well-being'],
        importance: 'Important'
    };
    
    const dialogContent = `
        <div class="care-dialog-content">
            <div class="care-dialog-header">
                <div class="care-dialog-icon">${careIcon}</div>
                <div class="care-dialog-info">
                    <h3>${data.title}</h3>
                    <p class="care-importance">${data.importance}</p>
                </div>
            </div>
            <div class="care-dialog-body">
                <p class="care-description">${data.description}</p>
                <div class="care-details-compact">
                    <h4>Care Guidelines:</h4>
                    <div class="details-grid">
                        ${data.details.map(detail => `<div class="detail-item">• ${detail}</div>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    showModalDialog(data.title, dialogContent);
}

// Show modal dialog
function showModalDialog(title, content) {
    // Remove any existing modals first
    const existingModals = document.querySelectorAll('.modal-overlay');
    existingModals.forEach(modal => modal.remove());
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    // Create modal dialog
    const modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog pokemon-modal';
    
    modalDialog.innerHTML = `
        <div class="modal-header">
            <h2>${title}</h2>
            <button class="modal-close" type="button">&times;</button>
        </div>
        <div class="modal-body">
            ${content}
        </div>
    `;
    
    modalOverlay.appendChild(modalDialog);
    document.body.appendChild(modalOverlay);
    
    // Close function
    const closeModal = () => {
        console.log('Closing modal');
        if (modalOverlay && modalOverlay.parentNode) {
            modalOverlay.classList.remove('show');
            setTimeout(() => {
                if (modalOverlay.parentNode) {
                    document.body.removeChild(modalOverlay);
                }
            }, 300);
        }
    };
    
    // Add event listeners
    const closeBtn = modalDialog.querySelector('.modal-close');
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    });
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Add keyboard support (ESC key)
    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleKeyPress);
        }
    };
    document.addEventListener('keydown', handleKeyPress);
    
    // Add animation
    setTimeout(() => {
        modalOverlay.classList.add('show');
    }, 10);
}

// Initialize stats animation
function initStatsAnimation() {
    // Function to animate stats when they come into view
    function animateStats() {
        const statValues = document.querySelectorAll('.stat-value[data-target]');
        const statFills = document.querySelectorAll('.stat-fill[data-width]');
        
        statValues.forEach((element, index) => {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        });
        
        statFills.forEach((element, index) => {
            const width = element.getAttribute('data-width');
            element.style.width = width + '%';
        });
    }
    
    // Use Intersection Observer to trigger animation when stats section is visible
    const statsSection = document.querySelector('.pokemon-stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
}
