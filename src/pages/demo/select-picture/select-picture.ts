import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";

@IonicPage()
@Component({
    selector: 'select-picture',
    templateUrl: 'select-picture.html'
})
export class SelectPicturePage {

    imgs: any = ['assets/imgs/logo.png'];

    constructor(

    ){ }
}