import Customers from "../typeorm/entities/Customers";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

export default class ListCustomerService {
  public async execute(): Promise<Customers[]> {
    const customers = await CustomersRepository.find();

    return customers;
  }
}
