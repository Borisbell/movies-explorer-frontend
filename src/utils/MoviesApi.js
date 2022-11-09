const baseURL = 'https://api.nomoreparties.co/beatfilm-movies';

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  else {
    return res.json()
      .then(data => {
        throw new Error(data.message);
      });
  }
}

export function getBeatFilmMovies() {
  return fetch(baseURL, {
    method: 'GET'
  })
    .then(res => getResponseData(res))
}