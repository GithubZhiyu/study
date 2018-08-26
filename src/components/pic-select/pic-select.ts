import { Component, Input, forwardRef } from '@angular/core';
import { AlertController, ModalController, ActionSheetController, IonicPage } from 'ionic-angular';
import { NativeService } from '../../core/native.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImagePickerOptions } from '@ionic-native/image-picker';

export interface FileObj {
  id?: string;          // 主键
  origPath?: string;    // 原文件路径
  thumbPath?: string;   //  缩略文件路径(图片类型文件)
  name?: string;        // 资源名称
  createTime?: string;  // 创建时间
  size?: string;        // 大小
  type?: string;        // 类型(jpg, gift, png, xls, doc
  status?: string;      // 状态(1:正常，0:删除)
  base64?: string;      // base64字符串
  parameter?: string;   // 自定义参数,原文返回
}

@IonicPage()
@Component({
  selector: 'pic-select',
  templateUrl: 'pic-select.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PicSelectComponent),
    multi: true
  }]
})
export class PicSelectComponent implements ControlValueAccessor {

  @Input() max = 6;

  @Input() allowAdd = true;

  @Input() allowDelete = true;

  @Input() imgList: any = [];

  private propagateChange: any = {};

  constructor(
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public native: NativeService,
  ) { }

  writeValue(val: any): void {
    if (val) {
      this.imgList = val;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  addPicture() {
    this.actionSheetCtrl.create({
      buttons: [
        {
          text: "从相册选取",
          handler: () => {
            let option: CameraOptions = {
              sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            }
            this.native.takePhoto(option).subscribe(img => {
              this.getPicture(img);
            });
            // let option: ImagePickerOptions = {
            //   maximumImagesCount: (9 - this.imgList.length)
            // }
            // this.native.imgMultiPicker(option)
            //   .subscribe(imgs => {
            //     for (const img of imgs as string[]) {
            //       this.imgList.push(img);
            //     }
            //   });
          }
        },
        {
          text: "拍照",
          handler: () => {
            this.native.takePhoto()
              .subscribe(img => {
                this.getPicture(img);
              })
          }
        },
        {
          text: "取消",
          role: "cancel"
        }
      ]
    }).present();
  }

  getPicture(img) {
    // const fileObj = { 'origPath': img, 'thumbPath': img };
    this.imgList.push(img);
  }

  deletePicture(index) {
    if (!this.allowDelete) {
      return;
    }
    this.alertCtrl.create({
      title: "确认删除?",
      buttons: [
        { text: "取消" },
        {
          text: "确定",
          handler: () => {
            this.imgList.splice(index, 1);
          }
        }
      ]
    }).present();
  }

  picturePreview(index) {
    this.native.photoPreview(this.imgList, index);
  }
}
