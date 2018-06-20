import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Truck, Package } from '../models/post';

@Injectable()
export class PostService {
  trucksRef: AngularFireList<any>;
  packagesRef: AngularFireList<any>;
  selectedPost: Truck = new Truck();
  selectedPackage: Package = new Package();

  constructor(private db: AngularFireDatabase) {}

  public getTrucks() {
    this.trucksRef = this.db.list('trucks');
    return this.trucksRef;
  }

  public insertTruck(truck: Truck) {
    this.trucksRef.push({
      id: truck.id,
      serial: truck.serial,
      driver: {
        email: truck.email,
        firstName: truck.firstName,
        lastName: truck.lastName,
        phone: truck.phone
      }
    });
  }

  public updateTruck(truck: Truck) {
    this.trucksRef.update(truck.$key,
      {
        id: truck.id,
        serial: truck.serial,
        driver: {
          email: truck.email,
          firstName: truck.firstName,
          lastName: truck.lastName,
          phone: truck.phone
        }
      });
  }

  public deleteTruck($key: string) {
    this.trucksRef.remove($key);
  }

  public getPackages(date: string) {
    this.packagesRef = this.db.list('packages', ref =>
      ref.orderByChild('date').equalTo(date));
    return this.packagesRef;
  }

  public getAssignedPackages(key: string) {
    this.packagesRef = this.db.list('packages', ref =>
    ref.orderByChild('truck').equalTo(key));
  return this.packagesRef;
  }

  public insertPackage(pack: Package) {
    this.packagesRef.push({
      id: pack.id,
      serial: pack.serial,
      description: pack.description,
      date: new Date(pack.date).toLocaleDateString('en-US'),
      recipient: {
        firstName: pack.firstName,
        lastName: pack.lastName
      },
      truck: pack.truck
    });
  }

  public updatePackage(pack: Package) {
    this.packagesRef.update(pack.$key,
      {
        id: pack.id,
        serial: pack.serial,
        description: pack.description,
        date: new Date(pack.date).toLocaleDateString('en-US'),
        recipient: {
          firstName: pack.firstName,
          lastName: pack.lastName
        },
        truck: pack.truck
      });
  }

  public deletePackage($key: string) {
    this.packagesRef.remove($key);
  }

  public movePackageToNotAssigned(obj: any) {
    this.packagesRef.update(obj.$key, { truck: obj.truck });
  }

  public dragAndDropPackage(packId: string, truckId: string) {
    this.packagesRef.update(packId, { truck: truckId });
  }
}

