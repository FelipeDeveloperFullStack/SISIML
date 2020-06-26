import {SET_USER, ACTIVE_STEP} from '../../constants/constants'

let INIT_STATE = {
    user: {},
    activeStep: 0,
    steps: ['Passo 01 - Envio do link para redefinição da senha', 
            'Passo 02 - Confirmação do código de segurança', 
            'Passo 03 - Redefinição da senha'
          ]
}

export default function forgotPasswordReducer(state = INIT_STATE, action){
    switch(action.type){
        case SET_USER : {
            return {...state, user: action.user}
        }
        case ACTIVE_STEP: {
            return {...state, activeStep: action.activeStep}
        }
        default : {
            return {...state}
        }
    }
}