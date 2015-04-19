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
			<label for="txtLocation">Location</label>
			<input data-clear-btn="true" name="txtLocation" id="txtJobName" value="" type="text" />
			
			<!-- <label for="fsBuilding">Building</label> -->
			<div class="ui-grid-b">
				<div class="ui-block-a">
					<label for="selBuilding">Building</label>
					<select name="selBuilding" id="selBuilding">
						<option value="2">2</option>
						<option value="12">12</option>
					</select>
				</div>
				<div class="ui-block-b">
					<label for="selFloor">Floor</label>
					<select name="selFloor" id="selFloor" data-select="range" data-select-min="1" data-select-max="3">
					</select>
				</div>
				<div class="ui-block-c">
					<label for="selRoom">Room</label>
					<select name="selRoom" id="selRoom" data-select="range" data-select-min="1" data-select-max="25">
					</select>
				</div>
			</div>
			
			<label for="dtTime">Time</label>
			<input data-clear-btn="true" name="dtTime" id="dtTime" value="" type="datetime" />
			
			<label for="fsEquipment">Number of Equipment</label>
			<div data-role="controlgroup" data-type="horizontal" id="fsEquipment">
				<input type="button" value="+" />
				<input type="text" id="number" value="1" />
				<input type="button" value="-" />
			</div>
			
			<label for="txtSpecification">Specification</label>
			<textarea name="txtSpecification" id="txtSpecification"></textarea>
			
			<input type="submit" value="Add Job" />
		</form>
	</div>
</div>