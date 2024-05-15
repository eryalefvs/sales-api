import { dataSource } from "@shared/infra/typeorm";
import User from "../entities/User";
import { Repository } from "typeorm";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { IPaginateUser } from "@modules/users/domain/models/IPaginateUser";

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor(){
    this.ormRepository = dataSource.getRepository(User)
  }

  async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({ name, email, password});

    await this.ormRepository.save(user);

    return user;
  }

  async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateUser> {
    const [users, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: users,
    };

    return result;
  }

  findByName(name: string): Promise<User | null> {
    return this.ormRepository.createQueryBuilder("users")
    .where("users.name = :name", { name })
    .getOne();
  }

  findById(id: string): Promise<User | null> {
    return this.ormRepository.createQueryBuilder("users")
    .where("users.id = :id", { id })
    .getOne();
  }

  findByEmail(email: string): Promise<User | null> {
    return this.ormRepository.createQueryBuilder("users")
    .where("users.email = :email", { email })
    .getOne();
  }
}

