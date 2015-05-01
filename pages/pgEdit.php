<div data-role="header">
	<h1>Editing</h1>
</div>
<div data-role="tabs">
	<form id="frmEdit">
		<ul data-role="listview">
			<li data-role="fieldcontain">
				<label for="_txtEquipmentName">Equipment Name</label>
				<input name="_txtEquipmentName" id="_txtEquipmentName" value="" type="text" data-job-field="EquipmentName" />
			</li>
			<li data-role="fieldcontain">
				<label>Location</label>
				<fieldset class="ui-grid-b">
				<div class="ui-block-a">
					<label for="_selBuilding">Building</label>
					<select name="_selBuilding" id="_selBuilding" data-job-field="Building">
						<option value="2">2</option>
						<option value="12">12</option>
					</select>
				</div>
				<div class="ui-block-b">
					<label for="_selFloor">Floor</label>
					<select name="_selFloor" id="_selFloor" data-select="range" data-select-min="1" data-select-max="3" data-job-field="Floor">
					</select>
				</div>
				<div class="ui-block-c">
					<label for="_selRoom">Room</label>
					<select name="_selRoom" id="_selRoom" data-select="range" data-select-min="1" data-select-max="20" data-job-field="Room">
					</select>
				</div>
				</fieldset>
			</li>
			<li data-role="fieldcontain">
				<label for="_dtTime">Due Date and Time</label>
				<input name="_dtTime" id="_dtTime" value="" type="date" data-job-field="DueDate"/>
			</li>
			<li data-role="fieldcontain">
				<label>Number of Equipment</label>
				<fieldset class="ui-grid-c" id="_fsEquipment">
					<div class="ui-block-a"><input type="button" value="-" id="_btnNeM" data-job-field="EquipDecrement" /></div>
					<div class="ui-block-b"><input type="text" id="_txtEquip0" name="_txtEquip0" value="0" readonly="readonly" data-job-field="NoEquipment0" /></div>
					<div class="ui-block-c"><input type="text" id="_txtEquip1" name="_txtEquip1" value="1" readonly="readonly" data-job-field="NoEquipment1" /></div>
					<div class="ui-block-d"><input type="button" value="+" id="_btnNeP" data-job-field="EquipIncrement" /></div>
				</fieldset> 
			</li>
			<li data-role="fieldcontain">
				<label for="_txtAssetNo">Asset Number</label>
				<input type="text" id="_txtAssetNo" name="_txtAssetNo" data-job-field="AssetNo" />
			</li>
			<li data-role="fieldcontain">
				<label for="_txtSpecification">Specification</label>
				<textarea name="_txtSpecification" id="_txtSpecification" data-job-field="Specification"></textarea>
			</li>
			<li class="ui-grid-a">
				<div class="ui-block-a">
					<a id="btnEditCancel" class="ui-btn">Cancel</a>
				</div>
				<div class="ui-block-b">
					<input type="submit" value="Save Changes" />
				</div>
			</li>
		</ul>
	</form>
</div>