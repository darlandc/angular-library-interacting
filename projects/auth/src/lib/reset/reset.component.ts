import { AuthService } from './../auth.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.sass']
})
export class ResetComponent implements OnInit {

  state: number;
  status: string;
  success: boolean;
  resetForm: FormGroup;

  constructor(
    private form: FormBuilder,
    private service: AuthService
    ) {
    this.resetForm = this.form.group ({
      password: new FormControl('', Validators.minLength[6]),
      passwordConfirmation: new FormControl('', Validators.minLength[6]),
    });
  }

  ngOnInit(): void {
    this.success = false;
    this.service.currentState.subscribe(state => this.state = state);
  }

  updatePassword() {
    this.success = true;  // info from back-end
    if (this.success) {
      this.service.changeState(3);
    } else {
      this.service.changeState(0);
    }
  }


}
