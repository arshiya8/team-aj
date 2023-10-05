const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const port = 3000;

// Connect to the MongoDB database
MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true })
    .then(client => {
        const db = client.db("studentAppDB");
        const studentsCollection = db.collection("students");

        app.use(bodyParser.json());

        // Serve the front-end HTML and static files
        app.use(express.static("public"));

        // API endpoint to get student data
        app.get("/api/students", (req, res) => {
            studentsCollection.find().toArray()
                .then(data => res.json(data))
                .catch(error => res.status(500).json({ error: "Internal server error" }));
        });

        // API endpoint to accept a student
        app.post("/api/accept/:id", (req, res) => {
            const studentId = parseInt(req.params.id);
            // Update the student status in the database
            // Example: studentsCollection.updateOne({ id: studentId }, { $set: { status: "Accepted" } });
            // Send a response indicating success or failure
        });

        // API endpoint to reject a student
        app.post("/api/reject/:id", (req, res) => {
            const studentId = parseInt(req.params.id);
            // Update the student status in the database
            // Example: studentsCollection.updateOne({ id: studentId }, { $set: { status: "Rejected" } });
            // Send a response indicating success or failure
        });

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(error => {
        console.error("Error connecting to the database:", error);
    });
