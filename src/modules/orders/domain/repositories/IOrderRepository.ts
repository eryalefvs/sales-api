import { ICreateOrder } from "../models/ICreateOrder";
import { IOrder } from "../models/IOrder";
import { IOrderPaginate } from "../models/IOrderPaginate";

type SearchParams = {
  page: number;
  skip: number;
  take: number;
}

export interface IOrderRepository {
  findById(id: string): Promise<IOrder | null>;
  findAll({ page, skip, take}: SearchParams): Promise<IOrderPaginate>
  createOrder(data: ICreateOrder): Promise<IOrder>
}
