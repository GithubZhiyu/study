import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  selectPic() {
    this.navCtrl.push('SelectPicturePage');
    // let opt = {
    //   'selectMode': 100,
    //   'maxSelectCount': 9,
    // };
    // (<any>window).MediaPicker.getMedias(opt).then(data => {
    //   alert(JSON.stringify(data));
    // })
  }

}
