import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TruckService } from '../../../services/truck.service';
import { ToastrService} from 'ngx-toastr';
import { Truck } from '../../../models/model';

@Component({
  selector: 'app-new-driver',
  templateUrl: './new-driver.component.html',
  styleUrls: ['./new-driver.component.scss']
})
export class NewDriverComponent implements OnInit, OnChanges {
  @Input() isEdit: Boolean;
  @Input() selectedTruck: Truck;
  @Output() editDone = new EventEmitter<boolean>();
  @ViewChild('closeBtn') closeBtn: ElementRef;
  driverForm: FormGroup;

  constructor(private truckService: TruckService, private tostr: ToastrService) {
    this.driverForm = new FormGroup({
      $key: new FormControl(null),
      id: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      serial: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      driver: new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.pattern('[a-zA-Z-_0-9]+@[a-zA-Z_]+?\\..+')),
        phone: new FormControl(null, Validators.required)
      })
    });
  }

  ngOnInit() {}

  ngOnChanges() {
    delete this.selectedTruck['packages'];
    this.driverForm.patchValue(this.selectedTruck);
  }

  onSubmit() {
    if (this.driverForm.controls.$key.value == null) {
      this.truckService.insertTruck(this.driverForm.value);
      this.tostr.success('Submitted Successfully', 'Driver registered');
    } else {
      this.truckService.updateTruck(this.driverForm.value);
      this.tostr.success('Submitted Successfully', 'Driver updated');
    }
    this.resetForm();
    this.closeBtn.nativeElement.click();
  }
  resetForm() {
    this.onEdit(false);
    if (this.driverForm != null) {
      this.driverForm.reset();
    }
  }

  onEdit(bool: boolean) {
    this.editDone.emit(bool);
  }
}
