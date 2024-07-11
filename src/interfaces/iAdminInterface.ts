import { Admin } from "../model/admin.entities";

export interface IAdminService {
  adminRegister(adminData: Admin): any;
  adminLogin(email: string, password: string): any;
}
