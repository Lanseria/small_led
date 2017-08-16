var http = require('http');
var fs = require('fs');
var count = 0;
var net = require('net');  
var select_id = 0;
var tcpserver = net.createServer();  
//聚合所有客户端  
var tcpsocket = [];
tcpserver.on('close', function(){  
  console.log('Server closed');  
});  
tcpserver.on('connection', function(tcp){  
  console.log(' > got a new connection');
  var client = tcp.remoteAddress + ':' + tcp.remotePort;
  console.log(`\n > Connected to ${client}`);
  tcpsocket.push(tcp);
  select_id++;
});
tcpserver.on('error', function(err){  
    console.log('Server error:', err.message);  
});
tcpserver.listen(8266);
console.log("tcp litenning 8266");
var server = http.createServer((req, res) => {
  fs.readFile('./index.html', (err, data) => {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data, 'utf-8');
  });
}).listen(8888);
console.log('Server running at http://127.0.0.1:8888/');

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
  count++;
  if(select_id){
    console.log(select_id);
    socket.emit('status',{text:'success'});
  }
  console.log('User connected ' + count + ' user(s) present');
  socket.on('disconnect', function(){
    count--;
    console.log('user disconnected');
  })
  socket.on('message', function(data){
    console.log('send data : ' + data.text)
    if(select_id)
      tcpsocket[0].write(data.text); 
    //  console.log(data.text);
  })
  socket.emit('push message',{number:count});
  socket.broadcast.emit('push message',{number:count});
})

