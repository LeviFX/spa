<?php 

// Config toevoegen

require 'config.php';

// Posts uitlezen

$aanpasinvoer = $_POST['aanpasinvoer'];
$aanpasid = $_POST['aanpasid'];
$aanpasstatus = $_POST['aanpasstatus'];

// Checken of hij een een complete status binnen heeft gekregen, zo niet dan alleen inhoud aan passen, zowel verander de complete status naar het voltooide/openstaande status.

if (empty($aanpasstatus)) {
    $sql = "UPDATE `todo` SET `title` = '$aanpasinvoer' WHERE id=$aanpasid";
	if (mysqli_query($mysqli, $sql)) {
		echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}
	mysqli_close($mysqli);
} else {
    if (!empty($aanpasstatus)) {
        $sql = "UPDATE `todo` SET `complete` = '$aanpasstatus' WHERE id=$aanpasid";
	if (mysqli_query($mysqli, $sql)) {
		echo json_encode(array("statusCode"=>200));
	} 
	else {
		echo json_encode(array("statusCode"=>201));
	}
	mysqli_close($mysqli);
    }
}

?>