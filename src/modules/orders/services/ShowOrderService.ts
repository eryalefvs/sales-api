import AppError from "@shared/errors/AppError";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";
import Order from "../typeorm/entities/Order";


interface IRequest {
  id: string;
}

export default class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const order = await OrdersRepository.findById(id);

    if(!order) {
      throw new AppError("Order not found");
    }

    return order;
}
}
