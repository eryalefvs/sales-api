import AppError from "@shared/errors/AppError";
import redisCache from "@shared/cache/RedisCache";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { ICreateProduct } from "../domain/models/ICreateProduct";
import { IProduct } from "../domain/models/IProduct";

@injectable()
class CreateProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductRepository
  ) {}

  public async execute({ name, price, quantity }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError("There is already one product with this name.")
    }


    const product = this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate("api-vendas-PRODUCT_LIST")

    return product;
  }
}

export default CreateProductService;
