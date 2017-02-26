var books;
var i=0;
var maxBooks=10;

function bookCategoryUpdate(){
	var xhr=new XMLHttpRequest();
	xhr.open('GET','books/category',true);
	xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			var sel=document.getElementById('bprice_category_dropdown');
			sel.innerHTML='';
			var categoryArr=JSON.parse(this.responseText)["categories"];
			for(var x in categoryArr){
				var opt=document.createElement("option");
				opt.value=categoryArr[x]; opt.text=categoryArr[x];
				sel.appendChild(opt);
			}
			bPriceDropdownChange();
		}
	};
	xhr.send();

	xhr=new XMLHttpRequest();
	xhr.open('GET','categories/category',true);
	xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			var sel=document.getElementById('category_dropdown');
			sel.innerHTML='';
			var categoryArr=JSON.parse(this.responseText)["categories"];
			for(var x in categoryArr){
				var opt=document.createElement("option");
				opt.value=categoryArr[x]; opt.text=categoryArr[x];
				sel.appendChild(opt);
			}
		}
	};
	xhr.send();
}

function searchCategoryUpdate(){

	xhr=new XMLHttpRequest();
	xhr.open('GET','categories/category',true);
	xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			var sel=document.getElementById('category_dropdown');
			sel.innerHTML='';
			var categoryArr=JSON.parse(this.responseText)["categories"];
			for(var x in categoryArr){
				var opt=document.createElement("option");
				opt.value=categoryArr[x]; opt.text=categoryArr[x];
				sel.appendChild(opt);
			}
		}
	};
	xhr.send();

}

function addCategory(){
	var catName=document.getElementById('category_name').value;
	var xhr=new XMLHttpRequest();
	xhr.open('POST','categories/category/'+catName,true);
	xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			//alert(this.responseText);
			document.getElementById('category_status').innerHTML='Category Added';
			bookCategoryUpdate();
		}
		else if(this.readyState==4 && this.status!='200'){
			document.getElementById('category_status').innerHTML='Failed to add category[Status='+this.status+']';
		}
	};
	xhr.send();
}

function removeCategory(){
	var catName=document.getElementById('category_name').value;
	var xhr=new XMLHttpRequest();
	xhr.open('DELETE','categories/category/'+catName,true);
	xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			//alert(this.responseText);
			document.getElementById('category_status').innerHTML='Category Removed';
			bookCategoryUpdate();
		}
		else if(this.readyState==4 && this.status!='200'){
			document.getElementById('category_status').innerHTML='Failed to remove category[Status='+this.status+']';
		}
	};
	xhr.send();
}

function bPriceDropdownChange(){
	var sel12=document.getElementById('bprice_category_dropdown');
	var category=sel12.options[sel12.selectedIndex].text;
	var xhr=new XMLHttpRequest();
	xhr.open('GET','books/category/'+category,true);
	xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			books=JSON.parse(this.responseText)["books"];
			var sel=document.getElementById('book_dropdown');
			sel.innerHTML='';
			//alert(this.responseText);
			for(var x in books){
				var opt=document.createElement("option");
				opt.value=books[x].bid; opt.text=books[x].name;
				sel.appendChild(opt);
			}
		}
	};
	xhr.send();
}

function bookPriceChange(){
	var xhr=new XMLHttpRequest();
	drpdwn=document.getElementById('book_dropdown');
	bid=drpdwn.options[drpdwn.selectedIndex].value;
	xhr.open('GET','books/bid/'+bid,true);
	xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			var b=JSON.parse(this.responseText)['books'][0];
			if(b){
				b.price=document.getElementById('book_new_price').value;
				xhr=new XMLHttpRequest();
				xhr.open('PUT','/BookKart/books/bid/'+b.bid+'/price/'+b.price,true);
				xhr.onreadystatechange=function(){
					if(this.readyState==4 && this.status==200){
						//alert(this.responseText);
						document.getElementById('book_price_status').innerHTML='Price Update Successful';
					}
					else if(this.readyState==4){
						document.getElementById('book_price_status').innerHTML='Price Update Failed';
					}
				};
				xhr.send(JSON.stringify(b));
			}
			else{
				//Error Message
				document.getElementById('book_price_status').innerHTML='Price Update Failed';
			}
		}
	};
	xhr.send();
}

function loadBookJson(){
	var sel12=document.getElementById('category_dropdown');
	var category=sel12.options[sel12.selectedIndex].text;
	var xhr=new XMLHttpRequest();
	xhr.open('GET','books/category/'+category,true);
	xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			
			books=JSON.parse(this.responseText)["books"];
			//alert(this.responseText);
			fillBooks();
		}
	};
	xhr.send();
}

function getBooks(){
	i=0;
	loadBookJson();	
}

function nextBookCount(){
	if(i<books.length){
		i=i+maxBooks;
		fillBooks();	
	}
	
}

function previousBookCount(){
	if(i>0){
		i=i-maxBooks;
		fillBooks();	
	}
}

function fillBooks(){
			var booklist=document.createElement('table');
			booklist.id='booklist';
			booklist.width='100%';
			var inner="";
			var outerdiv=document.getElementById('outerdiv');
			outerdiv.innerHTML='';
			for(c=0;c<maxBooks && i+c<books.length;c++){
				var tabletr=document.createElement('tr');
				var tabletd=document.createElement('td');
				tabletr.innerHTML+='<td>'+books[i+c].name+'</td><td>'+books[i+c].price+'</td><td>'+books[i+c].quantity+'</td><td>';
				selectbook=document.createElement('input');
				selectbook.type='button';
				selectbook.id=i+c;
				selectbook.value='SELECT';
				selectbook.onclick=decreaseBookCount;
				selectbook.style="outline: none;padding: 12px 0;width: 100px;border: none;background: #803F5F;font-size: 16px;color: #fff;text-align: center;transition: 0.5s all;-webkit-transition: 0.5s all;-o-transition: 0.5s all;-moz-transition: 0.5s all;-ms-transition: 0.5s all;";
				tabletd.appendChild(selectbook);
				tabletr.appendChild(tabletd);
				booklist.appendChild(tabletr);
			}
			outerdiv.appendChild(booklist);
			if(i+c<books.length){
				selectbook=document.createElement('input');
				selectbook.type='button';
				selectbook.id=books[i].bid;
				selectbook.value='NEXT';
				selectbook.onclick=nextBookCount;
				selectbook.style="outline: none;padding: 12px 0;width: 100px;border: none;background: #803F5F;font-size: 16px;color: #fff;text-align: center;transition: 0.5s all;-webkit-transition: 0.5s all;-o-transition: 0.5s all;-moz-transition: 0.5s all;-ms-transition: 0.5s all;";
				outerdiv.appendChild(selectbook);
			}
			if(i-c>=0){
				selectbook=document.createElement('input');
				selectbook.type='button';
				selectbook.id=books[i].bid;
				selectbook.value='PREVIOUS';
				selectbook.onclick=previousBookCount;
				selectbook.style="outline: none;padding: 12px 0;width: 100px;border: none;background: #803F5F;font-size: 16px;color: #fff;text-align: center;transition: 0.5s all;-webkit-transition: 0.5s all;-o-transition: 0.5s all;-moz-transition: 0.5s all;-ms-transition: 0.5s all;";
				outerdiv.appendChild(selectbook);
			}
}
function decreaseBookCount(){
	bookjson={
		'bid':books[this.id]['bid'],
		'quantity': books[this.id]['quantity']-1
	}
	if(bookjson['quantity']==0){
		var xhr=new XMLHttpRequest();
		xhr.open('DELETE','/BookKart/books/bid/'+bookjson['bid'],true);
		xhr.onreadystatechange=function(){
			if(this.readyState==4 && this.status==200){
				loadBookJson();
			}
		};
		xhr.send();
	}
	else{
		var xhr=new XMLHttpRequest();
		xhr.open('PUT','/BookKart/books/bid/'+bookjson['bid']+'/quantity/'+bookjson['quantity'],true);
		xhr.onreadystatechange=function(){
			if(this.readyState==4 && this.status==200){
				loadBookJson();
			}
		};
		xhr.send(JSON.stringify(bookjson));
	}
}

function addBook(){
	drpdwn=document.getElementById('category_dropdown');
	category=drpdwn.options[drpdwn.selectedIndex].value;
	book={
		'name': document.getElementById('book_title').value ,
		'description':document.getElementById('book_desc').value ,
		'price': document.getElementById('book_price').value ,
		'category': category ,
		'quantity': document.getElementById('book_count').value
	};

	var xhr=new XMLHttpRequest();
	xhr.open('POST','books/bid',true);
	xhr.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			document.getElementById('book_add_status').innerHTML='Book Addition Successfull';
			bookCategoryUpdate();
		}
		else if(this.readyState==4 && this.status!=200){
			document.getElementById('book_add_status').innerHTML='Book Addition to Inventory Failed[Status='+this.status+']';
		}
	};
	xhr.send(JSON.stringify(book));

	document.getElementById('book_title').value='';
	document.getElementById('book_desc').value='';
	document.getElementById('book_price').value='';
	document.getElementById('book_count').value='';
}