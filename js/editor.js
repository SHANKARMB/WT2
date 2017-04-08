sse=null;
url1=null;

function editChange()
{
	if(sse)	sse.close();

	url1=$("#fname").val();
	$.ajax({
		url:"http://localhost:8080/"+url1,
		type:"GET",
		success:function(res){
			$("#doc").val(res);
		}
	});

	sse=new EventSource("http://localhost:8090/"+url1);
	sse.addEventListener("message",function(e){
		$("#doc").val(e.data);
	});

}


function updatefile()
{
	var contents=$("#doc").val();
	$.ajax({
		url:"http://localhost:8090/"+url1,
		type:"POST",
		data:{'data':contents}
	});
}