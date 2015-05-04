var JobView = function(lvw, tgp, frm)
{
	var $this = this;
	this.model = lvw || $("<ul />");
	this.targetPage = tgp;
	this.jobForm = frm;
	this.scrollPos = null;
	this.styleCall = null;
	this.sortCall = null
	
	this.model.delegate("li > a", "click", function()
	{
		var elem = $(this);
		var li = elem, jobid;
		do
		{
			li = li.parent();
			jobid = li.data("jobid");
		}
		while(typeof jobid === "undefined");
		
		$this.jobForm.dataSet(DataManager.getJobById(jobid));
		$this.jobForm.jobID = jobid;
		$this.scrollPos = li.offset().top;
	});
	this.clear = function()
	{
		this.model.empty();
	};
	this.styler = function(value)
	{
		if (typeof value !== "undefined")
		{
			this.styleCall = value;
		}
		else
		{
			return this.styleCall;
		}
	};
	this.sorter = function(value)
	{
		if (typeof value !== "undefined")
		{
			this.sortCall = value;
		}
		else
		{
			return this.sortCall;
		}
	};
	this.pagescroll = function(page)
	{
		$(document).on("pageshow", "#" + page, function()
		{
			if ($this.scrollPos !== null)
				$.mobile.silentScroll($this.scrollPos);
		});
	};
	this.add = function(value, jobid)
	{
		if (this.sortCall)
		{
			var next = null;
			$.each(this.model.find("[data-jobid]"), function(k, v)
			{
				var li = $(v);
				
				var jid = String(li.data("jobid"));
				
				if ($this.sortCall(value, DataManager.getJobById(li.data("jobid"))) < 0)
				{
					var ci = $this.createItem(value, jobid);
					
					if (next)
						next.after(ci);
					else
						$this.model.prepend(ci);
					
					next = true;
					
					return false;
				}
				
				next = li;
			});
			
			if (next !== true)
			{
				this.model.append(this.createItem(value, jobid));
			}
		}
		else
			this.model.append(this.createItem(v, jobid));
	};
	this.addsorted = function(data)
	{
		$.each(data, function(k, v)
		{
			$this.model.append($this.createItem(v, v.JobID || k));
		});
	};
	this.pageshow = function()
	{
		this.jobForm.pageshow();
	};
	this.update = function(v, jobid)
	{
		this.remove(jobid || v.JobID);
		this.add(v, jobid);
		/*var f = this.model.find("[data-jobid=" + (jobid || v.JobID) + "]");
		
		
		if (f.length)
		{
			var prev, next;
			next = f.next();
			prev = f.prev();
			
			this.model.append(this.createItem(v, jobid));
			
			if (this.styleCall)
			{
				this.styleCall(v, f);
			}
			
			f.find(".ui-block-a").text(v.EquipmentName);
			f.find(".ui-block-b").text(v.Building + "." + v.Floor + "." + v.Room);
			f.find(".ui-block-c").text(Math.floor(v.Progress * 100));
			return true;
		}
		else
		{
			return false;
		}*/
	};
	this.refresh = function()
	{
		try
		{
			this.model.listview("refresh");
		}
		catch(e)
		{
			return e;
		}
		return null;
	};
	this.remove = function(jobid)
	{
		var f = this.model.find("[data-jobid=" + jobid + "]");
		
		if (f.length)
		{
			f.remove();
			return true;
		}
		else
		{
			return false;
		}
	};
	this.createItem = function(v, jobid)
	{
		var a = $("<a />");
		
		a.attr("href", "#" + this.targetPage);
		//a.text(v.EquipmentName);
		//a.append($("<span />").attr("class", "ui-li-count").text(v.Building + "." + v.Floor + "." + v.Room));
		a.append(Extensions.createGrid([v.EquipmentName, v.Building + "." + v.Floor + "." + v.Room,
			Math.floor(v.Progress * 100)]));
		
		var li = $("<li />");
		li.append(a);
		li.attr("data-jobid", jobid || v.JobID);
		
		if (this.styleCall)
		{
			this.styleCall(v, li);
		}
		
		return li;
	};
	this.jobForm.submit(function(args)
	{
		var qdata = {};
		$this.jobForm.dataRequest(qdata);
		
		DataManager.update_job(qdata);
		
		return false;
	});
}