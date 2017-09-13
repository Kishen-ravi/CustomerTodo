fname="";
lname = "";
email = "";
mobile = "";
customer = [];
function validateEmail(email) 
{
	var re = /^\w+([\.-]?\w+)*@(\w{2,9})+(\.\w{2,3})*(\.\w{2,3})+$/;
	return re.test(email);
}

function addcust() 
{
	fname = document.getElementById('customerNewName').value.trim();
	fname1 = document.getElementById("customerNewName");
	lname = document.getElementById('customerNewLastName').value.trim();
	email = document.getElementById('customerNewEmail').value.trim();
	mobile = document.getElementById('customerNewMobile').value.trim();
	custId = "custId" + Math.random().toString(16).slice(2);
	if(fname == "")
    {
		fname1.style.backgroundColor = "red";
		fname1.focus();
		alert("enter something!!!");
		return false;
    }
	else
    {
		if(email.length!=0 && email!= ""){
			var a = validateEmail(email);
		    if (a == false) {
		      console.log(email);
		      document.getElementById("customerNewEmail").style.backgroundColor = "red";
		      alert("Not a valid e-mail address");
		      fname1.style.backgroundColor = "";
		      return false;
		}
		}
		if(isNaN(mobile)){
			document.getElementById("customerNewMobile").style.backgroundColor = "red";
		      alert("Not a valid number");
		      fname1.style.backgroundColor = "";
		      document.getElementById("customerNewEmail").style.backgroundColor ="";
		      return false;
		}
		fname1.style.backgroundColor = "";
		pushcust(custId,fname,lname,email,mobile);
	    fname1.value = "";
	    createCustList(custId, fname);
		    
	
    }
	document.getElementById('customerPopup').style.display='none';
	document.getElementById('pageBlockNewCustomer').style.display='none';
	document.getElementById('customerNewName').value= "";
	document.getElementById('customerNewLastName').value="";
	document.getElementById('customerNewEmail').value="";
	document.getElementById('customerNewMobile').value="";
    return false;
}
function pushcust(id,fname,lname,email,mobile)
{
	var person1 = {};
	person1.id=id;
	person1.fname = fname;
	person1.lname = lname;
	person1.email = email;
  	person1.mobile = mobile;
  	customer.push(person1);
  	localStorage.setItem(id, JSON.stringify(person1));
  	console.log(JSON.stringify(customer));

}

function createCustList(id,fname,lname,email,mobile)
{
	sid = "s" + id;
	tid = "t" + id;
	ui = "us" + id;
	var node = document.createElement("LI");
	node.class = "";
	node.id = sid;
	var para = document.createElement("label");
	para.id = id;
	var textnode = document.createTextNode(fname);
	para.appendChild(textnode);
	var close = document.createElement("BUTTON");
	close.id = id;
	close.className = "removeCust";
	close.innerText	= 'X';
	node.appendChild(para);
	node.appendChild(close);
	para.addEventListener('click',showDetail);
	close.addEventListener('click',removeCust);
	document.getElementById("custList").appendChild(node);
}

function showDetail(){
	var id1 = this.getAttribute('id');
	console.log(id1);
	var id2 = document.getElementById(id1).innerHTML;
	console.log(id2);
	for (i = 0; i < localStorage.length; i++)   
	{	
	if(localStorage.key(i) == id1){
		var cust = localStorage.getItem(localStorage.key(i));
		var custList = JSON.parse(cust);
		console.log(cust);
		var name = document.getElementById("custFName");
		name.value = custList.fname;
		name.className = "custdetails "+ id1;
		var lastname = document.getElementById("custLName");	
		lastname.value = custList.lname;
		lastname.className = "custdetails "+ id1;
		var cmail = document.getElementById("custEmail");
		cmail.value = custList.email;
		cmail.className = "custdetails "+ id1;
		var cmobile = document.getElementById("custPhone");
		cmobile.value = custList.mobile;
		cmobile.className = "custdetails "+ id1;
		var cupdate = document.getElementById("updateCust");
		cupdate.className = "details1 new-gray-btn1 "+ id1;
		console.log(custId);
	}
	if(localStorage.key(i) == "s"+id1){
	    var todo1 = localStorage.getItem(localStorage.key(i));
	    var tk = JSON.parse(todo1);
	    console.log(tk[0].note);
	    var uid = localStorage.key(i);
	    if(tk[0].removed !== "true")
	    {
	    	event(uid,tk[0].note);
	    	if(tk[0].checked === "true")
	    	{
	    		document.getElementById("s"+tk[0].id).className = "checked";
	    	}
	    }

	}
	
	}
	var x=document.getElementsByClassName("Custdetails1");
	x[0].style.display = 'block';
	x[1].style.display = 'block';
	
}

function updateCust()
{
	var cusid = document.getElementById("custFName").getAttribute('class');
	
	cusid = cusid.split(" ");
	console.log(cusid);
	fname1 = document.getElementById('custFName').value.trim();
	lname1 = document.getElementById('custLName').value.trim();
	email1 = document.getElementById('custEmail').value.trim();
	mobile1 = document.getElementById('custPhone').value.trim();
	if(fname1 == "")
    {
		document.getElementById('custFName').style.backgroundColor = "red";
		document.getElementById('custFName').focus();
		alert("enter something!!!");
		return false;
    }
	else
    {
		if(email1.length!=0 && email1!= ""){
			var a = validateEmail(email1);
		    if (a == false) {
		      console.log(email1);
		      document.getElementById("custEmail").style.backgroundColor = "red";
		      alert("Not a valid e-mail address");
		      document.getElementById('custEmail').focus();
		      document.getElementById('custFName').style.backgroundColor = "";
		      return false;
		}
		}
		if(isNaN(mobile1)){
			document.getElementById("custPhone").style.backgroundColor = "red";
		      alert("Not a valid number");
		      document.getElementById('custPhone').focus();
		      document.getElementById('custFName').style.backgroundColor = "";
		      document.getElementById('custEmail').style.backgroundColor = "";
		      return false;
		}
		document.getElementById('custFName').style.backgroundColor = "";
		document.getElementById('custEmail').style.backgroundColor = "";
		document.getElementById('custPhone').style.backgroundColor = "";
		if(cusid[1] == custId)
		{
			pushcust(custId,fname1,lname1,email1,mobile1);
		}
    }
	
}

//var main1 = (function() 
//{
//	var buttons = document.getElementsByClassName('removeCust');
//	for (var i=0; i < buttons.length; i++) 
//	{
//		buttons[i].addEventListener('click', removeCust);
//	}
//})();

function removeCust() 
{
    var id = this.getAttribute('id');
    var sid = "s" + id;
    document.getElementById(sid).style.display = 'none';
    return false;
}