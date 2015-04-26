var Misc = 
{
	fillSelection: function(sel, start, end)
	{
		for(var i=start;i<=end;i++)
		{
			sel.append($("<option />").val(i).text(i));
		}
	},
	dateStamp: function(dt)
	{
		var gf = function(a) { return a.length < 2 ? "0" + a : a; };
		return dt.getFullYear().toString() + "-" +
			gf(dt.getMonth().toString()) + "-" +
			gf(dt.getDate().toString()) + " " +
			gf(dt.getHours().toString()) + ":" +
			gf(dt.getMinutes().toString());
	}
}
var TechSupport =
{
	equipButtons: function()
	{
		var nums = "0123456789";
		var eq0, eq1;
		var vl0, vl1;
		var nem = function()
		{
			eq0 = $("#txtEquip0");
			eq1 = $("#txtEquip1");
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
	},
	selectRanges: function()
	{
		$("select[data-select='range']").each(function(k,v)
		{
			v = $(v);
			Misc.fillSelection(v, parseInt(v.data("select-min")), parseInt(v.data("select-max")));
		});
	},
	mainMenuButtons: function()
	{
		$("#btnNewJob").click(function()
		{
			$("#pgMain").on("pageshow", TechSupport.switchTabCreate);
		});
		$("#btnReviewJobs").click(function()
		{
			$("#pgMain").on("pageshow", TechSupport.switchTabReview);
		});
	},
	switchTabCreate: function()
	{
		$("a[href='#tabCreate']").click();
	},
	switchTabReview: function()
	{
		$("a[href='#tabOverview']").click();
	},
	equipVal: function()
	{
		var s = "0123456789";
		return s.indexOf($("#txtEquip0").val()) * 10 + s.indexOf($("#txtEquip1").val());
	},
	addJobButtons: function()
	{
		$("#frmCreate").submit(function()
		{
			var ajax = DataManager.new_job(
				$("#txtLocation").val(),
				$("#selBuilding").val(),
				$("#selFloor").val(),
				$("#selRoom").val(),
				$("#dtTime").val(),
				TechSupport.equipVal(),
				$("#txtAssetNo").val(),
				$("#txtSpecification").val()
			);
			ajax.done(function(data)
			{
				TechSupport.addJobEntry(data.data);
				TechSupport.switchTabReview();
				$("#frmCreate").trigger("reset");
				$("#tblActive").table("refresh");
			});
			
			return false;
		});
	},
	addJobEntry: function(data)
	{
		var tr = $("<tr />");
		tr.append($("<th />").text(data.JobID));
		tr.append($("<td />").text(data.Location));
		tr.append($("<td />").text(data.Building + "." + data.Floor + "." + data.Room));
		tr.append($("<td />").text(data.DueDate));
		tr.append($("<td />").text(data.NoEquipment));
		tr.append($("<td />").text(data.AssetNo));
		tr.append($("<td />").text(data.Specification));
		
		$("#tblActive tbody").append(tr);
	},
	menuLoader: function()
	{
		$("#pgMenu").on("pageshow", function()
		{
			$("#tblActive tbody").empty();
			var ajax = DataManager.show_jobs();
			
			ajax.done(function(data)
			{
				$.each(data.data, function(k,v)
				{
					TechSupport.addJobEntry(v);
				});
				$("#tblActive").table("refresh");
			});
		});
		
		
	}
}
$(document).ready(function()
{
	TechSupport.selectRanges();
	TechSupport.mainMenuButtons();
	TechSupport.addJobButtons();
	TechSupport.equipButtons();
	TechSupport.menuLoader();
});
