import { UserRole, UserStatus } from "@prisma/client";

export interface IUser {
  id?: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IUserFilterRequest = {
  name?: string | undefined;
  email?: string | undefined;
  contactNumber?: string | undefined;
  searchTerm?: string | undefined;
};
