import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.sass']
})
export class ResetComponent implements OnInit {

  @Output() resetPassword = new EventEmitter();
  @Output() checkStatus = new EventEmitter();

  level: number;
  status: string;
  success: boolean;
  resetForm: FormGroup;

  constructor(private form: FormBuilder) {
    this.resetForm = this.form.group ({
      password: new FormControl('', Validators.minLength[6]),
      passwordConfirmation: new FormControl('', Validators.minLength[6]),
    });
  }

  ngOnInit(): void {
    this.success = false;
  }

  updatePassword() {
    this.success = true;  // info from back-end
    if (this.success) {
      this.level = 999;
      this.status = 'RESET PASSWORD SUCCESS!';
    } else {
      this.level = 0;
      this.status = 'RESET PASSWORD FAILED!';
    }
    this.resetPassword.emit(this.level);
    this.checkStatus.emit(this.status);
  }


}
