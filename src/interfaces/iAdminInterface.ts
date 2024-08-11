import { Admin } from "../model/admin.entities";
import { IBanner } from "../model/schema/banner.schema";
import { ICoupon } from "../model/schema/coupon.schema";
import {User} from '../model/user.entities'

export interface IAdminService {
  adminLogin(email: string, password: string): any;
  userStatus(user:any):any
  createCoupon(couponData:ICoupon):any
  getCoupons(): any
  createBanner(bannerData:IBanner):any
  getBanners(): any
  blockBanCoup(data:{id:string,type:string}):any
}
