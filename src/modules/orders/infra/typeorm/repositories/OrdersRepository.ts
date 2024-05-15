import { dataSource } from "@shared/infra/typeorm";
import Order from "../entities/Order";
import { IOrderRepository } from "@modules/orders/domain/repositories/IOrderRepository";
import { Repository } from "typeorm";
import { IOrderPaginate } from "@modules/orders/domain/models/IOrderPaginate";
import { ICreateOrder } from "@modules/orders/domain/models/ICreateOrder";

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export default class OrdersRepository implements IOrderRepository {
  private ormRepository: Repository<Order>

  constructor() {
    this.ormRepository = dataSource.getRepository(Order)
  }

  async findById(id: string): Promise<Order | null> {
    return this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ["order_products", "customer"]
    })
  }

  async findAll({ page, skip, take }: SearchParams): Promise<IOrderPaginate> {
    const [orders, count] = await this.ormRepository
    .createQueryBuilder()
    .skip(skip)
    .take(take)
    .getManyAndCount()

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    }

    return result;
  }

  async createOrder({ customer_id, products }: ICreateOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer: customer_id,
      order_products: products,
    })

    await this.ormRepository.save(order);
    return order;
  }
}
