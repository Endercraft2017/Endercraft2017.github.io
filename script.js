// Get the name button and hello-world section elements
const nameButton = document.querySelector('.name-button');
const helloWorldSection = document.getElementById('hello-world');

// Calculate and store the 20vw value at the start
const vw = window.innerWidth / 100;
const vw20 = 20 * vw;

// Define animation configurations for elements using the pre-calculated 20vw value
const animationConfig = {
    'c': {
        phase1: {
            translateX: { from: 0, to: -800 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 0, to: 880 },
            scale: { from: 1, to: 2 },
            rotate: { from: 0, to: 50 }
        },
        phase2: {
            translateX: { from: -800 + vw20, to: -500 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 880, to: 1680 },
            scale: { from: 2, to: 1 },
            rotate: { from: 50, to: 0 }
        }
    }
};

// Get all elements that need animation
const animatedElements = {};
for (const elementId in animationConfig) {
    animatedElements[elementId] = document.getElementById(elementId);
}

// Add scroll event listener to track scroll position
window.addEventListener('scroll', function() {
    // Calculate scroll position in pixels
    const scrollPosition = window.scrollY;
    
    // Two-phase scroll tracking
    const phase1Start = 90;
    const phase1End = 825;
    const phase2Start = 825;
    const phase2End = 1650;
    
    let scrollPercentage, phase;
    
    // Phase 1: 90px to 825px
    if (scrollPosition <= phase1Start) {
        scrollPercentage = 0;
        phase = 1;
    } else if (scrollPosition >= phase1Start && scrollPosition <= phase1End) {
        // Map the range [90, 825] to [0, 100] for Phase 1
        scrollPercentage = Math.round(((scrollPosition - phase1Start) / (phase1End - phase1Start)) * 100);
        phase = 1;
    } else if (scrollPosition > phase1End && scrollPosition < phase2Start) {
        // Transition point (825px) - end of Phase 1
        scrollPercentage = 100;
        phase = 1;
    } else if (scrollPosition >= phase2Start && scrollPosition <= phase2End) {
        // Map the range [825, 1650] to [0, 100] for Phase 2
        scrollPercentage = Math.round(((scrollPosition - phase2Start) / (phase2End - phase2Start)) * 100);
        phase = 2;
    } else if (scrollPosition > phase2End) {
        scrollPercentage = 100;
        phase = 2;
    }
    
    // Log scroll information to console
    console.log(`Scroll Position: ${scrollPosition}px | Phase: ${phase} | Scroll Progress: ${scrollPercentage}%`);
    
    // Animate all elements based on scroll position
    animateElements(scrollPercentage, phase);
});

// Function to animate all elements based on scroll percentage and phase
function animateElements(scrollPercentage, phase) {
    for (const elementId in animationConfig) {
        const element = animatedElements[elementId];
        if (element) {
            animateElement(element, elementId, scrollPercentage, phase);
        }
    }
}

// Function to animate a specific element based on scroll percentage and phase
function animateElement(element, elementId, scrollPercentage, phase) {
    // Get the animation configuration for this element
    const config = animationConfig[elementId];
    
    if (!config) return; // No configuration for this element
    
    // Get the phase-specific configuration
    const phaseConfig = phase === 1 ? config.phase1 : config.phase2;
    
    // Calculate intermediate values
    let translateX;
    if (phase === 1 && scrollPercentage === 0) {
        // For phase 1 at 0% scroll, use the initial position without any calculation
        translateX = `${phaseConfig.translateX.from}px`;
    } else {
        // For all other cases, interpolate between from and to values
        const translateXValue = phaseConfig.translateX.from + (scrollPercentage / 100) * (phaseConfig.translateX.to - phaseConfig.translateX.from);
        translateX = `${translateXValue}px`;
    }
    
    const translateY = phaseConfig.translateY.from + (scrollPercentage / 100) * (phaseConfig.translateY.to - phaseConfig.translateY.from);
    const scale = phaseConfig.scale.from + (scrollPercentage / 100) * (phaseConfig.scale.to - phaseConfig.scale.from);
    const rotate = phaseConfig.rotate.from + (scrollPercentage / 100) * (phaseConfig.rotate.to - phaseConfig.rotate.from);
    
    element.style.transform = `translate(${translateX}, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
}