import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-new-driver',
  templateUrl: './new-driver.component.html',
  styleUrls: ['./new-driver.component.scss']
})
export class NewDriverComponent implements OnInit {

  constructor(private postService: PostService, private tostr: ToastrService) {}

  ngOnInit() {
    this.postService.getData();
    this.resetForm();
  }

  onSubmit(driverForm: NgForm) {
    if (driverForm.value.$key == null) {
      this.postService.insertTruck(driverForm.value);
      this.resetForm(driverForm);
      this.tostr.success('Submitted Successfully', 'Package Register');
    } else {
      this.postService.updateTruck(driverForm.value);
      this.resetForm(driverForm);
      this.tostr.success('Submitted Successfully', 'Package Update');
    }
  }
  resetForm(driverForm?: NgForm) {
    if (driverForm != null) {
      driverForm.reset();
    }
    this.postService.selectedPost = {
      $key: null,
      id: null,
      serial: '',
      email: '',
      firstName: '',
      lastName: '',
      phone: null
    };
  }

}
