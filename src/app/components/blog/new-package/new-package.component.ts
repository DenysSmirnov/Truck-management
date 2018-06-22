import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ToastrService} from 'ngx-toastr';
import { Truck, Package } from '../../../models/post';

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.scss']
})
export class NewPackageComponent implements OnInit, OnChanges {
  truckList: Truck[];
  @Input() isEdit: Boolean;
  @Input() selectedPackage: Package;
  @Output() editDone = new EventEmitter<boolean>();
  @ViewChild('closeBtn') closeBtn: ElementRef;
  packageForm: FormGroup;

  constructor(private postService: PostService, private tostr: ToastrService) {
    this.packageForm = new FormGroup({
      $key: new FormControl(null),
      id: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      serial: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      recipient: new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required)
      }),
      date: new FormControl('', Validators.required),
      truck: new FormControl('', Validators.required),
      description: new FormControl('')
    });
  }

  ngOnInit() {
    const x = this.postService.getTrucks();
    x.snapshotChanges().subscribe(item => {
      this.truckList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.truckList.push(y as Truck);
      });
    });
  }

  ngOnChanges() {
    this.packageForm.patchValue(this.selectedPackage);
  }

  onSubmit() {
    if (this.packageForm.controls.$key.value == null) {
      this.postService.insertPackage(this.packageForm.value);
      this.tostr.success('Submitted Successfully', 'Package registered');
    } else {
      this.postService.updatePackage(this.packageForm.value);
      this.tostr.success('Submitted Successfully', 'Package updated');
    }
    this.resetForm();
    this.closeBtn.nativeElement.click();
  }

  resetForm() {
    this.onEdit(false);
    if (this.packageForm != null) {
      this.packageForm.reset();
    }
  }

  onEdit(bool: boolean) {
    this.editDone.emit(bool);
  }
}
