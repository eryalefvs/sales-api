import AppError from "@shared/errors/AppError";
import { IShowProduct } from "../domain/models/IShowProduct";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { IProduct } from "../domain/models/IProduct";

@injectable()
class ShowProductService {
    constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductRepository
  ) {}

  public async execute({ id }: IShowProduct): Promise<IProduct> {

    const product = await this.productsRepository.findById(id);

    if(!product) {
      throw new AppError("Product not found.")
    }

    return product;
  }
}

export default ShowProductService;
