import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import Product from "@modules/products/typeorm/entities/Product"

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

    await ProductRepository.save(product)

    return product;
  }
}

export default CreateProductService;
