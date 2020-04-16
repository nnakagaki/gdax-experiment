const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.static('dist'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));