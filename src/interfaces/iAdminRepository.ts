import { IAdmin } from "../model/schema/admin.schema";
import { Admin } from "../model/admin.entities";
import { ICoupon } from "../model/schema/coupon.schema";
import { IBanner } from "../model/schema/banner.schema";

export interface IAdminRepository {
  register(userData: Admin): Promise<IAdmin | null>;
  findOne(email: string): Promise<IAdmin | null>;
  createCoupon(couponData:ICoupon): Promise<ICoupon | null>;
  getCoupons(): Promise<ICoupon[] | null>;
  createBanner(bannerData:IBanner): Promise<IBanner | null>;
  getBanners(): Promise<IBanner[] | null>;
  blockBanner(id:string):Promise<IBanner | null>;
  blockCoupon(id:string):Promise<ICoupon | null>;
}
