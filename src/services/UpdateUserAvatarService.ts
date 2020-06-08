import { getRepository } from "typeorm";
import User from "../models/Users";
import fs from 'fs';

import path from 'path';
import uploadConfig from '../config/upload';
import AppError from "../errors/AppError";

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {

  public async run({ user_id, avatarFileName }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if (user.avatar) {
      const userAvatarPath = path.resolve(uploadConfig.directory, user.avatar)
      const userAvatarExist = await fs.promises.stat(userAvatarPath)

      if (userAvatarExist) {
        await fs.promises.unlink(userAvatarPath)
      }
    }

    user.avatar = avatarFileName;
    await usersRepository.save(user);

    return user;
  }

}

export default UpdateUserAvatarService;
