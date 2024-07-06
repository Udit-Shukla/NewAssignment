import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import SignUp from './pages/Signup';
function App() {
  
  return (
    <div>
      <h1> Welcome to the Index Page </h1>
      <Routes>
      <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
