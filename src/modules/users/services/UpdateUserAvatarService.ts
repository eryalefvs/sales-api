import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import path from "path";
import uploadConfig from "@config/upload"
import fs from "fs"
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IUpdateUserAvatar } from "../domain/models/IUpdateUserAvatar";

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFilename}: IUpdateUserAvatar): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if(!user) {
      throw new AppError("User not found");
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if(userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
