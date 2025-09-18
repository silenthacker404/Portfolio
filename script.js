// A simple function to simulate a smooth scroll to a section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to handle the scroll arrow and resume button visibility
function handleScrollEffects() {
    const heroSection = document.getElementById('hero');
    const resumeButton = document.getElementById('resume-button');
    const scrollArrow = document.getElementById('scroll-arrow');

    if (!heroSection || !resumeButton || !scrollArrow) return;

    const heroSectionBottom = heroSection.getBoundingClientRect().bottom;

    if (heroSectionBottom <= 0) {
        // Hide both elements once the hero section is out of view
        resumeButton.classList.add('hidden');
        scrollArrow.classList.add('hidden');
    } else {
        // Show both elements while still in the hero section
        resumeButton.classList.remove('hidden');
        scrollArrow.classList.remove('hidden');
    }
}

// Function to highlight the active navigation link on scroll
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('main section');
    const navButtons = document.querySelectorAll('.nav-button');
    let currentActive = null;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navId = `nav-${section.id}`;
        
        // This threshold (window.innerHeight / 2) means the section is active when it's at least halfway into the viewport.
        if (window.scrollY >= sectionTop - window.innerHeight / 2 && window.scrollY < sectionTop + sectionHeight - window.innerHeight / 2) {
            currentActive = document.getElementById(navId);
        }
    });

    navButtons.forEach(button => {
        button.classList.remove('bg-primary', 'text-secondary');
        button.classList.add('bg-transparent', 'text-text-gray');
    });

    if (currentActive) {
        currentActive.classList.add('bg-primary', 'text-secondary');
        currentActive.classList.remove('bg-transparent', 'text-text-gray');
    }
}

// A simple typewriter effect for the hero subtitle
const subtitles = ["I love building things.", "I'm a Data Scientist.", "I specialize in AI & ML.", ];
let subtitleIndex = 0;
let charIndex = 0;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenTexts = 1500;
const heroSubtitle = document.getElementById('hero-subtitle');

function type() {
    const currentText = subtitles[subtitleIndex];
    if (charIndex < currentText.length) {
        heroSubtitle.textContent += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, delayBetweenTexts);
    }
}

function erase() {
    const currentText = subtitles[subtitleIndex];
    if (charIndex > 0) {
        heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, deletingSpeed);
    } else {
        subtitleIndex = (subtitleIndex + 1) % subtitles.length;
        setTimeout(type, 500);
    }
}

// Event listeners to run the scripts when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    type();
    
    // Call the scroll effects function to set the initial state
    handleScrollEffects();
    highlightNavOnScroll(); // Set initial active state
});

// Add event listeners for scrolling
window.addEventListener('scroll', handleScrollEffects);
window.addEventListener('scroll', highlightNavOnScroll);