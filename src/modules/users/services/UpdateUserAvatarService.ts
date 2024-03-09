import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import path from "path";
import uploadConfig from "@config/upload"
import fs from "fs"

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename}: IRequest): Promise<User> {
    const user = await UserRepository.findById(user_id)

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

    await UserRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
