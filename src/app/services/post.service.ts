import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Truck, Package } from '../models/post';
// import { Observable, of } from 'rxjs';

@Injectable()
export class PostService {
  trucksRef: AngularFireList<any>;
  packList: AngularFireList<any>;
  selectedPost: Truck = new Truck();
  selectedPackage: Package = new Package();

  constructor(private db: AngularFireDatabase) {}

  public getData() {
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

    // movePackage()

    // if (this.packList != null) {
    //   this.packList.snapshotChanges().subscribe(item => {
    //     item.forEach(element => {
    //       const y = element.payload.toJSON();
    //       console.log(y);
    //       y['truck'] = 'Unassigned';

    //       this.packList.push(y as Package);
    //     });
    //   });
    // }
  }

  public getPackages(date: string) {
    this.packList = this.db.list('packages', ref =>
      ref.orderByChild('date').equalTo(date));
    return this.packList;
  }

  public getAssignedPackages(key: string) {
    this.packList = this.db.list('packages', ref =>
    ref.orderByChild('truck').equalTo(key));
  return this.packList;
  }

  public getUnassignedPackages() {
    this.packList = this.db.list('packages', ref =>
      ref.orderByChild('truck').equalTo('Unassigned'));
    return this.packList;
  }

  public insertPackage(pack: Package) {
    this.packList.push({
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
    // console.log(pack.date);
  }

  public updatePackage(pack: Package) {
    this.packList.update(pack.$key,
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
    this.packList.remove($key);
  }

  public movePackageToNotAssigned(obj: any) {
    this.packList.update(obj.$key, { truck: obj.truck });
  }
}



  // public getSinglePost(id: number): Observable<Post> {
  //   const singlePost = this.trucksRef.filter(post => post.id === id).pop();
  //   return of(singlePost);
  // }
