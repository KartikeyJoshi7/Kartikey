const fs = require('fs');
const express = require('express');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
var arr_server = [];

app.use('/', express.static(__dirname + '/public'));

app.get('/json', (request, response) => {
  fs.readFile('todoDb', 'utf8', function(err, data){
    if(err) throw err;
    console.log(data);
    response.send(data);
  })
})

app.post('/json', (request, response) => {
  console.log(request.body.arr);
  fs.writeFile('todoDb', request.body.arr, function(err){
    console.log('hogaya kaam!');
  });
   response.send(request.body.arr);
});

app.listen(4000, function () {
  console.log('server started on http://localhost:4000/');

});
