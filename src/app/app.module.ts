import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { HttpService } from '../core/http.service';
import { SettingService } from '../core/setting.service';
import { ProfileService } from '../core/profile.service';
import { UtilService } from '../core/util.service';
import { NativeService } from '../core/native.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ionicGalleryModal.GalleryModalModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true',
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      mode: 'ios',
      iconMode: 'ios',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    HttpClient,
    HttpClientModule,
    LocalStorageService,
    HttpService,
    SettingService,
    ProfileService,
    UtilService,
    NativeService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
