// noinspection JSUnresolvedReference

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import SearchResults from './SearchResults'
import Playlist from './Playlist'
import Authenticate from './Authenticate'

export default function App() {
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [playlist, setPlaylist] = useState([])
  const { token } = Authenticate()

  const addToPlaylist = (song) => {
    if (!playlist.find((item) => item.id === song.id)) {
      setPlaylist([...playlist, song])
    } else {
      alert('Song already in playlist')
    }
  }
  const removeFromPlaylist = (song) => {
    setPlaylist(playlist.filter((item) => item.id !== song.id))
  }

  const clearPlaylist = () => {
    setPlaylist([])
    setSearchResults([])
  }

  async function searchSpotify() {
    console.log(`Searching for ${searchInput}...`)

    const searchParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const searchQuery = await fetch(
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
          image: track.album.images[2].url,
        }))
      });
    setSearchResults(searchQuery)
  }

  const onSearchInputChange = (e) => {
    setSearchInput(e.target.value)
  }
  const onSearchSubmit = async (e) => {
    e.preventDefault()
    await (searchSpotify())
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
              className='SearchBar'
              type='input'
              placeholder='Enter a Song, Artist, or Album'
              onChange={onSearchInputChange}
              value={searchInput}
            />
            <button className='SearchButton'>SEARCH</button>
          </form>
        </div>
      </header>
      <div className='container'>
          <div className='results'>
            <SearchResults
              searchResults={searchResults}
              addToPlaylist={addToPlaylist}
            />
          </div>
          <div className='playlist'>
            <Playlist
              playlist={playlist}
              removeFromPlaylist={removeFromPlaylist}
              clearPlaylist={clearPlaylist}
            />
          </div>
        </div>
    </div>
  )
}
