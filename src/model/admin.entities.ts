export class Admin {
  constructor(
    public readonly email: string,
    public readonly isVerified: boolean,
    public password?: string,
    public readonly _id?: string
  ) {}
}
