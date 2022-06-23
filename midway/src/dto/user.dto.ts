import { Rule } from '@midwayjs/validate';

export default class UserLoginDTO {
  @Rule({ require: true })
  username: string;

  @Rule({ require: true })
  password: string;
}
