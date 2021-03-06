module.exports = function(params, callback) {

    users = {};

    var chatSchema =params.mongoose.Schema({
        //name:{first:String,last:String},
        nick:String,
        msg:String,
        created:{type:Date,default:Date.now}
    });
    
    var Chat = params.mongoose.model('Message',chatSchema);
    params.io.sockets.on('connection',function(socket){
        var query = Chat.find({});

        // socket.request.headers['user-agent']
        // socket.request.headers['host']
        // socket.request.connection.remoteAddress
        // https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript-only
        query.sort({created: -1}).limit(8).exec(function(err,docs){
            if(err) throw err;
            socket.emit('load old msgs',docs);
    
        });

        socket.on('new user',function(data,callback){
            if(data in users){  // icknames.indexOf(data) != -1
                callback(true);
            }else{
                callback(true);
                socket.nickname = data;
                geoip = require('geoip-lite');
    
                var ip = /* this.request.connection.remoteAddress  || */ "113.182.140.212";
    
                socket.userData =   geoip.lookup(ip);
                //users[socket.nickname] = socket;
                users[socket.nickname] = socket;
                //nicknames.push(socket.nickname);
                updateNicknames();
            }
    
        /*	var getIp = function()
            {
                var ifaces = os.networkInterfaces();
    
                Object.keys(ifaces).forEach(function (ifname) {
                var alias = 0;
    
                ifaces[ifname].forEach(function (iface) {
                    if ('IPv4' !== iface.family || iface.internal !== false) {
                    // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                    return;
                    }
    
                    if (alias >= 1) {
                    // this single interface has multiple ipv4 addresses
                    console.log(ifname + ':' + alias, iface.address);
                    } else {
                    // this interface has only one ipv4 adress
                    console.log(ifname, iface.address);
                    }
                    ++alias;
                });
                });
                
            }*/
    
    
        });
    
        function updateNicknames(){
            params.io.sockets.emit('usernames',Object.keys(users)); //nicknames  Object.keys(users)
        }
        socket.on('send message',function(data,callback){
            var msg  = data.trim();
            if(msg.substr(0,3) === '/w ' ){
            
                msg = msg.substr(3);
                var ind = msg.indexOf(' ');
                if(ind !== -1){
                    //	console.log(1);
                    var name = msg.substring(0,ind);
                    var msg = msg.substring(ind+1);
    
                    if(name in users){
    
                        users[name].emit('whisper',{msg:msg,nick: socket.nickname});
                        users[socket.nickname].emit('mywhisper',{msg:msg,nick: socket.nickname});
                       console.log('Whisper!');
                    }else{
                        callback('Error! Enter a valod user.');
                    }
    
    
                }else{
                    callback('Error! Please enter a message for you whisper');
                }
            }else{
    
                var newMsg = Chat({msg:data,nick: socket.nickname});
                newMsg.save(function(err){
                    if(err) throw err;
                    io.sockets.emit('new message',{msg:data,nick: socket.nickname});
                });
                
    
            }
            
            //socket.broadcast.emit('new message',data);
    
        });
    
        socket.on('private msg',function(data,callback){
            var name = data.user;
            var msg = data.msg;
            var send = data.send;
            console.log(data);
    
                    if(name in users){
    
                        users[name].emit('private sender',{msg:msg,nick: send});
                        //users[socket.nickname].emit('mywhisper',{msg:msg,nick: socket.nickname});
                       console.log('Whisper!');
                    }else{
                        if(users[send] != undefined)
                        {
                            users[send].emit('private sender',{msg:"El usuario esta desconectado",nick: "System:"});
                        }
                        callback('Error! Enter a valod user.');
                    }
        });
    
        socket.on('typing', function (data) {
            console.log(data);
          if(users[data.para] != undefined)
          {
            users[data.para].emit('typing', data);
          }
    
        });
    
        socket.on('disconnect',function(data){
            if(!socket.nickname) return;
            delete users[socket.nickname];
            //nicknames.splice(nicknames.indexOf(socket.nickname),1);
            updateNicknames();
        });

    });

}