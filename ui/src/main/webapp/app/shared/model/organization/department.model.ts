export interface IDepartment {
  id?: string;
  code?: string;
  name?: string;
}

export class Department implements IDepartment {
  constructor(public id?: string, public code?: string, public name?: string) {}
}
