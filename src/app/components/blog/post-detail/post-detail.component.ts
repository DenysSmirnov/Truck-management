import { Component, OnInit } from '@angular/core';
import { Truck } from '../../../models/post';
import { PostService } from '../../../services/post.service';
import { Params } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  // public post: Truck;

  constructor(private postService: PostService) { }

  ngOnInit() {
    // this.route.params.subscribe((params: Params) => {
    //   this.postService.getSinglePost(+params.id).subscribe((post: Truck) => {
    //     this.post = post;
    //   });
    // });
  }

}
