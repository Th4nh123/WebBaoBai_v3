import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './layouts/Main';
import NewProject from './layouts/NewProject';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='test' element={<NewProject />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
