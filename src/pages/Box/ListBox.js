import React from 'react';
import List from 'components/List'
import Paginator from 'components/Paginator';
import SearchBar from 'components/SearchBar';
const ListBox = ({history, option}) => {  
    return (
        <div>
            {option.active_searchBar ?<SearchBar tbName={option.tbName}/> : ""}
            <List history={history} option={option} />
            <Paginator tbName={option.tbName}/>
        </div>
    );
};

export default ListBox;