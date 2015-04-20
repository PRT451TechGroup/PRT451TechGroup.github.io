function fillSelection(sel, start, end)
{
	for(var i=start;i<=end;i++)
	{
		sel.append($("<option />").val(i).text(i));
	}
}
function dateStamp(dt)
{
	var gf = function(a) { return a.length < 2 ? "0" + a : a; };
	return dt.getFullYear().toString() + "-" +
		gf(dt.getMonth().toString()) + "-" +
		gf(dt.getDate().toString()) + " " +
		gf(dt.getHours().toString()) + ":" +
		gf(dt.getMinutes().toString());
}


$(document).ready(function()
{
	$("select[data-select='range']").each(function(k,v)
	{
		v = $(v);
		fillSelection(v, parseInt(v.data("select-min")), parseInt(v.data("select-max")));
	});
	$("#btnNewJob").click(function()
	{
		$("#pgMain").on("pageshow", function(){$("a[href='#tabCreate']").click();});
	});
	$("#btnReviewJobs").click(function()
	{
		$("#pgMain").on("pageshow", function(){$("a[href='#taboverview']").click();});
	});
	
	// set buttons
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
	}
});
