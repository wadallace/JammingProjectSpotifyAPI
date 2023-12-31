import './App.css'
import { useState } from 'react'
import SearchResults from './SearchResults'
import Playlist from './Playlist'
import Authenticate from './Authenticate'

export default function App() {

  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [playlist, setPlaylist] = useState([])
  const {token} = Authenticate()

  const addToPlaylist = (song) => {
    if (!playlist.find(item => item.id === song.id)) {
      setPlaylist([...playlist, song])
    }
  }
  const removeFromPlaylist = (song) => {
    setPlaylist(playlist.filter(item => item.id !== song.id));
  };  

  async function searchSpotify() {
    console.log(`Searching for ${searchInput}...`)

    var searchParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    var searchQuery = await fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=track&limit=5`,
      searchParams
    )
      .then((res) => {
        return res.json()
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return []
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }))
      })
    setSearchResults(searchQuery)
  }

  const onSearchInputChange = (e) => {
    setSearchInput(e.target.value)
  }
  const onSearchSubmit = (e) => {
    e.preventDefault()
    searchSpotify()
    //clear search field
    setSearchInput('')
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <h1>Jammming</h1>
          <form onSubmit={onSearchSubmit}>
            <input
              type='input'
              placeholder='Enter Song, Artist, Album'
              onChange={onSearchInputChange}
              value={searchInput}
            />
            <button>Search</button>
          </form>
        </div>
        <SearchResults searchResults={searchResults}
        addToPlaylist={addToPlaylist}
        />
        <Playlist playlist={playlist}
        removeFromPlaylist={removeFromPlaylist}/>
      </header>
    </div>
  )
}
