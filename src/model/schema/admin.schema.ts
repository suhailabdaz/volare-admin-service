import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Admin } from "../admin.entities";

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IAdmin extends Document {
  name: string;
  email: string;
  password?: string;
  status: boolean;
  comparePassword: (password: string) => Promise<boolean>;

}

const adminSchema: Schema<IAdmin> = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value: string) {
          return emailRegex.test(value);
        },
        message: "Please enter a valid email.",
      },
      unique: true,
    },

    password: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password
adminSchema.pre<IAdmin>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password || "", 10);
  next();
});

// sign access token
adminSchema.methods.SignAccessToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.ACCESS_TOKEN || "",
    {
      expiresIn: "5m",
    }
  );
};

// sign refresh token
adminSchema.methods.SignRefreshToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.REFRESH_TOKEN || "",
    {
      expiresIn: "3d",
    }
  );
};

// compare password
adminSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const AdminModel: Model<IAdmin> = mongoose.model("Admin", adminSchema);
export default AdminModel;
