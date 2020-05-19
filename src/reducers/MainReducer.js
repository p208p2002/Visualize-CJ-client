let Axios = require('axios');
let {
    REACT_APP_API_HOST,
    REACT_APP_USER_AUTH_SERVER: UDIC_SERVICES_SERVER = '',
    REACT_APP_USER_AUTH = 'FALSE'
} = process.env
let axios;
if(REACT_APP_USER_AUTH === 'FALSE'){ //不需要做登入認證
    axios = Axios.create({
        baseURL: REACT_APP_API_HOST,
    });
}
else{
    axios = Axios.create({
        baseURL: UDIC_SERVICES_SERVER
    });
}

export const getToken = (account, password, callbackOnFail = () => { }, callbackOnSuccess = () => { }) => {

    const reCreateAxios = (token) => {
        if (!token) {
            token = window.localStorage.getItem('appToken')
        }
        axios = Axios.create({
            headers: { 'AppName': 'Visualize CJ', 'Authorization': token },
            baseURL:UDIC_SERVICES_SERVER+'/service/' + REACT_APP_API_HOST
        });
    }
    
    return (dispatch) => {
        dispatch({
            type: 'SET_APP_LOADING',
            loging: true
        })
        axios.post('/login', {
            account,
            password
        })
            .then((res) => {
                let { Token = '' } = res.data
                callbackOnSuccess()
                window.localStorage.setItem('appToken', Token)
                reCreateAxios(Token) // recreate axios

                dispatch({
                    type: 'USER_LOGIN',
                    token: Token
                })
                dispatch({
                    type: 'SET_APP_LOADING',
                    loging: false
                })
            })
            .catch((res) => {
                console.log(res)
                callbackOnFail()
                dispatch({
                    type: 'SET_APP_LOADING',
                    loging: false
                })
            })
    }
}

export function setAppLoading(isLoading) {
    return {
        type: "SET_APP_LOADING",
        isLoading
    }
}

export function parseCJ(CJText = '', taskType, FoucsPositions = [], SearchParagraph, Question_A, Question_B) {
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
    isLoading: false,
    token:window.localStorage.getItem('appToken')
}

export default function MainReducer(state = initState, action) {
    console.log('MR',action)
    switch (action.type) {
        case 'USER_LOGIN':
            return Object.assign({},state, {
                token:action.token
            })
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
