import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { ICreateOrderProducts } from "./ICreateOrderProducts";

export interface ICreateOrder {
  customer_id: ICustomer;
  products: ICreateOrderProducts[];
}
