import { Component, OnInit } from '@angular/core';
import { Truck, Package } from '../../models/post';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
// import { Observable } from 'rxjs';

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
  // options: any = {
  //   removeOnSpill: true
  // };
  // routes: Truck[] = [];

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private dragulaService: DragulaService,
    private tostr: ToastrService
  ) {
      // dragulaService.setOptions('bag-one', {drag: true});
      dragulaService.drop.subscribe((value) => {
        console.log(`drop: ${value[0]}`);
        this.onDrop(value.slice(1));
      });
    }

  private onDrop(args) {
    const [e, el] = args;
    // do something
    console.log(e, el);
  }

  showDriverModal() {
    this.showDriver = true;
  }
  showPackageModal() {
    this.showPackage = true;
  }

  ngOnInit() {
    this._selectedDatePackages();
    this._selectedDateTrucks();
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
      this.packageList = this.packageList.filter(pack => pack['truck'] !== 'Unassigned');
      // console.log(this.packageList);
    });
  }

  private _selectedDateTrucks() { // date?: string
    const x = this.postService.getData();
    x.snapshotChanges().subscribe(item => {
      this.postList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;

        // this.packageList.filter(pack => pack['truck'] === element.key);
        // console.log('!!', this.packageList);

        this.postList.push(y as Truck);
        // console.log(element.key);
      });
      // for (let post of this.postList) {
      //   for (let pack of this.packageList) {
      //     if (pack.truck === post.$key) {
      //       if (post['packages'] && post['packages'].includes(pack.$key) === -1) {
      //         post['packages'].push(pack.$key);
      //       } else {
      //         post['packages'] = [pack.$key];
      //       }
      //       this.routes.push(post);
      //     }
      //   }
      // }
      // console.log(this.routes);
      console.log(this.postList);

    });
  }

  private _unassignedPackages() {
    const x = this.postService.getUnassignedPackages();
    x.snapshotChanges().subscribe(item => {
      this.unPackageList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.unPackageList.push(y as Package);
      });
      // console.log('unPacklist: ', this.unPackageList);
    });
  }

  onChangedTruck(post: Truck) {
    this.showDriver = true;
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

}
