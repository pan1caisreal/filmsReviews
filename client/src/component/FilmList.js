import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Film from "./Film";

const FilmList = observer(() => {
    const {films} = useContext(Context)

    return (
        <div className="row" >
            {films._films.map(films =>
                <Film key={films.id} films={films}/>
            )}
        </div>
    );
});

export default FilmList;