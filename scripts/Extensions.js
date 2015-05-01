var Extensions = new (function()
{
	var $this = this;
	
	this.applyExtensions = function()
	{
		this.selectRanges();
		
	};
	this.fillSelection = function(sel, start, end)
	{
		for(var i=start;i<=end;i++)
		{
			sel.append($("<option />").val(i).text(i));
		}
	};
	this.selectRanges = function()
	{
		$("select[data-select='range']").each(function()
		{
			v = $(this);
			$this.fillSelection(v, parseInt(v.data("select-min")), parseInt(v.data("select-max")));
		});
	};
	this.createGrid = function(items)
	{
		var div = $("<div />");
		var seq = "abcd";
		var size = items.length;
		
		if (size > seq.length)
			size = seq.length;
		
		div.attr("class", "ui-grid-" + seq[(size > 2) ? (size - 2) : 0]);
		
		for(var i=0;i<size;i++)
		{
			var v = items[i];
			var subdiv = $("<div />").attr("class", "ui-block-" + seq[i]);
			
			if ((typeof v) === "object")
				subdiv.append(v);
			else
				subdiv.text(String(v));
			
			div.append(subdiv);
			
		}
		
		return div;
	};
})();