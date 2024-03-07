import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";

class ListUserService {
  public async execute(): Promise<User[]> {

    const users = await UserRepository.find();

    return users;
  }
}

export default ListUserService;
