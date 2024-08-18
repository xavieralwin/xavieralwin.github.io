<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $contact = $_POST['contact'];
    $address = $_POST['address'];

    $sql = "INSERT INTO patients (name, age, gender, contact, address) VALUES ('$name', '$age', '$gender', '$contact', '$address')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>

<form method="post" action="insert_patient.php">
    Name: <input type="text" name="name"><br>
    Age: <input type="number" name="age"><br>
    Gender: <input type="text" name="gender"><br>
    Contact: <input type="text" name="contact"><br>
    Address: <textarea name="address"></textarea><br>
    <input type="submit" value="Submit">
</form>
