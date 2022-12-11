import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserMovie from "./movie/UserMovie";
import FilmMovie from "./movie/FilmMovie";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
      user: new UserMovie(),
      films: new FilmMovie(),
    }}>
        <App />
    </Context.Provider>,
);