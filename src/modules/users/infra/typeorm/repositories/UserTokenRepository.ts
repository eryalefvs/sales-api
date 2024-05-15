import { dataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { IUserTokensRepository } from "@modules/users/domain/repositories/IUserTokenRepository";
import { IUserToken } from "@modules/users/domain/models/IUserToken";
import UserToken from "../entities/UserToken";


export default class UserTokenRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>

  constructor() {
    this.ormRepository = dataSource.getRepository(UserToken)
  }

  async findByToken(token: string): Promise<IUserToken | null> {
    return this.ormRepository.createQueryBuilder("user_tokens")
    .where("user_tokens.token = :token", { token })
    .getOne();
  }

  async generate(user_id: string): Promise<IUserToken> {
    const userToken = this.ormRepository.create({user_id});

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
