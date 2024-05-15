import { dataSource } from "@shared/infra/typeorm";
import Product from "../entities/Product";
import { In, Repository } from "typeorm";
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";
import { IProductPaginate } from "@modules/products/domain/models/IProductPaginate";
import { IFindProduct } from "@modules/products/domain/models/IFindProduct";
import { ICreateProduct } from "@modules/products/domain/models/ICreateProduct";
import { IProduct } from "@modules/products/domain/models/IProduct";
import { IUpdateStockProduct } from "@modules/products/domain/models/IUpdateStockProduct";

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export default class ProductRepository implements IProductRepository{
  private ormRepository: Repository<Product>

  constructor() {
    this.ormRepository = dataSource.getRepository(Product)
  }

  async findByName(name: string): Promise<Product | null> {
    return await this.ormRepository.createQueryBuilder("products")
      .where("products.name = :name", { name })
      .getOne();
  }

  async findById(id: string): Promise<Product | null>{
    return await this.ormRepository.createQueryBuilder("products")
      .where("products.id = :id", { id })
      .getOne();
  }

  async findAll({ page, skip, take }: SearchParams): Promise<IProductPaginate> {
    const [products, count] = await this.ormRepository
    .createQueryBuilder()
    .skip(skip)
    .take(take)
    .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: products
    };

    return result;
  }

  async findAllByIds(product: IFindProduct[]) {
    const productsIds = product.map(product => product.id);

    return await this.ormRepository.find({
      where: {
        id: In(productsIds),
      }
    })
  }

  async create({name, price, quantity}: ICreateProduct): Promise<IProduct> {
    const product = this.ormRepository.create({ name, price, quantity});

    await this.ormRepository.save(product);

    return product;
  }

  async save(product: IProduct): Promise<IProduct> {
    this.ormRepository.save(product);
    return product;
  }

  async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.ormRepository.save(products);
  }

  async remove(product: Product): Promise<void> {
  await this.ormRepository.remove(product);
  }
}
