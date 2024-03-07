import { dataSource } from "@shared/typeorm/index";
import Product from "../entities/Product";

export const ProductRepository = dataSource.getRepository(Product).extend({
  findByName(name: string) {
    return this.createQueryBuilder("products")
      .where("products.name = :name", { name })
      .getOne();
  },
});
