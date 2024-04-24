import { ProductRepository } from "../infra/typeorm/repositories/ProductRepository";
import Product from "@modules/products/infra/typeorm/entities/Product"
import redisCache from "@shared/cache/RedisCache";

class ListProductService {
  public async execute(): Promise<Product[]> {

    let products = await redisCache.recover<Product[]>("api-vendas-PRODUCT_LIST");

    if(!products) {
      products = await ProductRepository.find();

      await redisCache.save("api-vendas-PRODUCT_LIST", products)
    }

    return products;
  }
}

export default ListProductService;
