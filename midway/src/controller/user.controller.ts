import { Body, Controller, Get, Inject, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import RespData from '../dto/response.dto';
import UserLoginDTO from '../dto/user.dto';
import UserEntity from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { JwtService } from '@midwayjs/jwt';

// 用户
@Controller('/user')
export class HomeController {
  @Inject()
  ctx: Context;
  @Inject()
  userService: UserService;
  @Inject()
  jwt: JwtService;

  /**
   * 添加用户
   */
  @Get('/add')
  async add() {
    const user: UserEntity = {
      id: null,
      username: 'jack',
      password: 'redballoon',
    };
    const result = await this.userService.save(user);
    if (result.id > 0) {
      return RespData.success('成功', result);
    } else {
      return RespData.fail('失败');
    }
  }

  /**
   * 登录接口
   * @param loginDto
   * @returns
   */
  @Post('/login')
  async login(@Body() loginDto: UserLoginDTO): Promise<any> {
    const user = await this.userService.getUserByUsernameAndPassword(
      loginDto.username,
      loginDto.password
    );
    if (user != null) {
      const token = await this.jwt.sign({ username: user.username });
      return RespData.success('登录成功', { token: token });
    } else {
      return RespData.fail('用户名或密码错误');
    }
  }
}
