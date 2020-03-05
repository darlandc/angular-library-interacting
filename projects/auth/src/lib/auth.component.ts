import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private form: FormBuilder) {

    this.authForm = this.form.group ({
      username: new FormControl('', Validators.minLength[6]),
      password: new FormControl('', Validators.minLength[6]),
    });


  }

  ngOnInit(): void {
    // starting customer jorney
    this.startFlow();
  }

  startFlow() {
    this.userExists = true; // info from back-end
    this.level = 0;
    this.passwordExpired = false;
    this.status = 'UNLOGGED';
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(level) {
    this.checkLevelStatus(level);
    console.log(this.status);
  }

  onSubmit() {
    // console.log(this.authForm.value);
    if (this.level === 0) {
      this.checkUserExists(this.userExists);
    }
  }

  checkLevelStatus(level) {
    switch (level) {
      case 0:
        this.status = 'UNLOGGED';
        break;
      case 1:
        this.status = 'INVALID USERNAME!';
        break;
      case 2:
        this.status = 'EXPIRED PASSWORD!';
        this.passwordExpired = true;
        break;
      case 999:
        this.status = 'RESET PASSWORD SUCCESS!';
        break;
      default:
        this.status = 'PROCESS FAILED!';
        this.startFlow();
    }
  }

  // call the service and resolve $userExists
  checkUserExists(userExists) {
    // checking if user already exists in database'
    if (userExists) {
      this.level = 2;
      this.checkLevelStatus(this.level);
    } else {
      this.level = 1;
      this.checkLevelStatus(this.level);
    }
  }

  resetFlow() {
    this.startFlow();
  }

}
