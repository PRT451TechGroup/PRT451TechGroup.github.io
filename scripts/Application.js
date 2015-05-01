var Application = new (function()
{
	var $this = this;
	
	this.initProps = function()
	{
		var props = [
			"txtEquip0",
			"txtEquip1",
			"btnNeM",
			"btnNeP",
			"btnNewJob",
			"btnReviewJobs",
			"pgMain",
			"pgMenu",
			"frmCreate",
			"frmLogin",
			"txtEquipmentName",
			"txtUsername",
			"txtPassword",
			"selBuilding",
			"selFloor",
			"selRoom",
			"dtTime",
			"txtAssetNo",
			"txtSpecification",
			"lstJobs",
			"pgEdit",
			"_txtEquip0",
			"_txtEquip1",
			"_btnNeM",
			"_btnNeP",
			"_txtEquipmentName",
			"_selBuilding",
			"_selFloor",
			"_selRoom",
			"_dtTime",
			"_txtAssetNo",
			"_txtSpecification",
			"btnEditCancel"
		];
		$.each(props, function(k, v)
		{
			$this[v] = $("#" + v);
		});
		
		this.jobView = new JobView(this.lstJobs, "pgEdit", new JobForm($("#frmEdit")));
		this.createForm = new JobForm($("#frmCreate"));
		this.tab = "review";
		this.grabList = true;
		this.editJob = 0;
	};
	this.editButtons = function()
	{
		this.btnEditCancel.click(function()
		{
			$(":mobile-pagecontainer").pagecontainer("change", "#pgMain");
		})
	};
	this.setupInterface = function()
	{
		this.initProps();
		this.mainMenuButtons();
		this.addJobButtons();
		this.menuLoader();
		this.loginButtons();
		this.dataHooks();
		this.editButtons();
	};
	this.jobListItem = function(v)
	{
		var li = $("<li />");
		
		return li;
	};
	this.dataHooks = function()
	{
		DataManager.on("nosession", function(data)
		{
			$(":mobile-pagecontainer").pagecontainer("change", "#pgLogin");
		});
		DataManager.on("failure", function(data)
		{
			if (data.action != "session_verify")
				return;
			
			$(":mobile-pagecontainer").pagecontainer("change", "#pgLogin");
		});
		DataManager.on("success", function(data)
		{
			if (data.action != "show_jobs")
				return;
			
			$.each(data.data, function(k,v)
			{
				$this.jobView.add(v);
			});
			
			$this.jobView.refresh();
		});
		DataManager.on("success", function(data)
		{
			if (data.action != "login")
				return;
			
			$(":mobile-pagecontainer").pagecontainer("change", "#pgMain");
		});
		DataManager.on("success", function(data)
		{
			if (data.action != "new_job")
				return;
			
			$this.jobView.add(data.data);
			$this.jobView.refresh();
			$this.switchTabReview();
		});
		DataManager.on("success", function(data)
		{
			if (data.action != "update_job")
				return;
			
			alert(JSON.stringify(data));
		})
		DataManager.on("failure", function(data)
		{
			alert(JSON.stringify(data));
		});
	};
	
	this.dateStamp = function(dt)
	{
		var gf = function(a) { return a.length < 2 ? "0" + a : a; };
		return dt.getFullYear().toString() + "-" +
			gf(dt.getMonth().toString()) + "-" +
			gf(dt.getDate().toString()) + " " +
			gf(dt.getHours().toString()) + ":" +
			gf(dt.getMinutes().toString());
	};
	
	this.mainMenuButtons = function()
	{
		this.btnNewJob.click(function()
		{
			$this.tab = "create";
		});
		this.btnReviewJobs.click(function()
		{
			$this.tab = "review";
		});
	};
	this.switchTabCreate = function()
	{
		$("a[href='#tabCreate']").click();
	};
	this.switchTabReview = function()
	{
		$("a[href='#tabOverview']").click();
	};
	
	this.addJobButtons = function()
	{
		this.frmCreate.submit(function()
		{
			//alert($this.createForm.EquipmentName());
			var qdata = {};
			$this.createForm.dataRequest(qdata);
			
			DataManager.new_job(qdata);
			
			return false;
		});
	};
	
	this.menuLoader = function()
	{
		this.pgMain.on("pageshow", function()
		{
			var ajax = DataManager.show_jobs();
			
			if ($this.grabList)
			{
				DataManager.show_jobs();
				$this.grabList = false;
			}
			switch($this.tab)
			{
				case "create":
					$this.switchTabCreate();
					break;
				case "review":
					$this.switchTabReview();
					break;
			};
		});
		this.pgMenu.on("pageshow", function()
		{
			DataManager.session_verify();
		});
	};
	this.loginButtons = function()
	{
		this.frmLogin.submit(function()
		{
			DataManager.login($this.txtUsername.val(), $this.txtPassword.val());
			return false;
		});
	};
})();