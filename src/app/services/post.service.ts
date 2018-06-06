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

  constructor(private db: AngularFireDatabase) {
    // this.posts = Observable.create((observer) => {
    //   // setTimeout(() => {
    //     observer.next(this.trucksRef);
    //   // }, 2000);
    // });
  }

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
  // public getSinglePost(id: number): Observable<Post> {
  //   const singlePost = this.trucksRef.filter(post => post.id === id).pop();
  //   return of(singlePost);
  // }

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

  public getPackages(date?: string) {
    if (date) {
      this.packList = this.db.list('packages', ref =>
      ref.orderByChild('date').equalTo(date));
      return this.packList;
    }
    // return this.packList = this.db.list('packages');
    console.log(this.packList);
    // this.packList = this.db.list('packages', ref =>
    //   ref.orderByChild('date').equalTo(Date.now()));
    //   console.log(Date.now());
    //   return this.packList;
  }

  public getUnassignedPackages() {
    this.packList = this.db.list('packages', ref =>
      ref.orderByChild('truck').equalTo(null));
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
        date: pack.date,
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
}
