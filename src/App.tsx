import './App.css'
import React, { useState, useEffect } from 'react';
import { getProfileInfo, getRepos } from './api';
import ProfileInfo from './components/ProfileInfo/ProfileInfo';
import ErrorAlert from './components/ErrorAlert/ErrorAlert';



function App() {
  const [githubProfileInfo, setGithubProfileInfo] = useState<any>({});
  const [login, setLogin] = useState<string>('');
  const [repos, setRepos] = useState<Array<any>>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<Array<string>>([]);



  useEffect(() => {

    Promise.all([getProfileInfo('cirstea97'), getRepos('cirstea97')])
    .then((results) => {
      setGithubProfileInfo(results[0])
      setRepos(results[1])
    })
    .catch((error) => {
      console.log("There is an error.")
    })
  }, [])



  useEffect(() => {
    const bookmarkData = window.localStorage.getItem('Bookmark');
    if ( bookmarkData !== null ) setBookmark(JSON.parse(bookmarkData))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('Bookmark', JSON.stringify(bookmark))
  }, [bookmark])



  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  }

  const addBookmark = (newBookmark: string) => {
    setBookmark([...bookmark, newBookmark])
  }

  const removeBookmark = (loginToRemove: string) => {
    const newBookmarks = bookmark.filter((item)=> {
      return item !== loginToRemove
    })
    setBookmark(newBookmarks)
  }

  const handleOnClick = () => {

    setShowError(false)

    Promise.all([getProfileInfo(login), getRepos(login)])
    .then((results) => {
      setGithubProfileInfo(results[0])
      setRepos(results[1])

    })

    .catch((error) => {
      setShowError(true)
    })
  }




  return (
    <div className="App">
      <h1>Github Profile Viewer</h1>

      <div className='flex-container'>
        <div className='bookmarks-container'>
          <h2>Bookmarks:</h2>
          {bookmark.map((name) => {
            return <p>{name}</p>
          })}
        </div> 
        <div className='searchContainer'>
        <input className='searchInput' type='text' value={login} onChange={(event) =>{handleOnChange(event)}}></input><br/>
        <button className='searchButton' onClick={() => {handleOnClick()}}>Get Info</button>
      </div>
      </div>


      {showError === true && <ErrorAlert/>}

      <ProfileInfo 
        removeBookmark={
          removeBookmark
        }

        profileData = {
          githubProfileInfo
          
        }
        profileRepos = {
          repos
        }

        isBookmarked = {
          bookmark.indexOf(githubProfileInfo.login) !== -1
        }

        addBookmark = {
          addBookmark
        }

      />


    </div>
  );
}

export default App;
