import { Routes, Route, } from 'react-router-dom';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="profile" element={<Profile name='от варёных штиблет'/>} />
        <Route path="movies" element={<Movies />} />
        <Route path="saved-movies" element={<SavedMovies />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
