import './App.css';
import Header from './components/header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AddJournal from './pages/add-journal';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path = '/' element={<Home />}/>
        <Route path = '/add-journal' element={<AddJournal />}/>
      </Routes>
    </div>
  );
}

export default App;
