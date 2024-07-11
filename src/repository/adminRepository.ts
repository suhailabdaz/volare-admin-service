import { IAdminRepository } from "../interfaces/iAdminRepository";
import AdminModel, { IAdmin } from "../model/schema/admin.schema";
import { Admin } from "../model/admin.entities";


export class AdminRepository implements IAdminRepository {


  register(adminData: Admin): Promise<IAdmin | null> {
    try {
      return AdminModel.create(adminData);
    } catch (e: any) {
      throw new Error("db error");
    }
  }

  async findOne(email: string): Promise<IAdmin | null> {
    try {
      const user = await AdminModel.findOne({ email });
      return user;
    } catch (e: any) {
      throw new Error("db error");
    }
  }
}
