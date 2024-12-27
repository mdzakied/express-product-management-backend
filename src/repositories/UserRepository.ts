import UserModel, { IUser } from "../models/UserModel";

class UserRepository {
  // Find user by email
  async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  // Find user by name
  async findByName(name: string): Promise<IUser | null> {
    return await UserModel.findOne({ name });
  }

  // Save a new user
  async create(userData: IUser): Promise<IUser> {
    const newUser = new UserModel(userData);
    return await newUser.save();
  }
}

export default new UserRepository();
