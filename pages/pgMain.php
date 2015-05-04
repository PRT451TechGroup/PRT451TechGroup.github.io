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
		<ul data-role="listview">
			<li data-role="fieldcontain">
				<label for="txtEquipmentName">Equipment Name</label>
				<input name="txtEquipmentName" id="txtEquipmentName" value="" type="text" data-job-field="EquipmentName" />
			</li>
			<li data-role="fieldcontain">
				<label>Location</label>
				<fieldset class="ui-grid-b">
				<div class="ui-block-a">
					<label for="selBuilding">Building</label>
					<select name="selBuilding" id="_selBuilding" data-job-field="Building" data-job-refresh="selectmenu">
						<option value="2">2</option>
						<option value="12">12</option>
					</select>
				</div>
				<div class="ui-block-b">
					<label for="selFloor">Floor</label>
					<select name="selFloor" id="_selFloor" data-select="range" data-select-min="1" data-select-max="3" data-job-field="Floor" data-job-refresh="selectmenu">
					</select>
				</div>
				<div class="ui-block-c">
					<label for="selRoom">Room</label>
					<select name="selRoom" id="_selRoom" data-select="range" data-select-min="1" data-select-max="25" data-job-field="Room" data-job-refresh="selectmenu">
					</select>
				</div>
				</fieldset>
			</li>
			<li data-role="fieldcontain">
				<label for="dtTime">Due Date and Time</label>
				<input name="dtTime" id="_dtTime" value="" type="date" data-job-field="DueDate"/>
			</li>
			<li data-role="fieldcontain">
				<label>Number of Equipment</label>
				<fieldset class="ui-grid-c" id="_fsEquipment">
					<div class="ui-block-a"><input type="button" value="-" id="btnNeM" data-job-field="EquipDecrement" /></div>
					<div class="ui-block-b"><input type="text" id="txtEquip0" name="txtEquip0" value="0" readonly="readonly" data-job-field="NoEquipment0" /></div>
					<div class="ui-block-c"><input type="text" id="txtEquip1" name="txtEquip1" value="1" readonly="readonly" data-job-field="NoEquipment1" /></div>
					<div class="ui-block-d"><input type="button" value="+" id="btnNeP" data-job-field="EquipIncrement" /></div>
				</fieldset> 
			</li>
			<li data-role="fieldcontain">
				<label for="txtAssetNo">Asset Number</label>
				<input type="text" id="txtAssetNo" name="txtAssetNo" data-job-field="AssetNo" />
			</li>
			<li data-role="fieldcontain">
				<label for="txtSpecification">Specification</label>
				<textarea name="txtSpecification" id="txtSpecification" data-job-field="Specification"></textarea>
			</li>
			<input type="hidden" name="txtProgress" id="txtProgress" data-job-field="Progress" value="0" />
			<li class="ui-grid-a">
				<div class="ui-block-a">
					<input type="reset" value="Reset" />
				</div>
				<div class="ui-block-b">
					<input type="submit" value="Add Job" />
				</div>
			</li>
		</ul>
		</form>
	</div>
</div>