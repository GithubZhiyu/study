import { Injectable, NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SelectPicturePage } from "./select-picture";
import { PicSelectModule } from "../../../components/pic-select/pic-select.module";

@Injectable()
@NgModule({
    declarations: [
        SelectPicturePage
    ],
    imports: [
        IonicPageModule.forChild(SelectPicturePage),
        PicSelectModule,
    ]
})
export class SelectPicturePageModule { }