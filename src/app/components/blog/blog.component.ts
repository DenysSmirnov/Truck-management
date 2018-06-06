import { Component, OnInit } from '@angular/core';
import { Truck, Package } from '../../models/post';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
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
  // @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
  showDriver = false;
  showPackage = false;

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
    const now = new Date().toLocaleDateString('en-US');
    const x = this.postService.getPackages(now);
    x.snapshotChanges().subscribe(item => {
      this.packageList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.packageList.push(y as Package);
      });
      this.packageList = this.packageList.filter(pack => pack['truck']);
      // console.log('packlist: ', this.packageList);
      // console.log(this.events);
    });


    // const a = this.postService.getData();
    // this.postList = a.snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(el => ({ key: el.payload.key, ...el.payload.toJSON() }))
    //   )
    // );
  }

  onChanged(post: Truck) {
    this.showDriver = true;
    this.postService.selectedPost = Object.assign({}, post['driver'], post);
  }

  onDeleted(key: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.postService.deleteTruck(key);
      this.tostr.warning('Deleted Successfully', 'Package Delete');
    }
  }

}
