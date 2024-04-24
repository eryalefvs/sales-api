import User from "../infra/typeorm/entities/User";
import { UserRepository } from "../infra/typeorm/repositories/UsersRepository";

class ListUserService {
  public async execute(): Promise<User[]> {

    const users = await UserRepository.find();

    return users;
  }
}

export default ListUserService;
