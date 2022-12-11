import React, {useContext, useEffect} from 'react';
import './Movies.css'
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Movie from "../../component/Movie";
import {getMovie} from "../../http/FilmApi";

const Movies = observer(() => {

    const {films} = useContext(Context)
    const id = localStorage.getItem('id')
    useEffect(() => {
        getMovie(id).then(data => films.setMovie(data))
        console.log(id,films.movie)
    },[])
    return (
        <div className="Movies">
            <div className="row" >
                {films.movie?.map(film =>
                    <Movie key={film.id} film={film}/>
                )}
            </div>
        </div>
    );
});

export default Movies;