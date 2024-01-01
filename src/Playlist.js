import { useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

export default function Playlist({ playlist, removeFromPlaylist, clearPlaylist }) {

  const [playlistName, setPlaylistName] = useState('')

  const handleChange = (e) => {
    setPlaylistName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitting')
    if (window.confirm('Are you sure you want to save this playlist?')) {
      // Save the playlist
      clearPlaylist()
      setPlaylistName('')
    } else {
      // Don't save the playlist
    }
  }

  return (
    <div>
      <h3>{playlistName || 'Playlist'}</h3>
      {playlist.length >0 &&
      <form onSubmit={handleSubmit} style={{paddingBottom: '1rem'}}>
        <input
          type='text'
          placeholder='Name Playlist'
          className='PlaylistBar'
          onChange={handleChange}
          value={playlistName}
        />
      </form>}
      {playlist.map((song) => (
        <ListGroup style={{fontSize: '18px', borderRadius: '0px'}}>
        <ListGroup.Item variant="dark" alignItem="right" key={song.id}>
          <p>
            {song.name} by {song.artist}
            {<img src={song.image} alt={song.image} className='img-padding' />}
            <button onClick={() => removeFromPlaylist(song)} className='Save'>
              −
            </button>
          </p>
        </ListGroup.Item>
        </ListGroup>
      ))}
      <div onSubmit={handleSubmit} onClick={handleSubmit}>
        {playlist.length > 0 &&
        <button className='Save' style={{marginTop: '1rem'}}
        >Save Playlist</button>}
      </div>
    </div>
  )
}
