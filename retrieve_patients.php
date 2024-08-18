<?php
include 'db.php';

$sql = "SELECT id, name, age, gender, contact, address FROM patients";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table border='1'><tr><th>ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Contact</th><th>Address</th></tr>";
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row["id"]. "</td><td>" . $row["name"]. "</td><td>" . $row["age"]. "</td><td>" . $row["gender"]. "</td><td>" . $row["contact"]. "</td><td>" . $row["address"]. "</td></tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}

$conn->close();
?>
