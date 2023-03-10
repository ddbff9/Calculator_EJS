const express = require('express');
const { appendFile } = require('fs');
const app = express();
const path = require('path');


app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname,'/public/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(process.env.PORT || 3000,() =>{
  console.log('APP IS LISTENING ON PORT 3000!')
})