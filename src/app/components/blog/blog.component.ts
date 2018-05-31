import { Component, OnInit } from '@angular/core';
import { Truck } from '../../models/post';
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
  postList: Truck[];

  constructor(
    private postService: PostService,
    private authService: AuthService,
    // private tostr: ToastrService
  ) { }

  ngOnInit() {

    // const isLoggedIn = this.authService.isLoggedIn();
    // console.log(this.authService.isLoggedIn());
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
