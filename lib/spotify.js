const client_id = "476087ede0cd4bb1a1480c073cff59b7";
const client_secret = "39e34c374c3446f8acaaf48d8cefc40d";

// Get access token from Spotify
export async function getSpotifyAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${client_id}:${client_secret}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

// Fetch latest music releases from your artist ID
export async function getLatestReleases() {
  const token = await getSpotifyAccessToken();
  const artistId = "4YQgcIEla4DJVgx1nsfLbo"; // Your artist ID

  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=3`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data.items;
}
