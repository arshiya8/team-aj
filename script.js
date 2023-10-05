// Sample data for past and registered activities (replace with data from your database)
const pastActivitiesData = [
    { name: "Activity 1", date: "2023-09-01", cspHours: 2 },
    { name: "Activity 2", date: "2023-08-15", cspHours: 2 },
];

const registeredActivitiesData = [
    { name: "Activity 3", date: "2023-09-10", status: "Pending" },
    { name: "Activity 4", date: "2023-09-20", status: "Accepted" },
    { name: "Activity 5", date: "2023-09-25", status: "Rejected" },
];

// Function to calculate cspHours by summing values from pastActivitiesData
function calculateCSPHours() {
    return pastActivitiesData.reduce((total, activity) => {
        return total + (activity.cspHours || 0);
    }, 0);
}

// Function to update the CSP Hours display in the HTML
function updateCSPHoursDisplay() {
    const cspHoursValue = document.getElementById("cspHoursValue");
    const cspHours = calculateCSPHours();
    cspHoursValue.textContent = cspHours;
}

// Function to populate past activities list
function populatePastActivities() {
    const pastActivitiesList = document.getElementById("pastActivities");

    pastActivitiesData.forEach(activity => {
        const listItem = document.createElement("li");
        listItem.textContent = `${activity.name} - ${activity.date}`;

        pastActivitiesList.appendChild(listItem);
    });
}

// Populate registered activities list
function populateRegisteredActivities() {
    const registeredActivitiesList = document.getElementById("registeredActivities");

    registeredActivitiesData.forEach(activity => {
        const listItem = document.createElement("li");
        listItem.textContent = `${activity.name} - ${activity.date} (${activity.status})`;

        registeredActivitiesList.appendChild(listItem);
    });
}

function createDeleteButton(listItem) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        // Remove the corresponding list item when the "delete" button is clicked
        listItem.remove();
    });

    listItem.appendChild(deleteButton);
}

// Event listener for the interests dropdown menu
document.getElementById("interests").addEventListener("change", function () {
    const selectedInterest = this.value; // Get the selected interest from the dropdown

    // Add the selected interest to the "Interest List"
    const interestList = document.getElementById("interestList");
    const listItem = document.createElement("li");
    listItem.textContent = selectedInterest;

    // Add a "delete" button next to the interest item
    const deleteButton = createDeleteButton(listItem);

    interestList.appendChild(listItem);
});

// Populate the initial lists of activities
populatePastActivities();
populateRegisteredActivities();

// Function to handle image upload
function handleImageUpload(event) {
    const fileInput = event.target;
    const imagePreview = document.getElementById("profileImagePreview");
    const previewImage = document.getElementById("previewProfileImage");

    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
}

// Event listener for the image upload button
document.getElementById("profileUploadButton").addEventListener("click", function () {
    const imageUpload = document.getElementById("profileImageUpload");
    imageUpload.click();
});

// Event listener for the image upload input
document.getElementById("profileImageUpload").addEventListener("change", handleImageUpload);

// Badge system
const socialImpactorBadge = document.getElementById('socialImpactorBadge');
const serviceEnthusiastBadge = document.getElementById('serviceEnthusiastBadge');

// Update CSP Hours display initially
updateCSPHoursDisplay();

// Calculate cspHours and update badges and progress bar when needed
function updateBadgesAndProgressBar() {
    const cspHours = calculateCSPHours();

    if (cspHours >= 80) {
        serviceEnthusiastBadge.classList.add('earned-badge');
    } else {
        serviceEnthusiastBadge.classList.remove('earned-badge');
    }

    if (cspHours > 0) {
        socialImpactorBadge.classList.add('earned-badge');
    } else {
        socialImpactorBadge.classList.remove('earned-badge');
    }

    const progressBar = document.getElementById('progressBar');
    const progressBarWidth = (cspHours / 80) * 100;
    progressBar.style.width = `${progressBarWidth}%`;
}

// Call updateBadgesAndProgressBar whenever there's a change in pastActivitiesData
// For example, after adding or updating activities in pastActivitiesData
updateBadgesAndProgressBar();
