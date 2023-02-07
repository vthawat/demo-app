
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthenContainer, BookContainer, BookDetailContainer } from "./containers"
import { BASE_PATH, BOOK_PATH } from "./configs/path"
import { AuthProvider } from './states/auth/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

class App extends React.Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <Routes>
            <Route path={BASE_PATH} element={<AuthenContainer />} exact index />
            <Route element={<ProtectedRoute />}>
              <Route path={BOOK_PATH} element={<BookContainer />} exact />
              <Route path={BOOK_PATH + '/:id'} element={<BookDetailContainer />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    );
  }
}
export default App;
