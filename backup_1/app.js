var net = require('net');  

var select_id = 0;
  
var server = net.createServer();  
  
//聚合所有客户端  
var sockets = [];

process.stdin.resume(); //process.stdin流来接受用户的键盘输入，这个可读流初始化时处于暂停状态，调用流上的resume()方法来恢复流  
  
process.stdin.on('data', function(data){  
  if (data.toString().trim().toLowerCase() === 'quit'){  
    quitting = true;  
    console.log('BYE~');  
    sockets.forEach(function(s){  
    //删除被关闭的连接  
      s.on('close', function(){  
        console.log('connection closed');  
        var index = sockets.indexOf(socket);  
        sockets.splice(index, 1);
      });
      server.on('close', function(){  
        console.log('Server closed');  
      });  
    });   
    process.stdin.pause();  
  } else {
    sockets[0].write(data);  
  }  
});
(function create(){
  //接受新的客户端连接  
  server.on('connection', function(socket){  
    console.log(' > got a new connection');
    var client = socket.remoteAddress + ':' + socket.remotePort;
    console.log(`\n > Connected to ${client}`);
    sockets.push(socket);  
  });  
  server.on('error', function(err){  
      console.log('Server error:', err.message);  
  });
  server.listen(8266);
})()
  