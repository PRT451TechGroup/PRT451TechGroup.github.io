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
	$("#dtTime").val("");
	$("select[data-select='range']").each(function(k,v)
	{
		v = $(v);
		fillSelection(v, parseInt(v.data("select-min")), parseInt(v.data("select-max")));
	});
	$("a[href='#tabCreate']").click(function()
	{
		if ($("#dtTime").val() == "")
		{
			$("#dtTime").val(dateStamp(new Date()));
		}
		
	});
	$("#btnNewJob").click(function()
	{
		$("#pgMain").on("pageshow", function(){$("a[href='#tabCreate']").click();});
	});
	$("#btnReviewJobs").click(function()
	{
		$("#pgMain").on("pageshow", function(){$("a[href='#taboverview']").click();});
	});
});
