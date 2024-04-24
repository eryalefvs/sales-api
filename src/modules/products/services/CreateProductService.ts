import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import Product from "@modules/products/typeorm/entities/Product"
import redisCache from "@shared/cache/RedisCache";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product | null> {
    const productExists = await ProductRepository.findByName(name);

    if (productExists) {
      throw new AppError("There is already one product with this name.")
    }


    const product = ProductRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate("api-vendas-PRODUCT_LIST")

    await ProductRepository.save(product)

    return product;
  }
}

export default CreateProductService;
