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

function fillTable(){
	var path = getUrlVars()["repo"];
	var repoheading=document.getElementById("repoheading");
	repoheading.innerHTML=path;	
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			filelist=xhr.responseText.split(';');
			var repocontent=document.getElementById("repocontent");
			for(i=0;i<filelist.length;i++){
				var xhr1=new XMLHttpRequest();
				var temppath=filelist[i];
				sessionStorage.setItem("filepath",filelist[i]);
				xhr1.onreadystatechange=function(){
					if(xhr1.readyState==4 && xhr1.status==200){
						var row=document.createElement("tr");
						row.innerHTML="<td><a href='"+"editor/repository/"+path+"/"+sessionStorage["filepath"]+"' download>"+sessionStorage["filepath"]+"</a></td><td>"+xhr1.getResponseHeader("Content-Length")+"</td>";
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
}
