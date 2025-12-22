import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import ExpenseDetail from './pages/ExpenseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import OpenAIPractice from './pages/OpenAIPractice';
import ShoppingCart from './pages/practice/ShoppingCart';
import ContactList from './pages/practice/ContactList';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AutoProvider } from './contexts/AuthContext'

import './App.css';

function App() {
  return (
    <AutoProvider>
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route element={<Layout />} >
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/expenses/:id" element={<ExpenseDetail />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/users/:id" element={<UserDetail />} />
                </Route>
                <Route path="/practice/openai" element={<OpenAIPractice />} />
                <Route path="/practice/cart" element={<ShoppingCart />} />
                <Route path='/practice/contacts' element={<ContactList />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
    </AutoProvider>
  );
}

export default App;