import { Injectable } from "@angular/core";
import { ModalController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { UtilService } from "./util.service";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";
import { GalleryModal } from 'ionic-gallery-modal';

export const QUALITY = 50;
export const IMG_SIZE = 1024;

@Injectable()
export class NativeService {

    constructor(
        public modalCtrl: ModalController,
        public util: UtilService,
        public camera: Camera,
        public imagePicker: ImagePicker,
    ) { }

    takePhoto(option: CameraOptions = {}): Observable<string> {
        const opt: CameraOptions = {
            quality: QUALITY,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: this.camera.EncodingType.JPEG,
            targetWidth: IMG_SIZE,
            targetHeight: IMG_SIZE,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            saveToPhotoAlbum: false,
            cameraDirection: this.camera.Direction.BACK, ...option
        };
        return Observable.create(observer => {
            this.camera.getPicture(opt)
                .then(imageData => {
                    if (opt.destinationType === this.camera.DestinationType.DATA_URL) {
                        observer.next('data:image/jpg;base64,' + imageData);
                    } else {
                        observer.next(imageData);
                    }
                })
                .catch(err => {
                    if (err == 20) {
                        alert('没有权限,请在设置中开启权限');
                    } else if (String(err).indexOf('No Image Selected') != -1) {
                        this.util.presentToast('取消选择图片');
                    } else {
                        this.util.presentToast('获取照片失败');
                    }
                    observer.error(false);
                })
        })
    }

    imgMultiPicker(option: ImagePickerOptions = {}): Observable<any> {
        const opt: ImagePickerOptions = {
            maximumImagesCount: 9,
            quality: QUALITY,
            outputType: 1, ...option
        };
        return Observable.create(observer => {
            this.imagePicker.getPictures(opt)
                .then(files => {
                    if (opt.outputType == 1) {
                        observer.next(files);
                    }
                    else {
                        observer.next(files);
                    }
                })
                .catch(err => {
                    this.util.presentToast('获取照片失败');
                    observer.error(false);
                })
        })
    }

    photoPreview(urlList, index = 0) {
        let photos = [];
        if (urlList instanceof Array) {
            urlList.forEach(element => {
                let obj = { url: element };
                photos.push(obj);
            });
        }
        else {
            let obj = { url: urlList };
            photos.push(obj);
        }
        let modal = this.modalCtrl.create(GalleryModal, {
            photos: photos,
            initialSlide: index
        });
        modal.present();
    }
}