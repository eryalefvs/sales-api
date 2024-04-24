import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import { UserRepository } from "../infra/typeorm/repositories/UsersRepository";
import { hash } from "bcryptjs";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password}: IRequest): Promise<User> {
    const emailExists = await UserRepository.findByEmail(email);

    if(emailExists) {
      throw new AppError("Email address alread used.")
    }

    const hashedPassword = await hash(password, 8)

    const user = UserRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    await UserRepository.save(user);

    return user;
  }
}

export default CreateUserService;
