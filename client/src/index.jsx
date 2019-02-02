import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      username: ''
    }

    this.refresh = this.refresh.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    if (this.state.username.length !== 0) {
      this.refresh(this.state.username);
    }
  }

  refresh(term) {
    axios
      .get(`/repos/${term}`, { params: { owner: term }})
      .then((data) => {
        this.setState({
          repos: data.data,
          username: data.data[0].owner
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  search (term) {
    console.log(`${term} was searched`);
    // Send ajax request to the server
    this.setState({
      username: term
    })
    axios
      .post(`/repos/${term}`)
      .then(() => this.refresh(term))
      .catch((err) => console.error(err));
  }

  render () {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={this.state.repos} user={this.state.username}/>
        <Search onSearch={this.search.bind(this)} repos={this.state.repos}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));