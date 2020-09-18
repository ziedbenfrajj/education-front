import { Role } from "../role/role";

export class User {
  id?: number;
  firstName?: String;
  lastName?: String;
  email?: string;
  address?: String;
  phoneNumber?: String;
  userName?: String;
  password?: String;
  role?: Role;
}
