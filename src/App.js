
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthenContainer, BookContainer } from "./containers"
import { BASE_PATH, BOOK_PATH } from "./configs/path"
import { AuthProvider } from './states/auth/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

class App extends React.Component {

  render() {
    return (
      <Router>
        <AuthProvider>
          <Routes>
            <Route path={BASE_PATH} element={<AuthenContainer />} exact />            
            
          </Routes>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
