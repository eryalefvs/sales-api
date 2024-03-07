import AppError from "@shared/errors/AppError";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import Product from "@modules/products/typeorm/entities/Product"

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({ id,
  name,
  price,
  quantity
}: IRequest): Promise<Product> {

    const product = await ProductRepository.findOne({
      where: { id }
    });

    if(!product) {
      throw new AppError("Product not found.")
    }

    const productExists = await ProductRepository.findByName(name)

    if(productExists && name != product.name) {
      throw new AppError("There is already one product with this name")
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await ProductRepository.save(product)

    return product;
  }
}

export default UpdateProductService;
