import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'lib-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  public authForm: FormGroup;
  authLevelOne: any;
  userExists: boolean;
  passwordExpired: boolean;
  @Input() status: string;
  @Input() level: number;
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
    this.status = this.service.status;
  }


  resetFlow() {
    this.service.startFlow();
    this.userExists = true; // info from back-end
    this.passwordExpired = false;
    this.status = 'UNLOGGED';
  }


}
