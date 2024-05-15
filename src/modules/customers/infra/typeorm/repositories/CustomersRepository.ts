import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import Customers from "@modules/customers/infra/typeorm/entities/Customers";
import { ICustomersRepository, SearchParams } from "@modules/customers/domain/repositories/ICustomersRepository";
import { dataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { ICustomerPaginate } from "@modules/customers/domain/models/ICustomerPaginate";

export default class CustomersRepository implements ICustomersRepository  {
  private ormRepository: Repository<Customers>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Customers)
  }

  async create({name, email}: ICreateCustomer): Promise<Customers | null> {
    const customer = this.ormRepository.create({name, email});
    await this.save(customer);
    return customer;
  }

  async save(customer: Customers): Promise<Customers | null> {
    await this.ormRepository.save(customer);
    return customer;
  }

  async remove(customer: Customers): Promise<Customers | null> {
    await this.ormRepository.remove(customer);
    return customer;
  }

  async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate> {
    const [
      customers,
      count,
    ] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };

    return result;
  }

  async findById(id: string): Promise<Customers | null> {
    return await this.ormRepository.createQueryBuilder("customers")
    .where("customers.id = :id", { id })
    .getOne();
  }

  async findByName(name: string): Promise<Customers | null> {
    return await this.ormRepository.createQueryBuilder("customers")
    .where("customers.name = :name", { name })
    .getOne();
  }

  async findByEmail(email: string): Promise<Customers | null> {
    return await this.ormRepository.createQueryBuilder("customers")
    .where("customers.email = :email", { email })
    .getOne();
  }
}
