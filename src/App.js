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

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename='/'>
        <Routes>
          {/* Public Routes */}
          <Route element={<BaseLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='auth' element={<Auth />} />
            <Route path='logout' element={<Logout />} />
            <Route path='*' element={<Page404 />} />
          </Route>

            {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path='dashboard' element={<Dashboard />} />              
          </Route>
        </Routes>                    
      </BrowserRouter>
    </Provider>
  );
}

export default App;
