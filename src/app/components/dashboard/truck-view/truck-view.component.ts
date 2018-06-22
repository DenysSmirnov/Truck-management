import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Truck, Package } from '../../../models/model';

@Component({
  selector: 'app-truck-view',
  templateUrl: './truck-view.component.html',
  styleUrls: ['./truck-view.component.scss']
})
export class TruckViewComponent implements OnInit {

  sortedList: Array<any>;
  private _truckList: Truck[];
  private _packageList: Package[];
  get truckList(): Truck[] { return this._truckList; }
  get packageList(): Package[] { return this._packageList; }
  @Input() set packageList(value: Package[]) {
    this._packageList = value;
    if (this.truckList) { this.addPackagesIntoTrucks(); }
  }
  @Input() set truckList(value: Truck[]) {
    this._truckList = value;
    this.addPackagesIntoTrucks();
  }
  @Output() changedTruck = new EventEmitter<Truck>();
  @Output() deletedTruck = new EventEmitter<string>();
  @Output() changedPackage = new EventEmitter<Package>();
  @Output() deletedPackage = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  addPackagesIntoTrucks() {
    const temp = [];
    this.truckList.forEach(y => {
      const z = this.packageList.filter(pack => pack.truck === y.$key);
      y['packages'] = z;
      temp.push(y as Truck);
    });
    this.sortedList = temp.sort((_a, b) => b['packages'].length);
  }

  onEdit(truck: Truck) {
    this.changedTruck.emit(truck);
  }
  onDelete(key: string) {
    this.deletedTruck.emit(key);
  }
  onEditPack(pack: Package) {
    this.changedPackage.emit(pack);
  }
  onDeletePack(key: string) {
    this.deletedPackage.emit(key);
  }

}
