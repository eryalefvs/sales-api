import AppError from "@shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import { UserTokenRepository } from "../typeorm/repositories/UserTokenRepository";
import EtherealMail from "@config/mail/EtherealMail";
import path from "path"

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const user = await UserRepository.findByEmail(email);

    if(!user) {
      throw new AppError("User does not exists");
    }

    const { token } = await UserTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, "..", "views", "forgot_password.hbs");

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: "[API Vendas] Recuperação de Senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        }
      }
    })
  }
}

export default SendForgotPasswordEmailService;
