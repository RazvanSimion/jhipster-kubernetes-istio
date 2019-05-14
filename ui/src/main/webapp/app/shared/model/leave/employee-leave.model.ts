export interface IEmployeeLeave {
  id?: string;
  employeeCode?: string;
  total?: number;
  available?: number;
}

export class EmployeeLeave implements IEmployeeLeave {
  constructor(public id?: string, public employeeCode?: string, public total?: number, public available?: number) {}
}
