import {SET_USER} from '../../constants/constants'

let INIT_STATE = {
    user: {}
}

export default function forgotPasswordReducer(state = INIT_STATE, action){
    switch(action.type){
        case SET_USER : {
            return {...state, user: action.user}
        }
        default : {
            return {...state}
        }
    }
}