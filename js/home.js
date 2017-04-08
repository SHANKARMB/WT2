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

function fillTable(){
	count=1;
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var repolist=xhr.responseText.split(';');
			var repotable=document.getElementById("repolist");
			for(i=0;i<repolist.length;i++){
				if(sessionStorage["user"]==repolist[i].split(':')[0]){
					var row=document.createElement("tr");
					row.innerHTML="<td>"+(count++)+"</td><td>"+repolist[i].split(':')[0]+"</td><td><a href='homeview.php?repo="+repolist[i].split(':')[1]+"'>"+repolist[i].split(':')[1]+"</a></td>";
					repotable.appendChild(row);
				}
			}
		}
	};
	xhr.open("GET","data/repolist.txt",true);
	xhr.send();
}

function newRepo(){
	if(document.getElementById("reponame").value!=""){
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4 && xhr.status==200){
				document.getElementById("repolist").innerHTML="";
				fillTable();
				document.getElementById("reponame").value=null;
				$('#newrepobtn').unbind('click');
			}
		};
		xhr.open("GET","scripts/newrepo.php?repo="+sessionStorage["user"]+":"+document.getElementById("reponame").value,true);
		xhr.send();
	}
}

function checkrepoexists(repo){
	var xhr=new XMLHttpRequest();
	xhr.open("GET","scripts/checkrepo.php?repo="+repo,true);
	xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			if(this.responseText=="true"){
				$('#newrepobtn').unbind('click');
			}
			else{
				$("#newrepobtn").click(newRepo);
			}
		}
	};
	xhr.send();
}