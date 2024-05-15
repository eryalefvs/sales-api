import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { ICustomer } from "../domain/models/ICustomer";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

@injectable()
export default class UpdateCustomerService {
    constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({id, name, email}: IRequest): Promise<ICustomer> {
    const customer = await this.customersRepository.findById(id);

    if(!customer) {
      throw new AppError("Customer not found");
    }

    const emailExists = await this.customersRepository.findByEmail(email);

    if(emailExists && email !== customer.email ) {
      throw new AppError("Email address already used");
    }

    customer.name = name;
    customer.email = email;

    this.customersRepository.save(customer);

    return customer;
  }
}
