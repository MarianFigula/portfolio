const cvButton = document.getElementById("download-cv");
const form = document.getElementById("form");
const isSk = window.location.href.includes("sk")

const typedStringsEN = [
    "Web Developer",
    "Frontend Developer",
    "Student",
    "Eager for knowledge",
    "Tech Enthusiast",
    "Fast learner"
]
const typedStringsSK = [
    "Web Developer",
    "Frontend Developer",
    "Študent",
    "Technický nadšenec",
]

document.addEventListener('DOMContentLoaded', function() {
    const autoShowElements = document.querySelectorAll('.auto-show');
    const revealed = new Set();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !revealed.has(entry.target)) {
                entry.target.classList.add('revealed');
                revealed.add(entry.target);
            }
        });
    }, {
        threshold: 0.4
    });

    autoShowElements.forEach(el => observer.observe(el));
    
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-copyright');
    if (copyrightElement) {
        copyrightElement.innerHTML += ` ${currentYear}`;
    }
});

// preloader
document.addEventListener('DOMContentLoaded', function() {
    // Hide preloader and show main content after the window is fully loaded
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        const loaderBar = document.querySelector('.loader-bar');
        preloader.classList.add('preloader-hidden');
        // Initialize the Typed.js instance
        const typed = new Typed('#typed-text', {
            strings: isSk ? typedStringsSK : typedStringsEN,
            typeSpeed: 70,
            loop: true,
        });
        window.setTimeout(function () {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            document.querySelector('head').appendChild(script);
        }, 3000);
    });
});


// button for downloading cv
cvButton.addEventListener('click', () => {
    console.log("clicked");
    const link = document.createElement('a');
    link.href = isSk ? '../assets/CV_sk.pdf' : 'assets/CV.pdf';
    link.download = isSk ? 'CV_sk.pdf' : 'CV.pdf';
    link.dispatchEvent(new MouseEvent('click'));
})

// navbar icons
document.querySelector('.icon-container').addEventListener('click', () => {
    const listIcon = document.getElementById('list-icon');
    const xIcon = document.getElementById('x-icon');
    const nav = document.querySelector('nav');

    listIcon.classList.toggle('hide');
    xIcon.classList.toggle('show');
    nav.classList.toggle('show');
});

// scroll down icon
document.querySelector('.scroll-down-icon').addEventListener('click', () => {
    const about = document.querySelector('#about');
    about.scrollIntoView({behavior: 'smooth'});
})

// sending email with emailjs from contact form
form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = {
        name : form.name.value,
        email : form.email.value,
        message : form.message.value
    }

    await emailjs.send("service_ueenyhf", "template_v3mrdc5",
        {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message
        })
        .then(function(response) {
            console.log("response:", response.status, response.text);
            alert('Email sent successfully!');
            form.reset();
        }, function(error) {
            console.log("error:", error)
            alert('Failed to send email. Please try again later.');
        });

});