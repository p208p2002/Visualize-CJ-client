export function setVisualizeView(view){
    return{
        type:'VISUALIZE_SET_VIEW',
        view
    }
}

let initState = {
    current_view:undefined,
    results:{}
}
export default function Reducer(state=initState, action){
    console.log('VR',action)
    switch (action.type) {
        case 'VISUALIZE_SET_VIEW':
            return Object.assign({},state,{
                current_view:action.view
            })
        case 'PARSE_CJ_RESULT':
            let { taskType } = action
            let { results } = state
            results[action.taskType] = action
            return Object.assign({},state,{
                current_view:taskType,
                results
            })
        default:
            return state
    }
}