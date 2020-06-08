import User from "../models/Users";
import { getRepository } from "typeorm";
import { hash } from 'bcryptjs'
import AppError from "../errors/AppError";

/**
 * Interface to request run
 */
interface Request {
  name: string;
  email: string;
  password: string;
}

/**
 * Define all methods to creat
 * new User in database
 */
class CreateUserService {

  /**
   * Create new User
   *
   * @param   Request interface to request run
   * @returns Promise<User> created user
   */
  public async run({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUser = await usersRepository.findOne({
      where: { email }
    })

    if (checkUser) {
      throw new AppError('Email adderess already used.')
    }
    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword
    })
    await usersRepository.save(user);

    return user;
  }

}

export default CreateUserService;
