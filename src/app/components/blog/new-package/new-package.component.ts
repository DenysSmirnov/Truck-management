import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ToastrService} from 'ngx-toastr';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
// import { TruckViewComponent } from '../truck-view/truck-view.component';

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.scss']
})
export class NewPackageComponent implements OnInit {

  // trucks: string[] = [
  //   'Truck1',
  //   'Truck2',
  //   'Truck3',
  // ];
  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    console.log(this.events);
  }

  constructor(
    private postService: PostService,
    private tostr: ToastrService,
    // private trucks: TruckViewComponent
  ) { }

  ngOnInit() {
    // this.postService.getPackages();
    this.resetForm();
    // this.trucks = this.trucks.postList;
    // console.log(this.trucks);
  }

  onSubmit(packageForm: NgForm) {
    if (packageForm.value.$key == null) {
      this.postService.insertPackage(packageForm.value);
      // this.resetForm(packageForm);
      this.tostr.success('Submitted Successfully', 'Package Register');
    } else {
      this.postService.updatePackage(packageForm.value);
      // this.resetForm(packageForm);
      this.tostr.success('Submitted Successfully', 'Package Update');
    }
    this.resetForm(packageForm);
  }
  resetForm(packageForm?: NgForm) {
    if (packageForm != null) {
      packageForm.reset();
    }
    this.postService.selectedPackage = {
      $key: null,
      id: null,
      serial: '',
      description: '',
      firstName: '',
      lastName: '',
      date: null
    };
  }

}
