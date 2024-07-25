
const typed = new Typed('#typed-text', {
    strings: ['Web Developer', '.'],
    typeSpeed: 100,
});

const cvButton = document.getElementById("download-cv");
cvButton.addEventListener('click', () => {
    console.log("clicked");
    const link = document.createElement('a');
    link.href = 'assets/CV.pdf';
    link.download = 'CV.pdf';
    link.dispatchEvent(new MouseEvent('click'));
})

// document.addEventListener("DOMContentLoaded", () => {
//     const sections = document.querySelectorAll("section");
//
//     const options = {
//         threshold: 0.25
//     };
//
//     const observer = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add("show");
//                 observer.unobserve(entry.target); // Stop observing once it’s in view
//             }
//         });
//     }, options);
//
//     sections.forEach(section => {
//         observer.observe(section);
//     });
// });
