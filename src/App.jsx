import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store.jsx';
import { AppProvider } from './context/AppContext.jsx';
import Layout from './components/layout/Layout';
import Dashboard from './views/Dashboard/Dashboard';
import BookFormPage from './views/Form/BookFormPage';
import BookForm from './views/Form/BookForm';

function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <Router>
          <div className="App">
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add-book" element={<BookFormPage mode="add" />} />
                <Route path="/edit-book/:id" element={<BookFormPage mode="edit" />} />
              </Routes>
            </Layout>
            <BookForm />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#4ade80',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AppProvider>
    </Provider>
  );
}

export default App;