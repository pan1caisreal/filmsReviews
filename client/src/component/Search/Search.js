import React from 'react';
import './Search.css'
import Input from "../../utils/input/input";
import searchImg from '../../assets/search.png'

const Search = () => {
    return (
        <div className="Home_container">
            <div className="Home_search">
                <div className="Search">
                    <Input className="Input" placeholder="Поиск" ></Input>
                    <div className="Search_btn">
                        <button><img src={searchImg} alt="Поиск" className="Search_img"/></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;