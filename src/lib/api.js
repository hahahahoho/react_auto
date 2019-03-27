import axios from 'axios';

export const readList = async () => axios.get('192.168.0.40/boards/1/1').then(function(response){
    getList(response);
});


export function getList(res){
    console.log(res);
    return {
        res
    }
}