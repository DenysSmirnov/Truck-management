import { Component, OnInit } from '@angular/core';
import { Package } from '../../../models/post';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-unassigned',
  templateUrl: './unassigned.component.html',
  styleUrls: ['./unassigned.component.scss']
})
export class UnassignedComponent implements OnInit {
  packageList: Package[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    const x = this.postService.getPackages();
    x.snapshotChanges().subscribe(item => {
      this.packageList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.packageList.push(y as Package);
      });
      console.log('packlist: ', this.packageList);
    });
  }

}
