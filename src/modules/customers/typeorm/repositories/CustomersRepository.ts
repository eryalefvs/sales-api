import { dataSource } from "@shared/typeorm";
import Customers from "../entities/Customers";

export const CustomersRepository = dataSource.getRepository(Customers).extend({
  findById(id: string) {
    return this.createQueryBuilder("customers")
    .where("customers.id = :id", { id })
    .getOne();
  },

  findByName(name: string) {
    return this.createQueryBuilder("customers")
    .where("customers.name = :name", { name })
    .getOne();
  },

  findByEmail(email: string) {
    return this.createQueryBuilder("customers")
    .where("customers.email = :email", { email })
    .getOne();
  }
})
