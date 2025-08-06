import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import GetStarted from './pages/GetStarted';

function App() {
  return (
    <Routes>
       <Route path="/" element={<Home />} />
      <Route path="/get-started" element={<GetStarted />} />
    </Routes>
  );
}

export default App;
