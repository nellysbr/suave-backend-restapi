export interface PizzaDetail {
  pizzaId: number; // Renomeado de 'id' para 'pizzaId'
  quantity: number;
}

export interface Order {
  id: number;
  customer_id: number;
  pizzaDetails: PizzaDetail[];
  totalPrice: number;
  order_status: "Aguardando" | "Em progresso" | "Enviado" | "Completo";
}
