<template>
    <header>
        <h1>Event Scheduler</h1>
        <nav>
            <div class="card">
                <h5>TabView</h5>
                <!-- You should include the necessary scripts for Vue.js and TabView here -->
                <TabView>
                    <TabPanel header="Dashboard">
                        <p class="line-height-3 m-0">
                        <section id="dashboard">
                            <h2>Dashboard</h2>
                            <div id="volunteerSignups">
                                <h3>Volunteer Sign-ups</h3>
                                <table id="volunteerTable">
                                    <tr>
                                        <th>Student Name</th>
                                        <th>Profile</th>
                                        <th>Status</th>
                                    </tr>
                                </table>
                            </div>
                            <div id="volunteerPieChart">
                                <h3>Volunteer Status</h3>
                                <canvas id="pieChart"></canvas>
                            </div>
                        </section>
                        </p>
                    </TabPanel>
                    <TabPanel header="Views">
                        <p class="line-height-3 m-0">
                        <section id="views">
                            <h2>Views</h2>
                            <p>Number of views: <span id="viewCount">0</span></p>
                        </section>
                        </p>
                    </TabPanel>
                    <TabPanel header="Signups">
                        <p class="line-height-3 m-0">
                        <section id="signups">
                            <h2>Sign Ups</h2>
                            <table id="studentTable">
                                <tr>
                                    <th>Student Name</th>
                                    <th>Profile</th>
                                    <th>Status</th>
                                </tr>
                            </table>
                        </section>
                        </p>
                    </TabPanel>
                    <TabPanel header="Schedule">
                        <p class="line-height-3 m-0">
                        <section id="schedule">
                            <h2>Schedule</h2>
                            <div id="calendar">
                                <!-- Event calendar -->
                                <h1>Interview Scheduler</h1>
                                <label for="event">Event Name:</label>
                                <input type="text" id="event" placeholder="Event name">
                                <label for="date">Date:</label>
                                <input type="date" id="date">
                                <label for="startTime">Start Time:</label>
                                <input type="time" id="startTime">
                                <label for="endTime">End Time:</label>
                                <input type="time" id="endTime">
                                <button onclick="addEvent()">Add Event</button>
                                <table>
                                    <tr>
                                        <th>Date</th>
                                        <th>Event</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                    </tr>
                                </table>
                            </div>
                        </section>
                        </p>
                    </TabPanel>
                </TabView>
            </div>
        </nav>
    </header>
</template>

<script>
const events = [];

function addEvent() {
    const eventName = document.getElementById("event").value;
    const eventDate = document.getElementById("date").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    // Check for clashes
    if (isClash(eventDate, startTime, endTime)) {
        alert("Event time clashes with an existing event.");
        return;
    }

    // Add the event to the array
    events.push({
        date: eventDate,
        name: eventName,
        start: startTime,
        end: endTime
    });

    // Add the event to the table
    const table = document.querySelector("table");
    const newRow = table.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    cell1.innerHTML = eventDate;
    cell2.innerHTML = eventName;
    cell3.innerHTML = startTime;
    cell4.innerHTML = endTime;
}

function isClash(date, start, end) {
    for (const event of events) {
        if (event.date === date) {
            if ((start >= event.start && start < event.end) || (end > event.start && end <= event.end)) {
                return true;
            }
        }
    }
    return false;
}
document.addEventListener("DOMContentLoaded", function () {
    // Initialize your data and implement the requested functionalities here.

    // Example: To add a student to the table:
    function addStudentToTable(student) {
        const table = document.getElementById("studentTable");
        const row = table.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.innerHTML = student.name;
        cell2.innerHTML = `<a href="${student.profile}" target="_blank">Profile</a>`;
        cell3.innerHTML = `
        <select class="status" data-name="${student.name}">
            <option value="registered">Registered</option>
            <option value="scheduled">Scheduled</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
        </select>
    `;

        // Handle status changes and pop-up profile here
        // You can add event listeners for status changes and profile pop-ups
    }

    // Example: To update the volunteer pie chart:
    function updatePieChart(data) {
        const ctx = document.getElementById("pieChart").getContext("2d");
        const chart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Accepted", "Rejected"],
                datasets: [{
                    data: data,
                    backgroundColor: ["#064273", "#76b6c4"],
                }],
            },
        });
    }

    // Example: To update view count:
    function updateViewCount(count) {
        document.getElementById("viewCount").textContent = count;
    }

    // Example: Sample data for demonstration
    const students = [
        {
            name: "John Doe",
            profile: "https://example.com/johndoe",
            status: "registered",
        },
        {
            name: "Jane Smith",
            profile: "https://example.com/janesmith",
            status: "scheduled",
        },
        // Add more students here
    ];

    const volunteerData = [70, 30]; // Example pie chart data (Accepted, Rejected)
    const viewCount = 1000; // Example view count

    // Populate the student table
    students.forEach(student => {
        addStudentToTable(student);
    });

    // Update the pie chart
    updatePieChart(volunteerData);
    // Update the view count
    updateViewCount(viewCount);
});
</script>

<style>
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
    perspective: 1000px;
    /* Remove this if you don't want the 3D effect */
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
.flip-card-front,
.flip-card-back {
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
    max-width: 100%;
    /* Ensure the image doesn't exceed its container */
    max-height: 100%;
    border-radius: 15px;
}

.centralise {
    margin: 150px;
}

/* Additional CSS for grid layout */
.favorite-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    /* Adjust the width as needed */
    gap: 20px;
    /* Adjust the gap between cards */
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
    grid-template-columns: repeat(2, 1fr);
    /* Adjust the number of columns as needed */
    gap: 20px;
    /* Adjust the gap between cards */
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
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    /* Adjust the width as needed */
    gap: 20px;
    /* Adjust the gap between cards */
}
</style>