import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import UploadNotesPage from './pages/uploadNotes';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import AboutPage from './pages/about'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload-notes" element={<UploadNotesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;


