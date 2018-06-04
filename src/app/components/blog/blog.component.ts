import { Component, OnInit } from '@angular/core';
import { Truck, Package } from '../../models/post';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
// import { ToastrService } from 'ngx-toastr';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  viewProviders: [DragulaService]
})

export class BlogComponent implements OnInit {
  // public postList: Array<Truck> = [];
  postList: Truck[];
  // postList: Observable<Truck[]>;
  packageList: Package[];
  // options: any = {
  //   removeOnSpill: true
  // };

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private dragulaService: DragulaService
    // private tostr: ToastrService
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

  ngOnInit() {
    // const x = this.postService.getPackages();
    // x.snapshotChanges().subscribe(item => {
    //   this.packageList = [];
    //   item.forEach(element => {
    //     const y = element.payload.toJSON();
    //     y['$key'] = element.key;
    //     this.packageList.push(y as Package);
    //   });
    //   console.log('packlist: ', this.packageList);
    // });

    // const a = this.postService.getData();
    // this.postList = a.snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(el => ({ key: el.payload.key, ...el.payload.toJSON() }))
    //   )
    // );
    const a = this.postService.getData();
    a.snapshotChanges().subscribe(item => {
      this.packageList = [];
      item.forEach(element => {
        const b = element.payload.toJSON();
        b['$key'] = element.key;
        this.packageList.push(b as Package);
      });
      console.log('postlist: ', this.postList);
    });

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
