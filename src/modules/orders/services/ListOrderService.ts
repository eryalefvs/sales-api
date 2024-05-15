import { inject, injectable } from 'tsyringe';
import { IOrderPaginate } from '../domain/models/IOrderPaginate';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export default class ListOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrderRepository,
  ) {}

  public async execute({ page, limit }: SearchParams): Promise<IOrderPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const orders = await this.ordersRepository.findAll({
      page,
      skip,
      take,
    });

    return orders;
  }
}
