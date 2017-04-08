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