import Admin from "./pages/Admin/Admin";
import {
    ACTOR_ROUTE,
    ADMIN_ROUTE,
    FILM_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE, MOVIES_ROUTE,
    POSTS_ROUTE,
    REGISTRATION_ROUTE
} from "./utils/consts";
import Home from "./pages/Home/Home";
import ActorPage from "./pages/filmPage/ActorPage";
import FilmPage from "./pages/filmPage/FilmPage";
import Auth from "./pages/Auth/Auth";
import Posts from "./pages/Posts/Posts";
import Movies from "./pages/Movies/Movies";

export const authRoutes = [
    {
        path: POSTS_ROUTE,
        Component: <Posts />
    },
    {
        path: MOVIES_ROUTE,
        Component: <Movies />
    },
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin />
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: <Home />
    },
    {
        path: ACTOR_ROUTE + '/:id',
        Component: <ActorPage />
    },
    {
        path: FILM_ROUTE + '/:id',
        Component: <FilmPage />
    },
    {
        path: LOGIN_ROUTE,
        Component: <Auth />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth />
    },
]