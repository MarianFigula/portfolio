const cvButton = document.getElementById("download-cv");
const form = document.getElementById("form");

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

// Initialize the Typed.js instance
const typed = new Typed('#typed-text', {
    strings: location.href.includes("sk") ? typedStringsSK : typedStringsEN,
    typeSpeed: 70,
});

// button for downloading cv
cvButton.addEventListener('click', () => {
    console.log("clicked");
    const link = document.createElement('a');
    link.href = 'assets/CV.pdf';
    link.download = 'CV.pdf';
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