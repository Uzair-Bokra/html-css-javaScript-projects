document.getElementById("resume-form").addEventListener("submit", function(e) {
    e.preventDefault();
    updateResume();
});

function updateResume() {
    document.getElementById("display-name").innerText = document.getElementById("name").value;
    document.getElementById("display-email").innerText = document.getElementById("email").value;
    document.getElementById("display-phone").innerText = document.getElementById("phone").value;
    document.getElementById("display-website").innerText = document.getElementById("website").value;
    document.getElementById("display-education").innerText = document.getElementById("education").value;
    document.getElementById("display-experience").innerText = document.getElementById("experience").value;

    const skills = document.getElementById("skills").value.split(",");
    const skillsList = document.getElementById("display-skills");
    skillsList.innerHTML = ""; // Clear current skills
    skills.forEach(skill => {
        let skillItem = document.createElement("li");
        skillItem.contentEditable = "true";
        skillItem.classList.add("editable");
        skillItem.innerText = skill.trim();
        skillsList.appendChild(skillItem);
    });

    // Display uploaded image in the resume
    const profilePic = document.getElementById("profile-pic").files[0];
    if (profilePic) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("display-pic").src = e.target.result;
        };
        reader.readAsDataURL(profilePic);
    }
}

// Generate unique URL based on username
function generateURL() {
    const username = document.getElementById("name").value.toLowerCase().replace(/\s+/g, '');
    const uniqueURL = `https://${username}.vercel.app/resume`;
    
    // Copy the URL to the clipboard and alert the user
    navigator.clipboard.writeText(uniqueURL)
        .then(() => alert(`Shareable URL copied to clipboard: ${uniqueURL}`))
        .catch(err => alert("Failed to copy URL: ", err));
}

// Download resume as PDF using html2pdf.js
function downloadPDF() {
    const resumeElement = document.getElementById("resume");

    // Options for pdf download
    const options = {
        margin:       0.5,
        filename:     `${document.getElementById("name").value}_Resume.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(options).from(resumeElement).save();
}
