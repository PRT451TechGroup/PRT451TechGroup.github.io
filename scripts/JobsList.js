function JobsList(elem)
{
	var $this = this;
	this.model = elem;
	this.refreshQueue = [];
	
	this.add = function(data)
	{
		var col = this.createCollapsible(data)
		this.model.append(col);
		col.trigger("create");
		
		this.refreshQueue[this.refreshQueue.length] = "job-" + data.JobID;
	};
	this.clear = function()
	{
		this.model.empty();
		this.refresh();
	};
	this.refresh = function()
	{
		this.model.collapsibleset("refresh");
		
		for(var i=0;i<this.refreshQueue.length;i++)
		{
			var val = $("." + this.refreshQueue[i]);
			
			if (val.length == 0)
				continue;
			
			val.collapsible("refresh");
			//val.children("ul").listview("refresh");
		}
		
		this.refreshQueue = [];
		
		//this.model.collapsibleset("refresh");
	}
	this.createCollapsible = function(data)
	{
		var location = data.Building + "." + data.Floor + "." + data.Room;
		
		var div = $("<div />");
		div.attr(
		{
			"data-role": "collapsible",
			"class": "job-" + data.JobID + " job-col"
		});
		//div.append($("<h2 />").text(data.EquipmentName + " - " + location));
		div.append($("<h2 />").append(Extensions.createGrid([data.EquipmentName, location])));
		div.append(this.createList(data, location));
		
		return div;
	};
	this.createList = function(data, location)
	{
		var lst = $("<ul />");
		
		lst.attr("data-role", "listview");
		
		lst.append(this.createListElement("Equipment Name", "equipmentname", data.EquipmentName));
		lst.append(this.createListElement("Location", "location", location));
		lst.append(this.createListElement("Due Date", "duedate", data.DueDate));
		lst.append(this.createListElement("Number of Equipment", "noequipment", data.NoEquipment));
		lst.append(this.createListElement("Asset Number", "assetno", data.AssetNo));
		lst.append(this.createListElement("Specification", "specification", data.Specification));
		lst.append($("<li />").append(Extensions.createGrid(
		[
			$("<button />").text("Delete"),
			$("<button />").text("Edit")
		])));
		
		return lst;
	};
	this.createListElement = function(name, key, value)
	{
		var li = $("<li />");
		li.attr("class", "job-list-" + key);
		/*var grd = $("<div />");
		grd.attr("class", "ui-grid-a");
		grd.append($("<div />").attr("class", "ui-block-a").text(name));
		grd.append($("<div />").attr("class", "ui-block-b").text(value));
		
		
		
		li.append(grd);
		//li.text(value);*/
		li.append(Extensions.createGrid([name, value]));
		
		return li;
	};
}