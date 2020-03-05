import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'lib-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  userExists: boolean = false;
  passwordExpired: boolean;
  status: string;
  state: number;

  constructor(
    private form: FormBuilder,
    private service: AuthService
    ) {
    this.authForm = this.form.group ({
      username: new FormControl('', Validators.minLength[6]),
      password: new FormControl('', Validators.minLength[6]),
    });

  }

  ngOnInit(): void {
    // starting customer jorney
    this.resetFlow();
    this.service.currentState.subscribe(state => this.state = state);
  }

  onSubmit() {
    // console.log(this.authForm.value);
    this.passwordExpired = true;
    this.service.changeState(2);
    this.service.checkUserExists(this.userExists);
    return this.userExists;
  }

  resetFlow() {
    this.service.startFlow();
    this.passwordExpired = false;
  }

}
