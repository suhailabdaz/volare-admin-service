export class Coupon {
  constructor(
    public readonly coupon_code: string,
    public readonly _id: string,
    public readonly coupon_image_link:string,
    public readonly coupon_description: string,
    public readonly discount:string
  ) {}
}
