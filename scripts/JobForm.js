function JobForm(form)
{
	var $this = this;
	this.fields = {};
	this.form = form;
	this.jobID = null;
	this.submitters = [];
	this.jobcopy = {};
	
	this.trigger = function(args)
	{
		var ret = true;
		$.each(this.submitters, function(k, v)
		{
			if (v(args) === false)
				ret = false;
		});
		return ret;
	}
	this.pageshow = function()
	{
		$.each(form.find("[data-job-field]"), function(k, v)
		{
			var val = $(v);
			$this.fields[val.data("job-field")] = val;
		});
		
		if (!this.fields.NoEquipment)
			this.equipButtons(this.fields.NoEquipment0, this.fields.NoEquipment1, this.fields.EquipDecrement, this.fields.EquipIncrement);
		
		$.each(this.jobcopy, function(k, v)
		{
			var f = $this[k];
			if (f)
				f(v);
		});
	};
	this.dataEntry = function()
	{
		var data =
		{
			EquipmentName: this.EquipmentName(),
			Building: this.Building(),
			Floor: this.Floor(),
			Room: this.Room(),
			DueDate: this.DueDate(),
			NoEquipment: this.NoEquipment(),
			AssetNo: this.AssetNo(),
			Specification: this.Specification(),
			Progress: this.Progress()
		};
		if (!(this.jobID === null))
		{
			data.JobID = this.jobID;
		}
		
		return data;
	};
	this.dataRequest = function(request)
	{
		request["equipmentname"] = this.EquipmentName();
		request["building"] = this.Building();
		request["floor"] = this.Floor();
		request["room"] = this.Room();
		request["duedate"] = this.DueDate();
		request["noequipment"] = this.NoEquipment();
		request["assetno"] = this.AssetNo();
		request["specification"] = this.Specification();
		request["progress"] = this.Progress();
		
		if (!(this.jobID === null))
		{
			request["jobid"] = this.jobID;
		}
	};
	this.dataSet = function(v)
	{
		if (v.JobID != null)
		{
			this.jobID = v.JobID;
		}
		
		this.EquipmentName(v.EquipmentName);
		this.Building(v.Building);
		this.Floor(v.Floor);
		this.Room(v.Room);
		this.DueDate(v.DueDate);
		this.NoEquipment(v.NoEquipment);
		this.AssetNo(v.AssetNo);
		this.Specification(v.Specification);
		this.Progress(v.Progress);
		
		this.jobcopy = DataManager.job_copy(v);
	};
	this.init = function()
	{
		this.pageshow();
		
		this.form.submit(function()
		{
			return $this.trigger({caller: $this, data: $this.dataEntry});
		});
	}
	this.submit = function(val)
	{
		this.submitters.push(val);
	};
	this.equipVal = function()
	{
		var ne = this.fields.NoEquipment;
		if (ne)
		{
			return Number(ne.val());
		}
		else
		{
			var s = "0123456789";
			return s.indexOf(this.fields.NoEquipment0.val()) * 10 + s.indexOf(this.fields.NoEquipment1.val());
		}
	};
	this.setEquipVal = function(value)
	{
		var ne = this.fields.NoEquipment;
		if (ne)
		{
			ne.val(value);
		}
		else
		{
			value = Number(value);
			if (value > 99)
				value = 99;
			this.fields.NoEquipment0.val(Math.floor(value / 10));
			this.fields.NoEquipment1.val(value % 10);
		}
	};
	this.equipButtons = function(eq0, eq1, nemb, nep)
	{
		var nums = "0123456789";
		var vl0, vl1;
		var nem = function()
		{
			vl0 = nums.indexOf(eq0.val());
			vl1 = nums.indexOf(eq1.val());
		};
		nemb.click(function()
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
		nep.click(function()
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
	this.GetterSetter = function(name)
	{
		return (function(value)
		{
			var field = $this.fields[name];
			var scale;
			
			scale = field.data("job-scale");
			
			if (typeof scale !== "undefined")
			{
				scale = Number(scale);
				
				// divide by zero
				if (scale === 0)
					scale = false;
			}
			else
			{
				scale = false;
			}
			
			if (typeof value !== "undefined")
			{
				$this.jobcopy[name] = value;
				
				if (scale !== false)
					value *= scale;
				
				field.val(value);
				
				var fdr = field.data("job-refresh");
				if (typeof fdr !== "undefined")
				{
					try
					{
						field[fdr]("refresh");
					}
					catch(ex)
					{
					}
				}
			}
			else
			{
				var val = field.val();
				
				if (scale !== false)
				{
					val /= scale;
				}
				
				return val;
			}
		});
	};
	this.EquipmentName = this.GetterSetter("EquipmentName");
	this.Building = this.GetterSetter("Building");
	this.Floor = this.GetterSetter("Floor");
	this.Room = this.GetterSetter("Room");
	this.DueDate = this.GetterSetter("DueDate");
	this.AssetNo = this.GetterSetter("AssetNo");
	this.Specification = this.GetterSetter("Specification");
	this.Progress = this.GetterSetter("Progress");
	
	this.NoEquipment = function(value)
	{
		if (typeof value !== "undefined")
		{
			$this.setEquipVal(value);
		}
		else
		{
			return $this.equipVal();
		}
	};
	
	this.init();
}