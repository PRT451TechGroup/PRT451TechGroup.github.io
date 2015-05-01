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
		<ul data-role="listview" id="lstJobs">
		</ul>
	</div>
	<div id="tabCreate" class="ui-content">
		<form id="frmCreate">
			<label for="txtEquipmentName">Equipment Name</label>
			<input data-clear-btn="true" name="txtEquipmentName" id="txtEquipmentName" value="" type="text" data-job-field="EquipmentName" />
			
			<label>Location</label>
			<fieldset class="ui-grid-b" id="divLocation">
				<div class="ui-block-a">
					<label for="selBuilding">Building</label>
					<select name="selBuilding" id="selBuilding" data-job-field="Building" >
						<option value="2">2</option>
						<option value="12">12</option>
					</select>
				</div>
				<div class="ui-block-b">
					<label for="selFloor">Floor</label>
					<select name="selFloor" id="selFloor" data-select="range" data-select-min="1" data-select-max="3" data-job-field="Floor" >
					</select>
				</div>
				<div class="ui-block-c">
					<label for="selRoom">Room</label>
					<select name="selRoom" id="selRoom" data-select="range" data-select-min="1" data-select-max="25" data-job-field="Room" >
					</select>
				</div>
			</fieldset>
			
			<label for="dtTime">Due Date and Time</label>
			<input data-clear-btn="true" name="dtTime" id="dtTime" value="" type="date" data-job-field="DueDate" />
			
			<label>Number of Equipment</label>
			<fieldset class="ui-grid-c" id="fsEquipment">
				<div class="ui-block-a"><input type="button" value="-" id="btnNeM" data-job-field="EquipDecrement"/></div>
				<div class="ui-block-b"><input type="text" id="txtEquip0" name="txtEquip0" value="0" readonly="readonly" data-job-field="NoEquipment0" /></div>
				<div class="ui-block-c"><input type="text" id="txtEquip1" name="txtEquip1" value="1" readonly="readonly" data-job-field="NoEquipment1" /></div>
				<div class="ui-block-d"><input type="button" value="+" id="btnNeP" data-job-field="EquipIncrement"\/></div>
			</fieldset>
			
			<label for="txtAssetNo">Asset Number</label>
			<input type="text" id="txtAssetNo" name="txtAssetNo" data-job-field="AssetNo" />
			
			<label for="txtSpecification">Specification</label>
			<textarea name="txtSpecification" id="txtSpecification" data-job-field="Specification"></textarea>
			
			<input type="submit" value="Add Job" />
		</form>
	</div>
</div>