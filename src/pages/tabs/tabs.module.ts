import { Injectable, NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TabsPage } from "./tabs";

@Injectable()
@NgModule({
    declarations: [
        TabsPage
    ],
    imports: [
        IonicPageModule.forChild(TabsPage)
    ]
})
export class TabsPageModule { }