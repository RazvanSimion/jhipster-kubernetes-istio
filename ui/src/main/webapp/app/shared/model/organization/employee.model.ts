import { IDepartment } from 'app/shared/model/organization/department.model';

export const enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export interface IEmployee {
  id?: string;
  code?: string;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  department?: IDepartment;
}

export class Employee implements IEmployee {
  constructor(
    public id?: string,
    public code?: string,
    public firstName?: string,
    public lastName?: string,
    public gender?: Gender,
    public email?: string,
    public phone?: string,
    public addressLine1?: string,
    public addressLine2?: string,
    public city?: string,
    public country?: string,
    public department?: IDepartment
  ) {}
}
