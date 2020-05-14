const express = require('express');
const app = express();
const port = 3000;
const users = [
  {
    id: 1,
    name: 'Kennedy',
  },
  {
    id: 2,
    name: 'Jamison',
  },
  {
    id: 3,
    name: 'Manny',
  },
];

console.log(app)

app.use(express.static('public'));

function urlLogger(req, res, next) {
  console.log('Request Logged: ', req.originalUrl);
  next();
};

// logging method (log everything)
app.use(urlLogger); 

// route specific logging method (log specified routes only)
// app.use('/greet/*', urlLogger);


// Routes
app.get('/cats', function (req, res, next) {
  res.send(`
  <!DOCTYPE>
  <html>
  <head>
    <title>Welcome to Meow Page</title>
  </head>
  <body>
    <h1>Meow, I am a cat</h1>
    <button><a href="http://localhost:3000/">Back to Home</a></button>
  </body>
  </html>
  `)
});

app.get('/dogs', function (req, res, next) {
  res.send(`
  <!DOCTYPE>
  <html>
  <head>
    <title>Welcome to Woof Page</title>
  </head>
  <body>
    <h1>Woof, I am a dog</h1>
    <button><a href="http://localhost:3000/">Back to Home</a></button>
  </body>
  </html>
  `)
});

app.get('/cats_and_dogs', function (req, res) {
  res.send(`
  <!DOCTYPE>
  <html>
  <head>
    <title>Welcome to Living Together Page</title>
  </head>
  <body>
    <h1>Meow! Woof! We are living together</h1>
    <button><a href="http://localhost:3000/">Back to Home</a></button>
  </body>
  </html>
  `)
});

// Route Parameters
app.get('/greet/:name', function (req, res, next) {
  const user = users.find((currentUser) => {
    return currentUser.name === req.params.name;
  });

  console.log(req.query.lang);
  let greeting = `Hello, ${user.name}!`
  
  res.send(`
  <p>${greeting}</p>
  `)
});


// Query Parameters: Tell the year you were born
app.get('/year', function(req, res, next) {
  var age = req.query.age;
  var year = 2020 - age;
  res.send('You were born in year ' + year + '.');
});

app.listen(port, ()=>console.log(`listening on port http://localhost:${port}`));