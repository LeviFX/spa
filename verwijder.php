<?php 

// Config toevoegen

require 'config.php';

// Posts uitlezen

$verwijderid = $_POST['verwijderid'];

$sql = "DELETE FROM `todo` WHERE id=$verwijderid";
	if (mysqli_query($mysqli, $sql)) {
		echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}
	mysqli_close($mysqli);
?>