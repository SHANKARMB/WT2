//restful repository access
var express = require('express'),
	app = express(),
	redis = require('redis'),
	fs=require('fs'),
	bodyParser = require('body-parser');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    next();
});

app.use(bodyParser.urlencoded())

app.use(express.static('repository'))

app.get('/', function (req, res) {
	fs.readdir('repository',function(err,items){
		if(err) throw err;
		res.send(items);
	})
});

app.get('/:dir',function(req,res){
	fs.readdir('repository/'+req.params.dir,function(err,items){
		if(err) console.log(err);
		res.send(items);
	})
});

app.listen(8080, function () {
  console.log('projecthub app listening on port 8080');
});


//server sent events for repository editors
sseapp=express();
publisherClient = redis.createClient();

sseapp.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    next();
});

sseapp.use(bodyParser.urlencoded());

sseapp.get('/:dir/:file',function(req,res){
	req.socket.setTimeout(Number.MAX_VALUE);
	req.on("close",function(){
		subscriber.unsubscribe();
		subscriber.quit();
	});

	var subscriber=redis.createClient();
	subscriber.subscribe("updates");

	subscriber.on("message", function(channel, message){
		lines=message.split('\n');
		for(var i in lines)
			res.write("data: " + lines[i] + "\n");
		res.write('\n');
	});

	subscriber.on("error", function(err) {
    	console.log("Redis Error: " + err);
	});

	res.writeHead(200,{
		'Content-type':'text/event-stream',
		'Cache-control':'no-cache',
		'Connection':'keep-alive'
	});

});

sseapp.post('/:dir/:file',function(req,res){
	var dir=req.params.dir, file=req.params.file;
	fs.writeFile('repository/'+dir+'/'+file,req.body.data,function(err){
		if(err)	console.log(err);
		//console.log(req.body);
	});

	publisherClient.publish( 'updates', req.body.data );
	res.end();
});

sseapp.listen(8090,function(){
	console.log('repository app listening on port 8090');
});