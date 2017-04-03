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
	var count=0;
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			list=xhr.responseText.split(';');
			for(i=0;i<list.length;i++){
				url1="data/"+list[i].split(':')[1]+"-Auth.txt";
				var xhr1=new XMLHttpRequest();
				xhr1.onreadystatechange=function(){
					if(this.readyState==4 && this.status==200)
						updateTable(list,i,this.responseText,url1);
				};
				xhr1.open("GET",url1,false);
				xhr1.send();
			}
		}
	};
	xhr.open("GET","data/repolist.txt",true);
	xhr.send();
}

// function newRequest(){
// 	xhr1=new XMLHttpRequest();
// 	xhr1.onreadystatechange=function(){
// 								updateTable(list,i);
// 							}
// 	xhr1.open("GET","data/"+list[i].split(':')[1]+"-Auth.txt",true);
// 	xhr1.send();
// }

function updateTable(list,i,resp,url1){
	authuser=resp.split(';');
	for(j=0;j<authuser.length;j++)
	{
		if(sessionStorage["user"]==authuser[j])
		{
			var repotable=document.getElementById("repolist");
			var row=document.createElement("tr");
			row.innerHTML="<td>"+(j)+"</td><td>"+list[i].split(':')[0]+"</td><td><a href='authview.php?repo="+list[i].split(':')[1]+"'>"+list[i].split(':')[1]+"</a></td>";
			repotable.appendChild(row);
		}
	}
}