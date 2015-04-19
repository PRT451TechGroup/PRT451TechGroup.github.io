<div data-role="header">
		<h1>CDU Tech Support</h1>
</div>
<div data-role="tabs">
	<div data-role="navbar">
		<ul>
			<li><a href="#tabOverview" data-theme="a" data-ajax="false">Overview</a></li>
			<li><a href="#tabCreate" data-theme="a" data-ajax="false">Create</a></li>
		</ul>
	</div>
	<div id="tabOverview" class="ui-content">
		<div data-role="tabs">
			<div data-role="navbar">
				<ul>
					<li><a href="#tabOverviewActive">Active</a></li>
					<li><a href="#tabOverviewCompleted">Completed</a></li>
				</ul>
			</div>
			<div id="tabOverviewActive" class="ui-content">
				<table data-role="table" id="tblActive" data-filter="true">
					<thead>
						<tr>
							<th>Asset</th>
							<th data-priority="1">Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1234</td>
							<td>abcdefgh</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div id="tabOverviewCompleted" class="ui-content">
				<table data-role="table" id="tblCompleted" data-filter="true">
					<thead>
						<tr>
							<th>Asset</th>
							<th data-priority="1">Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>12351</td>
							<td>abcdefgh</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div id="tabCreate" class="ui-content">
		<form>
			<label for="txtJobName">Job Name</label>
			<input data-clear-btn="true" name="txtJobName" id="txtJobName" value="" type="text" />
			
			<label for="fsBuilding">Building</label>
			<fieldset data-role="controlgroup" data-type="horizontal" name="fsBuilding" id="fsBuilding">
				<select name="selBuilding" id="selBuilding" data-select="range" data-select-min="1" data-select-max="12">
				</select>
				<select name="selRoom" id="selRoom" data-select="range" data-select-min="1" data-select-max="23">
				</select>
			</fieldset>
			
			<label for="txtLocation">Location</label>
			<input data-clear-btn="true" name="txtLocation" id="txtLocation" value="" type="text" />
			
			<label for="dtTime">Time</label>
			<input data-clear-btn="true" name="dtTime" id="dtTime" value="" type="datetime" />
			
			<label for="rngEquipment">Number of Equipment</label>
			<input name="rngEquipment" id="rngEquipment" min="1" max="20" value="1" type="range" />
			
			<label for="txtSpecification">Specification</label>
			<textarea name="txtSpecification" id="txtSpecification"></textarea>
			
			<input type="submit" value="Add Job" />
		</form>
	</div>
</div>