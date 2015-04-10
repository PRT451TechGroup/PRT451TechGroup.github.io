<!DOCTYPE html> 
<html lang="en">
<head>
	<meta charset="utf-8">
	<title></title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="author" content="">
	<link rel="stylesheet" href="jquery/jquery.mobile-1.4.5.css" />
	<script src="jquery/jquery-1.11.2.min.js"></script>
	<script src="jquery/jquery.mobile-1.4.5.min.js"></script>
	
</head>
<?php
function addPage($id)
{
	echo "<section data-role=\"page\" id=\"$id\">";
	include "pages/$id.php";
	echo "</section>";
}
?>
<body id="page_body">
	<?php
		addPage("pgLogin");
		addPage("pgRegister");
		addPage("pgMenu");
		addPage("pgMain");
	?>
</body>
</html>
