import AppError from "@shared/errors/AppError";
import { IShowOrder } from "../domain/models/IShowOrder";
import { inject, injectable } from "tsyringe";
import { IOrderRepository } from "../domain/repositories/IOrderRepository";
import { IOrder } from "../domain/models/IOrder";

@injectable()
export default class ShowOrderService {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrderRepository
  ) {
  }

  public async execute({ id }: IShowOrder): Promise<IOrder> {
    const order = await this.ordersRepository.findById(id);

    if(!order) {
      throw new AppError("Order not found");
    }

    return order;
}
}
