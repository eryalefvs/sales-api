import { Request, Response } from "express";
import ListCustomerService from "../../../services/ListCustomerService";
import ShowCustomerService from "../../../services/ShowCustomerService";
import CreateCustomerService from "../../../services/CreateCustomerService";
import UpdateCustomerService from "../../../services/UpdateCustomerService";
import DeleteCustomerService from "../../../services/DeleteCustomerService";
import { CustomersRepository } from "../../typeorm/repositories/CustomersRepository";

export default class CustomersController {
  public async index(request: Request, response: Response) {
    const listCustomer = new ListCustomerService();

    const customers = await listCustomer.execute(1, 15);

    response.json(customers);
  }
  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const showCustomer = new ShowCustomerService();

    const customer = await showCustomer.execute({id});

    response.json(customer);
  }

  public async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const customersRepository = CustomersRepository;

    const createCustomer = new CreateCustomerService(customersRepository);

    const customer = await createCustomer.execute({ name, email });

    response.json(customer);
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email } = request.body;

    const updateCustomer = new UpdateCustomerService();

    const customer = await updateCustomer.execute({ id, name, email });

    response.json(customer);
  }
  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute({ id });

    response.json([])
  }
}
