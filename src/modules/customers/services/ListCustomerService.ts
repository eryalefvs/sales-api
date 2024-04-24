import Customers from '@modules/customers/infra/typeorm/entities/Customers';
import { IPaginationMeta, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';

interface IPaginateCustomer {
  items: Customers[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  }
}

export default class ListCustomerService {
  async execute(page: number, limit: number): Promise<Pagination<Customers, IPaginationMeta>> {
    const queryBuilder = CustomersRepository.createQueryBuilder('customer');
    const customers = await paginate(queryBuilder, { page, limit });

    return customers;
  }
}
