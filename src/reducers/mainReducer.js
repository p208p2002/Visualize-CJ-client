
let axios = require('axios');
axios = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
});

export function setAppLoading(isLoading) {
    return {
        type: "SET_APP_LOADING",
        isLoading
    }
}

export function parseCJ(CJText = '', taskType, FoucsPositions = [], SearchParagraph, Question_A, Question_B) {
    // if (process.env.NODE_ENV === 'development') {
    //     return (dispatch) => {
    //         axios.post('/parse-defendant-example')
    //             .then((res) => {
    //                 // console.log(res)
    //                 let { data = {} } = res,
    //                     { defendants = [], tokens = [], marks = [] } = data;
    //                 dispatch({
    //                     type: 'PARSE_CJ_RESULT',
    //                     CJDefendants: defendants,
    //                     CJTokens: tokens,
    //                     CJMarks: marks
    //                 })
    //             })
    //     }
    // }
    return (dispatch) => {
        // clear data
        dispatch({
            type: 'PARSE_CJ_RESULT',
            CJDefendants: [],
            CJTokens: [],
            CJMarks: [],
            taskType
        })

        // in loading
        dispatch(setAppLoading(true))
        axios.post('/parse-defendant', {
            CJText,
            FoucsPositions,
            SearchParagraph,
            Question_A,
            Question_B
        })
            .then((res) => {
                // console.log(res)
                let { data = {} } = res,
                    { defendants = [], tokens = [], marks = [] } = data;
                dispatch({
                    type: 'PARSE_CJ_RESULT',
                    CJDefendants: defendants,
                    CJTokens: tokens,
                    CJMarks: marks,
                    taskType
                })
            })
            .finally(() => {
                dispatch(setAppLoading(false))
            })
    }
}

let initState = {
    CJDefendants: [],
    CJTokens: [],
    CJMarks: [],
    isLoading: false
}

export default function mainReducer(state = initState, action) {
    console.log('MR',action)
    switch (action.type) {
        case 'SET_APP_LOADING':
            return Object.assign({}, state, {
                isLoading: action.isLoading
            })
        case 'PARSE_CJ_RESULT':
            return Object.assign({}, state, {
                CJDefendants: action.CJDefendants,
                CJTokens: action.CJTokens,
                CJMarks: action.CJMarks
            })
        default:
            return state
    }
}
