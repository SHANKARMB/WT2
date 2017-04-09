sse=null;
url1=null;

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	vars[key] = value;
	});
	return vars;
}

function editChange()
{
	if(sse)	sse.close();

	vars=getUrlVars();
	url1=vars["repo"]+'/'+vars["file"];

	$.ajax({
		url:"http://localhost:8080/"+url1,
		type:"GET",
		success:function(res){
			$("#repoedit-textarea").val(res);
		}
	});

	sse=new EventSource("http://localhost:8090/"+url1);
	sse.addEventListener("message",function(e){
		$("#repoedit-textarea").data("wysihtml5").editor.setValue(e.data);
	});

}

function updatefile()
{
	var contents=$("#repoedit-textarea").data("wysihtml5").editor.getValue();
	$.ajax({
		url:"http://localhost:8090/"+url1,
		type:"POST",
		data:{'data':contents}
	});
}

function fillTable(){
	path = getUrlVars()["repo"];
	
	var xhr3=new XMLHttpRequest();
	xhr3.onreadystatechange=function(){
		if(xhr3.readyState==4 && xhr3.status==200){
			repolist=xhr3.responseText.split(';');
			var membercontent=document.getElementById("memberlist");
			for(i=0;i<repolist.length;i++){
				if(repolist[i].split(':')[1]==path){
					var row=document.createElement("tr");
					row.innerHTML="<td style='text-align:center'>"+repolist[i].split(':')[0]+"</td>";
					membercontent.appendChild(row);
					break;
				}
			}
		}
	};
	xhr3.open("GET","editor/repository/repolist.txt",true);
	xhr3.send();
	
	var xhr2=new XMLHttpRequest();
	xhr2.onreadystatechange=function(){
		if(xhr2.readyState==4 && xhr2.status==200){
			memberlist=xhr2.responseText.split(';');
			var membercontent=document.getElementById("memberlist");
			for(i=0;i<memberlist.length;i++){
				if(memberlist[i]=="")
					break;
				var row=document.createElement("tr");
				row.innerHTML="<td style='text-align:center'>"+memberlist[i]+"</td>";
				membercontent.appendChild(row);
			}
		}
	};
	xhr2.open("GET","editor/repository/"+path+"-Auth.txt",true);
	xhr2.send();
}