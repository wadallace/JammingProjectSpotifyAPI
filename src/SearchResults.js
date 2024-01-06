import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

export default function SearchResults({ searchResults, addToPlaylist }) {
  const original = () => {
    const handleClick = (song) => {
      addToPlaylist(song)
    }

    return (
      <div>
        {searchResults.map((result, index) => (
          <ListGroup.Item variant='dark' key={index}>
            {result?.name} by {result?.artist}
            {
              <img
                src={result?.image}
                alt='album cover'
                className='img-padding'
              />
            }
            <button
              type='submit'
              onClick={() => handleClick(result)}
              className='Save'
            >
              +
            </button>
          </ListGroup.Item>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h3>Results</h3>
      <>
        <ListGroup style={{ fontSize: '18px' }}>{original()}</ListGroup>
      </>
    </div>
  )
}
