export default function SearchResults({searchResults, addToPlaylist}) {

  const handleClick = (song) => {
    addToPlaylist(song)
  }

  return (
    <div>
      <h3>Results</h3>
      <>
        {searchResults.map((result) => (
          <div key={result.id}>
            <p>
              {result.name} by {result.artist}
              <button type='submit'
              onClick={() => handleClick(result)}>➕</button>
            </p>
          </div>
        ))}

      </>
    </div>
  )
}
