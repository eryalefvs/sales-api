import { Request, Response } from "express";
import ListUserService from "../../../services/ListUserService";
import CreateUserService from "../../../services/CreateUserService";
import { instanceToInstance } from "class-transformer";
import { container } from "tsyringe";
import ShowUserService from "@modules/users/services/ShowUserService";

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;
    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute({ page, limit });

    return response.json(instanceToInstance(users));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ user_id });

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    return response.json(instanceToInstance(user))
  }
}
