import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Truck, Package } from '../../../models/post';
import { PostService } from '../../../services/post.service';
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
  @Output() changed = new EventEmitter<Truck>();
  @Output() deleted = new EventEmitter<string>();

  constructor(private postService: PostService) {}

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

  onEdit(post: Truck) {
    this.changed.emit(post);
  }
  onDelete(key: string) {
    this.deleted.emit(key);
  }

}
