<div data-role="header">
		<h1>CDU Tech Support</h1>
</div>
<div data-role="tabs">
	<div data-role="navbar">
		<ul>
			<li><a href="#tabOverview" data-theme="a" data-ajax="false">Review</a></li>
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
							<th>Job ID</th>
							<th data-priority="1">Equipment Name</th>
							<th data-priority="1">Location</th>
							<th data-priority="1">Due Date</th>
							<th data-priority="1">Number of Equipment</th>
							<th data-priority="1">Asset Number</th>
							<th data-priority="2">Specification</th>
						</tr>
					</thead>
					<tbody>
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
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div id="tabCreate" class="ui-content">
		<form id="frmCreate">
			<label for="txtEquipmentName">Equipment Name</label>
			<input data-clear-btn="true" name="txtEquipmentName" id="txtEquipmentName" value="" type="text" />
			
			<label for="divLocation">Location</label>
			<div class="ui-grid-b" id="divLocation">
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
			
			<label for="dtTime">Due Date and Time</label>
			<input data-clear-btn="true" name="dtTime" id="dtTime" value="" type="date" />
			
			<label for="fsEquipment">Number of Equipment</label>
			<div class="ui-grid-c" id="fsEquipment">
				<div class="ui-block-a"><input type="button" value="-" id="btnNeM" /></div>
				<div class="ui-block-b"><input type="text" id="txtEquip0" name="txtEquip0" value="0" readonly="true" /></div>
				<div class="ui-block-c"><input type="text" id="txtEquip1" name="txtEquip1" value="1" readonly="true" /></div>
				<div class="ui-block-d"><input type="button" value="+" id="btnNeP" /></div>
			</div>
			
			<label for="txtAssetNo">Asset Number</label>
			<input type="text" id="txtAssetNo" name="txtAssetNo" />
			
			<label for="txtSpecification">Specification</label>
			<textarea name="txtSpecification" id="txtSpecification"></textarea>
			
			<input type="submit" value="Add Job" />
		</form>
	</div>
</div>