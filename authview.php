<html>
<head>
	
	<!--CSS-->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
	<link rel="stylesheet" href="css/auth.css">
	<link rel="stylesheet" href="css/authlist.css">
	<link rel="stylesheet" href="css/font-awesome.css">
	
	<!--JavaScript-->
	<script>
		function load(){
			$(".username").html(sessionStorage["user"]);
			fillTable();
			window.setInterval(function(){
				document.getElementById("repolist").innerHTML="";
				document.getElementById("memberlist").innerHTML="";
				fillTable();
			},5000);
			//startChat();
		}
	</script>
	<script src="js/jquery-1.11.1.min.js"></script>
	<script src="js/bootstrap.js"></script>
	<script src="js/authview.js"></script>
	
	<!--Fonts-->
	<link href='https://fonts.googleapis.com/css?family=UnifrakturMaguntia' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:600,600italic,700,400' rel='stylesheet' type='text/css'>
	<link href='//fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css'>
	
</head>

<body onload="load()">

	<!--Header-->
	<div class="navbar navbar-default navbar-fixed-top" role="navigation">
		<div class="container"> 
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span> 
				</button>
				<a target="_blank" href="home.php" class="navbar-brand">Project Hub</a>
			</div>
			<div class="collapse navbar-collapse">
				<ul class="nav navbar-nav">
					<li><a href="home.php">My Repos</a></li>
					<li><a href="auth.php">Authorized Repo</a></li>           
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<strong class="username"></strong>
							<span class="glyphicon glyphicon-chevron-down"></span>
						</a>
						<ul class="dropdown-menu">
							<li class="divider"></li>
							<li>
								<div class="navbar-login navbar-login-session" style="width: 305px; padding: 50px; padding-bottom: 0px;">
									<div class="row" style="margin-top:-25%; padding: 0 0; width: 120%">
										<div class="col-lg-12">
											<p>
												<a href="index.php" class="btn btn-danger btn-block">Logout</a>
											</p>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
	
	<!--Authview-->
	<div style="width:75%;float:left">
		<center>
			<div class="row">
				<div class="col-md-6">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<h3 id="reponame" class="panel-title"></h3>
						</div>
						<div class="panel">
							<input class="form-control" style="float:left;width:80%" type="text" id="filename" placeholder="New File Name" onchange="checkfileexists(value)"/>
							<button class="btn btn-success" id="newfilebtn" style="float:right;width:20%">Create New File</button>
						</div>
						<table class="table table-hover" id="dev-table">
							<thead>
								<tr>
									<th><em class="fa fa-cog"></em></th>
									<th>Last Modified</th>
									<th>File</th>
								</tr>
							</thead>
							<tbody id="repolist">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</center>
	</div>
	
	<!--Members-->
	<div style="width:25%;float:right">
		<center>
			<div class="row">
				<div class="col-md-6">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<h3 class="panel-title">Members</h3>
						</div>
						<table class="table table-hover" id="dev-table">
							<tbody id="memberlist">
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</center>
	</div>
	
</body>
</html>