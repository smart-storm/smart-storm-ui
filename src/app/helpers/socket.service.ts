import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { UserService } from "./user.service";
import { environment } from '../../environments/environment';

@Injectable()
export class SocketService extends Socket{

    constructor(private _user:UserService) {
        super({ url: environment.socketUrl, options: {query: 'auth_token=' + _user.getToken() }});
    }

    sendMessage(msg: string){
        this.emit("message", msg);
    }

    getMessage() {
        return this
            .fromEvent("message")
            .map( (data:any) => data );
    }

    getErrors(){
        return this.fromEvent("error_msg");
    }

    getChartsData() {
        return this.fromEvent("chartsdata").map( (data:any) => data );
    }
}

export let socketServiceFactory = (userService: UserService) => {
    return new SocketService(userService);
};

export let socketServiceProvider = {
        provide: SocketService,
        useFactory: socketServiceFactory,
        deps: [UserService]
};

