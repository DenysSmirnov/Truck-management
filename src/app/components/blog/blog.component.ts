import { Component, OnInit } from '@angular/core';
import { Truck, Package } from '../../models/post';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Observable, of } from 'rxjs';
import { MatCardSubtitle } from '@angular/material';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  viewProviders: [DragulaService]
})

export class BlogComponent implements OnInit {
  postList: Truck[];
  packageList: Package[];
  unPackageList: Package[];
  showDriver = false;
  showPackage = false;
  isEdit = false;
  sortedPostList: any[];
  sortedPackList: any[];
  // options: any = {
  //   removeOnSpill: true
  // };

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private dragulaService: DragulaService,
    private tostr: ToastrService
  ) {
      // dragulaService.setOptions('bag-one', {drag: true});
      this.dragulaService.drop.subscribe((value) => {
        // console.log(`drop: ${value[0]}`);
        this.onDrop(value.slice(1));
        // console.log(this);
      });
    }

  private onDrop(args) {
    const [el, target, source, sibling] = args;
    // console.log(el, target, source, sibling);
    if (!target.id) {
      target.id = 'Unassigned';
    }
    this.postService.dragAndDropPackage(el.id, target.id);
  }

  showDriverModal() {
    if (this.postService.selectedPost != null) {
      this.postService.selectedPost = {
        $key: null,
        id: null,
        serial: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: null
      };
    }
    this.showDriver = true;
    if (this.isEdit) {
      this.isEdit = false;
    }
  }
  showPackageModal() {
    if (this.postService.selectedPackage != null) {
      this.postService.selectedPackage = {
        $key: null,
        id: null,
        serial: '',
        description: '',
        firstName: '',
        lastName: '',
        date: null,
        truck: null
      };
    }
    this.showPackage = true;
    if (this.isEdit) {
      this.isEdit = false;
    }
  }

  ngOnInit() {
    this._selectedDatePackages();
    this._unassignedPackages();
  }

  private _selectedDatePackages(date?: string) {
    let x: any;
    if (date) {
      x = this.postService.getPackages(date);
    } else {
      const now = new Date().toLocaleDateString('en-US');
      x = this.postService.getPackages(now);
    }
    x.snapshotChanges().subscribe(item => {
      this.packageList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.packageList.push(y as Package);
      });
      this.packageList = this.packageList.filter(pack => pack.truck !== 'Unassigned');
      // console.log('PackL: ', this.packageList);
      this._selectedDateTrucks();
    });
  }

  private _selectedDateTrucks() {
    const x = this.postService.getData();
    x.snapshotChanges().subscribe(item => {
      const temp = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        const z = this.packageList.filter(pack => pack.truck === element.key);
        // if (z.length) { // only drivers with packages
          y['packages'] = z;
          temp.push(y as Truck);
          this.postList = temp.sort((a, b) => b['packages'].length);
        // }
      });
      // console.log('TruckL', this.postList);
    });
  }

  private _unassignedPackages() {
    const x = this.postService.getUnassignedPackages();
    x.snapshotChanges().subscribe(item => {
      const temp = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        temp.push(y as Package);
      });
      this.unPackageList = temp.sort((a, b) =>
        new Date(b.date).getDate() - new Date(a.date).getDate());
      // console.log('unPacklist: ', this.unPackageList);
    });
  }

  onChangedTruck(post: Truck) {
    this.showDriver = true;
    this.isEdit = true;
    this.postService.selectedPost = Object.assign({}, post['driver'], post);
  }

  onDeletedTruck(key: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.postService.deleteTruck(key);
      this.tostr.warning('Deleted Successfully', 'Truck Deleted');

      const x = this.postService.getAssignedPackages(key);
      if (x != null) {
        x.snapshotChanges().subscribe(item => {
          item.forEach(element => {
            const y = element.payload.toJSON();
            y['$key'] = element.key;
            y['truck'] = 'Unassigned';
            this.postService.movePackageToNotAssigned(y);
          });
        });
      }
    }
  }

  onChangedPackage(pack: Package) {
    this.showPackage = true;
    this.isEdit = true;
    pack.date = new Date(pack.date);
    this.postService.selectedPackage = Object.assign({}, pack['recipient'], pack);
  }

  onDeletedPackage(key: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.postService.deletePackage(key);
      this.tostr.warning('Deleted Successfully', 'Package Deleted');
    }
  }

  onChangeDate(date: string) {
    this._selectedDatePackages(date);
  }

  onTruckFilter(query: string): Observable<Truck[]> {
    if (query.length) {
      this.sortedPostList = this.postList.filter(truck =>
        new RegExp(`${query}`, 'i').test(
          [Object.values(truck['driver']).concat(truck.id, truck.serial)].toString()
        )
      );
      // console.log(this.sortedPostList);
      return of(this.sortedPostList);
    }
    this.sortedPostList = null;
  }

  onPackageFilter(query: string): Observable<any[]> {
    if (query.length) {
      console.log(this.postList);
      const x = this.postList.filter(truck =>
        truck['packages'].length > 0);
        const xxx = [];

      x.forEach((y, i) => {
        xxx.push(y['packages']);
      });
      console.log(xxx);
        // console.log(y['packages']);
      this.sortedPostList = xxx.filter(el =>
        // console.log(el);
        // tslint:disable-next-line:no-unused-expression
        new RegExp(`${query}`, 'i').test(
          Object.values( Object.assign({}, el, el.recipient) ).toString()
        )
      );
      console.log( Object.values( Object.assign({}, xxx) ) );


      this.sortedPackList = this.unPackageList.filter(y =>
        new RegExp(`${query}`, 'i').test(
          [Object.values(y['recipient']).concat(y.serial, y.date, y.description)].toString()
        )
      );

      // console.log(this.sortedPostList);
      // return of(this.sortedPostList);
      return of(this.sortedPackList);
    }
    this.sortedPostList = null;
    this.sortedPackList = null;
  }
}
