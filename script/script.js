const cvButton = document.getElementById("download-cv");

const typed = new Typed('#typed-text', {
    strings: ['Web Developer','Frontend Developer', 'Student',"Eager for knowledge", "Tech Enthusiast", "Fast learner"],
    typeSpeed: 70,
});

cvButton.addEventListener('click', () => {
    console.log("clicked");
    const link = document.createElement('a');
    link.href = 'assets/CV.pdf';
    link.download = 'CV.pdf';
    link.dispatchEvent(new MouseEvent('click'));
})

document.querySelector('.icon-container').addEventListener('click', () => {
    const listIcon = document.getElementById('list-icon');
    const xIcon = document.getElementById('x-icon');
    const nav = document.querySelector('nav');

    listIcon.classList.toggle('hide');
    xIcon.classList.toggle('show');
    nav.classList.toggle('show');
});

document.querySelector('.scroll-down-icon').addEventListener('click', () => {
    //const about = document.querySelector('#about');
    //about.scrollIntoView({behavior: 'smooth'});
    window.scrollTo({
        top: document.querySelector('#about').offsetHeight,
        left: 0,
        behavior: 'smooth'
    });
})