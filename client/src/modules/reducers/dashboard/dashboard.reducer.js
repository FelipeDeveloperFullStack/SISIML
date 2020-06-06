import {
    OBTER_SALDO_TOTAL,
    OBTER_TOTAL_VENDAS_NO_MES,
    OBTER_VENDAS_PENDENTE,
    OBTER_STATUS_ANUNCIOS,
    UPDATE_ATIVIDADE_DIARIO
}
    from '../../constants/constants'


const INITIAL_STATE = {
    vendasPendente: [{}],
    isLoading: true,
    isLoadingStatusPublicacoes: true,
    saldoTotal: Number(),
    saldoDisponivel: Number(),
    totalVendas: Number(),
    nomeMes: '',
    saldoALiberar: Number(),
    saldoBloqueado: Number(),
    totalVendasPendentes: Number(),
    totalAtivos: Number(),
    totalPausados: Number(),

    //ATIVIDADE DIÁRIA
    qtdeVendasDiaria: Number(),
    qtdePerguntasDiaria: Number(),
    faturamentoDiario: Number(),
    ticketMedioDiario: Number(),
}

export default function dashboardReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_ATIVIDADE_DIARIO : {
            return {
                ...state,
                qtdeVendasDiaria: action.qtdeVendasDiaria,
                qtdePerguntasDiaria: action.qtdePerguntasDiaria,
                faturamentoDiario: action.faturamentoDiario,
                ticketMedioDiario: action.ticketMedioDiario
            }
        }
        case OBTER_SALDO_TOTAL: {
            return {
                ...state,
                saldoTotal: action.saldoTotal,
                saldoDisponivel: action.saldoDisponivel,
                isLoading: action.isLoading,
                isLoadingStatusPublicacoes: action.isLoadingStatusPublicacoes,
                saldoBloqueado: action.saldoBloqueado,
                saldoALiberar: action.saldoALiberar,

            }
        }
        case OBTER_TOTAL_VENDAS_NO_MES: {
            return {
                ...state,
                totalVendas: action.totalVendas,
                nomeMes: action.nomeMes,
                isLoading: action.isLoading
            }
        }
        case OBTER_VENDAS_PENDENTE: {
            return {
                ...state,
                vendasPendente: action.vendasPendente,
                totalVendasPendentes: action.totalVendasPendentes,
                isLoading: action.isLoading
            }
        }
        case OBTER_STATUS_ANUNCIOS: {
            return {
                ...state,
                totalAtivos: action.totalAtivos,
                totalPausados: action.totalPausados,
                isLoading: action.isLoading
            }
        }
        default: {
            return {...state}
        }
    }
}