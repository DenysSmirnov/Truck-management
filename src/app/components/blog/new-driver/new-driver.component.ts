import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-new-driver',
  templateUrl: './new-driver.component.html',
  styleUrls: ['./new-driver.component.scss']
})
export class NewDriverComponent implements OnInit {
  @Input() isEdit: Boolean;
  @Output() editDone = new EventEmitter<boolean>();

  constructor(private postService: PostService, private tostr: ToastrService) {}

  ngOnInit() {
    this.postService.getData();
  }

  onSubmit(driverForm: NgForm) {
    if (driverForm.value.$key == null) {
      this.postService.insertTruck(driverForm.value);
      this.resetForm(driverForm);
      this.tostr.success('Submitted Successfully', 'Driver registered');
    } else {
      this.postService.updateTruck(driverForm.value);
      this.resetForm(driverForm);
      this.tostr.success('Submitted Successfully', 'Driver updated');
    }
  }
  resetForm(driverForm?: NgForm) {
    this.onEdit(false);

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

  onEdit(bool: boolean) {
    this.editDone.emit(bool);
  }

}
