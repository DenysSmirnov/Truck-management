import { Component, OnInit } from '@angular/core';
import { Truck, Package } from '../../models/post';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
  // public postList: Array<Truck> = [];
  // postList: Truck[];
  packageList: Package[];

  constructor(
    private postService: PostService,
    private authService: AuthService,
    // private tostr: ToastrService
  ) { }

  ngOnInit() {
    const x = this.postService.getPackages();
    x.snapshotChanges().subscribe(item => {
      this.packageList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.packageList.push(y as Package);
      });
      // console.log(this.packageList);
    });

    // console.log(this.postService.postList);
    // this.postService.posts.subscribe(posts => {
    //   this.postList = posts;
    // });
  }

  // onEdit(emp: Truck) {
  //   this.postService.selectedPost = Object.assign({}, emp);
  // }

  // onDelete(key: string) {
  //   if (confirm('Are you sure to delete this record ?') === true) {
  //     this.postService.deleteTruck(key);
  //     this.tostr.warning('Deleted Successfully', 'package register');
  //   }
  // }

}
