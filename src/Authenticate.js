import {useState, useEffect} from 'react'

export default function Authenticate() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
  const [token, setToken] = useState('')

  useEffect(() => {
    const authParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:
        'grant_type=client_credentials&client_id=' +
        CLIENT_ID +
        '&client_secret=' +
        CLIENT_SECRET,
    };
    fetch('https://accounts.spotify.com/api/token', authParams)
      .then((res) => res.json())
      .then((data) => setToken(data.access_token))
  }, [CLIENT_ID, CLIENT_SECRET])
  return {token}
}