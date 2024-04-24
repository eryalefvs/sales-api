import AppError from "@shared/errors/AppError";
import { CustomersRepository } from "../infra/typeorm/repositories/CustomersRepository";

interface IRequest {
  id: string;
}

export default class DeleteCustomerService {
  public async execute({id}: IRequest): Promise<void> {
    const customer = await CustomersRepository.findById(id);

    if(!customer) {
      throw new AppError("Customer not found.");
    }

    await CustomersRepository.remove(customer);
  }
}
