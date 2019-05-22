import React from 'react';
import UpdateBox from './Box/UpdateBox'
const SolutionUpdatePage = ({history}) => {
    let solutionUpdate = {
        active_field : ['id', 'title', 'contents', 'solution', 'type', 'create_date'],
        update_field : ['title', 'contents', 'solution'],
        active_btn : true,
        btn : {
            submit_btn : {
                active : true,
                style : 'none',
                text : '완료',
            },
            exit_btn : {
                active : true,
                style : 'none',
                text : '취소',
            }
        }
    }
    return (
        <div>
            <UpdateBox history={history} option={solutionUpdate} />
        </div>
    );
};

export default SolutionUpdatePage;