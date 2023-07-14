import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserToDB = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};

export const UserServices = {
    createUserToDB
}
