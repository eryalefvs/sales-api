import { dataSource } from "@shared/typeorm/index";
import Product from "../entities/Product";
import { In } from "typeorm";

interface IFindProducts {
  id: string;
}

export const ProductRepository = dataSource.getRepository(Product).extend({
  findByName(name: string) {
    return this.createQueryBuilder("products")
      .where("products.name = :name", { name })
      .getOne();
  },

  async findAllByIds(product: IFindProducts[]) {
    const productsIds = product.map(product => product.id);

    return await this.find({
      where: {
        id: In(productsIds),
      }
    })
  }
});
