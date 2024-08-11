import mongoose, { Document, Model, Schema } from "mongoose";
import "dotenv/config";


export interface ICoupon extends Document {
  coupon_code:string;
  status: boolean;
  coupon_image_link:string;
  coupon_description:string;
  discount:number
}

const couponSchema: Schema<ICoupon> = new mongoose.Schema(
  {
    coupon_image_link: {
      type: String,
      
    },
    discount: {
      type: Number,
    },
    status: {
      type: Boolean,
      default:true
    },
    coupon_code: {
      type: String,
    },
    coupon_description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);




const CouponModel: Model<ICoupon> = mongoose.model("coupons", couponSchema);
export default CouponModel;
