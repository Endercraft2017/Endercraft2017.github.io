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
    },
    'o1': {
        phase1: {
            translateX: { from: 0, to: -505 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 0, to: 880 },
            scale: { from: 1, to: 0.8 },
            rotate: { from: 0, to: 0 }
        },
        phase2: {
            translateX: { from: -505 + vw20, to: -325 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 880, to: 1580 },
            scale: { from: 0.8, to: 1 },
            rotate: { from: 0, to: 0 }
        }
    },
    'n': {
        phase1: {
            translateX: { from: 0, to: -420 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 0, to: 1060 },
            scale: { from: 1, to: 1.8 },
            rotate: { from: 0, to: 20 }
        },
        phase2: {
            translateX: { from: -420 + vw20, to: -220 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 1060, to: 1485 },
            scale: { from: 1.8, to: 1 },
            rotate: { from: 20, to: 0 }
        }
    },
    's': {
        phase1: {
            translateX: { from: 0, to: -690 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 0, to: 890 },
            scale: { from: 1, to: 1 },
            rotate: { from: 0, to: -20 }
        },
        phase2: {
            translateX: { from: -690 + vw20, to: -584 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 890, to: 1580 },
            scale: { from: 1, to: 1 },
            rotate: { from: -20, to: 0 }
        }
    },
    'o2': {
        phase1: {
            translateX: { from: 0, to: -205 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 0, to: 985 },
            scale: { from: 1, to: 4 },
            rotate: { from: 0, to: -30 }
        },
        phase2: {
            translateX: { from: -205 + vw20, to: -205 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 985, to: 1485 },
            scale: { from: 4, to: 1 },
            rotate: { from: -30, to: 0 }
        }
    },
    'l': {
        phase1: {
            translateX: { from: 0, to: 220 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 0, to: 1055 },
            scale: { from: 1, to: 1.5 },
            rotate: { from: 0, to: 45 }
        },
        phase2: {
            translateX: { from: 220 + vw20, to: -405 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 1055, to: 1485 },
            scale: { from: 1.5, to: 1 },
            rotate: { from: 45, to: 0 }
        }
    },
    'e': {
        phase1: {
            translateX: { from: 0, to: 65 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 0, to: 880 },
            scale: { from: 1, to: 0.5 },
            rotate: { from: 0, to: -60 }
        },
        phase2: {
            translateX: { from: 65 + vw20, to: -365 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 880, to: 1680 },
            scale: { from: 0.5, to: 1 },
            rotate: { from: -60, to: 0 }
        }
    },
    'name-input': {
        phase1: {
            translateX: { from: 0, to: -780 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 0, to: 720 },
            scale: { from: 1, to: 0.8 },
            rotate: { from: 0, to: 0 }
        },
        phase2: {
            translateX: { from: -780 + vw20, to: 80 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 720, to: 1420 },
            scale: { from: 0.8, to: 0.8 },
            rotate: { from: 0, to: 0 }
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