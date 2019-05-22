//view 호출 방법 / restAPI 호출
/* <Link to={{
        pathname :'/view', 
        state : {
        [필드명] : 값, 
        tbName : tbName, 
    }}}>
    링크명
</Link> */

import React from 'react';
import View from 'components/View';
const ViewPage = ({history, option}) => {
    return (
        <div>
            <View history={history} option={option}></View>
        </div>
    );
};
export default ViewPage;
