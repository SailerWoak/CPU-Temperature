const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);



//Path to the HTML file 
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "../index.html"))
});

io.on('connection', () => { console.log('damn, you are working')});

//Path to CSS
app.use('/static', express.static('font'))

//Server port
http.listen(process.env.port || 3000, () => console.log('Running at port 3000'));

////Function for executing info about CPU temperaure
const systemInfo = require('systeminformation');
setInterval(function(){
    systemInfo.cpuTemperature() 
    .then(data => {
        const show = data.main.toFixed(1);
        io.emit('showTemp', show);
        console.log(data.main);
    });
},1000)