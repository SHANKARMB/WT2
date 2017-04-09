(function(){
    'use strict';
	var $ = jQuery;
	$.fn.extend({
		filterTable: function(){
			return this.each(function(){
				$(this).on('keyup', function(e){
					$('.filterTable_no_results').remove();
					var $this = $(this), 
                        search = $this.val().toLowerCase(), 
                        target = $this.attr('data-filters'), 
                        $target = $(target), 
                        $rows = $target.find('tbody tr');
                        
					if(search == '') {
						$rows.show(); 
					} else {
						$rows.each(function(){
							var $this = $(this);
							$this.text().toLowerCase().indexOf(search) === -1 ? $this.hide() : $this.show();
						})
						if($target.find('tbody tr:visible').size() === 0) {
							var col_count = $target.find('tr').first().find('td').size();
							var no_results = $('<tr class="filterTable_no_results"><td colspan="'+col_count+'">No results found</td></tr>')
							$target.find('tbody').append(no_results);
						}
					}
				});
			});
		}
	});
	$('[data-action="filter"]').filterTable();
})(jQuery);

$(function(){
    // attach table filter plugin to inputs
	$('[data-action="filter"]').filterTable();
	
	$('.container').on('click', '.panel-heading span.filter', function(e){
		var $this = $(this), 
			$panel = $this.parents('.panel');
		
		$panel.find('.panel-body').slideToggle();
		if($this.css('display') != 'none') {
			$panel.find('.panel-body input').focus();
		}
	});
	$('[data-toggle="tooltip"]').tooltip();
})

function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}

function editFile(id)
{
	vars=getUrlVars();
	repo=vars["repo"];
	file=$('#'+id).html();
	window.location='repoedit.html?repo='+repo+'&file='+file,'_blank';
}

function fillTable(){
	path = getUrlVars()["repo"];
	var repoheading=document.getElementById("reponame");
	repoheading.innerHTML=path;	
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			filelist=xhr.responseText.split(';');
			var repocontent=document.getElementById("repolist");
			for(i=0;i<filelist.length;i++){
				if(filelist[i]=="")
					break;
				var xhr1=new XMLHttpRequest();
				var temppath=filelist[i];
				sessionStorage.setItem("filepath",filelist[i]);
				xhr1.onreadystatechange=function(){
					if(xhr1.readyState==4 && xhr1.status==200){
						var row=document.createElement("tr");
						row.innerHTML="<td><button class='btn btn-default' onclick='editFile("+i+")''><em class='fa fa-pencil'></em></button><button onclick=fileDelete('"+sessionStorage["filepath"]+"') class='btn btn-danger'><em class='fa fa-trash'></em></button></td><td>"+xhr1.getResponseHeader("Last-Modified")+"</td><td id="+i+">"+sessionStorage["filepath"]+"</td>";
						repocontent.appendChild(row);
					}
				}
				xhr1.open("GET","editor/repository/"+path+"/"+filelist[i],false);
				xhr1.send();
			}
		}
	};
	xhr.open("GET","editor/repository/"+path+".txt",true);
	xhr.send();
	
	var xhr3=new XMLHttpRequest();
	xhr3.onreadystatechange=function(){
		if(xhr3.readyState==4 && xhr3.status==200){
			repolist=xhr3.responseText.split(';');
			var membercontent=document.getElementById("memberlist");
			for(i=0;i<repolist.length;i++){
				if(repolist[i].split(':')[1]==path){
					var row=document.createElement("tr");
					row.innerHTML="<td colspan='2' style='text-align:center'>"+repolist[i].split(':')[0]+"</td>";
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
				row.innerHTML="<td><button onclick=userDeauth('"+memberlist[i]+"') class='btn btn-danger'><em class='fa fa-times'></em></button></td><td style='text-align:left'>"+memberlist[i]+"</td>";
				membercontent.appendChild(row);
			}
		}
	};
	xhr2.open("GET","editor/repository/"+path+"-Auth.txt",true);
	xhr2.send();
	
	var xhr4=new XMLHttpRequest();
	xhr4.onreadystatechange=function(){
		if(xhr4.readyState==4 && xhr4.status==200){
			var temp=xhr4.responseText.split(';');
			newmember=document.getElementById("newmember");
			newmember.innerHTML="";
			newoption=document.createElement("option");
			newoption.innerHTML="Add New Member";
			newoption.value=null;
			newmember.appendChild(newoption);
			for(i=0;i<temp.length;i++){
				newoption=document.createElement("option");
				newoption.innerHTML=temp[i];
				newoption.value=temp[i];
				newmember.appendChild(newoption);
			}
		}
	};
	xhr4.open("GET","scripts/fillmember.php?repo="+path+"/"+sessionStorage["user"],true);
	xhr4.send();
}

function newFile(){
	if(document.getElementById("filename").value!=""){
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4 && xhr.status==200){
				document.getElementById("repolist").innerHTML="";
				document.getElementById("memberlist").innerHTML="";
				window.setTimeout(fillTable,200);
				document.getElementById("filename").value=null;
				$('#newfilebtn').unbind('click');
			}
		};
		xhr.open("GET","scripts/newfile.php?filename="+path+":"+document.getElementById("filename").value,true);
		xhr.send();
	}
}

function checkfileexists(file){
	var xhr=new XMLHttpRequest();
	xhr.open("GET","scripts/checkfile.php?filename="+path+":"+file,true);
	xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			if(this.responseText=="true"){
				$('#newfilebtn').unbind('click');
			}
			else{
				$("#newfilebtn").click(newFile);
			}
		}
	};
	xhr.send();
}

function fileDelete(file){
	im=document.createElement("img");
	im.onload=success;
	im.src="scripts/deletefile.php?filename="+path+"/"+file;
}

function success(){
	document.getElementById("repolist").innerHTML="";
	document.getElementById("memberlist").innerHTML="";
	fillTable();
}

function userDeauth(user){
	im=document.createElement("img");
	im.onload=success;
	im.src="scripts/userdeauth.php?username="+path+"/"+user;
}

function userAuth(user){
	im=document.createElement("img");
	im.onload=success;
	im.src="scripts/userauth.php?username="+path+"/"+user;
}