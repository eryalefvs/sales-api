import { ICreateCustomer } from "../models/ICreateCustomer";
import { ICustomer } from "../models/ICustomer";
import { ICustomerPaginate } from "../models/ICustomerPaginate";

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ICustomersRepository {
  findAll({ page, skip, take }: SearchParams): Promise<ICustomerPaginate>
  findById(id: string): Promise<ICustomer | null>;
  findByName(name: string): Promise<ICustomer | null>;
  findByEmail(email: string): Promise<ICustomer | null>;
  create(data: ICreateCustomer): Promise<ICustomer | null>;
  save(customer: ICustomer): Promise<ICustomer | null>;
  remove(customer: ICustomer): Promise<ICustomer | null>;
}
