import { threadId } from "worker_threads";
import Customers from "../infra/typeorm/entities/Customers";
import { CustomersRepository } from "../infra/typeorm/repositories/CustomersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

export default class ShowCustomerService {
  public async execute({id}: IRequest): Promise<Customers> {
    const customer = await CustomersRepository.findById(id);

    if(!customer) {
      throw new AppError("Customer not found.");
    }

    return customer;
  }
}
