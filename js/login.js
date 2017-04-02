function signin(){
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			userlist=xhr.responseText.split(';');
			var flag=false;
			for(i=0;i<userlist.length;i++){
				var user=document.getElementById("userid").value;
				var passwd=document.getElementById("passwordinput").value;
				if(user==userlist[i].split(':')[0] && passwd==userlist[i].split(':')[1]){
					sessionStorage.setItem("user", user);
					flag=true;
					break;
				}
			}
			if(flag)
				window.location.href = 'home.php';
			else
				document.getElementById("errorlogin").innerHTML="Invalid Credentials";
		}
	};
	xhr.open("GET","data/users.txt",true );
	xhr.send();
}

function signup(){
	var user=document.getElementById("newuserid").value;
	var passwd=document.getElementById("password").value;
	var xhr=new XMLHttpRequest();
	xhr.open("GET","scripts/register.php?register="+user+":"+passwd,true );
	xhr.send();
	sessionStorage.setItem("user", user);
	window.location.href= 'home.php';	
}

function checkuserexists(user){
	$("#errorsignup").html("");
	var xhr=new XMLHttpRequest();
	xhr.open("GET","scripts/checkuser.php?username="+user,true);
	xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			if(this.responseText=="true"){
				$("#errorsignup").html("User exists");
				$("#confirmsignup").click(null);
			}
			else
				$("#confirmsignup").click(signup);
		}
	};
	xhr.send();
}