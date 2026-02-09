export interface UserQuery {
  username?: string;
  password?: string;
  age?: number;
  status?: number;
}
//注册
export interface CreactUserDto {
  username: string;
  password: string;
}
// 登录
export interface LoginUserDto {
  username: string;
  password: string;
}
