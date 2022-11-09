import React, { useEffect, useMemo, useState } from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import useToast from '../hooks/useToast';
import App from '../pages/App';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import FetchAPI from '../utils/API';
import { putAccessToken } from '../utils/local-storage';

function Router() {
  const [showToast] = useToast();
  const [authedUser, setaAthedUser] = useState(null);
  const [initialize, setInitialize] = useState(true);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'id');
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const toggleLang = () => {
    setLang((prev) => {
      const newLang = prev === 'id' ? 'en' : 'id';
      localStorage.setItem('lang', newLang);
      return newLang;
    });
  };

  const contexValue = useMemo(() => ({
    theme,
    lang,
    toggleTheme,
    toggleLang,
  }), [theme, lang]);

  useEffect(() => {
    const fetchGetUserLogged = async () => {
      const { error, data } = await FetchAPI.getUserLogged();
      if (error) {
        showToast(error);
        setInitialize(false);
      } else {
        setaAthedUser(data);
        setInitialize(false);
      }
    };

    fetchGetUserLogged();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { error, data } = await FetchAPI.getUserLogged();

    if (error) {
      showToast(error);
    } else {
      setaAthedUser(data);
    }
  };

  if (initialize) {
    return (
      <div className="loader__container">
        <span className="loader" />
      </div>
    );
  }
  return (
    <BrowserRouter>
      {authedUser === null ? (
        <Routes>
          <Route path="/*" element={<Signin onLoginSuccess={onLoginSuccess} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

      ) : (
        <Routes>
          <Route
            path="*"
            element={(
              <AppProvider value={contexValue}>
                <App />
              </AppProvider>
             )}
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default Router;
