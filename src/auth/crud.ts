import User, {UserCreationAttributes} from './models';
import {encryptPassword} from './utils';

export const createUser = async ({password, ...data}: UserCreationAttributes): Promise<User> => {
  const user = User.build({
    ...data,
    password: await encryptPassword(password)
  });
  return user.save();
}
