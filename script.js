// Get the name button and hello-world section elements
const nameButton = document.querySelector('.name-button');
const helloWorldSection = document.getElementById('hello-world');

// Calculate and store the 20vw value at the start
const vw = window.innerWidth / 100;
const vw20 = 20 * vw;

// Define animation configurations for elements using the pre-calculated 20vw value
// For elements with selectorType: 'class', we'll get the first element with that class
const animationConfig = {
    'c': {
        selectorType: 'id',
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
        selectorType: 'id',
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
        selectorType: 'id',
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
        selectorType: 'id',
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
        selectorType: 'id',
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
        selectorType: 'id',
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
        selectorType: 'id',
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
        selectorType: 'id',
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
    },
    // Elements that don't start at (0,0)
    'dot': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -160, to: 1055 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 445, to: 1195 },
            scale: { from: 20, to: 7 },
            rotate: { from: 0, to: 0 }
        },
        phase2: {
            translateX: { from: 1055 + vw20, to: 305 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 1195, to: 1795 },
            scale: { from: 7, to: 0.7 },
            rotate: { from: 0, to: 0 }
        }
    },
    'log': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 1200, to: 840 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 580, to: 865 },
            scale: { from: 3, to: 2 },
            rotate: { from: 180, to: 30 }
        },
        phase2: {
            translateX: { from: 840 + vw20, to: 340 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 865, to: 1765 },
            scale: { from: 2, to: 2 },
            rotate: { from: 30, to: 0 }
        }
    },
    'hello': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 4, to: -500 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 105, to: 1255 },
            scale: { from: 0.5, to: 5 },
            rotate: { from: -25, to: 50 }
        },
        phase2: {
            translateX: { from: -500 + vw20, to: 60 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 1255, to: 1855 },
            scale: { from: 5, to: 2 },
            rotate: { from: 50, to: 0 }
        }
    },
    'dollar': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 724, to: 450 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 180, to: 1000 },
            scale: { from: 2, to: 4 },
            rotate: { from: 0, to: -45 }
        },
        phase2: {
            translateX: { from: 450 + vw20, to: 270 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 1000, to: 1850 },
            scale: { from: 4, to: 2 },
            rotate: { from: -45, to: 0 }
        }
    },
    'open-bracket': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 200, to: 15 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 430, to: 950 },
            scale: { from: 2, to: 2 },
            rotate: { from: 0, to: -30 }
        },
        phase2: {
            translateX: { from: 15 + vw20, to: 315 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 950, to: 1850 },
            scale: { from: 2, to: 2 },
            rotate: { from: -30, to: 0 }
        }
    },
    'close-bracket': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 600, to: 620 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 430, to: 850 },
            scale: { from: 2, to: 3 },
            rotate: { from: 0, to: -30 }
        },
        phase2: {
            translateX: { from: 620 + vw20, to: 520 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 850, to: 1850 },
            scale: { from: 3, to: 2 },
            rotate: { from: -30, to: 0 }
        }
    },
    'open-parenthesis': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 1130, to: 200 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 600, to: 980 },
            scale: { from: 2.7, to: 2 },
            rotate: { from: -90, to: 30 }
        },
        phase2: {
            translateX: { from: 200 + vw20, to: 15 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 980, to: 1850 },
            scale: { from: 2, to: 2 },
            rotate: { from: 30, to: 0 }
        }
    },
    'close-parenthesis': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 402, to: 575 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 330, to: 1400 },
            scale: { from: 1.4, to: 5 },
            rotate: { from: 90, to: 30 }
        },
        phase2: {
            translateX: { from: 575 + vw20, to: 585 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 1400, to: 1850 },
            scale: { from: 5, to: 2 },
            rotate: { from: 30, to: 0 }
        }
    },
    'exclamation': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 640, to: 40 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 310, to: 800 },
            scale: { from: 3, to: 4 },
            rotate: { from: 180, to: 50 }
        },
        phase2: {
            translateX: { from: 40 + vw20, to: 550 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 800, to: 1855 },
            scale: { from: 4, to: 2 },
            rotate: { from: 50, to: 0 }
        }
    },
    'front-tick': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 220, to: 100 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 50, to: 880 },
            scale: { from: 2, to: 2 },
            rotate: { from: 30, to: 30 }
        },
        phase2: {
            translateX: { from: 100 + vw20, to: 45 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 880, to: 1850 },
            scale: { from: 2, to: 2 },
            rotate: { from: 30, to: 0 }
        }
    },
    'back-tick': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 800, to: 1010 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 270, to: 880 },
            scale: { from: 2, to: 5 },
            rotate: { from: 30, to: 0 }
        },
        phase2: {
            translateX: { from: 1010 + vw20, to: 570 + vw20 }, // Use pre-calculated 20vw
            translateY: { from: 880, to: 1850 },
            scale: { from: 5, to: 2 },
            rotate: { from: 0, to: 0 }
        }
    }
};

// Get all elements that need animation
const animatedElements = {};
for (const elementId in animationConfig) {
    const config = animationConfig[elementId];
    if (config.selectorType === 'class') {
        animatedElements[elementId] = document.querySelector(`.${elementId}`);
    } else {
        animatedElements[elementId] = document.getElementById(elementId);
    }
}

// Add scroll event listener to track scroll position
window.addEventListener('scroll', function() {
    // Check if viewport width is more than 900px
    if (window.innerWidth <= 900) {
        // Reset element styles when viewport width is 900px or less
        resetElements();
        return;
    }
    
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

// Add resize event listener to handle viewport width changes
window.addEventListener('resize', function() {
    // Check if viewport width is more than 900px
    if (window.innerWidth <= 900) {
        // Reset element styles when viewport width is 900px or less
        resetElements();
    } else {
        // Re-enable animations when viewport width is more than 900px
        // Trigger a scroll event to re-calculate the current position and animate elements
        window.dispatchEvent(new Event('scroll'));
    }
});

// Function to reset element styles when viewport width is 900px or less
function resetElements() {
    for (const elementId in animationConfig) {
        const element = animatedElements[elementId];
        if (element) {
            // Reset transform and animation styles
            element.style.transform = '';
            element.style.animation = '';
        }
    }
}

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
    
    // Remove any existing CSS animations that might conflict with our JavaScript animations
    element.style.animation = 'none';
    
    element.style.transform = `translate(${translateX}, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
}