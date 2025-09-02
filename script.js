let PROGRAMMING_BOX_CENTER_Y = 0;
let C_BOTTOM_Y = 0;
let O1_BOTTOM_Y = 0;
let N_BOTTOM_Y = 0;
let S_BOTTOM_Y = 0;
let O2_BOTTOM_Y = 0;
let L_BOTTOM_Y = 0;
let E_BOTTOM_Y = 0;
let NAME_INPUT_BOTTOM_Y = 0;
let TEST_MARKER_BOTTOM_Y = 0;

const ELEMENT_POSITIONS = {
    programmingBox: {
        center: {
            y: 0
        }
    },
    c: {
        bottom: {
            y: 0
        }
    },
    o1: {
        bottom: {
            y: 0
        }
    },
    n: {
        bottom: {
            y: 0
        }
    },
    s: {
        bottom: {
            y: 0
        }
    },
    o2: {
        bottom: {
            y: 0
        }
    },
    l: {
        bottom: {
            y: 0
        }
    },
    e: {
        bottom: {
            y: 0
        }
    },
    nameInput: {
        bottom: {
            y: 0
        }
    },
    testMarker: {
        bottom: {
            y: 0
        }
    }
};

function calculateElementPositions() {
    const programmingBox = document.querySelector('.programming-box');
    if (programmingBox) {
        const rect = programmingBox.getBoundingClientRect();
        const centerFromTop = rect.top + window.scrollY + (rect.height / 2);
        PROGRAMMING_BOX_CENTER_Y = centerFromTop;
        ELEMENT_POSITIONS.programmingBox.center.y = centerFromTop;
    }
    
    const cElement = document.getElementById('c');
    if (cElement) {
        const rect = cElement.getBoundingClientRect();
        const bottomFromTop = rect.bottom + window.scrollY;
        C_BOTTOM_Y = bottomFromTop;
        ELEMENT_POSITIONS.c.bottom.y = bottomFromTop;
    }
    
    const o1Element = document.getElementById('o1');
    if (o1Element) {
        const rect = o1Element.getBoundingClientRect();
        const bottomFromTop = rect.bottom + window.scrollY;
        O1_BOTTOM_Y = bottomFromTop;
        ELEMENT_POSITIONS.o1.bottom.y = bottomFromTop;
    }
    
    const nElement = document.getElementById('n');
    if (nElement) {
        const rect = nElement.getBoundingClientRect();
        const bottomFromTop = rect.bottom + window.scrollY;
        N_BOTTOM_Y = bottomFromTop;
        ELEMENT_POSITIONS.n.bottom.y = bottomFromTop;
    }
    
    const sElement = document.getElementById('s');
    if (sElement) {
        const rect = sElement.getBoundingClientRect();
        const bottomFromTop = rect.bottom + window.scrollY;
        S_BOTTOM_Y = bottomFromTop;
        ELEMENT_POSITIONS.s.bottom.y = bottomFromTop;
    }
    
    const o2Element = document.getElementById('o2');
    if (o2Element) {
        const rect = o2Element.getBoundingClientRect();
        const bottomFromTop = rect.bottom + window.scrollY;
        O2_BOTTOM_Y = bottomFromTop;
        ELEMENT_POSITIONS.o2.bottom.y = bottomFromTop;
    }
    
    const lElement = document.getElementById('l');
    if (lElement) {
        const rect = lElement.getBoundingClientRect();
        const bottomFromTop = rect.bottom + window.scrollY;
        L_BOTTOM_Y = bottomFromTop;
        ELEMENT_POSITIONS.l.bottom.y = bottomFromTop;
    }
    
    const eElement = document.getElementById('e');
    if (eElement) {
        const rect = eElement.getBoundingClientRect();
        const bottomFromTop = rect.bottom + window.scrollY;
        E_BOTTOM_Y = bottomFromTop;
        ELEMENT_POSITIONS.e.bottom.y = bottomFromTop;
    }
    
    const nameInputElement = document.querySelector('.name-input');
    if (nameInputElement) {
        const rect = nameInputElement.getBoundingClientRect();
        const bottomFromTop = rect.bottom + window.scrollY;
        NAME_INPUT_BOTTOM_Y = bottomFromTop;
        ELEMENT_POSITIONS.nameInput.bottom.y = bottomFromTop;
    }
    
    const testMarkerElement = document.getElementById('test-marker');
    if (testMarkerElement) {
        const rect = testMarkerElement.getBoundingClientRect();
        const bottomFromTop = rect.bottom + window.scrollY;
        TEST_MARKER_BOTTOM_Y = bottomFromTop;
        ELEMENT_POSITIONS.testMarker.bottom.y = bottomFromTop;
    }
}

window.addEventListener('load', calculateElementPositions);
calculateElementPositions();
const nameButton = document.querySelector('.name-button');
const helloWorldSection = document.getElementById('hello-world');

function smoothScrollTo(targetPosition, duration = 5000) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        window.scrollTo(0, startPosition + distance * easeOut);
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

if (nameButton) {
    nameButton.addEventListener('click', function() {
        const programmingBox = document.querySelector('.programming-box');
        if (programmingBox) {
            const rect = programmingBox.getBoundingClientRect();
            const centerFromTop = rect.top + window.scrollY + (rect.height / 2);
            const targetPosition = centerFromTop - (window.innerHeight / 3);
            smoothScrollTo(targetPosition, 3000); // 1000ms = 1 second
        }
    });
}

const vw = window.innerWidth / 100;
const vw20 = 20 * vw;

const animationConfigWide = {
    'c': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -800 + vw20 }, 
            translateY: { from: 0, to: 880 },
            scale: { from: 1, to: 2 },
            rotate: { from: 0, to: 50 }
        },
        phase2: {
            translateX: { from: -800 + vw20, to: -500 + vw20 }, 
            translateY: { from: 880, to: PROGRAMMING_BOX_CENTER_Y - C_BOTTOM_Y},
            scale: { from: 2, to: 1 },
            rotate: { from: 50, to: 0 }
        }
    },
    'o1': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -505 + vw20 }, 
            translateY: { from: 0, to: 880 },
            scale: { from: 1, to: 0.8 },
            rotate: { from: 0, to: 0 }
        },
        phase2: {
            translateX: { from: -505 + vw20, to: -325 + vw20 }, 
            translateY: { from: 880, to: PROGRAMMING_BOX_CENTER_Y - O1_BOTTOM_Y },
            scale: { from: 0.8, to: 1 },
            rotate: { from: 0, to: 0 }
        }
    },
    'n': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -420 + vw20 }, 
            translateY: { from: 0, to: 1060 },
            scale: { from: 1, to: 1.8 },
            rotate: { from: 0, to: 20 }
        },
        phase2: {
            translateX: { from: -420 + vw20, to: -220 + vw20 }, 
            translateY: { from: 1060, to: PROGRAMMING_BOX_CENTER_Y - N_BOTTOM_Y },
            scale: { from: 1.8, to: 1 },
            rotate: { from: 20, to: 0 }
        }
    },
    's': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -690 + vw20 }, 
            translateY: { from: 0, to: 890 },
            scale: { from: 1, to: 1 },
            rotate: { from: 0, to: -20 }
        },
        phase2: {
            translateX: { from: -690 + vw20, to: -584 + vw20 }, 
            translateY: { from: 890, to: PROGRAMMING_BOX_CENTER_Y - S_BOTTOM_Y },
            scale: { from: 1, to: 1 },
            rotate: { from: -20, to: 0 }
        }
    },
    'o2': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -205 + vw20 }, 
            translateY: { from: 0, to: 985 },
            scale: { from: 1, to: 4 },
            rotate: { from: 0, to: -30 }
        },
        phase2: {
            translateX: { from: -205 + vw20, to: -205 + vw20 }, 
            translateY: { from: 985, to: PROGRAMMING_BOX_CENTER_Y - O2_BOTTOM_Y },
            scale: { from: 4, to: 1 },
            rotate: { from: -30, to: 0 }
        }
    },
    'l': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: 220 + vw20 }, 
            translateY: { from: 0, to: 1055 },
            scale: { from: 1, to: 1.5 },
            rotate: { from: 0, to: 45 }
        },
        phase2: {
            translateX: { from: 220 + vw20, to: -405 + vw20 }, 
            translateY: { from: 1055, to: PROGRAMMING_BOX_CENTER_Y - L_BOTTOM_Y },
            scale: { from: 1.5, to: 1 },
            rotate: { from: 45, to: 0 }
        }
    },
    'e': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: 65 + vw20 }, 
            translateY: { from: 0, to: 880 },
            scale: { from: 1, to: 0.5 },
            rotate: { from: 0, to: -60 }
        },
        phase2: {
            translateX: { from: 65 + vw20, to: -365 + vw20 }, 
            translateY: { from: 880, to: PROGRAMMING_BOX_CENTER_Y - E_BOTTOM_Y },
            scale: { from: 0.5, to: 1 },
            rotate: { from: -60, to: 0 }
        }
    },
    'name-input': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -780 + vw20 }, 
            translateY: { from: 0, to: 720 },
            scale: { from: 1, to: 0.8 },
            rotate: { from: 0, to: 0 }
        },
        phase2: {
            translateX: { from: -780 + vw20, to: 80 + vw20 }, 
            translateY: { from: 720, to: PROGRAMMING_BOX_CENTER_Y - NAME_INPUT_BOTTOM_Y + 75},
            scale: { from: 0.8, to: 0.8 },
            rotate: { from: 0, to: 0 }
        }
    },
    // Elements that don't start at (0,0)
    'dot': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -160, to: 1055 + vw20 }, 
            translateY: { from: 445, to: 1195 },
            scale: { from: 20, to: 7 },
            rotate: { from: 0, to: 0 }
        },
        phase2: {
            translateX: { from: 1055 + vw20, to: 305 + vw20 }, 
            translateY: { from: 1195, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y - 10},
            scale: { from: 7, to: 0.7 },
            rotate: { from: 0, to: 0 }
        }
    },
    'log': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 1200, to: 840 + vw20 }, 
            translateY: { from: 580, to: 865 },
            scale: { from: 3, to: 2 },
            rotate: { from: 180, to: 30 }
        },
        phase2: {
            translateX: { from: 840 + vw20, to: 340 + vw20 }, 
            translateY: { from: 865, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y - 35},
            scale: { from: 2, to: 2 },
            rotate: { from: 30, to: 0 }
        }
    },
    'hello': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 4, to: -500 + vw20 }, 
            translateY: { from: 105, to: 1255 },
            scale: { from: 0.5, to: 5 },
            rotate: { from: -25, to: 50 }
        },
        phase2: {
            translateX: { from: -500 + vw20, to: 60 + vw20 }, 
            translateY: { from: 1255, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40},
            scale: { from: 5, to: 2 },
            rotate: { from: 50, to: 0 }
        }
    },
    'dollar': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 724, to: 450 + vw20 }, 
            translateY: { from: 180, to: 1000 },
            scale: { from: 2, to: 4 },
            rotate: { from: 0, to: -45 }
        },
        phase2: {
            translateX: { from: 450 + vw20, to: 270 + vw20 }, 
            translateY: { from: 1000, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40},
            scale: { from: 4, to: 2 },
            rotate: { from: -45, to: 0 }
        }
    },
    'open-bracket': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 200, to: 15 + vw20 }, 
            translateY: { from: 430, to: 950 },
            scale: { from: 2, to: 2 },
            rotate: { from: 0, to: -30 }
        },
        phase2: {
            translateX: { from: 15 + vw20, to: 315 + vw20 }, 
            translateY: { from: 950, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40},
            scale: { from: 2, to: 2 },
            rotate: { from: -30, to: 0 }
        }
    },
    'close-bracket': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 600, to: 620 + vw20 }, 
            translateY: { from: 430, to: 850 },
            scale: { from: 2, to: 3 },
            rotate: { from: 0, to: -30 }
        },
        phase2: {
            translateX: { from: 620 + vw20, to: 520 + vw20 }, 
            translateY: { from: 850, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40},
            scale: { from: 3, to: 2 },
            rotate: { from: -30, to: 0 }
        }
    },
    'open-parenthesis': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 1130, to: 200 + vw20 }, 
            translateY: { from: 600, to: 980 },
            scale: { from: 2.7, to: 2 },
            rotate: { from: -90, to: 30 }
        },
        phase2: {
            translateX: { from: 200 + vw20, to: 15 + vw20 }, 
            translateY: { from: 980, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40},
            scale: { from: 2, to: 2 },
            rotate: { from: 30, to: 0 }
        }
    },
    'close-parenthesis': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 402, to: 575 + vw20 }, 
            translateY: { from: 330, to: 1400 },
            scale: { from: 1.4, to: 5 },
            rotate: { from: 90, to: 30 }
        },
        phase2: {
            translateX: { from: 575 + vw20, to: 585 + vw20 }, 
            translateY: { from: 1400, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40},
            scale: { from: 5, to: 2 },
            rotate: { from: 30, to: 0 }
        }
    },
    'exclamation': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 640, to: 40 + vw20 }, 
            translateY: { from: 310, to: 800 },
            scale: { from: 3, to: 4 },
            rotate: { from: 180, to: 50 }
        },
        phase2: {
            translateX: { from: 40 + vw20, to: 550 + vw20 }, 
            translateY: { from: 800, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40},
            scale: { from: 4, to: 2 },
            rotate: { from: 50, to: 0 }
        }
    },
    'front-tick': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 220, to: 100 + vw20 }, 
            translateY: { from: 50, to: 880 },
            scale: { from: 2, to: 2 },
            rotate: { from: 30, to: 30 }
        },
        phase2: {
            translateX: { from: 100 + vw20, to: 45 + vw20 }, 
            translateY: { from: 880, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40},
            scale: { from: 2, to: 2 },
            rotate: { from: 30, to: 0 }
        }
    },
    'back-tick': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 800, to: 1010 + vw20 }, 
            translateY: { from: 270, to: 880 },
            scale: { from: 2, to: 5 },
            rotate: { from: 30, to: 0 }
        },
        phase2: {
            translateX: { from: 1010 + vw20, to: 570 + vw20 }, 
            translateY: { from: 880, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40},
            scale: { from: 5, to: 2 },
            rotate: { from: 0, to: 0 }
        }
    }
};

// This configuration is for viewport width between 700px and 900px
const animationConfigMedium = {
    'c': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -550 + vw20 }, 
            translateY: { from: 0, to: 890 },
            scale: { from: 1, to: 2 },
            rotate: { from: 0, to: 50 }
        },
        phase2: {
            translateX: { from: -550 + vw20, to: -350 + vw20 }, 
            translateY: { from: 890, to: PROGRAMMING_BOX_CENTER_Y - C_BOTTOM_Y },
            scale: { from: 2, to: 0.8 },
            rotate: { from: 50, to: 0 }
        }
    },
    'o1': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: 405 + vw20 }, 
            translateY: { from: 0, to: 1380 },
            scale: { from: 1, to: 2.8 },
            rotate: { from: 0, to: 0 }
        },
        phase2: {
            translateX: { from: 405 + vw20, to: -148 + vw20 }, 
            translateY: { from: 1380, to: PROGRAMMING_BOX_CENTER_Y - O1_BOTTOM_Y },
            scale: { from: 2.8, to: 0.8 },
            rotate: { from: 0, to: 0 }
        }
    },
    'n': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: 340 + vw20 }, 
            translateY: { from: 0, to: 860 },
            scale: { from: 1, to: 1.8 },
            rotate: { from: 0, to: 20 }
        },
        phase2: {
            translateX: { from: 340 + vw20, to: -49 + vw20 }, 
            translateY: { from: 860, to: PROGRAMMING_BOX_CENTER_Y - N_BOTTOM_Y },
            scale: { from: 1.8, to: 0.8 },
            rotate: { from: 20, to: 0 }
        }
    },
    's': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -690 + vw20 }, 
            translateY: { from: 0, to: 990 },
            scale: { from: 1, to: 1 },
            rotate: { from: 0, to: -20 }
        },
        phase2: {
            translateX: { from: -690 + vw20, to: -434 + vw20 }, 
            translateY: { from: 990, to: PROGRAMMING_BOX_CENTER_Y - S_BOTTOM_Y },
            scale: { from: 1, to: 0.8 },
            rotate: { from: -20, to: 0 }
        }
    },
    'o2': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -205 + vw20 }, 
            translateY: { from: 0, to: 985 },
            scale: { from: 1, to: 4 },
            rotate: { from: 0, to: -30 }
        },
        phase2: {
            translateX: { from: -205 + vw20, to: -56 + vw20 }, 
            translateY: { from: 985, to: PROGRAMMING_BOX_CENTER_Y - O2_BOTTOM_Y },
            scale: { from: 4, to: 0.8 },
            rotate: { from: -30, to: 0 }
        }
    },
    'l': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: 120 + vw20 }, 
            translateY: { from: 0, to: 1055 },
            scale: { from: 1, to: 1.5 },
            rotate: { from: 0, to: 45 }
        },
        phase2: {
            translateX: { from: 120 + vw20, to: -264 + vw20 }, 
            translateY: { from: 1055, to: PROGRAMMING_BOX_CENTER_Y - L_BOTTOM_Y },
            scale: { from: 1.5, to: 0.8 },
            rotate: { from: 45, to: 0 }
        }
    },
    'e': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -665 + vw20 }, 
            translateY: { from: 0, to: 1680 },
            scale: { from: 1, to: 0.5 },
            rotate: { from: 0, to: -60 }
        },
        phase2: {
            translateX: { from: -665 + vw20, to: -282 + vw20 }, 
            translateY: { from: 1680, to: PROGRAMMING_BOX_CENTER_Y - E_BOTTOM_Y },
            scale: { from: 0.5, to: 0.8 },
            rotate: { from: -60, to: 0 }
        }
    },
    // Additional elements
    'dot': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -400, to: 555 + vw20 }, 
            translateY: { from: 400, to: 1195 },
            scale: { from: 13, to: 3 },
            rotate: { from: 0, to: 0 }
        },
        phase2: {
            translateX: { from: 555 + vw20, to: -70 + vw20 }, 
            translateY: { from: 1195, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y - 10 },
            scale: { from: 3, to: 0.6 },
            rotate: { from: 0, to: 0 }
        }
    },
    'open-bracket': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -150, to: -405 + vw20 }, 
            translateY: { from: 280, to: 970 },
            scale: { from: 2, to: 1 },
            rotate: { from: 0, to: -30 }
        },
        phase2: {
            translateX: { from: -405 + vw20, to: -130 + vw20 }, 
            translateY: { from: 970, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 1, to: 1.8 },
            rotate: { from: -30, to: 0 }
        }
    },
    'close-bracket': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 150, to: 90 + vw20 }, 
            translateY: { from: 280, to: 810 },
            scale: { from: 2, to: 1.2 },
            rotate: { from: 0, to: -30 }
        },
        phase2: {
            translateX: { from: 90 + vw20, to: 33 + vw20 }, 
            translateY: { from: 810, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 1.2, to: 1.8 },
            rotate: { from: -30, to: 0 }
        }
    },
    'log': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 300, to: 140 + vw20 }, 
            translateY: { from: 400, to: 1365 },
            scale: { from: 1.5, to: 1 },
            rotate: { from: 180, to: 30 }
        },
        phase2: {
            translateX: { from: 140 + vw20, to: -40 + vw20 }, 
            translateY: { from: 1365, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y - 40 },
            scale: { from: 1, to: 2 },
            rotate: { from: 30, to: 0 }
        }
    },
    'hello': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -60, to: -600 + vw20 }, 
            translateY: { from: -200, to: 1255 },
            scale: { from: 0.5, to: 5 },
            rotate: { from: -25, to: 50 }
        },
        phase2: {
            translateX: { from: -600 + vw20, to: -325 + vw20 }, 
            translateY: { from: 1255, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 5, to: 1.8 },
            rotate: { from: 50, to: 0 }
        }
    },
    'open-parenthesis': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 265, to: 200 + vw20 }, 
            translateY: { from: 415, to: 980 },
            scale: { from: 1.2, to: 2 },
            rotate: { from: -90, to: 30 }
        },
        phase2: {
            translateX: { from: 200 + vw20, to: -370 + vw20 }, 
            translateY: { from: 980, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 2, to: 1.8 },
            rotate: { from: 30, to: 0 }
        }
    },
    'close-parenthesis': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -97, to: 575 + vw20 }, 
            translateY: { from: 235, to: 1400 },
            scale: { from: 1.4, to: 5 },
            rotate: { from: 90, to: 30 }
        },
        phase2: {
            translateX: { from: 575 + vw20, to: 92 + vw20 }, 
            translateY: { from: 1400, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 5, to: 1.8 },
            rotate: { from: 30, to: 0 }
        }
    },
    'exclamation': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 155, to: 140 + vw20 }, 
            translateY: { from: 220, to: 1650 },
            scale: { from: 2.7, to: 4 },
            rotate: { from: 180, to: 40 }
        },
        phase2: {
            translateX: { from: 140 + vw20, to: 55 + vw20 }, 
            translateY: { from: 1650, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 4, to: 1.8 },
            rotate: { from: 40, to: 0 }
        }
    },
    'dollar': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 232, to: 50 + vw20 }, 
            translateY: { from: 95, to: 1200 },
            scale: { from: 2, to: 4 },
            rotate: { from: 0, to: -45 }
        },
        phase2: {
            translateX: { from: 50 + vw20, to: -165 + vw20 }, 
            translateY: { from: 1200, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 4, to: 1.8 },
            rotate: { from: -45, to: 0 }
        }
    },
    'name-input': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -470 + vw20 }, 
            translateY: { from: 0, to: 920 },
            scale: { from: 1, to: 0.2 },
            rotate: { from: 0, to: 0 }
        },
        phase2: {
            translateX: { from: -470 + vw20, to: -48 + vw20 }, 
            translateY: { from: 920, to: PROGRAMMING_BOX_CENTER_Y - NAME_INPUT_BOTTOM_Y + 70},
            scale: { from: 0.2, to: 0.7 },
            rotate: { from: 0, to: 0 }
        }
    },
    'front-tick': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -230, to: -410 + vw20 }, 
            translateY: { from: -40, to: 880 },
            scale: { from: 2, to: 2 },
            rotate: { from: 30, to: -30 }
        },
        phase2: {
            translateX: { from: -410 + vw20, to: -350 + vw20 }, 
            translateY: { from: 880, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 2, to: 1.8 },
            rotate: { from: -30, to: 0 }
        }
    },
    'back-tick': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 275, to: 410 + vw20 }, 
            translateY: { from: 180, to: 880 },
            scale: { from: 2, to: 5 },
            rotate: { from: 30, to: 30 }
        },
        phase2: {
            translateX: { from: 410 + vw20, to: 70 + vw20 }, 
            translateY: { from: 880, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 5, to: 1.8 },
            rotate: { from: 30, to: 0 }
        }
    }
};
// This configuration is for viewport width between 540px and 700px
const animationConfigSmall = {
    'c': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -550 + vw20 }, 
            translateY: { from: 0, to: 890 },
            scale: { from: 1, to: 2 },
            rotate: { from: 0, to: 50 }
        },
        phase2: {
            translateX: { from: -550 + vw20, to: -350 + vw20 }, 
            translateY: { from: 890, to: (PROGRAMMING_BOX_CENTER_Y - C_BOTTOM_Y) * 1.4 },
            scale: { from: 2, to: 0.8 },
            rotate: { from: 50, to: 0 }
        }
    },
    'o1': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: 405 + vw20 }, 
            translateY: { from: 0, to: 1380 },
            scale: { from: 1, to: 2.8 },
            rotate: { from: 0, to: 0 }
        },
        phase2: {
            translateX: { from: 405 + vw20, to: -148 + vw20 }, 
            translateY: { from: 1380, to: (PROGRAMMING_BOX_CENTER_Y - O1_BOTTOM_Y) * 1.4 },
            scale: { from: 2.8, to: 0.8 },
            rotate: { from: 0, to: 0 }
        }
    },
    'n': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: 340 + vw20 }, 
            translateY: { from: 0, to: 860 },
            scale: { from: 1, to: 1.8 },
            rotate: { from: 0, to: 20 }
        },
        phase2: {
            translateX: { from: 340 + vw20, to: -49 + vw20 }, 
            translateY: { from: 860, to: (PROGRAMMING_BOX_CENTER_Y - N_BOTTOM_Y) * 1.4 },
            scale: { from: 1.8, to: 0.8 },
            rotate: { from: 20, to: 0 }
        }
    },
    's': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -690 + vw20 }, 
            translateY: { from: 0, to: 990 },
            scale: { from: 1, to: 1 },
            rotate: { from: 0, to: -20 }
        },
        phase2: {
            translateX: { from: -690 + vw20, to: -434 + vw20 }, 
            translateY: { from: 990, to: (PROGRAMMING_BOX_CENTER_Y - S_BOTTOM_Y) * 1.4 },
            scale: { from: 1, to: 0.8 },
            rotate: { from: -20, to: 0 }
        }
    },
    'o2': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -205 + vw20 }, 
            translateY: { from: 0, to: 985 },
            scale: { from: 1, to: 4 },
            rotate: { from: 0, to: -30 }
        },
        phase2: {
            translateX: { from: -205 + vw20, to: -56 + vw20 }, 
            translateY: { from: 985, to: (PROGRAMMING_BOX_CENTER_Y - O2_BOTTOM_Y) * 1.4 },
            scale: { from: 4, to: 0.8 },
            rotate: { from: -30, to: 0 }
        }
    },
    'l': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: 120 + vw20 }, 
            translateY: { from: 0, to: 1055 },
            scale: { from: 1, to: 1.5 },
            rotate: { from: 0, to: 45 }
        },
        phase2: {
            translateX: { from: 120 + vw20, to: -264 + vw20 }, 
            translateY: { from: 1055, to: (PROGRAMMING_BOX_CENTER_Y - L_BOTTOM_Y) * 1.4 },
            scale: { from: 1.5, to: 0.8 },
            rotate: { from: 45, to: 0 }
        }
    },
    'e': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -665 + vw20 }, 
            translateY: { from: 0, to: 1680 },
            scale: { from: 1, to: 0.5 },
            rotate: { from: 0, to: -60 }
        },
        phase2: {
            translateX: { from: -665 + vw20, to: -282 + vw20 }, 
            translateY: { from: 1680, to: (PROGRAMMING_BOX_CENTER_Y - E_BOTTOM_Y) * 1.4 },
            scale: { from: 0.5, to: 0.8 },
            rotate: { from: -60, to: 0 }
        }
    },
    // Additional elements
    'dot': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -270, to: 555 + vw20 }, 
            translateY: { from: 400, to: 1195 },
            scale: { from: 8, to: 3 },
            rotate: { from: 0, to: 0 }
        },
        phase2: {
            translateX: { from: 555 + vw20, to: -80 + vw20 }, 
            translateY: { from: 1195, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y - 45 },
            scale: { from: 3, to: 0.5 },
            rotate: { from: 0, to: 0 }
        }
    },
    'open-bracket': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -150, to: -405 + vw20 }, 
            translateY: { from: 255, to: 970 },
            scale: { from: 2, to: 1 },
            rotate: { from: 0, to: -30 }
        },
        phase2: {
            translateX: { from: -405 + vw20, to: -125 + vw20 }, 
            translateY: { from: 970, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 1, to: 1.5 },
            rotate: { from: -30, to: 0 }
        }
    },
    'close-bracket': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 150, to: 90 + vw20 }, 
            translateY: { from: 255, to: 810 },
            scale: { from: 2, to: 1.2 },
            rotate: { from: 0, to: -30 }
        },
        phase2: {
            translateX: { from: 90 + vw20, to: 28 + vw20 }, 
            translateY: { from: 810, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 1.2, to: 1.5 },
            rotate: { from: -30, to: 0 }
        }
    },
    'log': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 300, to: 140 + vw20 }, 
            translateY: { from: 400, to: 1365 },
            scale: { from: 1.5, to: 1 },
            rotate: { from: 180, to: 30 }
        },
        phase2: {
            translateX: { from: 140 + vw20, to: -55 + vw20 }, 
            translateY: { from: 1365, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y - 70 },
            scale: { from: 1, to: 1.8 },
            rotate: { from: 30, to: 0 }
        }
    },
    'hello': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -50, to: -600 + vw20 }, 
            translateY: { from: -195, to: 1255 },
            scale: { from: 0.3, to: 5 },
            rotate: { from: -25, to: 50 }
        },
        phase2: {
            translateX: { from: -600 + vw20, to: -295 + vw20 }, 
            translateY: { from: 1255, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 5, to: 1.5 },
            rotate: { from: 50, to: 0 }
        }
    },
    'open-parenthesis': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 265, to: 200 + vw20 }, 
            translateY: { from: 415, to: 980 },
            scale: { from: 1.2, to: 2 },
            rotate: { from: -90, to: 30 }
        },
        phase2: {
            translateX: { from: 200 + vw20, to: -340 + vw20 }, 
            translateY: { from: 980, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 2, to: 1.5 },
            rotate: { from: 30, to: 0 }
        }
    },
    'close-parenthesis': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -68, to: 575 + vw20 }, 
            translateY: { from: 172, to: 1400 },
            scale: { from: 1, to: 5 },
            rotate: { from: 90, to: 30 }
        },
        phase2: {
            translateX: { from: 575 + vw20, to: 82 + vw20 }, 
            translateY: { from: 1400, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 5, to: 1.5 },
            rotate: { from: 30, to: 0 }
        }
    },
    'exclamation': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 110, to: 140 + vw20 }, 
            translateY: { from: 160, to: 1650 },
            scale: { from: 1.8, to: 4 },
            rotate: { from: 180, to: 40 }
        },
        phase2: {
            translateX: { from: 140 + vw20, to: 45 + vw20 }, 
            translateY: { from: 1650, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 4, to: 1.5 },
            rotate: { from: 40, to: 0 }
        }
    },
    'dollar': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 160, to: 50 + vw20 }, 
            translateY: { from: 73, to: 1200 },
            scale: { from: 1.5, to: 4 },
            rotate: { from: 0, to: -45 }
        },
        phase2: {
            translateX: { from: 50 + vw20, to: -155 + vw20 }, 
            translateY: { from: 1200, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 4, to: 1.5 },
            rotate: { from: -45, to: 0 }
        }
    },
    'name-input': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -470 + vw20 }, 
            translateY: { from: 0, to: 920 },
            scale: { from: 1, to: 0.2 },
            rotate: { from: 0, to: 0 }
        },
        phase2: {
            translateX: { from: -470 + vw20, to: -48 + vw20 }, 
            translateY: { from: 920, to: PROGRAMMING_BOX_CENTER_Y - NAME_INPUT_BOTTOM_Y + 70},
            scale: { from: 0.2, to: 0.6 },
            rotate: { from: 0, to: 0 }
        }
    },
    'front-tick': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -166, to: -410 + vw20 }, 
            translateY: { from: -20, to: 880 },
            scale: { from: 1.5, to: 2 },
            rotate: { from: 30, to: -30 }
        },
        phase2: {
            translateX: { from: -410 + vw20, to: -320 + vw20 }, 
            translateY: { from: 880, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 2, to: 1.5 },
            rotate: { from: -30, to: 0 }
        }
    },
    'back-tick': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 195, to: 410 + vw20 }, 
            translateY: { from: 133, to: 880 },
            scale: { from: 1.5, to: 5 },
            rotate: { from: 30, to: 30 }
        },
        phase2: {
            translateX: { from: 410 + vw20, to: 60 + vw20 }, 
            translateY: { from: 880, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 5, to: 1.5 },
            rotate: { from: 30, to: 0 }
        }
    }
};

// This configuration is for viewport width 540px and below
const animationConfigThin = {
    'c': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -550 + vw20 }, 
            translateY: { from: 0, to: 890 },
            scale: { from: 1, to: 2 },
            rotate: { from: 0, to: 50 }
        },
        phase2: {
            translateX: { from: -550 + vw20, to: -250 + vw20 }, 
            translateY: { from: 890, to: (PROGRAMMING_BOX_CENTER_Y - C_BOTTOM_Y) * 1.4 },
            scale: { from: 2, to: 0.8 },
            rotate: { from: 50, to: 0 }
        }
    },
    'o1': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: 405 + vw20 }, 
            translateY: { from: 0, to: 1380 },
            scale: { from: 1, to: 2.8 },
            rotate: { from: 0, to: 0 }
        },
        phase2: {
            translateX: { from: 405 + vw20, to: -80 + vw20 }, 
            translateY: { from: 1380, to: (PROGRAMMING_BOX_CENTER_Y - O1_BOTTOM_Y) * 1.4 },
            scale: { from: 2.8, to: 0.8 },
            rotate: { from: 0, to: 0 }
        }
    },
    'n': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: 340 + vw20 }, 
            translateY: { from: 0, to: 860 },
            scale: { from: 1, to: 1.8 },
            rotate: { from: 0, to: 20 }
        },
        phase2: {
            translateX: { from: 340 + vw20, to: 2 + vw20 }, 
            translateY: { from: 860, to: (PROGRAMMING_BOX_CENTER_Y - N_BOTTOM_Y ) * 1.4 },
            scale: { from: 1.8, to: 0.8 },
            rotate: { from: 20, to: 0 }
        }
    },
    's': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -690 + vw20 }, 
            translateY: { from: 0, to: 990 },
            scale: { from: 1, to: 1 },
            rotate: { from: 0, to: -20 }
        },
        phase2: {
            translateX: { from: -690 + vw20, to: -320 + vw20 }, 
            translateY: { from: 990, to: (PROGRAMMING_BOX_CENTER_Y - S_BOTTOM_Y) * 1.4 },
            scale: { from: 1, to: 0.8 },
            rotate: { from: -20, to: 0 }
        }
    },
    'o2': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -205 + vw20 }, 
            translateY: { from: 0, to: 985 },
            scale: { from: 1, to: 4 },
            rotate: { from: 0, to: -30 }
        },
        phase2: {
            translateX: { from: -205 + vw20, to: -5 + vw20 }, 
            translateY: { from: 985, to: (PROGRAMMING_BOX_CENTER_Y - O2_BOTTOM_Y) * 1.4 },
            scale: { from: 4, to: 0.8 },
            rotate: { from: -30, to: 0 }
        }
    },
    'l': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: 120 + vw20 }, 
            translateY: { from: 0, to: 1055 },
            scale: { from: 1, to: 1.5 },
            rotate: { from: 0, to: 45 }
        },
        phase2: {
            translateX: { from: 120 + vw20, to: -178 + vw20 }, 
            translateY: { from: 1055, to: (PROGRAMMING_BOX_CENTER_Y - L_BOTTOM_Y) * 1.4 },
            scale: { from: 1.5, to: 0.8 },
            rotate: { from: 45, to: 0 }
        }
    },
    'e': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -665 + vw20 }, 
            translateY: { from: 0, to: 1680 },
            scale: { from: 1, to: 0.5 },
            rotate: { from: 0, to: -60 }
        },
        phase2: {
            translateX: { from: -665 + vw20, to: -192 + vw20 }, 
            translateY: { from: 1680, to: (PROGRAMMING_BOX_CENTER_Y - E_BOTTOM_Y) * 1.4 },
            scale: { from: 0.5, to: 0.8 },
            rotate: { from: -60, to: 0 }
        }
    },
    // Additional elements
    'dot': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -200, to: 555 + vw20 }, 
            translateY: { from: 350, to: 1195 },
            scale: { from: 8, to: 3 },
            rotate: { from: 0, to: 0 }
        },
        phase2: {
            translateX: { from: 555 + vw20, to: -30 + vw20 }, 
            translateY: { from: 1195, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y - 30 },
            scale: { from: 3, to: 0.4 },
            rotate: { from: 0, to: 0 }
        }
    },
    'open-bracket': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -140, to: -405 + vw20 }, 
            translateY: { from: 208, to: 970 },
            scale: { from: 2, to: 1 },
            rotate: { from: 0, to: -30 }
        },
        phase2: {
            translateX: { from: -405 + vw20, to: -58 + vw20 }, 
            translateY: { from: 970, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 1, to: 1.2 },
            rotate: { from: -30, to: 0 }
        }
    },
    'close-bracket': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 140, to: 90 + vw20 }, 
            translateY: { from: 208, to: 810 },
            scale: { from: 2, to: 1.2 },
            rotate: { from: 0, to: -30 }
        },
        phase2: {
            translateX: { from: 90 + vw20, to: 30 + vw20 }, 
            translateY: { from: 810, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 1.2, to: 1.2 },
            rotate: { from: -30, to: 0 }
        }
    },
    'log': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 150, to: 140 + vw20 }, 
            translateY: { from: 400, to: 1365 },
            scale: { from: 1, to: 1 },
            rotate: { from: 180, to: 30 }
        },
        phase2: {
            translateX: { from: 140 + vw20, to: -8 + vw20 }, 
            translateY: { from: 1365, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y - 52 },
            scale: { from: 1, to: 1.4 },
            rotate: { from: 30, to: 0 }
        }
    },
    'hello': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -50, to: -600 + vw20 }, 
            translateY: { from: -150, to: 1255 },
            scale: { from: 0.3, to: 5 },
            rotate: { from: -25, to: 50 }
        },
        phase2: {
            translateX: { from: -600 + vw20, to: -182 + vw20 }, 
            translateY: { from: 1255, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 5, to: 1.2 },
            rotate: { from: 50, to: 0 }
        }
    },
    'open-parenthesis': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 127, to: 200 + vw20 }, 
            translateY: { from: 410, to: 980 },
            scale: { from: 0.7, to: 2 },
            rotate: { from: -90, to: 30 }
        },
        phase2: {
            translateX: { from: 200 + vw20, to: -210 + vw20 }, 
            translateY: { from: 980, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 2, to: 1.2 },
            rotate: { from: 30, to: 0 }
        }
    },
    'close-parenthesis': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -55, to: 575 + vw20 }, 
            translateY: { from: 152, to: 1400 },
            scale: { from: 1, to: 5 },
            rotate: { from: 90, to: 30 }
        },
        phase2: {
            translateX: { from: 575 + vw20, to: 68 + vw20 }, 
            translateY: { from: 1400, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 5, to: 1.2 },
            rotate: { from: 30, to: 0 }
        }
    },
    'exclamation': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 92, to: 140 + vw20 }, 
            translateY: { from: 138, to: 1650 },
            scale: { from: 1.5, to: 2 },
            rotate: { from: 180, to: 40 }
        },
        phase2: {
            translateX: { from: 140 + vw20, to: 45 + vw20 }, 
            translateY: { from: 1650, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 4, to: 1.4 },
            rotate: { from: 40, to: 0 }
        }
    },
    'dollar': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 135, to: 50 + vw20 }, 
            translateY: { from: 65, to: 1200 },
            scale: { from: 1.3, to: 4 },
            rotate: { from: 0, to: -45 }
        },
        phase2: {
            translateX: { from: 50 + vw20, to: -80 + vw20 }, 
            translateY: { from: 1200, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 4, to: 1.2 },
            rotate: { from: -45, to: 0 }
        }
    },
    'name-input': {
        selectorType: 'id',
        phase1: {
            translateX: { from: 0, to: -470 + vw20 }, 
            translateY: { from: 0, to: 920 },
            scale: { from: 1, to: 0.2 },
            rotate: { from: 0, to: 0 }
        },
        phase2: {
            translateX: { from: -470 + vw20, to: -13 + vw20 }, 
            translateY: { from: 920, to: PROGRAMMING_BOX_CENTER_Y - NAME_INPUT_BOTTOM_Y + 64},
            scale: { from: 0.2, to: 0.4 },
            rotate: { from: 0, to: 0 }
        }
    },
    'front-tick': {
        selectorType: 'class',
        phase1: {
            translateX: { from: -133, to: -410 + vw20 }, 
            translateY: { from: -12, to: 880 },
            scale: { from: 1, to: 2 },
            rotate: { from: 30, to: -30 }
        },
        phase2: {
            translateX: { from: -410 + vw20, to: -198 + vw20 }, 
            translateY: { from: 880, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 2, to: 1.2 },
            rotate: { from: -30, to: 0 }
        }
    },
    'back-tick': {
        selectorType: 'class',
        phase1: {
            translateX: { from: 160, to: 410 + vw20 }, 
            translateY: { from: 115, to: 880 },
            scale: { from: 1, to: 5 },
            rotate: { from: 30, to: 30 }
        },
        phase2: {
            translateX: { from: 410 + vw20, to: 55 + vw20 }, 
            translateY: { from: 880, to: PROGRAMMING_BOX_CENTER_Y - TEST_MARKER_BOTTOM_Y + 40 },
            scale: { from: 5, to: 1.2 },
            rotate: { from: 30, to: 0 }
        }
    }
};


const animatedElements = {};
for (const elementId in animationConfigWide) {
    const config = animationConfigWide[elementId];
    if (config.selectorType === 'class') {
        animatedElements[elementId] = document.querySelector(`.${elementId}`);
    } else {
        animatedElements[elementId] = document.getElementById(elementId);
    }
}
for (const elementId in animationConfigMedium) {
    if (animatedElements[elementId]) continue;
    
    const config = animationConfigMedium[elementId];
    if (config.selectorType === 'class') {
        animatedElements[elementId] = document.querySelector(`.${elementId}`);
    } else {
        animatedElements[elementId] = document.getElementById(elementId);
    }
}
for (const elementId in animationConfigSmall) {
    if (animatedElements[elementId]) continue;
    
    const config = animationConfigSmall[elementId];
    if (config.selectorType === 'class') {
        animatedElements[elementId] = document.querySelector(`.${elementId}`);
    } else {
        animatedElements[elementId] = document.getElementById(elementId);
    }
}
for (const elementId in animationConfigThin) {
    if (animatedElements[elementId]) continue;
    
    const config = animationConfigThin[elementId];
    if (config.selectorType === 'class') {
        animatedElements[elementId] = document.querySelector(`.${elementId}`);
    } else {
        animatedElements[elementId] = document.getElementById(elementId);
    }
}

// Function to get the appropriate animation configuration based on viewport width
function getAnimationConfig() {
    const width = window.innerWidth;
    
    switch (true) {
        case width > 900:
            return animationConfigWide;
        case width > 700 && width <= 900:
            return animationConfigMedium;
        case width > 540 && width <= 700:
            return animationConfigSmall;
        case width <= 540:
            return animationConfigThin;
        default:
            return animationConfigThin;
    }
}
// Typing animation function
function typeText(element, text, speed = 50) {
    element.innerHTML = '';
    
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.innerHTML = '|';
    element.appendChild(cursor);
    
    if (!document.getElementById('typing-cursor-style')) {
        const style = document.createElement('style');
        style.id = 'typing-cursor-style';
        style.innerHTML = `
            .typing-cursor {
                animation: blink 1s infinite;
                margin-left: 2px;
            }
            
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    let i = 0;
    
    function typeCharacter() {
        if (i < text.length) {
            // Remove cursor temporarily if it exists
            if (element.lastChild && element.lastChild.className === 'typing-cursor') {
                element.removeChild(element.lastChild);
            }
            
            element.innerHTML += text.charAt(i);
            element.appendChild(cursor);
            i++;
            
            setTimeout(typeCharacter, speed);
        } else {
            if (element.lastChild && element.lastChild.className === 'typing-cursor') {
                element.removeChild(element.lastChild);
            }
            
            if (typeof window.typingAnimationRunning !== 'undefined') {
                window.typingAnimationRunning = false;
            }
        }
    }
    
    typeCharacter();
}

function eraseText(element, speed = 30) {
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.innerHTML = '|';
    
    if (!document.getElementById('typing-cursor-style')) {
        const style = document.createElement('style');
        style.id = 'typing-cursor-style';
        style.innerHTML = `
            .typing-cursor {
                animation: blink 1s infinite;
                margin-left: 2px;
            }
            
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    let text = element.innerHTML;
    if (element.lastChild && element.lastChild.className === 'typing-cursor') {
        text = text.substring(0, text.length - element.lastChild.outerHTML.length);
    }
    let i = text.length;
    
    function eraseCharacter() {
        if (i > 0) {
            if (element.lastChild && element.lastChild.className === 'typing-cursor') {
                element.removeChild(element.lastChild);
            }
            
            text = text.substring(0, text.length - 1);
            element.innerHTML = text;
            
            element.appendChild(cursor);
            
            i--;
            
            setTimeout(eraseCharacter, speed);
        } else {
            if (element.lastChild && element.lastChild.className === 'typing-cursor') {
                element.removeChild(element.lastChild);
            }
            
            if (typeof window.typingAnimationRunning !== 'undefined') {
                window.typingAnimationRunning = false;
            }
        }
    }
    
    eraseCharacter();
}

function eraseAndType(element, newText, eraseSpeed = 30, typeSpeed = 50) {
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.innerHTML = '|';
    
    if (!document.getElementById('typing-cursor-style')) {
        const style = document.createElement('style');
        style.id = 'typing-cursor-style';
        style.innerHTML = `
            .typing-cursor {
                animation: blink 1s infinite;
                margin-left: 2px;
            }
            
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    let text = element.innerHTML;
    if (element.lastChild && element.lastChild.className === 'typing-cursor') {
        text = text.substring(0, text.length - element.lastChild.outerHTML.length);
    }
    let i = text.length;
    
    function eraseCharacter() {
        if (i > 0) {
            if (element.lastChild && element.lastChild.className === 'typing-cursor') {
                element.removeChild(element.lastChild);
            }
            
            text = text.substring(0, text.length - 1);
            element.innerHTML = text;
            
            element.appendChild(cursor);
            
            i--;
            
            setTimeout(eraseCharacter, eraseSpeed);
        } else {
            if (element.lastChild && element.lastChild.className === 'typing-cursor') {
                element.removeChild(element.lastChild);
            }
            
            typeText(element, newText, typeSpeed);
        }
    }
    
    // Start erasing
    eraseCharacter();
}

// Add scroll event listener to track scroll position
window.addEventListener('scroll', function() {
    // Get the appropriate animation configuration based on viewport width
    const animationConfig = getAnimationConfig();
    
    // Check if there's an animation configuration for the current viewport width
    if (Object.keys(animationConfig).length === 0) {
        // Reset element styles when viewport width is 540px or less
        resetElements();
        return;
    }
    
    const scrollPosition = window.scrollY;
    
    let phase1Start, phase1End, phase2Start, phase2End;
    
    switch (true) {
        case window.innerWidth > 900:
            // For wide viewport width (> 900px): Phase 1 (90px to 825px), Phase 2 (825px to 1650px)
            phase1Start = 90;
            phase1End = 825;
            phase2Start = 825;
            phase2End = 1650;
            break;
        case window.innerWidth > 700 && window.innerWidth <= 900:
            // For medium viewport width (700px-900px): Phase 1 (90px to 1250px), Phase 2 (1250px to 2000px)
            phase1Start = 90;
            phase1End = 1250;
            phase2Start = 1250;
            phase2End = 2000;
            break;
        case window.innerWidth > 540 && window.innerWidth <= 700:
            // For small viewport width (540px-700px): Phase 1 (90px to 825px), Phase 2 (825px to 1650px)
            phase1Start = 90;
            phase1End = 825;
            phase2Start = 825;
            phase2End = 1650;
            break;
        case window.innerWidth <= 540:
            // For thin viewport width (<= 540px): Phase 1 (90px to 825px), Phase 2 (825px to 1650px)
            phase1Start = 90;
            phase1End = 825;
            phase2Start = 825;
            phase2End = 1650;
            break;
        default:
            // For viewport width <= 540px, return without animating
            return;
    }
    
    let scrollPercentage, phase;
    
    switch (true) {
        case scrollPosition <= phase1Start:
            scrollPercentage = 0;
            phase = 1;
            break;
        case scrollPosition >= phase1Start && scrollPosition <= phase1End:
            scrollPercentage = Math.round(((scrollPosition - phase1Start) / (phase1End - phase1Start)) * 100);
            phase = 1;
            break;
        case scrollPosition > phase1End && scrollPosition < phase2Start:
            scrollPercentage = 100;
            phase = 1;
            break;
        case scrollPosition >= phase2Start && scrollPosition <= phase2End:
            scrollPercentage = Math.round(((scrollPosition - phase2Start) / (phase2End - phase2Start)) * 100);
            phase = 2;
            break;
        case scrollPosition > phase2End:
            scrollPercentage = 100;
            phase = 2;
            break;
        default:
            scrollPercentage = 0;
            phase = 1;
    }
    
    console.log(`Scroll Position: ${scrollPosition}px | Phase: ${phase} | Scroll Progress: ${scrollPercentage}%`);
    
    const nameInputElement = document.querySelector('.name-input');
    const outputtext = document.getElementById("output");
    const userInput = document.getElementById("name-input");
    if (scrollPosition >= 250){
        nameInputElement.style.zIndex = -2;
    }
    else{
        nameInputElement.style.zIndex = 1;
    }

    if (typeof window.typingAnimationTriggered === 'undefined') {
        window.typingAnimationTriggered = false;
    }
    
    if (typeof window.typingAnimationRunning === 'undefined') {
        window.typingAnimationRunning = false;
    }
    
    if (scrollPercentage >= 90){
        if (!window.typingAnimationTriggered && !window.typingAnimationRunning) {
            window.typingAnimationTriggered = true;
            window.typingAnimationRunning = true;
            
            eraseAndType(outputtext, `Hello ${userInput.value}!`, 30, 50);
        }
    }
    else{
        if (window.typingAnimationTriggered) {
            if (!window.typingAnimationRunning) {
                window.typingAnimationRunning = true;
                eraseAndType(outputtext, "Hello Guest!", 30, 50);
            }
            window.typingAnimationTriggered = false;
        }
    }

    animateElements(scrollPercentage, phase, animationConfig);
});

window.addEventListener('resize', function() {
    const vw = window.innerWidth / 100;
    const vw20 = 20 * vw;
    
    updateAnimationConfigurations(vw20);
    
    window.dispatchEvent(new Event('scroll'));
});

function updateAnimationConfigurations(vw20) {
    for (const elementId in animationConfigWide) {
        const config = animationConfigWide[elementId];
        if (!config || !config.phase1) continue;
        
        if (config.phase1.translateX) {
            if (typeof config.phase1.translateX.to === 'number' && config.phase1.translateX.to !== 0) {
                config.phase1.translateX.to = config.phase1.translateX.to - (20 * (window.innerWidth / 100)) + vw20;
            }
        }
        if (config.phase1.translateX && typeof config.phase1.translateX.from === 'number' && config.phase1.translateX.from !== 0) {
        }
        
        if (config.phase2.translateX) {
            if (typeof config.phase2.translateX.to === 'number' && config.phase2.translateX.to !== 0) {
                config.phase2.translateX.to = config.phase2.translateX.to - (20 * (window.innerWidth / 100)) + vw20;
            }
            if (typeof config.phase2.translateX.from === 'number' && config.phase2.translateX.from !== 0) {
                config.phase2.translateX.from = config.phase2.translateX.from - (20 * (window.innerWidth / 100)) + vw20;
            }
        }
    }
    
    if (PROGRAMMING_BOX_CENTER_Y > 0) {
    }
    
    if (C_BOTTOM_Y > 0) {
    }
    
    if (O1_BOTTOM_Y > 0) {
    }
    
    if (N_BOTTOM_Y > 0) {
    }
    
    if (S_BOTTOM_Y > 0) {
    }
    
    if (O2_BOTTOM_Y > 0) {
    }
    
    if (L_BOTTOM_Y > 0) {
    }
    
    if (E_BOTTOM_Y > 0) {
    }
    
    if (NAME_INPUT_BOTTOM_Y > 0) {
    }
    
    for (const elementId in animationConfigMedium) {
        const config = animationConfigMedium[elementId];
        if (!config || !config.phase1) continue;
        
        if (config.phase1.translateX) {
            if (typeof config.phase1.translateX.to === 'number' && config.phase1.translateX.to !== 0) {
                config.phase1.translateX.to = config.phase1.translateX.to - (20 * (window.innerWidth / 100)) + vw20;
            }
        }
        if (config.phase1.translateX && typeof config.phase1.translateX.from === 'number' && config.phase1.translateX.from !== 0) {
        }
        
        if (config.phase2.translateX) {
            if (typeof config.phase2.translateX.to === 'number' && config.phase2.translateX.to !== 0) {
                config.phase2.translateX.to = config.phase2.translateX.to - (20 * (window.innerWidth / 100)) + vw20;
            }
            if (typeof config.phase2.translateX.from === 'number' && config.phase2.translateX.from !== 0) {
                config.phase2.translateX.from = config.phase2.translateX.from - (20 * (window.innerWidth / 100)) + vw20;
            }
        }
        
        if (config.phase2.translateY) {
            switch (elementId) {
                case 'c':
                    if (C_BOTTOM_Y > 0) {
                        config.phase2.translateY.to = ELEMENT_POSITIONS.c.bottom.y - C_BOTTOM_Y;
                    }
                    break;
                case 'o1':
                    if (O1_BOTTOM_Y > 0) {
                        config.phase2.translateY.to = ELEMENT_POSITIONS.o1.bottom.y - O1_BOTTOM_Y;
                    }
                    break;
                case 'n':
                    if (N_BOTTOM_Y > 0) {
                        config.phase2.translateY.to = ELEMENT_POSITIONS.n.bottom.y - N_BOTTOM_Y;
                    }
                    break;
                case 's':
                    if (S_BOTTOM_Y > 0) {
                        config.phase2.translateY.to = ELEMENT_POSITIONS.s.bottom.y - S_BOTTOM_Y;
                    }
                    break;
                case 'o2':
                    if (O2_BOTTOM_Y > 0) {
                        config.phase2.translateY.to = ELEMENT_POSITIONS.o2.bottom.y - O2_BOTTOM_Y;
                    }
                    break;
                case 'l':
                    if (L_BOTTOM_Y > 0) {
                        config.phase2.translateY.to = ELEMENT_POSITIONS.l.bottom.y - L_BOTTOM_Y;
                    }
                    break;
                case 'e':
                    if (E_BOTTOM_Y > 0) {
                        config.phase2.translateY.to = ELEMENT_POSITIONS.e.bottom.y - E_BOTTOM_Y;
                    }
                    break;
                case 'name-input':
                    if (NAME_INPUT_BOTTOM_Y > 0) {
                        config.phase2.translateY.to = ELEMENT_POSITIONS.nameInput.bottom.y - NAME_INPUT_BOTTOM_Y;
                    }
                    break;
            }
        }
    }
    
    for (const elementId in animationConfigSmall) {
        const config = animationConfigSmall[elementId];
        if (!config || !config.phase1) continue;
        
        if (config.phase1.translateX) {
            if (typeof config.phase1.translateX.to === 'number' && config.phase1.translateX.to !== 0) {
                config.phase1.translateX.to = config.phase1.translateX.to - (20 * (window.innerWidth / 100)) + vw20;
            }
        }
        if (config.phase1.translateX && typeof config.phase1.translateX.from === 'number' && config.phase1.translateX.from !== 0) {
        }
        
        if (config.phase2.translateX) {
            if (typeof config.phase2.translateX.to === 'number' && config.phase2.translateX.to !== 0) {
                config.phase2.translateX.to = config.phase2.translateX.to - (20 * (window.innerWidth / 100)) + vw20;
            }
            if (typeof config.phase2.translateX.from === 'number' && config.phase2.translateX.from !== 0) {
                config.phase2.translateX.from = config.phase2.translateX.from - (20 * (window.innerWidth / 100)) + vw20;
            }
        }
    }
    
    for (const elementId in animationConfigThin) {
        const config = animationConfigThin[elementId];
        if (!config || !config.phase1) continue;
        
        if (config.phase1.translateX) {
            if (typeof config.phase1.translateX.to === 'number' && config.phase1.translateX.to !== 0) {
                config.phase1.translateX.to = config.phase1.translateX.to - (20 * (window.innerWidth / 100)) + vw20;
            }
        }
        if (config.phase1.translateX && typeof config.phase1.translateX.from === 'number' && config.phase1.translateX.from !== 0) {
        }
        
        if (config.phase2.translateX) {
            if (typeof config.phase2.translateX.to === 'number' && config.phase2.translateX.to !== 0) {
                config.phase2.translateX.to = config.phase2.translateX.to - (20 * (window.innerWidth / 100)) + vw20;
            }
            if (typeof config.phase2.translateX.from === 'number' && config.phase2.translateX.from !== 0) {
                config.phase2.translateX.from = config.phase2.translateX.from - (20 * (window.innerWidth / 100)) + vw20;
            }
        }
    }
}

function resetElements() {
    for (const elementId in animatedElements) {
        const element = animatedElements[elementId];
        if (element) {
            // Reset transform and animation styles
            element.style.transform = '';
            element.style.animation = '';
        }
    }
}

function animateElements(scrollPercentage, phase, animationConfig) {
    for (const elementId in animationConfig) {
        const element = animatedElements[elementId];
        if (element) {
            animateElement(element, elementId, scrollPercentage, phase, animationConfig);
        }
    }
}

function animateElement(element, elementId, scrollPercentage, phase, animationConfig) {
    const config = animationConfig[elementId];
    
    if (!config) return; // No configuration for this element
    
    const phaseConfig = phase === 1 ? config.phase1 : config.phase2;
    
    let translateX;
    if (phase === 1 && scrollPercentage === 0) {
        translateX = `${phaseConfig.translateX.from}px`;
    } else {
        const translateXValue = phaseConfig.translateX.from + (scrollPercentage / 100) * (phaseConfig.translateX.to - phaseConfig.translateX.from);
        translateX = `${translateXValue}px`;
    }
    
    const translateY = phaseConfig.translateY.from + (scrollPercentage / 100) * (phaseConfig.translateY.to - phaseConfig.translateY.from);
    const scale = phaseConfig.scale.from + (scrollPercentage / 100) * (phaseConfig.scale.to - phaseConfig.scale.from);
    const rotate = phaseConfig.rotate.from + (scrollPercentage / 100) * (phaseConfig.rotate.to - phaseConfig.rotate.from);
    
    element.style.animation = 'none';
    
    element.style.transform = `translate(${translateX}, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
}