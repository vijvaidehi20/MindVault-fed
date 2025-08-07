import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import UploadNotesPage from './pages/uploadNotes';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload-notes" element={<UploadNotesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;