import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Truck, Package } from '../models/post';
// import { Observable, of } from 'rxjs';

@Injectable()
export class PostService {
  postList: AngularFireList<any>;
  packList: AngularFireList<any>;
  selectedPost: Truck = new Truck();
  selectedPackage: Package = new Package();
  // public posts: Observable<Truck[]>;

  // public posts: Observable<Post[]>;

  constructor(private firebase: AngularFireDatabase) {
    // this.posts = Observable.create((observer) => {
    //   // setTimeout(() => {
    //     observer.next(this.postList);
    //   // }, 2000);
    // });
  }

  public getData() {
    this.postList = this.firebase.list('trucks');
    return this.postList;
  }

  public insertTruck(truck: Truck) {
    this.postList.push({
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
  //   const singlePost = this.postList.filter(post => post.id === id).pop();
  //   return of(singlePost);
  // }

  public updateTruck(truck: Truck) {
    this.postList.update(truck.$key,
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
    this.postList.remove($key);
  }

  public getPackages() {
    this.packList = this.firebase.list('packages');
    return this.packList;
  }

  public insertPackage(pack: Package) {
    this.packList.push({
      id: pack.id,
      serial: pack.serial,
      recipient: {
        description: pack.description,
        date: new Date(pack.date).toLocaleDateString('en-US'),
        firstName: pack.firstName,
        lastName: pack.lastName
      }
    });
  }

  public updatePackage(pack: Package) {
    this.packList.update(pack.$key,
      {
        id: pack.id,
        serial: pack.serial,
        recipient: {
          description: pack.description,
          date: pack.date,
          firstName: pack.firstName,
          lastName: pack.lastName
        }
      });
  }

  public deletePackage($key: string) {
    this.packList.remove($key);
  }
}
