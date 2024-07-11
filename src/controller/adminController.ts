import { IAdminService } from "../interfaces/iAdminInterface"

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

  adminCreate = async (data :any) =>{
    try {
      const response = await this.service.adminRegister(data);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  }
}
