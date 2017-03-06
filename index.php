<!DOCTYPE html>
<html>
<head>
<title>Project Hub</title>
<!-- for-mobile-apps -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="Deliccio Responsive web template, Bootstrap Web Templates, Flat Web Templates, Android Compatible web template, 
Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);
		function hideURLbar(){ window.scrollTo(0,1); } </script>
<!-- //for-mobile-apps -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
<link href="css/login.css" rel="stylesheet" type="text/css" media="all" />
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
<!-- js -->
<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/login.js"></script>
<!-- //js -->
<link href='https://fonts.googleapis.com/css?family=UnifrakturMaguntia' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Open+Sans:600,600italic,700,400' rel='stylesheet' type='text/css'>
<!-- FlexSlider -->
<link rel="stylesheet" href="css/flexslider.css" type="text/css" media="screen" />
<script defer src="js/jquery.flexslider.js"></script>
<script type="text/javascript">
						$(window).load(function(){
						  $('.flexslider').flexslider({
							animation: "slide",
							start: function(slider){
							  $('body').removeClass('loading');
							}
						  });
						});
					  </script>
<!-- //FlexSlider -->
<link href='//fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css'>
</head>
	
<body>
<!-- banner -->
	<div class="banner">
		<div class="container">
			<div class="header-nav">
				<nav class="navbar navbar-default">
					<!-- Brand and toggle get grouped for better mobile display -->
					<div class="navbar-header">
					  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					  </button>
						<div class="logo">
							<a class="navbar-brand" href="index.php">Project Hub<br><br><span>Collaborate to Innovate!!</span></a>
						</div>
					</div>

					<!-- Collect the nav links, forms, and other content for toggling -->
					<div class="collapse navbar-collapse nav-wil" id="bs-example-navbar-collapse-1">
					 <ul class="nav navbar-nav">
						<li class="active"><a class="btn" href="index.php">Home</a></li>
						<li><a class="btn" href="#signup" data-toggle="modal" data-target=".bs-modal-sm">Code It!</a></li>
						<li><a class="btn" href="contact.php">Contact Us</a></li>
					  </ul>
					</div><!-- /.navbar-collapse -->
				</nav>
			</div>
			
			<div class="banner-info">
				<div class="col-md-6 banner-info-left">
				
					<h1>You Code...<br>We Manage It For You.</h1>
					
				</div>
			</div>
			<div class="banner-info">
				<div class="col-md-6 banner-info-left">
				
					<div class="more">
						<a  class="btn btn-lg" href="repolist.php">Browse Our Repo  :)</a>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- //banner -->

<!-- Modal -->
<div class="modal fade bs-modal-sm" id="myModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
        <br>
        <div class="bs-example bs-example-tabs">
            <ul id="myTab" class="nav nav-tabs">
              <li class="active"><a href="#signin" data-toggle="tab">Sign In</a></li>
              <li class=""><a href="#signup" data-toggle="tab">Register</a></li>
            </ul>
        </div>
      <div class="modal-body">
        <div id="myTabContent" class="tab-content">
        <div class="tab-pane fade active in" id="signin">
            <!-- Sign In Form -->
            <!-- Text input-->
            <div class="control-group">
              <label class="control-label" for="userid">Alias:</label>
              <div class="controls">
                <input required="" id="userid" name="userid" type="text" class="form-control" placeholder="Enter Username" class="input-medium" required="">
              </div>
            </div>

            <!-- Password input-->
            <div class="control-group">
              <label class="control-label" for="passwordinput">Password:</label>
              <div class="controls">
                <input required="" id="passwordinput" name="passwordinput" class="form-control" type="password" placeholder="Enter Password" class="input-medium">
              </div>
            </div>

            <!-- Multiple Checkboxes (inline) -->
            

            <!-- Button -->
            <div class="control-group">
              <label class="control-label" for="signin"></label>
              <div class="controls">
                <button onclick="signin()" style="float: left" id="signin" name="signin" class="btn btn-success">Sign In</button>
				<div id="errorlogin" style="color:red;float: right"> </div>
			  </div>
            </div>
            
        </div>
        <div class="tab-pane fade" id="signup">
            
			<!-- Sign Up Form -->
            <!-- Text input-->

            <!-- Text input-->
            <div class="control-group">
              <label class="control-label" for="userid">Username:</label>
              <div class="controls">
                <input id="newuserid" name="newuserid" class="form-control" type="text" placeholder="Enter Username" class="input-large" required="" onchange="checkuserexists(value)">
              </div>
            </div>
            
            <!-- Password input-->
            <div class="control-group">
              <label class="control-label" for="password">Password:</label>
              <div class="controls">
                <input id="password" name="password" class="form-control" type="password" placeholder="Enter Password" class="input-large" required="">
    
              </div>
            </div>
            
            <!-- Button -->
            <div class="control-group">
              <label class="control-label" for="confirmsignup"></label>
              <div class="controls">
                <button id="confirmsignup" onclick="signup()" name="confirmsignup" class="btn btn-success">Sign Up</button>
				<div id="errorsignup" style="color:red;float: right"> </div>
              </div>
            </div>
            
      </div>
    </div>
      </div>
      <div class="modal-footer">
      <center>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </center>
      </div>
    </div>
  </div>
  </div>
	<div class="footer">
		<div class="container">
			<div class="footer-row">
				<div class="col-md-3 footer-grids">
					<h1><a href="index.php">Project Hub</a></h1>
					
					<p><a href="mailto:support@BookKart.com">help@ProjectHub.com</a></p>
					<p>+9180 9847 4321</p>
					<div class="col-md-6 banner-info-left">
				
					<ul>
						<li><a href="#" class="twitter"></a></li>
						<li><a href="#" class="g"></a></li>
						<li><a href="#" class="v"></a></li>
						<li><a href="#" class="dribble"></a></li>
					</ul>
				</div>
				</div>
				<div class="col-md-3 footer-grids">
					<h3>Navigation</h3>					
					<ul>
						<li><a href="index.php">Home</a></li>
						<li><a href="contact.php">Contact Us</a></li>
					</ul>
				</div>
				<div class="col-md-3 footer-grids">	
					<h3>Newsletter</h3>
					<p>It was popularised in the 1960s <p>
				</div>
				<div class="clearfix"> </div>
			</div>
		</div>
	</div>
	<div class="footer-bottom">
		<div class="container">		
			<p>Copyright © 2017 Web Technologies . All rights reserved | Design by <a href="index.php">Project Hub</a></p>					
		</div>
	</div>
<!--//footer-->	
<!-- for bootstrap working -->
		<script src="js/bootstrap.js"> </script>
<!-- //for bootstrap working -->
</body>
</html>