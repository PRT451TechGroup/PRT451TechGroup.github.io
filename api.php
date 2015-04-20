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
		return new mysqli($this->host, $this->user, $this->password, $this->database);
	}
	public function new_job($location, $building, $floor, $room, $duedate, $noequipment, $assetno, $specification)
	{
		$conn = open_connection();
		
		if ($conn->connect_error)
		{
			die("Connect Error: {$conn->connect_error}");
		}
		
		$stmt = $conn->stmt_init();
		
		if ($stmt->prepare('INSERT INTO Jobs (Location, Building, Floor, Room, DueDate, NoEquipment, AssetNo, Specification) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'))
		{
			$stmt->bind_param('siiisiss', $location, $building, $floor, $room, $duedate, $noequipment, $assetno, $specification);
			$stmt->execute();
			$stmt->close();
		}
		
		$conn->close();
	}
}

$dbm = new DataManager($cfg['mysql']['host'], $cfg['mysql']['database'], $cfg['mysql']['user'], $cfg['mysql']['password']);

?>