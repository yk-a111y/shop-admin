export interface ILoginInfo {
  logo_square: string
  logo_rectangle: string
  login_logo: string
  slide: string[]
}

// 登录信息
interface IMenu {
  path: string,
  title: string,
  icon: string,
  header: string,
  is_header: number,
  children?: IMenu
}
export interface IUserInfo {
  id: number,
  account: string,
  head_pic: string
}
export interface ILoginResponse {
  token: string,
  expires_time: number,
  menus: IMenu[],
  unique_auth: string[],
  user_info: IUserInfo,
  logo: string,
  logo_square: string,
  version: string,
  newOrderAudioLink: string
}
