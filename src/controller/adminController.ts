import { IAdminService } from "../interfaces/iAdminInterface"
import { IBanner } from "../model/schema/banner.schema";
import { ICoupon } from "../model/schema/coupon.schema";
import { User } from "../model/user.entities";

export class AdminController {
  private service: IAdminService;

  constructor(service: IAdminService) {
    this.service = service;
  }

  adminLogin = async (data : any) => {
    try {
      const response = await this.service.adminLogin(data.email,data.password);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };
  userStatus = async (user:User) => {
    try {
      const response = await this.service.userStatus(user);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };

  createCoupon = async (couponData:ICoupon) => {
    try {
      const response = await this.service.createCoupon(couponData);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };

  getCoupons = async () => {
    try {
      const response = await this.service.getCoupons();
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };

  createBanner = async (bannerData:IBanner) => {
    try {
      const response = await this.service.createBanner(bannerData);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };

  getBanners = async () => {
    try {
      const response = await this.service.getBanners();
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };
  blockBanCoup = async (data:{id:string,type:string})=>{
    try{
        const response = await this.service.blockBanCoup(data)
        return response
    }catch (e: any) {
      console.log(e);
    }
  }
  
}
