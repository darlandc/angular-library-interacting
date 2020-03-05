import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  private initialState = new BehaviorSubject<number>(0);
  currentState = this.initialState.asObservable();
  status: string;
  state: number;

  constructor() {}

  changeState(state: number) {
    this.initialState.next(state);
    switch (state) {
      case 0:
        status = 'UNLOGGED';
        break;
      case 1:
        status = 'INVALID USERNAME!';
        break;
      case 2:
        status = 'EXPIRED PASSWORD!';
        break;
      case 3:
        status = 'RESET PASSWORD SUCCESS!';
        break;
      default:
        status = 'PROCESS FAILED!';
    }
    return status;
  }

  startFlow() {
    this.changeState(0);
  }

    // call the service and resolve $userExists
    checkUserExists(userExists) {
      // checking if user already exists in database'
      if (!userExists) {
        this.changeState(1);
      } else {
        this.startFlow();
      }
    }


}
