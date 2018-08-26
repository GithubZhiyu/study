import { Injectable } from "@angular/core";
import { LocalStorage, LocalStorageService } from "angular-web-storage";

export interface User {
    id?: string;
    name?: string;
    gender?: string;
}

@Injectable()
export class ProfileService {

    @LocalStorage('token', 0, 's') private access_token: string;
    @LocalStorage('user', 0, 's') private user: User;

    constructor(
        private local: LocalStorageService,
    ) { }

    get token() {
        return this.access_token;
    }

    get profile() {
        return this.user;
    }

    public setToken(token: string) {
        this.local.set('token', token);
    }

    public setProfile(user: User = {}) {
        let _user: User = {
            id: this.user.id,
            name: this.user.name,
            gender: this.user.gender, ...user
        }
        this.local.set('user', _user);
    }

    public clear() {
        this.local.set('token', null);
        this.local.set('user', null);
    }
}