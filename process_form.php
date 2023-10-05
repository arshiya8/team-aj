<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $passionate_about = $_POST["passionate_about"];
    $passionate_about_other_textbox = $_POST["passionate_about_other_textbox"];
    $skills = $_POST["skills"];
    $other_skills = $_POST["other_skills"];
    $commitment = $_POST["commitment"];
    $volunteering_location = $_POST["volunteering_location"];
    $volunteering_experience = $_POST["volunteering_experience"];

    // Process the data (you can replace this with your database logic)
    $data = "Passionate About: $passionate_about";
    if (!empty($passionate_about_other_textbox)) {
        $data .= " (Other: $passionate_about_other_textbox)";
    }
    $data .= "\nSkills: $skills";
    if (!empty($other_skills)) {
        $data .= " (Other: $other_skills)";
    }
    $data .= "\nCommitment: $commitment";
    $data .= "\nVolunteering Location: $volunteering_location";
    $data .= "\nVolunteering Experience: $volunteering_experience";

    // Save the data to a text file (you can replace this with your database storage)
    $file = fopen("user_responses.txt", "a"); // Open or create a text file for appending
    fwrite($file, $data . "\n\n"); // Write the data to the file
    fclose($file); // Close the file

    // Redirect to a thank you page or wherever you want
    header("Location: thank_you.html");
    exit;
}
?>

