/*

	Object

var myCat = {
	"name" : "Meawsalot",
	"species" : "cat",
	"favFood" : "tuna"
}

myCat.name;

*/

/*

	Array

var myFavColor = ["blue", "red", "yellow"];

myFavColor[0];

*/

/*

	JSON

var thePets = [
		{
			"name" : "Meawsalot",
			"species" : "cat",
			"favFood" : "tuna"
		},
		{
			"name" : "Barky",
			"species" : "dog",
			"favFood" : "tuna"
		},
		{
			"name" : "Ser",
			"species" : "horse",
			"favFood" : "tuna"
		}
	];

thePets[1].name;

*/




// The process of sending and receiving data on the fly without a page reload is AJAX = Asynchronus[in the background or not requiring a page refresh] Javascript And XML[data format which is very similar to JSON]
// XML is and was a very popular dataformat BUT now JSON is placing everytime of it's place SO against AJAX we are basically using AJAA = Asynchronus Javascript And JSON
// For the popularity and usability of XML, browser has some tools for it like 'XMLHttpRequest' but for being similarity of XML and JSON all tools for XML can be used for JSON
// Web browser have built in tool named XMLHttpRequest, which establish the connection the URL what we specify than it's let us send and receive data

// eachtime it will load JSON data from different site 
var pageCounter = 1;

// for selecting the HTML animal-info element
var animalContainer = document.getElementById('animal-info');

// for selecting the HTML btn element
var btn = document.getElementById('btn');

// setup a event listener for when the button get clicked
btn.addEventListener('click', function() {

	// create a instance of XMLHttpRequest class for our own use purpose
	var ourRequest  = new XMLHttpRequest();

	// ourRequest.open(arg1, arg2); arg1 Means why ourRequest is open ? to send data : to receive data. To send we use 'POST' or to receive we use 'GET'. arg2 Means with whome we want to connect, I mean URL
	ourRequest.open('GET', 'https://kisorniru.github.io/json-example/animals-'+pageCounter+'.json?rows=1');

	// Now we are specifing what it do after make a connection with URL, I mean when loading
	ourRequest.onload = function() {

		if (ourRequest.status >= 200 && ourRequest.status < 400) {
			// it means we are successfully able to knock the server AND GET it's response

			var dataReceive = ourRequest.responseText;
			// console.log(dataReceive[0]); // By default browser think dataReceive is a long text

			var ourData = JSON.parse(dataReceive);
			// console.log(ourData[0]);

			// for more organize we are separeting our onload activity through a function call
			renderHTML(ourData);
		} else {
			// it means we are successfully able to knock the server BUT NOT GET it's response
			console.log("We connected to the server but it's through an error.");
		}
	};

	// For Error Handeling, I mean how to handale situation when internet is no longer with us [RIP interrnet!!!]
	ourRequest.onerror = function() {
		console.log("Connection Failor");
	};

	// After all sorts of formulation Now we are going to send the request for our desier
	ourRequest.send();

	pageCounter++;
	if (pageCounter > 3) {
		btn.classList.add('hide-me');
	}

});

// this function will perform the others activity of onload work
function renderHTML(data) {
	var htmlString = "";

	for (i = 0; i < data.length; i++) {
		htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";

		for (j = 0; j < data[i].foods.likes.length ; j++) {
			if (j == 0) {
				htmlString += data[i].foods.likes[j];
			} else {
				htmlString += " and " + data[i].foods.likes[j];
			}
		}

		htmlString += " and dislikes ";

		for (k = 0; k < data[i].foods.dislikes.length ; k++) {
			if (k == 0) {
				htmlString += data[i].foods.dislikes[k];
			} else {
				htmlString += " and " + data[i].foods.dislikes[k];
			}
		}

		htmlString += ".</p>";
	}

	animalContainer.insertAdjacentHTML('beforeend', htmlString);
}