// tests/user.test.ts
import { User } from "../src/models/User";
import { Pizza } from "../src/models/Pizza";
import { Order } from "../src/models/Order";
import { Admin } from "../src/models/Admin";

describe("User Model", () => {
  it("Deve criar um objeto User", () => {
    const user: User = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      address: "123 Main St",
      phone: "555-1234",
    };

    expect(user).toBeDefined();
    expect(user.id).toBe(1);
    expect(user.name).toBe("John Doe");
  });
});

describe("Pizza Model", () => {
  it("Deve criar um objeto Pizza", () => {
    const pizza: Pizza = {
      id: 1,
      type: "Margarita",
      size: "Medium",
      price: 12.99,
    };

    expect(pizza).toBeDefined();
    expect(pizza.id).toBe(1);
    expect(pizza.type).toBe("Margarita");
  });
});

describe("Order Model", () => {
  it("Deve criar um objeto Order", () => {
    const order: Order = {
      id: 1,
      customer_id: 1,
      pizza_id: 1,
      quantity: 2,
      total_price: 25.98,
      order_status: "Aguardando",
    };

    expect(order).toBeDefined();
    expect(order.id).toBe(1);
    expect(order.customer_id).toBe(1);
  });
});

describe("Admin Model", () => {
  it("Deve criar um objeto Admin", () => {
    const admin: Admin = {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      password: "adminPass123",
    };

    expect(admin).toBeDefined();
    expect(admin.id).toBe(1);
    expect(admin.name).toBe("Admin User");
  });
});
