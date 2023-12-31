export default function Playlist({ playlist, removeFromPlaylist }) {
  return (
    <div>
      <h3>Playlist</h3>
      {playlist.map((song) => (
        <div key={song.id}>
          <p>{song.name} by {song.artist}
            <button onClick={() => removeFromPlaylist(song)}>-</button>
          </p>
        </div>
      ))}
    </div>
  );
}