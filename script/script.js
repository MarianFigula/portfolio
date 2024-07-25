
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