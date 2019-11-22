import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "modules/components/Card/Card.jsx";
import { StatsCard } from "modules/components/StatsCard/StatsCard.jsx";
import { PedidosPendentes } from "modules/components/PedidosPendentes/PedidosPendentes.jsx";

class DashboardView extends React.Component {

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Total de vendas"
                statsValue="137"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Mês de Novembro"
              />
            </Col>

            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Saldo"
                statsValue="R$: 3.987,65"
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Atualizado as 23:10"
              />

            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Pedidos Novos"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="10 pedidos Hoje"
              />
            </Col>
          </Row>
          

          <Row>

            <Col md={12}>
              <Card
                title="Pedido de vendas pendente"
                category="Aguardando confirmação do pagamento"
                stats="Atualizado a 5 minutos atrás..."
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <PedidosPendentes />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default DashboardView;
