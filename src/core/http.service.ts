import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProfileService } from "./profile.service";
import { SettingService } from "./setting.service";
import "rxjs/add/operator/catch";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { UtilService } from "./util.service";

@Injectable()
export class HttpService {
    constructor(
        private http: HttpClient,
        private setting: SettingService,
        private profile: ProfileService,
        private util: UtilService,
    ) { }

    post(url, args: {}, target: any, withToken = true) {
        if (withToken) {
            url = this.appendToken(url);
        }
        return this.http.post(this.setting.SERVER_URL + url, JSON.stringify(args))
            .catch(err => {
                if (target.failed) {
                    target.failed(err.status, err.message);
                }
                if (target.finally) {
                    target.finally();
                }
                if (!target.failed) {
                    return this.handleError(err.message);
                }
                else {
                    return new ErrorObservable(err.message);
                }
            })
            .subscribe((data: any) => {
                try {
                    if (null == data || data.status == undefined) {
                        return;
                    }
                    if (data.error || data.status != 0) {
                        data.message = "(" + data.status + ") " + data.message;
                        if (data.status == 1004) {
                            data.message = '您的本次登录会话已经过期，请退出系统重新登录';
                        } else if (data.status == 1005 || data.status == 1006) {
                            data.message = '您没有执行此操作的权限: ' + data.message;
                        }
                        if (target.failed) {
                            target.failed(data.status);
                        }
                        else {
                            this.handleError(data);
                        }
                    }
                    else {
                        target.success(data);
                    }
                }
                finally {
                    if (target.finally) {
                        target.finally();
                    }
                }
            });
    }

    authz(url, args = {}, target: any, ) {
        return this.http.post(this.setting.AUTHZ_URL + url, JSON.stringify(args))
            .catch(err => {
                console.log(err);
                let error = {
                    status: -1,
                    message: err.message
                };
                if (err.status == 0) {
                    error.message = '无法连接服务器'
                }
                else if (err.error) {
                    error.message = err.error.error_description;
                    if (err.error.error == 'invalid_grant') {
                        error.message = '密码不正确，请重新输入';
                    }
                }
                if (target.failed) {
                    target.failed(error.status, error.message);
                }
                if (target.finally) {
                    target.finally();
                }
                if (!target.failed) {
                    return this.handleError(error);
                }
                else {
                    return new ErrorObservable(error.message);
                }
            })
            .subscribe(data => {
                try {
                    if (null == data || data == undefined) {
                        return;
                    }
                    if (typeof data == 'string') {
                        return;
                    }
                    target.success(data);
                }
                catch (err) {
                    return;
                }
                finally {
                    if (target.finally) {
                        target.finally();
                    }
                }
            });
    }

    appendToken(url: string) {
        if (url.indexOf('?') < 0) {
            url = url + "?access_token=" + this.profile.token;
        }
        else {
            url = url + "&access_token=" + this.profile.token;
        }
    }

    handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        this.util.presentToast(errMsg);
        return new ErrorObservable(errMsg);
    }
}
export class Result {
    status: number;
    message: string;
    timestamp: number;
    data: any;
}

export class HttpCallback {
    success = (result: Result) => { };
    failed?;
    finally?;
}