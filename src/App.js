import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Route,
  Link,
  Routes
  // etc.
} from "react-router-dom";
import AddLink from './components/AddLink';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/add-link' element={<AddLink />} />
        </Routes>    
      </div>
    </BrowserRouter>
  );
}

export default App;
