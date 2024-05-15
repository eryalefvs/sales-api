import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteCustomerService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({id}: IRequest): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if(!customer) {
      throw new AppError("Customer not found.");
    }

    await this.customersRepository.remove(customer);
  }
}
