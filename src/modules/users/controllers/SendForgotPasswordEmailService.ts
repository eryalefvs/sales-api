import AppError from "@shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import { UserTokenRepository } from "../typeorm/repositories/UserTokenRepository";

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const user = await UserRepository.findByEmail(email);

    if(!user) {
      throw new AppError("User does not exists");
    }

    const token = await UserTokenRepository.generate(user.id);
  }
}

export default SendForgotPasswordEmailService;
