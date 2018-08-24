import { Injectable, NgModule } from "@angular/core";
import { ContactPage } from "./contact";
import { IonicPageModule } from "ionic-angular";

@Injectable()
@NgModule({
    declarations: [
        ContactPage
    ],
    imports: [
        IonicPageModule.forChild(ContactPage)
    ]
})
export class ContactPageModule { }