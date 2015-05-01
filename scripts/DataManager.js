var DataManager = new (function()
{
	this.new_job = function(equipmentname, building, floor, room, duedate, noequipment, assetno, specification)
	{
		var queryData =
		{
			"action": "new_job",
			"equipmentname": equipmentname,
			"building": building,
			"floor": floor,
			"room": room,
			"duedate": duedate,
			"noequipment": noequipment,
			"assetno": assetno,
			"specification": specification
		};
		return $.ajax("api.php", {data: queryData, dataType: "json"});
	};
	this.show_jobs = function()
	{
		return $.ajax("api.php", {data: {"action": "show_jobs"}, dataType: "json"});
	};
	this.login = function(username, password)
	{
		return $.ajax("api.php", {data: {"action": "login", "username": username, "password": password}, dataType: "json"});
	};
	this.session_verify = function()
	{
		return $.ajax("api.php", {data: {"action": "session_verify"}, dataType: "json"});
	};
	this.session_failure = function(data)
	{
		return !data.success && data.error === "nosession";
	}
})();