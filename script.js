// Get the name button and hello-world section elements
const nameButton = document.querySelector('.name-button');
const helloWorldSection = document.getElementById('hello-world');

// Add click event listener to the name button
nameButton.addEventListener('click', function() {
    // Get the position of the hello-world section
    const sectionPosition = helloWorldSection.getBoundingClientRect().top;
    
    // Get the current scroll position
    const offsetPosition = sectionPosition + window.pageYOffset - 100;
    
    // Scroll to the position with offset
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});

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
});