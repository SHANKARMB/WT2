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
					localStorage.setItem("user", user);
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
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			userlist=xhr.responseText.split(';');
			var flag=false;
			for(i=0;i<userlist.length;i++){
				var user=document.getElementById("newuserid").value;
				if(user==userlist[i].split(':')[0]){
					flag=true;
					break;
				}
			}
			if(flag)
				document.getElementById("errorsignup").innerHTML="User exists";
			else {
				var user=document.getElementById("newuserid").value;
				var passwd=document.getElementById("password").value;
				var xhr1=new XMLHttpRequest();
				xhr.open("GET","scripts/register.php?register="+user+":"+passwd,true );
				xhr.send();
				localStorage.setItem("user", user);
				window.location.href= 'home.php';
			}
		}
	};
	xhr.open("GET","data/users.txt",true );
	xhr.send();
}

function checkuserexists(user){
	$("#errorsignup").html("");
	var xhr=new XMLHttpRequest();
	xhr.open("GET","scripts/checkuser.php?username="+user,true);
	xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			if(this.responseText=="true")
				$("#errorsignup").html("User exists");
		}
	};
	xhr.send();
}