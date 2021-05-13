<?php 

// Config toevoegen

require 'config.php';

// Posts uitlezen

$invoer = $_POST['invoer'];

$sql = "INSERT INTO `todo`( `title`) VALUES ('$invoer')";
	if (mysqli_query($mysqli, $sql)) {
		echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}
	mysqli_close($mysqli);
?>