import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Truck, Package } from '../../../models/post';

@Component({
  selector: 'app-truck-view',
  templateUrl: './truck-view.component.html',
  styleUrls: ['./truck-view.component.scss']
})
export class TruckViewComponent implements OnInit {

  sortedList: Array<any>;
  private _postList: Truck[];
  private _packageList: Package[];
  get postList(): Truck[] { return this._postList; }
  get packageList(): Package[] { return this._packageList; }
  @Input() set packageList(value: Package[]) {
    this._packageList = value;
    if (this.postList) { this.addPackagesIntoTrucks(); }
  }
  @Input() set postList(value: Truck[]) {
    this._postList = value;
    this.addPackagesIntoTrucks();
  }
  @Output() changed = new EventEmitter<Truck>();
  @Output() deleted = new EventEmitter<string>();
  @Output() changedPackage = new EventEmitter<Package>();
  @Output() deletedPackage = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  addPackagesIntoTrucks() {
    const temp = [];
    this.postList.forEach(y => {
      const z = this.packageList.filter(pack => pack.truck === y.$key);
      y['packages'] = z;
      temp.push(y as Truck);
    });
    this.sortedList = temp.sort((_a, b) => b['packages'].length);
  }

  onEdit(truck: Truck) {
    this.changed.emit(truck);
  }
  onDelete(key: string) {
    this.deleted.emit(key);
  }
  onEditPack(pack: Package) {
    this.changedPackage.emit(pack);
  }
  onDeletePack(key: string) {
    this.deletedPackage.emit(key);
  }

}
