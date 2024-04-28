import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import Customers from "../entities/Customers";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { dataSource } from "@shared/infra/typeorm";

export const CustomersRepository: ICustomersRepository = dataSource.getRepository(Customers).extend({
  async create({name, email}: ICreateCustomer): Promise<Customers | null> {
    const customer = this.create({name, email});
    await this.save(customer);
    return customer;
  },

  async save(customer: Customers): Promise<Customers | null> {
    await this.save(customer);
    return customer;
  },

  async findById(id: string): Promise<Customers | null> {
    return await this.createQueryBuilder("customers")
    .where("customers.id = :id", { id })
    .getOne();
  },

  async findByName(name: string): Promise<Customers | null> {
    return await this.createQueryBuilder("customers")
    .where("customers.name = :name", { name })
    .getOne();
  },

  async findByEmail(email: string): Promise<Customers | null> {
    return await this.createQueryBuilder("customers")
    .where("customers.email = :email", { email })
    .getOne();
  }
})
