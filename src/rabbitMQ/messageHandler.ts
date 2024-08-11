import { AdminController } from '../controller/adminController';
import { AdminRepository } from '../repository/adminRepository';
import { AdminService } from '../services/admin.service';
import rabbitClient from './client';

const adminRepository = new AdminRepository();
const service = new AdminService(adminRepository);
const controller = new AdminController(service);

export default class MessageHandler {
  static async handle(
    operation: string,
    data: any,
    correlationId: string,
    replyTo: string
  ) {
    let response = data;
    console.log('The operation in user service is', operation, data);

    switch (operation) {
      case 'login':
        response = await controller.adminLogin.bind(controller)(data);
        break;
      case 'user-status-reverse':
        response = await controller.userStatus.bind(controller)(data);
        break;
      case 'get-banners':
        response = await controller.getBanners.bind(controller)();
        break;
      case 'get-coupons':
        response = await controller.getCoupons.bind(controller)();
        break;
      case 'create-banner':
        response = await controller.createBanner.bind(controller)(data);
        break;
      case 'create-coupon':
        response = await controller.createCoupon.bind(controller)(data);
        break;
        case 'block-ban':
          response = await controller.blockBanCoup.bind(controller)(data);
          break;
      default:
        response = 'Request-key notfound';
        break;
    }

    //Produce the response back to the client
    await rabbitClient.produce(response, correlationId, replyTo);
  }
}
