import { IAdmin } from "../model/schema/admin.schema";
import { Admin } from "../model/admin.entities";

export interface IAdminRepository {
  register(userData: Admin): Promise<IAdmin | null>;
  findOne(email: string): Promise<IAdmin | null>;
}
