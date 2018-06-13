
export class Truck {
  $key: string;
  id: number;
  serial: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: number;
}

export class Package {
  $key: string;
  id: number;
  serial: string;
  description: string;
  date: any;
  firstName: string;
  lastName: string;
  truck: string;
}
