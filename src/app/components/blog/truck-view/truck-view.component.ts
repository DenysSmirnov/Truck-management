import { Component, Input, OnInit } from '@angular/core';
import { Truck, Package } from '../../../models/post';
import { PostService } from '../../../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-truck-view',
  templateUrl: './truck-view.component.html',
  styleUrls: ['./truck-view.component.scss'],
  viewProviders: [DragulaService]
})
export class TruckViewComponent implements OnInit {
  // @Input() post: Truck;
  postList: Truck[];
  packageList: Package[];

  constructor(
    private postService: PostService,
    private tostr: ToastrService
  ) { }

  ngOnInit() {
    // this.selectedDatePackages();
    this.selectedDateTrucks();
  }

  // private selectedDatePackages() {
  //   const a = this.postService.getPackages();
  //   a.snapshotChanges().subscribe(item => {
  //     this.packageList = [];
  //     item.forEach(element => {
  //       const b = element.payload.toJSON();
  //       b['$key'] = element.key;
  //       this.packageList.push(b as Package);
  //     });
  //   });
  // }
  private selectedDateTrucks() {
    const x = this.postService.getData();
    x.snapshotChanges().subscribe(item => {
      this.postList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.postList.push(y as Truck);
      });
      // console.log(this.postList);
    });
  }

  onEdit(emp: Truck) {
    this.postService.selectedPost = Object.assign({}, emp['driver'], emp);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.postService.deleteTruck(key);
      this.tostr.warning('Deleted Successfully', 'Package Delete');
    }
  }

}
