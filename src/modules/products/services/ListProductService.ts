import Product from "@modules/products/infra/typeorm/entities/Product"
import redisCache from "@shared/cache/RedisCache";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { IProductPaginate } from "../domain/models/IProductPaginate";

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductRepository
  ) {}

  public async execute({page, limit}: SearchParams): Promise<IProductPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const products = await this.productsRepository.findAll({
      page,
      skip,
      take,
    })

    return products;
  }
}

export default ListProductService;
