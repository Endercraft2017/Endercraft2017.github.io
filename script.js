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
    
    // Calculate scroll progress as percentage (0% at 90px, 10% at 1650px)
    const minPosition = 90;
    const maxPosition = 1650;
    let scrollPercentage;
    
    if (scrollPosition <= minPosition) {
        scrollPercentage = 0;
    } else if (scrollPosition >= maxPosition) {
        scrollPercentage = 100;
    } else {
        // Map the range [90, 1650] to [0, 100]
        scrollPercentage = Math.round(((scrollPosition - minPosition) / (maxPosition - minPosition)) * 100);
    }
    
    // Log scroll information to console
    console.log(`Scroll Position: ${scrollPosition}px | Scroll Progress: ${scrollPercentage}%`);
});