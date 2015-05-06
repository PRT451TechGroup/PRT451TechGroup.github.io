<div data-role="header">
	<h1>Register</h1>
</div>
<div data-role="content">
	<form id="frmRegister">
		<ul data-role="listview">
			<li data-role="fieldcontain">
				<label>Username</label>
				<input type="text" data-field="username" />
			</li>
			<li data-role="fieldcontain">
				<label>Password</label>
				<input type="password" data-field="password" />
			</li>
			<li data-role="fieldcontain">
				<label>Confirm Password</label>
				<input type="password" data-field="confirmpassword" />
			</li>
			<li class="ui-grid-a">
				<div class="ui-block-a">
					<a class="ui-btn ui-btn-icon-left ui-corner-all ui-icon-back" href="#pgLogin">Cancel</a>
				</div>
				<div class="ui-block-b">
					<input type="submit" data-icon="user" value="Register" />
				</div>
			</li>
		</ul>
	</form>
</div>