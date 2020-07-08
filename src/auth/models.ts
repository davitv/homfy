import {
  DataTypes,
  Model,
  Optional
} from "sequelize";
import sequelize from '../orm';

// These are all the attributes in the User model
interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string | null;
  firstName: string;
  lastName: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
export interface UserCreationAttributes extends Optional<UserAttributes, "id" | "email" | "firstName" | "lastName"> {}

class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public username!: string;
  public email!: string | null;
  public firstName!: string;
  public password!: string;
  public lastName!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      unique: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: new DataTypes.STRING(128),
      defaultValue: '',
    },
    lastName: {
      type: new DataTypes.STRING(128),
      defaultValue: '',
    },
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  }
);

export default User;
