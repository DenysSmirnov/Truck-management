// function* generateId() {
//   let index = 1;
//   while (true) {
//     yield index++;
//   }
// }

// const generator = generateId();

export class Truck {
  $key: string;
  id: number;
  serial: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: number;

  // constructor() {
  //   this.id = generator.next().value;
  // }
}

export class Package {
  $key: string;
  id: number;
  serial: string;
  description: string;
  date: string;
  firstName: string;
  lastName: string;
  truck: string;
}
