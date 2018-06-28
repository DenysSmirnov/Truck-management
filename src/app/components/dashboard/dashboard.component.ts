import { Component, OnInit } from '@angular/core';
import { Truck, Package } from '../../models/model';
import { TruckService } from '../../services/truck.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  viewProviders: [DragulaService]
})

export class DashboardComponent implements OnInit {
  selectedTruck: Truck = new Truck();
  selectedPackage: Package = new Package();
  truckList: Truck[] = [];
  packageList: Package[] = [];
  unPackageList: Package[];
  showDriver = false;
  showPackage = false;
  isEdit = false;
  private query1 = '';
  private query2 = '';

  constructor(
    private truckService: TruckService,
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
    this.truckService.dragAndDropPackage(el.id, target.id);
  }

  logout() {
    this.authService.logout();
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
    date ? x = this.truckService.getPackages(date) :
    x = this.truckService.getPackages(new Date().toLocaleDateString('en-US'));
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
    const x = this.truckService.getTrucks();
    x.snapshotChanges().subscribe(item => {
      const temp = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        temp.push(y as Truck);
        this.truckList = temp;
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
      this.truckService.deleteTruck(key);
      this.tostr.warning('Deleted Successfully', 'Truck Deleted');

      const x = this.truckService.getAssignedPackages(key);
      if (x) {
        x.snapshotChanges().subscribe(item => {
          item.forEach(element => {
            const y = element.payload.toJSON();
            y['$key'] = element.key;
            y['truck'] = 'Unassigned';
            this.truckService.movePackageToNotAssigned(y);
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
      this.truckService.deletePackage(key);
      this.tostr.warning('Deleted Successfully', 'Package Deleted');
    }
  }

  onChangeDate(date: string) {
    this._selectedDatePackages(date);
  }

  onTruckFilter(query: string): Observable<Truck[]> {
    this.query1 = query;
    return of(this.getTruckList);
  }

  onPackageFilter(query: string): Observable<Package[]> {
    this.query2 = query;
    return of(this.getUnassignedList, this.getPackageList);
  }

  get getTruckList() {
    return this.query1.length ? this.truckList.filter(truck =>
      new RegExp(`${this.query1}`, 'i').test(
        [Object.values(truck['driver']).concat(truck.id, truck.serial)].toString()
      )
    ) : this.truckList;
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
