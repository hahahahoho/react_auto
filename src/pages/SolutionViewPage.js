import React from 'react';
import ViewBox from './Box/ViewBox'
const SolutionViewPage = ({history}) => {
    let solutionView = {
        active_field : ['id', 'title', 'contents', 'solution', 'type', 'create_date'], //*필수 % 맨앞은 조건을 위한 primarykey 필드 입력 (ex : NO)
        active_btn : true, //선택
        btn : {
            update_btn : {
                active : true,
                style : 'none',
                text : '수정',
            },
            delete_btn : {
                active : true,
                style : 'none',
                text : '삭제'
            },
            exit_btn : {
                active : true,
                style : 'none',
                text : '나가기'
            }
        }
    }
    return (
        <div>
            <ViewBox history={history} option={solutionView} />
        </div>
    );
};

export default SolutionViewPage;