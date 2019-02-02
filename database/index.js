const Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // Declare schema
  owner: String,
  name: String,
  html_url: {
    type: String,
    unique: true
  },
  // description: String,
  // created_at: String,
  // updated_at: String,
  forks: Number
  // watchers: Number
}, {strict:false});

let Repo = mongoose.model('Repo', repoSchema);

const save = (repos) => {
  // save a repo or repos to mongodb
  // if(err) console.error(err);
  // let data = JSON.parse(repos);

  return Promise.all(
    (JSON.parse(repos)).map(repo=> {
      repo.owner=repo.owner.login;
      return Repo.findOneAndUpdate({ html_url:repo.html_url }, repo, { upsert:true, strict: false })
        .catch((err) => console.error(err));
      // let repoDoc = new Repo(repo);
      // return repoDoc.save();
    }));

  // for (let i = 0; i < data.length; i++) {
  //   var repo = data[i]
  //   var user = new promiseRepo({
  //     owner: repo.owner.login,
  //     name: repo.name,
  //     html_url: repo.html_url,
  //     forks: repo.forks
  //   });
    
    // if (!promiseRepo.find(repo.html_url)) {
    //   user.save((err, user) => {
    //     if (err) console.error(err);
    //     console.log(user, "POSTED");
    //   })
    // } else {
    //   console.error("repo already exists");
    // }

    // promiseRepo.find(repo)
    //   .then(() => {
    //     user.save((err, user) => {
    //       if (err) console.error(err);
    //       console.log(user, "POSTED");
    //     })
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   })
  // }
};

const find = (username) => {
  return Promise.all(
    Repo.find({ owner: username })
  )
}

module.exports = {
  save,
  find
};