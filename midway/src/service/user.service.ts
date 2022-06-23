import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import UserEntity from '../entity/user.entity';

@Provide()
export class UserService {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  async save(user: UserEntity): Promise<UserEntity> {
    try {
      const created = await this.userRepo.save(user);
      return created;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<UserEntity> {
    return this.userRepo
      .createQueryBuilder('user')
      .where('user.username=:username and user.password=:password', {
        username,
        password,
      })
      .getOne();
  }
}
