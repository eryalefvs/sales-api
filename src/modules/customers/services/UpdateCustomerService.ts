import AppError from "@shared/errors/AppError";
import Customers from "../typeorm/entities/Customers";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  public async execute({id, name, email}: IRequest): Promise<Customers> {
    const customer = await CustomersRepository.findById(id);

    if(!customer) {
      throw new AppError("Customer not found");
    }

    const emailExists = await CustomersRepository.findByEmail(email);

    if(emailExists && email !== customer.email ) {
      throw new AppError("Email address already used");
    }

    customer.name = name;
    customer.email = email;

    CustomersRepository.save(customer);

    return customer;
  }
}
