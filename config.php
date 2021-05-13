<?php 

$servername = "";
$dBUsername = "";
$dBPassword = "";
$dBName = "";

// Connecting

$mysqli = mysqli_connect($servername, $dBUsername, $dBPassword, $dBName);

if (!$mysqli) {
    die("Connectie is mislukt: ".mysqli_connect_error());
}

?>