
let axios = require('axios');
axios = axios.create({
    baseURL: 'http://140.120.13.252:12001',
    // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

export function parseCJ(CJText='',FoucsPositions=[]) {
    // return (dispatch) => {
    //     axios.post('/parse-defendant-example')
    //     .then((res)=>{
    //         // console.log(res)
    //         let {data={}} = res,
    //         {defendants=[], tokens=[], marks=[]}= data;
    //         dispatch({
    //             type:'PARSE_CJ_RESULT',
    //             CJDefendants:defendants,
    //             CJTokens:tokens,
    //             CJMarks:marks
    //         })
    //     })
    // }
    return (dispatch) => {
        axios.post('/parse-defendant',{
            CJText,
            FoucsPositions
        })
        .then((res)=>{
            // console.log(res)
            let {data={}} = res,
            {defendants=[], tokens=[], marks=[]}= data;
            dispatch({
                type:'PARSE_CJ_RESULT',
                CJDefendants:defendants,
                CJTokens:tokens,
                CJMarks:marks
            })
        })
    }
}

let initState = {
    CJDefendants:[],
    CJTokens:[],
    CJMarks:[]
}

export default function mainReducer(state = initState, action) {
    console.log(action)
    switch (action.type) {
        case 'PARSE_CJ_RESULT':
            return Object.assign({},state,{
                CJDefendants:action.CJDefendants,
                CJTokens:action.CJTokens,
                CJMarks:action.CJMarks
            })
        default:
            return state
    }
}