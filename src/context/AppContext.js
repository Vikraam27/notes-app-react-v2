import React from 'react';

const AppContext = React.createContext();

export const AppProvider = AppContext.Provider;

export default AppContext;

// const [appState, setAppState] = useState({
//   theme: 'light',
//   language: 'en',
//   fullname: null,
//   isAuthed: false,
//   setTheme: () => {
//     setAppState((prev) => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
//   },
//   setLanguage: () => {
//     setAppState((prev) => ({ ...prev, language: prev.language === 'en' ? 'id' : 'en' }));
//   },
//   setFullname: (fullname) => {
//     setAppState((prev) => ({ ...prev, fullname }));
//   },
//   setIsAuthed: () => {
//     setAppState((prev) => ({ ...prev, isAuthed: !prev.isAuthed }));
//   },
// });
