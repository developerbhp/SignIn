import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  //idUser: number;
  kod: string;
  valid:boolean;
  invalid:boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    //console.log('ngOnInit');
    //this.idUser = +this.route.snapshot.paramMap.get('id');
    this.kod = this.route.snapshot.paramMap.get('kod');

    this.authService.register(this.kod, new JwtHelper().decodeToken(this.kod))
      .subscribe(result => {
        console.log(result);
          if (result){
            this.valid = true;
            this.invalid = false;
          }
          else{
            this.invalid = true;
            this.valid = false;
          }
        }
      )};
}


