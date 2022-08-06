import { Routes, Route, } from 'react-router-dom';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';


function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
