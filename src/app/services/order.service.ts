import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class OrderService {

  constructor(
    //private authHttp: AuthHttp,
    private http: Http
    ) {
  }

  getOrders() {

    //ako koristimo AuthHttp onda ne trebamo kod ispod jer on već to sadrži

    //kad pristupamo zaštićenim API resursima trebamo uvijek slati Authorization header u requestu a vrijednost headera je 'Bearer' + token
    //kod ispod koristimo kad koristimo standardan http
    let headers = new Headers(); // nalazi se u http biblioteci
    let token = localStorage.getItem('token');
    headers.append('Authorization', 'Bearer ' + token);

    let options = new RequestOptions({ headers: headers });


    // return this.http.get('/api/orders', options)
    //   .map(response => response.json());
    return this.http.get('http://localhost:52578/api/Authentification/gettoken', options)
      .map(response => response.json());
  }
}
