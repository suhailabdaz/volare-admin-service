import { IAdminService } from '../interfaces/iAdminInterface';
import { IAdminRepository } from '../interfaces/iAdminRepository';
import { Admin } from '../model/admin.entities';
import 'dotenv/config';
import { User } from '../model/user.entities';
import { ICoupon } from '../model/schema/coupon.schema';
import { IBanner } from '../model/schema/banner.schema';

export class AdminService implements IAdminService {
  private repository: IAdminRepository;

  constructor(repository: IAdminRepository) {
    this.repository = repository;
  }

  async adminLogin(email: string, password: string) {
    const admin = await this.repository.findOne(email);
    if (!admin) {
      return { success: false, message: 'Access Denied' };
    }
    if (!admin.password) {
      return { success: false, message: 'Access Denied' };
    }
    const isPassword = await admin.comparePassword(password);
    if (!isPassword) {
      return { success: false, message: 'Access Denied' };
    }
    const accessToken = admin.SignAccessToken();
    const refreshToken = admin.SignRefreshToken();
    return {
      success: true,
      message: 'Access granted',
      admin,
      accessToken,
      refreshToken,
    };
  }

  async userStatus(user: any) {
    try {
      user.status = !user.status;
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error resending OTP: ${error.message}`);
      }
      throw error;
    }
  }

  async createCoupon(couponData: ICoupon) {
    try {
      const coupon = await this.repository.createCoupon(couponData)
      return coupon;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error resending OTP: ${error.message}`);
      }
      throw error;
    }
  }

  async getCoupons() {
    try {
      const coupons = await this.repository.getCoupons()
      return coupons;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error resending OTP: ${error.message}`);
      }
      throw error;
    }
  }

  async createBanner(bannerData: IBanner) {
    try {
      const banner = await this.repository.createBanner(bannerData)
      return banner;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error resending OTP: ${error.message}`);
      }
      throw error;
    }
  }

  async getBanners() {
    try {
      const banners = await this.repository.getBanners()
      return banners;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error resending OTP: ${error.message}`);
      }
      throw error;
    }
  }

  async blockBanCoup(data:{id:string,type:string}) {
    try {
      let result
      if(data.type==='banner'){
        result = await this.repository.blockBanner(data.id)
      }else if(data.type === 'coupon'){        
        result = await this.repository.blockCoupon(data.id)
      }
      return result
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error resending OTP: ${error.message}`);
      }
      throw error;
    }
  }
}
