var DataManager =
{
	new_job: function(equipmentname, building, floor, room, duedate, noequipment, assetno, specification)
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
	},
	show_jobs: function()
	{
		return $.ajax("api.php", {data: {"action": "show_jobs"}, dataType: "json"});
	},
	login: function(username, password)
	{
		return $.ajax("api.php", {data: {"action": "login", "username": username, "password": password}, dataType: "json"});
	},
	verify_session: function()
	{
		return $.ajax("api.php", {data: {"action": "verify_session"}, dataType: "json"});
	}
}