<?php

require_once 'config.inc.php';

class DataManager
{
	private $host;
	private $database;
	private $user;
	private $password;
	
	public function __construct($h, $d, $u, $p)
	{
		$this->host = $h;
		$this->database = $d;
		$this->user = $u;
		$this->password = $p;
	}
	private function open_connection()
	{
		return new PDO('mysql:host=' . $this->host . ';dbname=' . $this->database, $this->user, $this->password);
	}
	public function new_job($location, $building, $floor, $room, $duedate, $noequipment, $assetno, $specification, &$out)
	{
		$conn = $this->open_connection();
		$stmt = $conn->prepare('INSERT INTO Jobs (Location, Building, Floor, Room, DueDate, NoEquipment, AssetNo, Specification) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
		$rv = $stmt->execute(array($location, $building, $floor, $room, $duedate, $noequipment, $assetno, $specification));
		
		$out = $rv ? $conn->lastInsertId() : $stmt->errorInfo();
		
		return $rv;
	}
	public function get_jobs()
	{
		$conn = $this->open_connection();
		return $conn->query('SELECT JobID, Location, Building, Floor, Room, DueDate, NoEquipment, AssetNo, Specification FROM Jobs ORDER BY JobID');
	}
	public function password_verify($username, $password)
	{
		$conn = $this->open_connection();
		$stmt = $conn->prepare('SELECT Username FROM Logins WHERE Username = ? AND Password = ?');
		
		if ($stmt->execute(array($username, $password)))
		{
			$res = $stmt->fetchAll();
			foreach($res as $row)
			{
				if ($row['Username'] == $username)
					return true;
			}
		}
		return false;
	}
	public function session_verify()
	{
		session_start();
		
		if (isset($_SESSION["username"]))
		{
			$conn = $this->open_connection();
			$stmt = $conn->prepare('SELECT Username FROM Logins WHERE Username = ?');
			if ($stmt->execute(array($_SESSION["username"])))
			{
				$res = $stmt->fetchAll();
				foreach($res as $row)
				{
					if ($row['Username'] == $_SESSION["username"])
						return true;
				}
			}
		}
		return false;
	}
}

$dbm = new DataManager($cfg['mysql']['host'], $cfg['mysql']['database'], $cfg['mysql']['user'], $cfg['mysql']['password']);

if ($_GET["action"] == "new_job")
{
	$out = array();
	$nj["success"] = $dbm->new_job($_GET["location"], intval($_GET["building"]), intval($_GET["floor"]), intval($_GET["room"]), $_GET["duedate"], intval($_GET["noequipment"]), $_GET["assetno"], $_GET["specification"], $out);
	
	if ($nj["success"])
		$nj["data"] = array(
			"JobID" => $out,
			"Location" => $_GET["location"],
			"Building" => $_GET["building"],
			"Floor" => $_GET["floor"],
			"Room" => $_GET["room"],
			"DueDate" => $_GET["duedate"],
			"NoEquipment" => $_GET["noequipment"],
			"AssetNo" => $_GET["assetno"],
			"Specification" => $_GET["specification"]);
	else
	{
		$nj["data"] = $out;
		$nj["success"] = false;
	}
	
	echo json_encode($nj);
}
else if ($_GET["action"] == "show_jobs")
{
	if (!$dbm->session_verify())
		die("No Session");
	$dbj = $dbm->get_jobs();
	
	if (!$dbj)
	{
		$response["success"] = false;
		echo json_encode($data);
	}
	else
	{
		$r = 0;
		foreach($dbj as $row)
		{
			$data[$r++] = array(
				"JobID" => $row["JobID"],
				"Location" => $row["Location"],
				"Building" => $row["Building"],
				"Floor" => $row["Floor"],
				"Room" => $row["Room"],
				"DueDate" => $row["DueDate"],
				"NoEquipment" => $row["NoEquipment"],
				"AssetNo" => $row["AssetNo"],
				"Specification" => $row["Specification"]);
		}
	
		if ($r != 0)
			$response["data"] = $data;
		else
			$response["data"] = array();
	
		$response["success"] = true;
		echo json_encode($response);
	}
}
else if ($_GET["action"] == "login")
{
	$username = $_GET["username"];
	$password = $_GET["password"];
	
	
	$response["username"] = $username;
	if ($response["success"] = $dbm->password_verify($username, $password))
	{
		session_start();
		$_SESSION["username"] = $username;
	}
	
	echo json_encode($response);
}
else if ($_GET["action"] == "verify_session")
{
	$response["success"] = $dbm->session_verify();
	
	echo json_encode($response);
}


?>