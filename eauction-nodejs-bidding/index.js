
//Angel hack simple bid using socket.io

var fs = require( 'fs' );
var app = require('express')();
var https        = require('https');

var mysql = require('mysql');


var server =  http.createServer();
server.listen(1888);
var io = require('socket.io').listen(server);



console.log("Server OK");

var socketCount = 0;

var User = {};
var CurrentBid = {};

//set starting price for lot 1 to SGD 10,000.
CurrentBid[1] = 10000l

io.sockets.on('connection', function (socket)
{

    socketCount++;

    console.log("Online : " + socketCount);
 
    //Login
    socket.on("login", function (username)
    {    
        User[socket.id] = username;              
    });
    
    
    //when press BID
    socket.on("bid", function (lot)
    {
         //increase SGD 1000 each bid.
         var Increment = 1000;
		 
		 //increase previous price
         var BidPrice = parseInt(CurrentBid[lot]) + parseInt(Increment);
          
		 CurrentBid[lot] = BidPrice;
		  
          //tell user the new price
		      io.emit('Lot 1',  CurrentBid[lot] );
    });
    
    

});



