import React from 'react';
import Repos from '../Repos/Repos';
import './ProfileInfo.css'
import star from './star.svg'
import starOutline from './star-outline.svg'


type Props = {
    addBookmark: (login: string) => void;
    removeBookmark: (login: string) => void;
    isBookmarked: boolean;
    profileData: any;
    profileRepos: Array<any>
}

export default function ProfileInfo ({addBookmark, isBookmarked, removeBookmark, profileData, profileRepos}:Props) {

    const handleOnClick = () => {
        if (isBookmarked === true) {
            removeBookmark(profileData.login)
        } else {
            addBookmark(profileData.login)
        }
    }

    let starIcon = starOutline
    let buttonTitle = 'Add bookmark'
    if (isBookmarked) {
        starIcon = star
        buttonTitle = 'Remove bookmark'
    }
    return (
        <div className='profileInfo'>
            <div className='details'>
                <button title={buttonTitle} onClick={handleOnClick} className='star-btn'><img alt= 'icon' className='star-outline' src={starIcon}></img></button>
                <img alt= 'avatar' src={profileData.avatar_url}></img>
                <p><a className= 'profileLink' href={profileData.html_url}>{profileData.name || profileData.login}</a></p>
                <p>Location: { profileData.location || '-' }</p>
                <p>Followers: {profileData.followers}</p>
                <p>Following: {profileData.following}</p>
            </div>
            <div className='repos'>
                <Repos 
                    profileRepos = {profileRepos}
                />
            </div>
            
        </div>
    )

}