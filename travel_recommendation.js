/* contact us form submission */
let contacts = [];
function submitContactForm() {
    const contactInfo = [];
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const country = document.getElementById('country').value;
    const subject = document.getElementById('subject').value;

    if (firstName && lastName && country && subject) {

        const contactInfo = {
            FirstName: firstName,
            LastName: lastName,
            Country: country,
            Subject: subject
        };
        contacts.push(contactInfo);
        console.log(contactInfo);
        alert('your inquiry has been submitted.Thanks');  
        clearContactFormInputs();
    } else {
        alert('please provide the requested information');
    }
}

function clearContactFormInputs() {
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('country').value = 'Australia';
    document.getElementById('subject').value = '';
}