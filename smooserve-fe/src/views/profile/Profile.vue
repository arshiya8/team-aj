<template>
<head>
    <title>Student Profile</title>
    <link rel="stylesheet" href="styles2.css">
</head>
<body>
    <!-- Navigation Bar -->
    <!-- Include your navigation bar component here -->
    <!-- User Profile Form -->
    <div class="user-profile">
        <h1>Student Profile</h1>
        <form id="userDetailsForm" action="submit.php" method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br><br>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br><br>

            <label for="contact">Contact Number:</label>
            <input type="tel" id="contact" name="contact" required><br><br>

            <label for="commitment">Commitment:</label>
            <select id="commitment" name="commitment">
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
            </select>
            <button type="button" onclick="addCommitment()">Add</button><br><br>

            <!-- Commitment Table -->
            <table id="commitmentTable" style="display: none; border: 1px solid black;">
                <thead>
                    <tr style="border: 1 px solid black;">
                        <th>Selected</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- toadd to DB -->
                </tbody>
            </table>
            <input type="submit" value="Submit">
        </form>
    </div>

    
        <!-- Favourites Tab with CSP Integration -->
        <h2>Favourites</h2>
<div class="favourites-tab">
    <div class="tab-buttons">
        <button class="tab-button" onclick="showTab('shops')" data-tab="shops">SmooServe Shops</button>
        <button class="tab-button" onclick="showTab('csps')" data-tab="csps">CSPs</button>
    </div>

    <section class="favorite-cards">
        <div id="shopContent" class="card-grid"></div>
        <div id="cspContent" class="card-grid"></div>
    </section>

    <!-- Add the "noFavoritesMessage" here, and initially set it to display: none -->
    <div id="noFavoritesMessage" style="display: none;">You have no favorites currently.</div>
</div>

        

    <!-- to change with Card Carousel Component -->
    

    
        <h2>Registered-CSP</h2>
        <div id="noRegisteredCspMessage" style="display: none;">There are no registered CSPs.</div>
        <section class="registered-CSP">
        <table class="registered-CSP-table">
            <thead>
                <tr>
                    <th>Registered CSP </th>
                    <th>Registered Date</th>
                    <th>CSP Contact</th>
                    <th>Status</th>
                    <th>Schedule Interview</th>
                </tr>
            </thead>
            <tbody>
                <!-- Example CSP entry -->
                <tr>
                    <td>CSP Name</td>
                    <td>Registration Date</td>
                    <td>CSP Contact Information</td>
                    <td>Pending</td>
                    <td>
                        <button onclick="showScheduleDropdown(this)">Schedule Interview</button>
                        <div class="schedule-dropdown" style="display: none;">
                            <label for="interviewTime">Select Time Slot:</label>
                            <select id="interviewTime">
                                <option value="9:00 AM">9:00 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <!-- Add more time slots as needed -->
                            </select>
                            <button onclick="scheduleInterview(this)">Schedule</button>
                        </div>
                    </td>
                </tr>
                <!-- More CSP entries... -->
            </tbody>
        </table>
                
         <table>
            <tbody>
                <!-- Add upcoming interview data here -->
            </tbody>
        </table>
    </section>

    <!-- "Take Quiz Again" button -->
    <section class="quiz-data">
        <h2>Quiz Results</h2>
        <table class="quiz-table">
            <tbody>
                <!-- tochange Add quiz data here from db -->
            </tbody>
        </table>
    </section>
    <a href="quiz.html" class="quiz-button">Take Quiz Again</a>

    <script src="script2.js"></script>
</body>
<script>
function addCommitment() {
    // Get the selected commitment value
    const commitmentSelect = document.getElementById("commitment");
    const selectedValue = commitmentSelect.value;

    // Check if the commitment is already in the table
    const table = document.getElementById("commitmentTable");
    const existingCommitments = table.querySelectorAll("td:first-child");
    for (const commitment of existingCommitments) {
        if (commitment.textContent === selectedValue) {
            alert("Commitment already added.");
            return;
        }
    }

    // Create a new row and add the selected commitment
    const newRow = table.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    cell1.innerHTML = selectedValue;

    // Add a button to remove the commitment
    const cell2 = newRow.insertCell(1);
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    removeButton.onclick = function () {
        table.deleteRow(newRow.rowIndex);
    };
    cell2.appendChild(removeButton);
}

function toggleCommitmentTable(commitmentSelect) {
    var table = document.getElementById("commitmentTable");

    if (commitmentSelect.value === "none") {
        table.style.display = "none";
    } else {
        table.style.display = "table";
    }
}

function showTab(tabName) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const noFavoritesMessage = document.getElementById('noFavoritesMessage');

    // Remove the 'active' class from all tab buttons
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Add the 'active' class to the clicked tab button
    tabButtons.forEach(button => {
        if (button.getAttribute('data-tab') === tabName) {
            button.classList.add('active');
        }
    });

    const shopContent = document.getElementById('shopContent');
    const cspContent = document.getElementById('cspContent');

    // Hide the "no favorites" message by default
    noFavoritesMessage.style.display = 'none';

    // tochange db 
    fetch('get_data.php')
        .then(response => response.json())
        .then(data => {
            if (tabName === 'shops') {
                shopContent.innerHTML = ''; // Clear previous content

                if (data.length === 0) {
                    noFavoritesMessage.style.display = 'block'; // Display message when no favorites
                } else {
                    data.forEach(shop => {
                        shopContent.innerHTML += `
                            <!-- Create cards for SmooServe Shops based on data -->
                            <div class="shop-card">
                                <h3>${shop.name}</h3>
                                <!-- Add other shop details here -->
                            </div>
                        `;
                    });
                }
            } else if (tabName === 'csps') {
                cspContent.innerHTML = ''; // Clear previous content

                if (data.length === 0) {
                    noFavoritesMessage.style.display = 'block'; // Display message when no favorites
                } else {
                    data.forEach(csp => {
                        cspContent.innerHTML += `
                            <!-- Create cards for CSPs based on data -->
                            <div class="csp-card">
                                <h3>${csp.name}</h3>
                                <!-- Add other CSP details here -->
                            </div>
                        `;
                    });
                }
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Hide the "Registered CSP" table initially
const registeredCspTable = document.querySelector('.registered-CSP');
const noRegisteredCspMessage = document.getElementById('noRegisteredCspMessage'); // Get the message element

// Example data fetching logic (replace with your actual data fetching)
fetch('get_registered_csp_data.php') // Replace with your actual data source URL
    .then(response => response.json())
    .then(data => {
        // Check if there is data
        if (data.length > 0) {
            // There are registered CSPs, hide the message and display the table
            noRegisteredCspMessage.style.display = 'none';
            registeredCspTable.style.display = 'table'; // Display the table

            // Get the table body
            const tableBody = registeredCspTable.querySelector('tbody');

            // Clear previous content
            tableBody.innerHTML = '';

            // Iterate through the data and create rows
            data.forEach(item => {
                const row = tableBody.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);

                cell1.textContent = item.cspName; // Replace with your actual data property
                cell2.textContent = item.registeredDate; // Replace with your actual data property
                cell3.textContent = item.cspContact; // Replace with your actual data property
                cell4.textContent = item.status; // Replace with your actual data property
            });
        } else {
            // There are no registered CSPs, display the message and hide the table
            noRegisteredCspMessage.style.display = 'block';
            registeredCspTable.style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Error fetching registered CSP data:', error);
        // Handle the error here
        noRegisteredCspMessage.style.display = 'block';
        registeredCspTable.style.display = 'none';
    });

    function showScheduleDropdown(button) {
        const dropdown = button.nextElementSibling; // Get the sibling div containing the dropdown
        dropdown.style.display = "block";
    }
    
    function scheduleInterview(button) {
        const dropdown = button.parentNode; // Get the parent div containing the dropdown
        const selectedTimeSlot = dropdown.querySelector("#interviewTime").value;
        const cspName = button.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent; // Get CSP name
    
        // Send scheduling information to the CSP organization (You can use AJAX or other methods)
    
        // Example: Display a confirmation message
        alert(`Scheduled an interview with ${cspName} on ${selectedTimeSlot}`);
    }
    const statusCells = document.querySelectorAll("td:nth-child(4)"); // Select all "Status" cells

    statusCells.forEach(statusCell => {
        if (statusCell.textContent === "Accepted") {
            const buttonCell = statusCell.nextElementSibling; // Get the cell with the button
            buttonCell.innerHTML = ""; // Remove the button
        }
    });
</script>
/* styles.css */

/* Style the tab buttons */
.tab-button {
    cursor: pointer;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 5px;
}

.tab-button.active {
    background-color: #3498db;
    color: #fff;
}

/* Style the cards */
.card {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
}
/* styles.css */

/* Add this CSS rule for the "Take Quiz Again" button */
.quiz-button {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 25px;
    background-color: #064273;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    margin: 10px;
}

.quiz-button:hover {
    background-color: #042c4c;
}

/* styles.css */

/* Add this CSS rule for the selected card */
.selected-card {
    background-color: #76b6c4;
    color: #fff;
}

/* Style the cards */
.card {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    cursor: pointer;
}

.card:hover {
    background-color: #f0f0f0;
}

.flip-card {
    background-color: transparent;
    width: 280px;
    height: 390px;
    border: none;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
    border-radius: 15px;
  }
  
  /* This container is needed to position the front and back side */
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  
  /* Do an horizontal flip when you move the mouse over the flip box container */
  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
  
  /* Position the front and back side */
  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 15px;
  }
  
  /* Style the front side (fallback if image is missing) */
  .flip-card-front {
    color: black;
  
  }
  
  /* Style the back side */
  .flip-card-back {
    background-color: rgb(119, 166, 204);
    color: white;
    transform: rotateY(180deg);
    display: flex;
    justify-content: center;
  }
  
  .flip-card img {
    max-width: 100%; /* Ensure the image doesn't exceed its container */
    max-height: 100%;
    border-radius: 15px;
  }
  
  .centralise{
    margin:150px;
  }
  /* Additional CSS for grid layout */
.favorite-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr)); /* Adjust the width as needed */
    gap: 20px; /* Adjust the gap between cards */
}

.flip-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
}
/* Your existing CSS styles... */

/* Style for the card grid layout */
.card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Adjust the number of columns as needed */
    gap: 20px; /* Adjust the gap between cards */
}

/* Style the flip cards */
.flip-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
}

/* Additional CSS for grid layout */
.favorite-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); /* Adjust the width as needed */
    gap: 20px; /* Adjust the gap between cards */
}
 /* CSS for the "Schedule Interview" button */
 .schedule-button {
  position: relative;
}

th,tr,td{
  border:1px solid black;
}
</template>