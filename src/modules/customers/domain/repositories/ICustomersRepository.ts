import { ICreateCustomer } from "../models/ICreateCustomer";
import { ICustomer } from "../models/ICustomer";

export interface ICustomersRepository {
  findById(id: string): Promise<ICustomer | null>;
  findByName(name: string): Promise<ICustomer | null>;
  findByEmail(email: string): Promise<ICustomer | null>;
  create(data: ICreateCustomer): Promise<ICustomer | null>;
  save(customer: ICustomer): Promise<ICustomer | null>;
}
