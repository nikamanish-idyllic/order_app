var http = require("http");
var express  = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(__dirname + '/public'));

var orders = [];
app.locals.orders = orders;


app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(request,response){
	response.render("index");
});

app.get('/new-order', function(request, response){
	response.render("add_order")
});

app.post('/new-order', function(request, response){
	if(!request.body.table_no || !request.body.item_list2){
		response.status(400).send("Both fields must be present");
		return;
	}
	
	orders.push({
		"table_no" : request.body.table_no,
		"item_list": request.body.item_list,
		"item_list2": request.body.item_list2,
		"ordered_at": new Date()
	});
	response.redirect("/");
});

http.createServer(app).listen(process.env.PORT ||4000, function(){
	console.log("Server: 4000");
})