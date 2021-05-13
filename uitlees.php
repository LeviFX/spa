<?php 

// Config toevoegen

require 'config.php';

// Array maken

$data = [];

$query = "SELECT * FROM todo";
$result = mysqli_query($mysqli, $query);
$row = mysqli_fetch_array($resultaat);

while ($row = mysqli_fetch_array($result)) {
    $data[] = $row;
}

// Data van database echo'en van JSON door naar de AJAX

echo json_encode($data);


?>