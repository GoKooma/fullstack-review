const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // Declare schema
  github_handle: String,
  repo_name: String,
  repo_url: String,
  description: String,
  created_at: String,
  updated_at: String,
  forks: Number,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (err, repos) => {
  // save a repo or repos to mongodb
  if(err) {
    console.error(err);
  } else if (repos.isNew) {
    console.log(repos)
  } else {
    console.log("repo already exists")
  }
}

module.exports.save = save;