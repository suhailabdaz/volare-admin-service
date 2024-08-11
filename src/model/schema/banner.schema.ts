import mongoose, { Document, Model, Schema } from "mongoose";
import "dotenv/config";


export interface IBanner extends Document {
  banner_content: string;
  status: boolean;
  banner_image_link:string
}

const bannerSchema: Schema<IBanner> = new mongoose.Schema(
  {
    banner_image_link: {
      type: String,
      
    },
    status: {
      type: Boolean,
      default:true
    },
    banner_content: {
      type: String,
      
    },
  },
  {
    timestamps: true,
  }
);




const BannerModel: Model<IBanner> = mongoose.model("banners", bannerSchema);
export default BannerModel;
