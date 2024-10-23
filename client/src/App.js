import './App.css';
import  { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login&Signup/Login';
import Signup from './Components/Login&Signup/Signup';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
