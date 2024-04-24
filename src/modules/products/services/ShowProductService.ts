import AppError from "@shared/errors/AppError";
import { ProductRepository } from "../infra/typeorm/repositories/ProductRepository";
import Product from "@modules/products/infra/typeorm/entities/Product"

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {

    const product = await ProductRepository.findOne({
      where: { id }
    });

    if(!product) {
      throw new AppError("Product not found.")
    }

    return product;
  }
}

export default ShowProductService;
