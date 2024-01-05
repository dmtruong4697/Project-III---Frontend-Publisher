import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Outlet, Route, Router, RouterProvider, Routes, } from 'react-router-dom';
import router from './routes/router';
import {createMemoryHistory} from 'history';
import { HomeLayout } from './layout/homeLayout/HomeLayout';
import AuthLayout from './layout/authLayout/AuthLayout';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

  const history = createMemoryHistory();

  return (
    // <RouterProvider router={router}/>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {router.map((route) => {
              const Page = route.page;
              const Layout = route.homeLayout? HomeLayout:AuthLayout;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                ></Route>
              );
            })}
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
