import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PicSelectComponent } from './pic-select';

@NgModule({
    declarations: [
        PicSelectComponent,
    ],
    imports: [
        IonicPageModule.forChild(PicSelectComponent)
    ],
    exports: [
        PicSelectComponent
    ]
})
export class PicSelectModule { }
