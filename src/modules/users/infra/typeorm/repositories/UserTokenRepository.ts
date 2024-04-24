import { dataSource } from "@shared/typeorm";
import UserToken from "../entities/UserToken";

export const UserTokenRepository = dataSource.getRepository(UserToken).extend({
  findByToken(token: string) {
    return this.createQueryBuilder("user_tokens")
    .where("user_tokens.token = :token", { token })
    .getOne();
  },

  async generate(user_id: string) {
    const userToken = this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  }
})
