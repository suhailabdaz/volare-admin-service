import { AdminController } from "../controller/adminController";
import { AdminRepository } from "../repository/adminRepository";
import { AdminService } from "../services/admin.service";
import rabbitClient from "./client";

const adminRepository = new AdminRepository()
const service = new AdminService(adminRepository)
const controller = new AdminController(service)

export default class MessageHandler {
  static async handle(
    operation: string,
    data: any,
    correlationId: string,
    replyTo: string
  ) {
    let response = data;
    console.log("The operation in user service is", operation, data);

    switch (operation) {
      case "login":
        response = await controller.adminLogin.bind(controller)(data);
        break;
      case "register":
        response = await controller. adminCreate.bind(controller)(data);
        break;
      default:
        response = "Request-key notfound";
        break;
    }

    //Produce the response back to the client
    await rabbitClient.produce(response, correlationId, replyTo);
  }
}
