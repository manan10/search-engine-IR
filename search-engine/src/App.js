import { Route, Routes } from 'react-router';
import Landing from './pages/Landing/Landing';
import Result from './pages/Result/Result';
import './App.css';

function App() {
  const routes = (
    <Routes>
      <Route path='/' element={ <Landing /> }/>
      <Route path='/result' element={ <Result /> }/>
    </Routes>
  )

  return (
    <div>
      { routes }
    </div>
  );
}

export default App;
