import AppError from "@shared/errors/AppError";
import Customers from "../infra/typeorm/entities/Customers";
import { CustomersRepository } from "../infra/typeorm/repositories/CustomersRepository";

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({name, email}: IRequest): Promise<Customers> {
    const emailExists = await CustomersRepository.findByEmail(email);

    if(emailExists) {
      throw new AppError("Email address already used");
    }

    const customer = CustomersRepository.create({
      name,
      email
    });

    CustomersRepository.save(customer);

    return customer;
  }
}
