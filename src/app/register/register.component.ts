import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isRegistered: boolean;

  constructor(
      private authService: AuthService) { }

  ngOnInit() {

  }

  register(userData){
    this.authService.sendEmail(userData)
    .subscribe(result => {
      if (result){
        this.isRegistered = true;
        // this.authService.sendemail(registerToken)
        // .subscribe(result => {
        //   if (result){
        //     this.isRegistered = true;
        //   }

        // });
      }
    });
  }

  // register(data){
  //   this.authService.register(data)
  //   .subscribe(registerToken => {
  //     if (registerToken){

  //       this.authService.sendemail(registerToken)
  //       .subscribe(result => {
  //         if (result){
  //           this.isRegistered = true;
  //         }

  //       });
  //     }
  //   });
  // }

}
