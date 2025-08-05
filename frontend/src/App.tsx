import { Routes, Route } from 'react-router-dom';
import GetStarted from './pages/GetStarted';

function App() {
  return (
    <Routes>
      <Route path="/get-started" element={<GetStarted />} />
    </Routes>
  );
}

export default App;
