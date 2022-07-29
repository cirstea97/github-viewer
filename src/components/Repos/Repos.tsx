import React from 'react';
import './Repos.css';

export default function Repos(props: any) {

    return (
        <>
            <p>Public Repos({props.profileRepos.length}):</p>
            <div className='repoScroll'>
                {props.profileRepos.map((repo: any) => {
                    return (
                        <p key={repo.name}><a  className= 'repoLink' href={repo.html_url}>{repo.name}</a></p>
                    )
                })}
            </div>
        </>
    )
}