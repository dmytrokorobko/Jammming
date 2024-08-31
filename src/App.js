import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Home } from './pages/public/Home';
import { Login } from './pages/public/Login';
import { Auth } from './pages/public/Auth';
import { PrivateRoute } from './routes/PrivateRoute';
import { Dashboard } from './pages/private/Dashboard';
import { Logout } from './pages/public/Logout';
import { Page404 } from './pages/public/Page404';
import { BaseLayout } from './layouts/BaseLayout';
import { Suspense } from 'react';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename='/Jammming'>
        <Routes>
          {/* Public Routes */}
          <Route element={<BaseLayout />}>
            <Route path='/' element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            } />
            <Route path='login' element={
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>              
            } />
            <Route path='auth' element={
              <Suspense fallback={<div>Loading...</div>}>
                <Auth />
              </Suspense>              
            } />
            <Route path='logout' element={
              <Suspense fallback={<div>Loading...</div>}>
                <Logout />
              </Suspense>              
            } />
            <Route path='*' element={
              <Suspense fallback={<div>Loading...</div>}>
                <Page404 />
              </Suspense>              
            } />
          </Route>

            {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path='dashboard' element={
              <Suspense fallback={<div>Loading...</div>}>
                <Dashboard /> 
              </Suspense>
            } />              
          </Route>
        </Routes>                    
      </BrowserRouter>
    </Provider>
  );
}

export default App;
