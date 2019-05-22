
import React from 'react';
import Update from 'components/Update';
const UpdatePage = ({history, option}) => {
    
    return (
        <div>
            <Update history={history} option={option}></Update>
        </div>
    );
};

export default UpdatePage;