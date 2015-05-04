var DataManager = new (function()
{
	var $this = this;
	this.source = {};
	this.handlers = {"success": [], "failure": [], "nosession": []};
	
	this.on = function(event, handler)
	{
		this.handlers[event].push(handler);
	}
	this.trigger = function(event, args)
	{
		if (event === true)
			event = "success";
		else if (event === false)
			event = "failure";
		
		$.each(this.handlers[event], function(k, v)
		{
			v(args);
		});
	}
	
	this.getJobById = function(jobid)
	{
		return this.source[String(jobid)];
	}
	this.new_job = function(queryData)
	{
		queryData.action = "new_job";
		//alert(JSON.stringify(queryData));
		$.ajax("api.php", {data: queryData, dataType: "json"}).done(function(data)
		{
			data.action = "new_job";
			
			if (!$this.session_failure(data))
			{
				if (data.success)
				{
					$this.source[String(data.data.JobID)] = $this.job_copy(data.data);
				}
				$this.trigger(data.success, data);
			}
		});
	};
	this.update_job = function(queryData)
	{
		queryData.action = "update_job";
		//console.log(queryData);
		$.ajax("api.php", {data: queryData, dataType: "json"}).done(function(data)
		{
			
			data.action = "update_job";
			
			if (!$this.session_failure(data))
			{
				if (data.success)
				{
					$this.source[String(data.data.JobID)] = $this.job_copy(data.data);
				}
				$this.trigger(data.success, data);
			}
		});
	};
	this.job_copy = function(v)
	{
		var data =
		{
			EquipmentName: v.EquipmentName,
			Building: v.Building,
			Floor: v.Floor,
			Room: v.Room,
			DueDate: v.DueDate,
			NoEquipment: v.NoEquipment,
			AssetNo: v.AssetNo,
			Specification: v.Specification,
			Progress: v.Progress
		};
		
		if (v.JobID)
			data.JobID = v.JobID;
		
		return data;
	};
	this.show_jobs = function()
	{
		//console.log(new Error().stack);
		$.ajax("api.php", {data: {"action": "show_jobs"}, dataType: "json"}).done(function(data)
		{
			data.action = "show_jobs";
			
			if (!$this.session_failure(data))
			{
				if (data.success)
				{
					var newsrc = {};
					$.each(data.data, function(k, v)
					{
						newsrc[String(v.JobID)] = $this.job_copy(v);
					});
					$this.source = newsrc;
				}
				$this.trigger(data.success, data);
			}
		});
	};
	this.login = function(username, password)
	{
		$.ajax("api.php", {data: {"action": "login", "username": username, "password": password}, dataType: "json"}).done(function(data)
		{
			data.action = "login";
			$this.trigger(data.success, data);
		});
	};
	this.session_verify = function()
	{
		$.ajax("api.php", {data: {"action": "session_verify"}, dataType: "json"}).done(function(data)
		{
			data.action = "session_verify";
			
			$this.trigger(data.success, data);
		});
	};
	this.session_failure = function(data)
	{
		var x = !data.success && data.error === "nosession";
		
		if (x)
			this.trigger("nosession", data);
			
		return x;
	}
})();