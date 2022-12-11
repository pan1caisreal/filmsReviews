import React, {useContext, useEffect} from 'react';
import Search from "../../component/Search/Search";
import FilmList from "../../component/FilmList";
import '../filmPage/filmPage.css'
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {getFilm} from "../../http/FilmApi";
import Pages from "../../component/Page/Pages";

const Home = observer(() => {
    const {films} = useContext(Context)

    useEffect(() => {
        getFilm(1,4).then(data => {
            films.setFilms(data.rows)
            films.setTotalCount(data.count)
        })
    },[])

    useEffect(() =>{
        getFilm(films.page,4).then(data => {
            films.setFilms(data.rows)
            films.setTotalCount(data.count)
        })
    },[films.page])
    return (
        <div className="filmPage" style={{minHeight: 530}}>
            <Search />
            <FilmList />
            <Pages />
        </div>
    );
});

export default Home;