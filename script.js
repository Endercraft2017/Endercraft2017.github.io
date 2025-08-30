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