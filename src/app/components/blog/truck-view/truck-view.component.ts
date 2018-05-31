import { Component, Input, OnInit } from '@angular/core';
import { Truck } from '../../../models/post';
import { PostService } from '../../../services/post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-truck-view',
  templateUrl: './truck-view.component.html',
  styleUrls: ['./truck-view.component.scss']
})
export class TruckViewComponent implements OnInit {
  // @Input() post: Truck;
  postList: Truck[];

  constructor(
    private postService: PostService,
    private tostr: ToastrService
  ) { }

  ngOnInit() {
    const x = this.postService.getData();
    x.snapshotChanges().subscribe(item => {
      this.postList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.postList.push(y as Truck);
      });
    });
  }

  onEdit(emp: Truck) {
    this.postService.selectedPost = Object.assign({}, emp);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.postService.deleteTruck(key);
      this.tostr.warning('Deleted Successfully', 'Package Delete');
    }
  }

}
