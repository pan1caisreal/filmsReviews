import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {films} = useContext(Context)
    const pagesCount = Math.ceil(films.totalCount / films.limit)
    const pages = []

    for(let i = 0;i<pagesCount;i++){
        pages.push(i+1)
    }
    return (
        <Pagination
            style={{display:"flex",justifyContent:"center"}}
        >
            {pages.map(page =>
            <Pagination.Item
                variant={"outline-light"}
                key={page}
                active={films.page === page}
                onClick={() => films.setPage(page)}
            >
                {page}
            </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;