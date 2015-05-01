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
			"divJobs"
		];
		$.each(props, function(k, v)
		{
			$this[v] = $("#" + v);
		});
		
		this.jobsList = new JobsList(this.divJobs);
		this.tab = "review";
	};
	this.setupInterface = function()
	{
		this.initProps();
		this.mainMenuButtons();
		this.addJobButtons();
		this.equipButtons();
		this.menuLoader();
		this.loginButtons();
	};
	this.equipButtons = function()
	{
		var nums = "0123456789";
		var eq0, eq1;
		var vl0, vl1;
		var nem = function()
		{
			eq0 = this.txtEquip0;
			eq1 = this.txtEquip1;
			vl0 = nums.indexOf(eq0.val());
			vl1 = nums.indexOf(eq1.val());
		};
		$("#btnNeM").click(function()
		{
			nem();
			if (vl0 == 0 && vl1 == 0)
				return;
			
			eq1.val(nums[vl1+1]);
			
			if (vl1 == 0)
			{
				eq0.val(nums[vl0-1]);
				eq1.val("9");
			}
			else
			{
				eq1.val(nums[vl1-1]);
			}
		});
		$("#btnNeP").click(function()
		{
			nem();
			if (vl0 == 9 && vl1 == 9)
				return;
			
			if (vl1 == 9)
			{
				eq0.val(nums[vl0+1]);
				eq1.val("0");
			}
			else
			{
				eq1.val(nums[vl1+1]);
			}
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
	this.equipVal = function()
	{
		var s = "0123456789";
		return s.indexOf(this.txtEquip0.val()) * 10 + s.indexOf(this.txtEquip1.val());
	};
	this.addJobButtons = function()
	{
		this.frmCreate.submit(function()
		{
			var ajax = DataManager.new_job(
				$this.txtEquipmentName.val(),
				$this.selBuilding.val(),
				$this.selFloor.val(),
				$this.selRoom.val(),
				$this.dtTime.val(),
				$this.equipVal(),
				$this.txtAssetNo.val(),
				$this.txtSpecification.val()
			);
			ajax.done(function(data)
			{
				$this.jobsList.add(data.data);
				$this.switchTabReview();
				$this.frmCreate.trigger("reset");
			});
			
			return false;
		});
	};
	
	this.menuLoader = function()
	{
		this.pgMain.on("pageshow", function()
		{
			var ajax = DataManager.show_jobs();
			
			ajax.done(function(data)
			{
				if (DataManager.session_failure(data))
				{
					$(":mobile-pagecontainer").pagecontainer("change", "#pgLogin");
					return;
				}
				
				$.each(data.data, function(k,v)
				{
					$this.jobsList.add(v);
				});
				$this.jobsList.refresh();
			});
			
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
			var ajax = DataManager.session_verify();
			
			ajax.done(function(data)
			{
				if (!data.success)
					$(":mobile-pagecontainer" ).pagecontainer("change", "#pgLogin");
			});
		});
	};
	this.loginButtons = function()
	{
		this.frmLogin.submit(function()
		{
			var ajax = DataManager.login($this.txtUsername.val(), $this.txtPassword.val());
			ajax.done(function(data)
			{
				if (data.success)
				{
					$("body").pagecontainer("change", "#pgMenu", {});
					
				}
			});
			return false;
		});
	};
})();