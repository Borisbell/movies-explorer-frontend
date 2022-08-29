export const BASE_URL = 'https://api.moviesbb.nomoredomains.xyz';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return res.json()
      .then((data) => {
        throw new Error(data.error);
      });
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: name, email: email,
      password: password
      })
  })
  .then(checkResponse)
};

export const editProfile =(email, name, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: { 
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json", 
    },
    body: JSON.stringify({
      email,
      name
    })
  })
  .then(checkResponse)
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(checkResponse)
}


