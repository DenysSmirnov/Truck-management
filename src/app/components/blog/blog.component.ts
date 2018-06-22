import { Component, OnInit } from '@angular/core';
import { Truck, Package } from '../../models/post';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  viewProviders: [DragulaService]
})

export class BlogComponent implements OnInit {
  selectedTruck: Truck = new Truck();
  selectedPackage: Package = new Package();
  postList: Truck[] = [];
  packageList: Package[] = [];
  unPackageList: Package[];
  showDriver = false;
  showPackage = false;
  isEdit = false;
  private query1 = '';
  private query2 = '';

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private dragulaService: DragulaService,
    private tostr: ToastrService
  ) {
      this.dragulaService.drop.subscribe((value) => {
        this.onDrop(value.slice(1));
      });
    }

  private onDrop(args) {
    const [el, target] = args;
    if (!target.id) {
      target.id = 'Unassigned';
    }
    this.postService.dragAndDropPackage(el.id, target.id);
  }

  showDriverModal() {
    if (this.selectedTruck != null) {
        this.selectedTruck = {
        $key: null,
        id: null,
        serial: '',
        driver: {
          email: '',
          firstName: '',
          lastName: '',
          phone: null
        }
      };
    }
    this.showDriver = true;
    if (this.isEdit) {
      this.isEdit = false;
    }
  }
  showPackageModal() {
    if (this.selectedPackage != null) {
      this.selectedPackage = {
        $key: null,
        id: null,
        serial: '',
        description: '',
        recipient: {
          firstName: '',
          lastName: '',
        },
        date: null,
        truck: null
      };
    }
    this.showPackage = true;
    if (this.isEdit) {
      this.isEdit = false;
    }
  }

  ngOnInit() {
    this._selectedDateTrucks();
    this._selectedDatePackages();
  }

  private _selectedDatePackages(date?: string) {
    let x: any;
    date ? x = this.postService.getPackages(date) :
    x = this.postService.getPackages(new Date().toLocaleDateString('en-US'));
    x.snapshotChanges().subscribe(item => {
      const temp = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        temp.push(y as Package);
      });
      this.packageList = temp.filter(pack => pack.truck !== 'Unassigned');
      this.unPackageList = temp.filter(pack => pack.truck === 'Unassigned');
    });
  }

  private _selectedDateTrucks() {
    const x = this.postService.getTrucks();
    x.snapshotChanges().subscribe(item => {
      const temp = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        temp.push(y as Truck);
        this.postList = temp;
      });
    });
  }

  onChangedTruck(truck: Truck) {
    this.showDriver = true;
    this.isEdit = true;
    this.selectedTruck = Object.assign({}, truck);
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
    this.isEdit = true;
    pack.date = new Date(pack.date);
    this.selectedPackage = Object.assign({}, pack);
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

  onTruckFilter(query: string): Observable<Truck[]> {
    this.query1 = query;
    return of(this.getPostList);
  }

  onPackageFilter(query: string): Observable<Package[]> {
    this.query2 = query;
    return of(this.getUnassignedList, this.getPackageList);
  }

  get getPostList() {
    return this.query1.length ? this.postList.filter(truck =>
      new RegExp(`${this.query1}`, 'i').test(
        [Object.values(truck['driver']).concat(truck.id, truck.serial)].toString()
      )
    ) : this.postList;
  }

  get getPackageList() {
    return this.query2.length ? this.packageList.filter(y =>
      new RegExp(`${this.query2}`, 'i').test(
        [Object.values(y['recipient']).concat(y.serial, y.date, y.description)].toString()
      )
    ) : this.packageList;
  }

  get getUnassignedList() {
    return this.query2.length ? this.unPackageList.filter(y =>
      new RegExp(`${this.query2}`, 'i').test(
        [Object.values(y['recipient']).concat(y.serial, y.date, y.description)].toString()
      )
    ) : this.unPackageList;
  }
}
