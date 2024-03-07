import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import Product from "@modules/products/typeorm/entities/Product"

class ListProductService {
  public async execute(): Promise<Product[]> {

    const products = await ProductRepository.find();

    return products;
  }
}

export default ListProductService;
