import { Component,Input } from '@angular/core';
import { User } from './../../models/user.model';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfileComponent {

  @Input() user: User;

  constructor() {
    console.log('Hello ProfileComponent Component');
  }


}
