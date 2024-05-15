import { IProduct } from "@modules/products/domain/models/IProduct";
import { IOrderProducts } from "./IOrderProducts";

export interface IRequestCreateOrder {
  customer_id: string;
  products: IProduct[];
}
