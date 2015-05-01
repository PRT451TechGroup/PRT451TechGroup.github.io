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
	public function new_job($equipmentname, $building, $floor, $room, $duedate, $noequipment, $assetno, $specification, &$out)
	{
		$conn = $this->open_connection();
		$stmt = $conn->prepare('INSERT INTO Jobs (EquipmentName, Building, Floor, Room, DueDate, NoEquipment, AssetNo, Specification) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
		$rv = $stmt->execute(array($equipmentname, $building, $floor, $room, $duedate, $noequipment, $assetno, $specification));
		
		$out = $rv ? $conn->lastInsertId() : $stmt->errorInfo();
		
		return $rv;
	}
	public function update_job($equipmentname, $building, $floor, $room, $duedate, $noequipment, $assetno, $specification, $jobid)
	{
		$conn = $this->open_connection();
		$stmt = $conn->prepare('UPDATE Jobs SET EquipmentName=?, Building=?, Floor=?, Room=?, DueDate=?, NoEquipment=?, AssetNo=?, Specification=? WHERE JobID = ?');
		return $stmt->execute(array($equipmentname, $building, $floor, $room, $duedate, $noequipment, $assetno, $specification, $jobid));
	}
	public function get_jobs()
	{
		$conn = $this->open_connection();
		return $conn->query('SELECT JobID, EquipmentName, Building, Floor, Room, DueDate, NoEquipment, AssetNo, Specification FROM Jobs ORDER BY JobID');
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
class Application
{
	private static $__instance = NULL;
	private $functions;
	private $pfunctions;
	protected function __construct()
	{
		$this->functions['new_job'] = function($args, $dbm)
		{
			$out = 0;
			$r = $dbm->new_job($args["equipmentname"], intval($args["building"]), intval($args["floor"]),
				intval($args["room"]), $args["duedate"], intval($args["noequipment"]), $args["assetno"], $args["specification"], $out);
			
			if ($r)
			{
				return array("success" => true,
					"data" => array(
						"JobID" => $out,
						"EquipmentName" => $args["equipmentname"],
						"Building" => $args["building"],
						"Floor" => $args["floor"],
						"Room" => $args["room"],
						"DueDate" => $args["duedate"],
						"NoEquipment" => $args["noequipment"],
						"AssetNo" => $args["assetno"],
						"Specification" => $args["specification"]));
			}
			else
			{
				return array("data" => array(), "success" => false);
			}
			return $nj;
		};
		$this->functions['update_job'] = function($args, $dbm)
		{
			$out = 0;
			$r = $dbm->update_job($args["equipmentname"], intval($args["building"]), intval($args["floor"]),
				intval($args["room"]), $args["duedate"], intval($args["noequipment"]), $args["assetno"], $args["specification"], $args["jobid"]);
			
			if ($r)
			{
				return array("success" => true,
					"data" => array(
						"JobID" => $args["jobid"],
						"EquipmentName" => $args["equipmentname"],
						"Building" => $args["building"],
						"Floor" => $args["floor"],
						"Room" => $args["room"],
						"DueDate" => $args["duedate"],
						"NoEquipment" => $args["noequipment"],
						"AssetNo" => $args["assetno"],
						"Specification" => $args["specification"]));
			}
			else
			{
				return array("data" => array(), "success" => false);
			}
			return $nj;
		};
		$this->functions['show_jobs'] = function($args, $dbm)
		{
			$dbj = $dbm->get_jobs();
			if (!$dbj)
			{
				return array("success" => false);
			}
			else
			{
				$r = 0;
				foreach($dbj as $row)
				{
					$data[$r++] = array(
						"JobID" => $row["JobID"],
						"EquipmentName" => $row["EquipmentName"],
						"Building" => $row["Building"],
						"Floor" => $row["Floor"],
						"Room" => $row["Room"],
						"DueDate" => $row["DueDate"],
						"NoEquipment" => $row["NoEquipment"],
						"AssetNo" => $row["AssetNo"],
						"Specification" => $row["Specification"]);
				}
				
				return array("success" => true, "data" => $r ? $data : array());
			}
		};
		$this->pfunctions['login'] = function($args, $dbm)
		{
			$username = $args['username'];
			$password = $args['password'];
			$response["username"] = $username;
			if ($response["success"] = $dbm->password_verify($username, $password))
			{
				session_start();
				$_SESSION["username"] = $username;
			}
			return $response;
		};
		$this->pfunctions['session_verify'] = function($args, $dbm)
		{
			return array("success" => $dbm->session_verify());
		};
	}
	protected function __clone()
	{
	}
	public static function getInstance()
	{
		if (self::$__instance == NULL)
			self::$__instance = new Application();
		
		return self::$__instance;
	}
	public function response($action, $args, $dbm)
	{
		if (isset($this->pfunctions[$action]))
		{
			$func = $this->pfunctions[$action];
		}
		if (isset($this->functions[$action]))
		{
			if ($dbm->session_verify())
				$func = $this->functions[$action];
			else
			{
				return array("success" => false, "error" => "nosession");
			}
		}
		
		return $func($args, $dbm);
	}
}

$dbm = new DataManager($cfg['mysql']['host'], $cfg['mysql']['database'], $cfg['mysql']['user'], $cfg['mysql']['password']);
$app = Application::getInstance();

$res = $app->response($_GET['action'], $_GET, $dbm);
echo json_encode($res);

?>