import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { ICustomer } from "../domain/models/ICustomer";

interface IRequest {
  id: string;
}

@injectable()
export default class ShowCustomerService {
    constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({id}: IRequest): Promise<ICustomer> {
    const customer = await this.customersRepository.findById(id);

    if(!customer) {
      throw new AppError("Customer not found.");
    }

    return customer;
  }
}
