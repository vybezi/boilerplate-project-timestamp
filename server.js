// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:date_string?', function(req,res){
    let now = new Date();
    let date_string;
    let response = {};

    if(!req.params.date_string){
        res.send({unix:now.getTime(),utc:now.toUTCString()});
        return;
    }

    date_string = req.params.date_string;

    if(parseFloat(date_string) && (date_string != "0" || date_string == 0)){
        date_string = parseFloat(date_string);
        response.unix = new Date(date_string).getTime();
        response.utc = new Date(date_string).toUTCString();
    }else if(new Date(date_string) != "Invalid Date"){
        response.unix = new Date(date_string).getTime();
        response.utc = new Date(date_string).toUTCString();
    }else if(date_string == "0" || date_string == 0){
        response.unix = new Date(0).getTime();
        response.utc = new Date(0).toUTCString();
    }else{
        return {error:"Invalid Date"};
    }


    res.send(response);
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
