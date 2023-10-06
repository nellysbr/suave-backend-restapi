export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  role: "admin" | "customer";
}
