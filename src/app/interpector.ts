import { Injector, Injectable } from '@angular/core';
import { HttpInterceptor,HttpHandler,HttpRequest} from '@angular/common/http';

@Injectable({
    providedIn : "root"
})

export class authorizeRequest implements HttpInterceptor{
    token:any
    authPermission:any;
    intercept(req : HttpRequest<any> , next : HttpHandler){
        this.token = localStorage.getItem('token');
        this.authPermission = `Bearer ${this.token}`;
        const authReq = req.clone({setHeaders:{Authorization:this.authPermission}})
        console.log(authReq)
        return next.handle(authReq);
    }
}