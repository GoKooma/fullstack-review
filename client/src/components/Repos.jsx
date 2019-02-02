import React from 'react';

const Repos = (props) => {
  return (
    <div>
      {props.repos.map(function(repo, idx){
        return (
          <div key={idx}>
          <br/>
            <ol>Repoistory name: {repo.name}</ol>
            <ol>Number of forks from this repo: {repo.forks}</ol>
            <ol>
            <a href={repo.html_url}>{repo.html_url}</a>
            </ol>
          </div>
        )
      })}
    </div>
  )
}

export default Repos;