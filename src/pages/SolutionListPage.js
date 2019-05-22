import React from 'react';
import ListBox from './Box/ListBox'
const SolutionListPage = ({history}) => {
    let solutionList = {
        tbName : 'notices_ela', //*필수
        // pageSize : 15,
        active_field : ['id', 'title', 'type', 'create_date'], //*필수 보여주고 싶은 필드명
        active_btn : true, //선택
        //true일 경우 : 입력
        btn : {
            create_btn : { //명칭 변경불가
                active : true, //변경가능
                style : 'none', //변경가능
                text : '생성'//변경가능
            },
            exit_btn : {
                active : true,
                style : 'none',
                text : '나가기'
            }
        },
        active_view : true, //선택
        //true일 경우 : 입력
        active_view_field : 'title',
        search_view_field : 'id',
        //페이징처리 활성화
        //active_paginator : true, //제외, 추후 무한스크롤 적용기능 추가
        //검색바 활성화
        active_searchBar : true,
    }

    return (
        <div>
            <ListBox history={history} option={solutionList}></ListBox>
        </div>
    );
};

export default SolutionListPage;