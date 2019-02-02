import React from 'react';

const RepoList = (props) => {
  if (props.user.length !== 0) {
    return (
      <div>
        <h4> Repo List Component </h4>
        There are {props.repos.length} repos for {props.user}.
      </div>
    )
  } else {
    return (
      <div>
        <h4> Repo List Component </h4>
        There are {props.repos.length} repos.
      </div>
    )
  }
  
}

export default RepoList;