import { IAdminService } from "../interfaces/iAdminInterface";
import { IAdminRepository } from "../interfaces/iAdminRepository";
import { Admin } from "../model/admin.entities";
import jwt, { Secret } from "jsonwebtoken";
import "dotenv/config";
import crypto from "crypto";
import bcrypt from "bcryptjs";




export class AdminService implements IAdminService {
  private repository: IAdminRepository;

  constructor(repository: IAdminRepository) {
    this.repository = repository;
  }
 
  async adminRegister(adminData:Admin) {
    try {
      const isEmailExist = await this.repository.register(adminData);
      return {success :false , message :"admin created"}
    } catch (err) {
      return null;
    }
  }

  async adminLogin(email: string, password: string) {
    console.log("login server",email,password);
    const admin = await this.repository.findOne(email);
    if (!admin) {
      return { success: false, message: "Email incorrect" };
    }
    const isPassword = await admin.comparePassword(password);
    if (!isPassword) {
      return { success: false, message: "Password incorrect" };
    }
    return { success: true, message: "User found", admin };
    
  }

  


}
