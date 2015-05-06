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
			"btnEditCancel",
			"btnLogout",
			"btnRegister",
			"pgLogin",
			"frmRegister"
		];
		$.each(props, function(k, v)
		{
			$this[v] = $("#" + v);
		});
		
		this.jobView = new JobView(this.lstJobs, "pgEdit", new JobForm($("#frmEdit")));
		this.jobView.pagescroll("pgMain");
		this.jobView.styler(function(data, li)
		{
			var themes = "hgfedcb";
			var lims = [1, 0.83, 0.67, 0.5, 0.33, 0.17, 0];
			
			for(var i=0;i<lims.length;i++)
			{
				if (data.Progress >= lims[i])
				{
					//console.log(themes[i]);
					li.attr("data-theme", themes[i]);
					break;
				}
			}
		});
		this.jobView.sorter(this.jobsort);
		
		this.createForm = new JobForm($("#frmCreate"));
		this.tab = "review";
		this.grabList = true;
		this.editJob = 0;
		
	};
	this.editButtons = function()
	{
		/*this.btnEditCancel.click(function()
		{
			$(":mobile-pagecontainer").pagecontainer("change", "#pgMain");
		})*/
		
		$(document).on('pageshow', '#pgEdit', function()
		{
			$this.jobView.pageshow();
		});
		$.mobile.loadPage("#pgEdit");
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
		this.registerButtons();
		
		DataManager.session_verify();
	};
	this.jobListItem = function(v)
	{
		var li = $("<li />");
		
		return li;
	};
	this.cmp = function(a, b)
	{
		if (a > b)
			return 1;
		else if (a < b)
			return -1;
		else
			return 0;
	};
	this.cmpn = function(a, b)
	{
		a = Number(a);
		b = Number(b);
		if (a > b)
			return 1;
		else if (a < b)
			return -1;
		else
			return 0;
	};
	this.jobsort = function(a, b)
	{
		var z;
		
		if (z = $this.cmpn(a.Progress, b.Progress))
			return z;
		
		if (z = $this.cmpn(a.Building, b.Building))
			return z;
		
		if (z = $this.cmpn(a.Floor, b.Floor))
			return z;
			
		if (z = $this.cmpn(a.Room, b.Room))
			return z;
		
		if (z = $this.cmp(a.AssetNo, b.AssetNo))
			return z;
		
		return $this.cmpn(a.JobID, b.JobID);
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
			if (data.action != "session_verify")
				return;
			
			if ($.mobile.activePage.attr("id") === "pgLogin")
				$(":mobile-pagecontainer").pagecontainer("change", "#pgMenu");
		});
		DataManager.on("success", function(data)
		{
			if (data.action != "show_jobs")
				return;
			
			$this.jobView.clear();
			
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
			
			$(":mobile-pagecontainer").pagecontainer("change", "#pgMenu");
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
			
			$this.jobView.update(data.data);
			$this.jobView.refresh();
			$(":mobile-pagecontainer").pagecontainer("change", "#pgMain");
			$this.switchTabReview();
		})
		DataManager.on("success", function(data)
		{
			if (data.action != "logout")
				return;
			
			$(":mobile-pagecontainer").pagecontainer("change", "#pgLogin");
		});
		DataManager.on("success", function(data)
		{
			if (data.action != "register")
				return;
			
			console.log("todo: register success");
			$(":mobile-pagecontainer").pagecontainer("change", "#pgLogin");
		});
		DataManager.on("failure", function(data)
		{
			console.log(data);
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
		this.btnLogout.click(function()
		{
			DataManager.logout();
		});
	};
	this.loginButtons = function()
	{
		this.frmLogin.submit(function()
		{
			DataManager.login($this.txtUsername.val(), $this.txtPassword.val());
			return false;
		});
		this.pgLogin.on("pageshow", function()
		{
			DataManager.session_verify();
		});
	};
	this.registerButtons = function()
	{
		this.frmRegister.submit(function()
		{
			var user, pw, pwv;
			user = $this.frmRegister.find("[data-field=username]").val().trim();
			pw = $this.frmRegister.find("[data-field=password]").val().trim();
			pwv = $this.frmRegister.find("[data-field=confirmpassword]").val().trim();
			
			if (!user.length)
			{
				console.log("todo: enter username");
			}
			else if (pw !== pwv)
			{
				console.log("todo: password mismatch");
			}
			else if (!pw.length)
			{
				console.log("todo: enter password");
			}
			else
			{
				DataManager.register(user, pw);
			}
			return false;
		});
	};
})();