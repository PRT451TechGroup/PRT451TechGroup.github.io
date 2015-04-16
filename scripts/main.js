$(document).ready(function()
{
	$("select[data-select='range']").each(function(k,v)
	{
		v = $(v);
		fillSelection(v, parseInt(v.data("select-min")), parseInt(v.data("select-max")));
	});
	$("#tabCreate").activate(function(event,ui)
	{
		if ($("#dtTime").val() == "")
		{
			$("#dtTime").val(+new Date);
		}
	});
});
function fillSelection(sel, start, end)
{
	for(var i=start;i<=end;i++)
	{
		sel.append($("<option />").val(i).text(i));
	}
}