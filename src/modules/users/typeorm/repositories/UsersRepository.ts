import { dataSource } from "@shared/typeorm";
import User from "../entities/User";

export const UserRepository = dataSource.getRepository(User).extend({
  findByName(name: string) {
    return this.createQueryBuilder("users")
    .where("users.name = :name", { name })
    .getOne();
  },

  findById(id: string) {
    return this.createQueryBuilder("users")
    .where("users.id = :id", { id })
    .getOne();
  },

  findByEmail(email: string) {
    return this.createQueryBuilder("users")
    .where("users.email = :email", { email })
    .getOne();
  },
})
