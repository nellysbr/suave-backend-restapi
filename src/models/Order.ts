export interface Order {
  id: number;
  customer_id: number;
  pizza_id: number;
  quantity: number;
  total_price: number;
  order_status: "Aguardando" | "Em progresso" | "Enviado" | "Completo";
}
