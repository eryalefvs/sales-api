import AppError from "@shared/errors/AppError";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomer } from "../domain/models/ICustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({name, email}: ICreateCustomer): Promise<ICustomer | null> {

    const emailExists = await this.customersRepository.findByEmail(email);

    if(emailExists) {
      throw new AppError("Email address already used");
    }

    const customer = await this.customersRepository.create({
      name,
      email
    });

    return customer;
  }
}
