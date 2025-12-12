import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import './App.css'
import TaskApp from './pages/TaskApp'
import { Home } from './pages/Home';
import { NavigationBar } from './components/NavigationBar';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<TaskApp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App