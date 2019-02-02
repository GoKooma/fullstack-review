const express = require('express');
let app = express();

const parser = require('body-parser');
const gitHelper = require('../helpers/github.js');

const mongo = require('../database/index.js')

app.use(parser.json());
app.use(parser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/:username', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  
  gitHelper.getReposByUsername(req.params.username)
  .then(mongo.save)
  .then((result) => {
    // console.log(req.body);
    // console.log('save complete');
    res.status(201).end();
  })
  .catch((err) => {
    res.status(400).send(err);
  });
});

app.get('/repos/:username', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  mongo.find(req.params.username)
  .then((docs) => {
    // console.log(docs)
    docs.sort((a, b) => {
      return a.forks - b.forks;
    });
    docs.slice(0, 25);
    return docs;
  })
  .then((docs) => {
    res.status(200).send(docs);
  })
  .catch((err) => {
    console.error(err);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

