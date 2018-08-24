import { Injectable, NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AboutPage } from "./about";

@Injectable()
@NgModule({
    declarations: [
        AboutPage
    ],
    imports: [
        IonicPageModule.forChild(AboutPage)
    ]
})
export class AboutPageModule { }