import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  url= 'http://localhost:52578/api/Authentification/ValidateUser?Email=';
  urlRegister='http://localhost:52578/api/Account';
  // urlSendMail='http://localhost:52578/api/SendEmail?userId=';
  urlSendMail='http://localhost:52578/api/SendEmail';

  login(credentials) {
  // tslint:disable-next-line:max-line-length
  // post vraća Observable<Response>, a pošto mi ne želimo da otkrijemo Response objekat vratit ćemo true ili false pa zato koristimo MAP metodu.
  //  return this.http.post('/api/authenticate',
  //     JSON.stringify(credentials)).map(response => {
  //       let result = response.json();
  //       if(result && result.token){
  //         localStorage.setItem('token', result.token);
  //         return true;
  //       }
  //       return false;
  //     });

  return this.http.get(this.url + credentials.email + '&password=' + credentials.password)
    .map(response => {
        const result = response.json();
        if(result && result.token){
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;
      });
  }

  register(token, tokenUserData) {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlRegister, JSON.stringify(tokenUserData), options)
      .map(response => {
        const result = response.json();
        console.log(response);
        if (result && result.status === 'Valid') {
          //localStorage.setItem('registerToken', result.registerToken);
          //console.log(result.registerToken);
          return true; // new JwtHelper().decodeToken(result.registerToken);
        }
        return false;
      });
  }

  // activateUser(id){
  //   const headers = new Headers(); // nalazi se u http biblioteci
  //   const token = localStorage.getItem('sendEmailToken');
  //   headers.append('Authorization', 'Bearer ' + token);
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Method', 'PUT');
  //   const options = new RequestOptions({ headers: headers });

  //   //console.log(this.urlRegister + '?id=' + id);

  //   return this.http.put(this.urlRegister + '/Activate' + '?id=' + id, JSON.stringify(''), options)
  //     .map(response => {
  //       const result = response.json();
  //       console.log(result);
  //       if (result && result.status === 'Valid') {
  //         localStorage.removeItem('sendEmailToken');
  //         return true;
  //       }
  //       return false;
  //     });
  // }

  sendEmail(userData) {
    const headers = new Headers(); // nalazi se u http biblioteci
    //headers.append('Authorization', 'Bearer ' + localStorage.getItem('registerToken'));
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.urlSendMail, JSON.stringify(userData), options)
    .map(response => {
      const result = response.json();
      if (result && result.status === 'Valid') {
        //localStorage.setItem('sendEmailToken', result.sendEmailToken);
        //localStorage.removeItem('registerToken');
        return true;
      }
      return false;
    });

    // return this.http.get(this.urlSendMail + registerToken.userid + '&email=' + registerToken.email, options)
    // .map(response => {
    //   const result = response.json();
    //   if (result && result.sendEmailToken) {
    //     localStorage.setItem('sendEmailToken', result.sendEmailToken);
    //     localStorage.removeItem('registerToken');
    //     return true;
    //   }
    //   return false;
    // });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return tokenNotExpired(); //ova metoda radi upravo ovo dole zakomentarisano

    // let jwtHelper = new JwtHelper();
    // let token = localStorage.getItem('token');

    // if(!token)
    //   return false;

    // let expirationDate = jwtHelper.getTokenExpirationDate(token);
    // let isExpired = jwtHelper.isTokenExpired(token);

    // return !isExpired;
  }

  get currentUser(){
    let token = localStorage.getItem('token');
    if (!token) return null;

    return new JwtHelper().decodeToken(token);
  }
}

