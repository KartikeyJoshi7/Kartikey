
var todoArray = [];
var count_up = 1;
var count_check =1;

window.onload = function() {
    var d=new Date();
	var y=d.getYear();
	if (y < 1000)
 		y+=1900;
	var m=d.getMonth();
	var daym=d.getDate();
	if (daym<10)
 		daym="0"+daym;
 	var mon=new Array("January", "February", "March", "April", "May", "June", "July",  "August", "September", "October", "November", "December");
	document.getElementById('date').innerHTML = mon[m]+" "+daym+", "+y;
  $.get('/json',
    display
  );
};

function addTodo() {
	var todo = {
		text:"",
		todo_checked : 0,
		todo_count : 0

	};

	todo.text = document.getElementById('myTodo').value;

  todo.todo_count = todoArray.length+1;
	todoArray.push(todo);


  console.log("start add")
  console.log('initial array',todoArray);

  $.post('./json',{
    arr: JSON.stringify(todoArray)
  },
  display
  );

}

function moveDown() {
	  console.log('down');
	  node = this.parentNode;
		var i = 0;
		var temp = node;
		while((temp = temp.previousSibling) != null)
			i++;

  	var k = todoArray[i];
	  todoArray[i] = todoArray[i+1];
	  todoArray[i+1] = k;

  $.post('/json',{
     arr: JSON.stringify(todoArray)
    },
    display
  );

}

function uplift(){
	  node = this.parentNode;
		var i = 0;
		var temp = node;
		while((temp = temp.previousSibling) != null)
			i++;

 	var k = todoArray[i-1];
	todoArray[i-1] = todoArray[i];
	todoArray[i] = k;
  $.post('./json',{
    arr: JSON.stringify(todoArray)
  },
  display
  );

}

function display(data) {

 document.getElementById('myarea').innerHTML = "";
 if(data == "")
   todoArray = [];
 else{
   todoArray = JSON.parse(data);
 }

 console.log(todoArray.length);

 var counter = document.getElementById('counter');
 counter.innerText = todoArray.length;

 var ul = document.getElementById('myarea');

 if(todoArray.length == 1){
   var li = document.createElement("li");
   li.setAttribute("class", "list-group-item");

   var check = document.createElement("input");     // add checkbox
   check.setAttribute("type","checkbox");
   check.setAttribute("id", "checkbox");
   var tick = todoArray[0].todo_checked;
   if(tick == '0')
     check.checked = false;
   else
     check.checked = true;

   check.addEventListener('click', checker);
   li.appendChild(check);

   var textnode = document.createElement("span");   //add text node
   textnode.setAttribute('id','textnode');
   textnode.setAttribute('style','text-transform: capitalize');
   textnode.innerHTML = " &nbsp&nbsp&nbsp&nbsp" +todoArray[0].text+" ";

      if(tick == '1')
 		    textnode.setAttribute("style","text-decoration:line-through");
 	    else
 		    textnode.setAttribute("style","text-decoration:none");

    li.appendChild(textnode);
    ul.appendChild(li);

  }

 else{

	for( var i = 0; i < todoArray.length; i++){

    var li = document.createElement("li");
    li.setAttribute("class", "list-group-item");

    var check = document.createElement("input");     // add checkbox
    check.setAttribute("type","checkbox");
    check.setAttribute("id", "checkbox");
    var tick = todoArray[i].todo_checked;
    if(tick == '0')
      check.checked = false;
    else
      check.checked = true;

    check.addEventListener('click', checker);
    li.appendChild(check);

    var textnode = document.createElement("span");   //add text node
    textnode.setAttribute('id','textnode');
    textnode.setAttribute('style','text-transform: capitalize');
    textnode.innerHTML = " &nbsp&nbsp&nbsp&nbsp" +todoArray[i].text+" ";

       if(tick == '1')
          textnode.setAttribute("style","text-decoration:line-through");
        else
          textnode.setAttribute("style","text-decoration:none");

     li.appendChild(textnode);

		if(i==0){										//First Element
			var down_button = document.createElement("i");
			down_button.setAttribute('class',"fas fa-arrow-circle-down fa-lg");
			down_button.setAttribute('id', 'down_button');
			down_button.addEventListener("click", moveDown);
			li.appendChild(down_button);
		}

		else if(i == (todoArray.length - 1)){     //Last element
				var up_button = document.createElement("i");// UP button
				up_button.setAttribute('class',"fas fa-arrow-circle-up fa-lg");
				up_button.setAttribute('id', 'up_button');

				up_button.addEventListener("click", uplift);
				li.appendChild(up_button);
		    }

    else{												// Intermediate element
          var up_button = document.createElement("i");// UP button
			    up_button.setAttribute('class',"fas fa-arrow-circle-up fa-lg");
          up_button.setAttribute('id', 'up_button');
			    up_button.addEventListener("click", uplift);
			    li.appendChild(up_button);

			    var down_button = document.createElement("i");
			    down_button.setAttribute('class',"fas fa-arrow-circle-down fa-lg");
			    down_button.setAttribute('id', 'down_button');
			    down_button.addEventListener("click", moveDown);
			    li.appendChild(down_button);
    	  }
        ul.appendChild(li);
	  }
  }
}

function checker(){
	console.log('hi');
	node = this.parentNode;

		var i = 0;
		var temp = node;
		while((temp = temp.previousSibling) != null)
			i++;

	console.log(i);
  if(todoArray[i].todo_checked == "0")
	  todoArray[i].todo_checked = "1";
  else if(todoArray[i].todo_checked == "1")
    todoArray[i].todo_checked = "0";

    $.post('./json',{
      arr: JSON.stringify(todoArray)
    },
    display
    );

//	console.log('hi');
}


//Extra Buttons
function deleter() {

	for(var i = 0; i < todoArray.length; i++){
		if(todoArray[i].todo_checked == true){
			todoArray.splice(i,1);
			i--;
		}
	}
	var counter = document.getElementById('counter');
	counter.innerText = todoArray.length;

  $.post('./json',{
    arr: JSON.stringify(todoArray)
  },
  display
  );

}

function sorter() {
	var checkArray = [];
	var uncheckArray = [];
	for(var i = 0; i < todoArray.length; i++){
		if(todoArray[i].todo_checked == true)
			checkArray.push(todoArray[i]);
		else
			uncheckArray.push(todoArray[i]);
	}
	var k = 0;
	for(var i = 0; i < uncheckArray.length; i++){
		todoArray[k] = uncheckArray[i];
		k++;
    }

    for(var i = 0; i < checkArray.length; i++){
		todoArray[k] = checkArray[i];
		k++;
    }
   // localStorage.setItem('todolist', JSON.stringify(todoArray));
   $.post('./json',{
     arr: JSON.stringify(todoArray)
   },
   display
   );

}
