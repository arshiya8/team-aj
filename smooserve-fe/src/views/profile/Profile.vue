<!-- <script setup>
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

  pastActivitiesData.forEach((activity) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${activity.name} - ${activity.date}`;

    pastActivitiesList.appendChild(listItem);
  });
}

// Populate registered activities list
function populateRegisteredActivities() {
  const registeredActivitiesList = document.getElementById(
    "registeredActivities"
  );

  registeredActivitiesData.forEach((activity) => {
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
document
  .getElementById("profileUploadButton")
  .addEventListener("click", function () {
    const imageUpload = document.getElementById("profileImageUpload");
    imageUpload.click();
  });

// Event listener for the image upload input
document
  .getElementById("profileImageUpload")
  .addEventListener("change", handleImageUpload);

// Badge system
const socialImpactorBadge = document.getElementById("socialImpactorBadge");
const serviceEnthusiastBadge = document.getElementById(
  "serviceEnthusiastBadge"
);

// Update CSP Hours display initially
updateCSPHoursDisplay();

// Calculate cspHours and update badges and progress bar when needed
function updateBadgesAndProgressBar() {
  const cspHours = calculateCSPHours();

  if (cspHours >= 80) {
    serviceEnthusiastBadge.classList.add("earned-badge");
  } else {
    serviceEnthusiastBadge.classList.remove("earned-badge");
  }

  if (cspHours > 0) {
    socialImpactorBadge.classList.add("earned-badge");
  } else {
    socialImpactorBadge.classList.remove("earned-badge");
  }

  const progressBar = document.getElementById("progressBar");
  const progressBarWidth = (cspHours / 80) * 100;
  progressBar.style.width = `${progressBarWidth}%`;
}

// Call updateBadgesAndProgressBar whenever there's a change in pastActivitiesData
// For example, after adding or updating activities in pastActivitiesData
updateBadgesAndProgressBar();
</script> -->
<style>
/* styles.css */

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #064273;
}

.container {
  max-width: 800px;
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.profile-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.interests-section {
  flex: 1;
  padding: 20px;
}

.select-box {
  width: 100%;
  padding: 10px;
  border: 1px solid #def3f6;
  border-radius: 5px;
}

.action-button {
  background-color: #76b6c4;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.image-section {
  flex: 1;
  text-align: center;
}

.profile-image {
  max-width: 100%;
  height: auto;
  border-radius: 50%; /* Circular shape */
  margin-top: 20px;
}

.activities-section {
  margin-top: 20px;
}

.info-list {
  list-style: none;
  padding: 0;
}

.info-list li {
  margin-bottom: 10px;
  padding: 5px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.info-list li button {
  background-color: #7fcdff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.circular-image-preview {
  width: 200px; /* Adjust the size as needed */
  border-radius: 50%;
  overflow: hidden;
}

.circular-image-preview img {
  width: 200px;
}

/* Existing CSS styles above this line */

/* Badge styles */
.earned-badge {
  background-color: #27ae60 !important; /* Change color for earned badges */
}

/* Progress bar styles */
.progress-bar-container {
  background-color: #ecf0f1;
  height: 20px;
  width: 100%;
  border-radius: 5px;
  margin-top: 10px;
}

.progress-bar {
  height: 100%;
  background-color: #3498db;
  border-radius: 5px;
  transition: width 0.5s;
}

/* Favorites tab styles */
.favorites {
  margin-top: 20px;
}

.favorites h2 {
  margin-top: 20px;
}

/* Existing CSS styles below this line */
</style>

<template>
  <div class="container">
    <img src="/layout/images/logo-white.png" width="25%" height="25%" />
    <h1>Student Profile</h1>
    <div class="profile-section">
      <div class="interests-section">
        <label for="interests">Select Interests:</label>
        <select id="interests" class="select-box">
          <option value="Elderly">Elderly</option>
          <option value="Youth">Youth</option>
          <option value="Children">Children</option>
          <option value="Others">Others</option>
        </select>
        <ul id="interestList" class="info-list"></ul>
      </div>

      <div class="image-section">
        <input
          type="file"
          id="profileImageUpload"
          accept="image/*"
          style="display: none"
        />
        <button id="profileUploadButton" class="action-button">
          Upload Profile Picture
        </button>
        <div
          id="profileImagePreview"
          class="circular-image-preview"
          style="display: none"
        >
          <img
            id="previewProfileImage"
            src="#"
            alt="Profile Picture"
            class="profile-image"
          />
        </div>
      </div>
    </div>

    <div class="activities-section">
      <h2>Past Volunteered Activities</h2>
      <ul id="pastActivities" class="info-list">
        <!-- Activities will be dynamically added here using JavaScript -->
      </ul>

      <h2>Registered Activities</h2>
      <ul id="registeredActivities" class="info-list">
        <!-- Activities will be dynamically added here using JavaScript -->
      </ul>

      <!--Badge section -->
      <div class="badges">
        <h2>Badges</h2>
        <div class="badge" id="socialImpactorBadge">Social Impactor Badge</div>
        <div class="badge" id="serviceEnthusiastBadge">
          Service Enthusiast Badge
        </div>
      </div>

      <!-- Progress section -->
      <div class="progress">
        <h2>Progress</h2>
        <div class="progress-bar-container">
          <div class="progress-bar" id="progressBar"></div>
        </div>
        <!-- Display CSP Hours -->
        <p id="cspHoursDisplay">
          Total CSP Hours: <span id="cspHoursValue">0</span>
        </p>
      </div>
    </div>

    <div class="image-section">
      <!-- Your existing image section remains unchanged -->

      <!-- Add a favorites section -->
      <div class="favorites">
        <h2>Favorites</h2>
        <ul id="favoritesList">
          <!-- Favorite CSPs will be dynamically added here -->
        </ul>
      </div>
    </div>
  </div>
</template>
