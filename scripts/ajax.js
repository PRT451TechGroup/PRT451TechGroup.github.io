var DataManager =
{
	new_job: function(location, building, floor, room, duedate, noequipment, assetno, specification)
	{
		var queryData =
		{
			"action": "new_job",
			"locatiom": location,
			"building": building,
			"floor": floor,
			"duedate": duedate,
			"noequipment": noequipment,
			"assetno": assetno,
			"specification": specification
		};
		return $.ajax("api.php", {data: queryData});
	},
	show_jobs: function()
	{
		return $.ajax("api.php", {data: {"action": "show_jobs"}});
	}

}