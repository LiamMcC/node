var express = require("express");
var app = express();
var http = require('http');
var bodyParser = require("body-parser");
var fs = require('fs');


app.set('view engine', 'jade')
app.set('viewse', "views")

app.use(bodyParser.urlencoded({extended: true}));

var server = http.createServer(app);
var rooms = require("./data/rooms.json");

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));

// GET request to dislay index.html located inside /views folder
app.get('/', function(req, res) {
  console.log('Calling Jade File');
  rooms: rooms
  var JSONformated = JSON.stringify(rooms);
  res.render("page2.jade");
  console.log(rooms);
  
});



// Code to get and list all rooms on the page
app.get('/page2', function(req, res) {
res.render("page2", {
  title: "LiamJson" , 
  rooms: rooms
  
});
  console.log("Rooms Rendered " + rooms);
  
});




// Code to go to create a new room page
app.get('/page2/add', function(req, res) {
res.render("add");
console.log("rendered a form to add");
});
  
  
  
  // Code to create a new room
app.post('/page2/add', function(req, res) {
  
var count = Object.keys(rooms.cars).length;  //this takes the rooms variable above which is the json file and counts the length of it

// create a new room based on the info in the form
var room ={
    name: req.body.name,
    id: count + 1, // this adds 1 to the length of the file and assigns it as the new ID
    position: count
  };


var json = JSON.stringify(rooms); // this is to Convert it from an object to string with stringify for use below


// read the json file and push the data to it
fs.readFile('./data/rooms.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
  //  room = JSON.parse(room); //now it an object
   rooms.cars.push(room); //add the data from the variable above 
  json = JSON.stringify(rooms, null, 4); //convert it back to json
    fs.writeFile('./data/rooms.json', json, 'utf8'); // write it back 
  //  json = JSON.parse(rooms); //convert it back to json
}});




	console.log(room)

  
  res.redirect("/page2")
  
  
});
  


// Delete a room
app.get('/page2/delete/:name', function(req, res) {
  
  var json = JSON.stringify(rooms); // this is to Convert it from an object to string with stringify for use below
  
  
 fs.readFile('./data/rooms.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
      
//var a = json.indexOf("whatif");
var keytoFind = req.params.name; // position represents the location in the json array remember 0 is the first
//console.log(a);
      var str2 = rooms.cars; // this changes the json to a variable str2
//      var str = '[{ "label": "Month"}, { "label": "within"}, { "label": "From"}, { "label": "Where"}]';
var data = str2; //this declares data = str2
var index2 = data.map(function(d) { return d['name']; }).indexOf(keytoFind) // finds the position by nae taken from http://jsfiddle.net/hxfdZ/

console.log("Liam the position is " + index2 + "    " + keytoFind)
     
  
rooms.cars.splice(index2 ,1); // deletes one item from position represented by index 2 from above
       
       
// VERY VERY VERY VERY IMPORTANT  rooms.cars.splice(keytoFind,1, {name: "hello", id: 34, position: 16}); // this line updates the data VERY VERY VERY VERY IMPORTANT

   json = JSON.stringify(rooms, null, 4); //convert it back to json
    fs.writeFile('./data/rooms.json', json, 'utf8'); // write it back 
  console.log("AAAAAAGGGGGHHHH");
    

  
}});
  

res.redirect("/page2");
});








// Code to get individual page

  
app.get('/show/:name', function(req, res) {
  
 var json = JSON.stringify(req.params.name);
 
 res.render('show', {
  title: "LiamJson" , 
  cars: {cars: json}
  
})
  console.log("Rooms Rendered " + json);
  
});




app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
//  var addr = server.address();
  console.log("Yippee");
  
});



    
    
    
    
    // <----------------------------------------------------------------------------------------------->
    
    
  //  var keytoFind = req.params.id;
//var index = Object.keys(json).indexOf(keytoFind);
    
    
     // var key1 = req.params.id;
      
    // delete rooms.cars.req.params.id; 
      
      
      
  //  room = JSON.parse(room); //now it an object
 // var which = req.params.id;
 // rooms.cars.splice(index,1);
 
  //  json = JSON.parse(rooms); //convert it back to json
//  var index = json.indexOf(which);