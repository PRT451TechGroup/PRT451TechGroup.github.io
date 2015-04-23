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
	public function new_job($location, $building, $floor, $room, $duedate, $noequipment, $assetno, $specification)
	{
		$conn = $this->open_connection();
		$stmt = $conn->prepare('INSERT INTO Jobs (Location, Building, Floor, Room, DueDate, NoEquipment, AssetNo, Specification) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
		$stmt->execute(array($location, $building, $floor, $room, $duedate, $noequipment, $assetno, $specification));
	}
	public function get_jobs()
	{
		$conn = $this->open_connection();
		return $conn->query('SELECT FROM Jobs (JobID, Location, Building, Floor, Room, DueDate, NoEquipment, AssetNo, Specification)');
	}
}

$dbm = new DataManager($cfg['mysql']['host'], $cfg['mysql']['database'], $cfg['mysql']['user'], $cfg['mysql']['password']);

//$dbm->new_job("TestLocation", 1, 2, 3, "2015-04-23 16:11:00", 10, "ASSET0", "Specification123");

?>