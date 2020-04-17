const express = require('express');
const app = express();

console.log(process.argv);

app.use(express.static('public'));
app.use(express.static('dist'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    authObject : {
      key        : process.argv[2],
      secret     : process.argv[3],
      passphrase : process.argv[4]
    }
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));