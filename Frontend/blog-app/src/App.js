import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import SingleBlog from './components/SingleBlog';

function App() {
  return (
    <div className="App">
     
     <Router>
     <NavBar />
      <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='blog/:id' element={<SingleBlog/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
