import { AuthService } from './auth.service';
import { ResetComponent } from './reset/reset.component';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AuthComponent, ResetComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  exports: [AuthComponent, ResetComponent],
  providers: [AuthService]
})
export class AuthModule { }
