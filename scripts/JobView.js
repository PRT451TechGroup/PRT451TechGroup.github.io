var JobView = function(lvw, tgp, frm)
{
	var $this = this;
	this.model = lvw || $("<ul />");
	this.targetPage = tgp;
	this.jobForm = frm;
	
	this.model.delegate("li > a", "click", function()
	{
		var elem = $(this);
		var jobid = elem.data("jobid");
		$this.jobForm.dataSet(DataManager.getJobById(jobid));
		$this.jobForm.jobID = jobid;
	});
	this.add = function(v, jobid)
	{
		this.model.append(this.createItem(v, jobid));
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
	this.createItem = function(v, jobid)
	{
		var a = $("<a />");
		
		a.attr(
		{
			"href": "#" + this.targetPage,
			"data-jobid": jobid || v.JobID
		});
		//a.text(v.EquipmentName);
		//a.append($("<span />").attr("class", "ui-li-count").text(v.Building + "." + v.Floor + "." + v.Room));
		a.append(Extensions.createGrid([v.EquipmentName, v.Building + "." + v.Floor + "." + v.Room]));
		
		return $("<li />").append(a);
	};
	this.jobForm.submit(function(args)
	{
		var qdata = {};
		$this.jobForm.dataRequest(qdata);
		
		DataManager.update_job(qdata);
		
		return false;
	});
}