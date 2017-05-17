<?php
header('Content-Type: application/json');
$con = mysqli_connect("localhost", "root", "", "alpha");
if (mysqli_connect_errno($con)) {
    echo "Failed to connect to DataBase: " . mysqli_connect_error();
} else {
    $data_points = array();
    $result = mysqli_query($con, "SELECT * FROM alumno_has_examen"); 
    while ($row = mysqli_fetch_array($result)) {
        $point = array("valorx" => $row['alumno_idAlumno'], "valory" => $row['nota']);
        array_push($data_points, $point);
    }
    echo json_encode($data_points);
}
mysqli_close($con);
?>