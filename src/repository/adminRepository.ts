import { IAdminRepository } from '../interfaces/iAdminRepository';
import AdminModel, { IAdmin } from '../model/schema/admin.schema';
import { Admin } from '../model/admin.entities';
import CouponModel, { ICoupon } from '../model/schema/coupon.schema';
import BannerModel, { IBanner } from '../model/schema/banner.schema';

export class AdminRepository implements IAdminRepository {
  register(adminData: Admin): Promise<IAdmin | null> {
    try {
      return AdminModel.create(adminData);
    } catch (e: any) {
      throw new Error('db error');
    }
  }

  async findOne(email: string): Promise<IAdmin | null> {
    try {
      const user = await AdminModel.findOne({ email });
      return user;
    } catch (e: any) {
      throw new Error('db error');
    }
  }

  async createCoupon(couponData: ICoupon): Promise<ICoupon | null> {
    try {
      const coupon = await CouponModel.create(couponData);
      return coupon;
    } catch (e: any) {
      throw new Error('db error');
    }
  }
  async getCoupons(): Promise<ICoupon[] | null> {
    try {
      const coupons = await CouponModel.find();
      return coupons;
    } catch (e: any) {
      throw new Error('db error');
    }
  }

  async createBanner(bannerData: IBanner): Promise<IBanner | null> {
    try {
      const coupon = await BannerModel.create(bannerData);
      return coupon;
    } catch (e: any) {
      throw new Error('db error');
    }
  }
  async getBanners(): Promise<IBanner[] | null> {
    try {
      const coupons = await BannerModel.find();
      return coupons;
    } catch (e: any) {
      throw new Error('db error');
    }
  }


  async blockBanner(id: string): Promise<IBanner | null> {
    try {
      const banner = await BannerModel.findById(id);

      if (!banner) {
        throw new Error('Banner not found');
      }
      banner.status = !banner.status;
      const updatedBanner = await banner.save();

      return updatedBanner;
    } catch (e: any) {
      throw new Error('db error');
    }
  }

  async blockCoupon(id: string): Promise<ICoupon | null> {
    try {      
      const coupon = await CouponModel.findById(id);
      if (!coupon) {
        throw new Error('coupon not found');
      }
      coupon.status = !coupon.status;
      const updatedCoupon = await coupon.save();
      return updatedCoupon;
    } catch (e: any) {
      throw new Error('db error');
    }
  }
}
