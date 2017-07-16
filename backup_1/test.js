var net = require('net')

var count = 0;
var users = {};

var server = net.createServer();

server.on('connection', socket => {
  socket.setEncoding('ascii');
  var client = socket.remoteAddress + ':' + socket.remotePort
  var nickName;
  console.info(`\n > Connected to ${client}
  \n > ${count} other people are connected at this time.
  \n > please write your name and press enter:`);
  count++;

  socket.on('data', data => {
    var nickName=data.toString().replace('\r\n','');
    if(users[nickName]){
      socket.write('> nickname already in use,try again:');
      return;
    }else{
      users[nickName]=socket;
      for(var userKey in users){
        users[userKey].write('> '+ nickName + ' joined the room\n');
      }
    }
    console.log(data.toString())
    // socket.write('hello client!')
  })

  socket.on('end', () => {
    count--;
  })
})
server.listen(8266, function () {
  console.log('server listening on *:8266')
})
