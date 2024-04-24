import { dataSource } from "@shared/typeorm/index";
import Order from "../entities/Order";
import Customers from "@modules/customers/infra/typeorm/entities/Customers";

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customers;
  products: IProduct[];
}

export const OrdersRepository = dataSource.getRepository(Order).extend({
  findById(id: string) {
    return this.findOne({
      where: {
        id,
      },
      relations: ["order_products", "customer"]
    })
  },

  async createOrder({ customer, products }: IRequest) {
    const order = this.create({
      customer,
      order_products: products,
    })

    await this.save(order);
    return order;
  }
});
