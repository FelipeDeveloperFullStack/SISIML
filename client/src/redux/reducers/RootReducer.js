import {combineReducers} from 'redux';
import anuncioReducer from './anuncio/AnuncioReducer';
import clienteReducer from './cliente/ClienteReducer';
import dashboardReducer from './dashboard/DashboardReducer'
import sidebarReducer from './Sidebar/SidebarReducer'
import vendaReducer from './venda/VendaReducer'
import perguntasReducer from './perguntas/PerguntasReducer'
import forgotPasswordReducer from './forgotPassword/ForgotPasswordReducer'

/**
 * Created by: 
 * @name Felipe Miguel dos Santos
 * @version 0.0.1
 */

export const reducers = combineReducers({
    anuncio: anuncioReducer,
    cliente: clienteReducer,
    dashboard: dashboardReducer,
    sidebar: sidebarReducer,
    venda: vendaReducer,
    perguntas: perguntasReducer,
    forgotPassword: forgotPasswordReducer
});
