import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CameraPreview, CameraPreviewOptions } from '@capgo/camera-preview';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private img?: HTMLImageElement;
  private canvas?: HTMLCanvasElement;
  public pixelData?: Uint8ClampedArray;

  public r: number = 0;
  public g: number = 0;
  public b: number = 0;
  public a: number = 0;

  private redrawCanvas: boolean = false;

  constructor(public photoService: PhotoService, private sanitizer: DomSanitizer) { }

  // see https://stackoverflow.com/questions/57743966/getting-unsafe-url-error-while-displaying-image
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
    this.redrawCanvas = true;
  }

  getColor(event: MouseEvent) {
    if (!this.canvas || this.redrawCanvas) {
      this.img = document.getElementById('image') as HTMLImageElement;

      this.canvas = document.createElement('canvas');
      this.canvas!.width = this.img!.clientWidth;
      this.canvas!.height = this.img!.clientHeight
      this.canvas!.getContext('2d')?.drawImage(this.img!, 0, 0, this.img!.clientWidth, this.img!.clientHeight);

      console.log("Canvas redrawn!");
      this.redrawCanvas = false;
    }

    this.pixelData = this.canvas!.getContext('2d')?.getImageData(event.offsetX, event.offsetY, 1, 1).data;

    this.r = this.pixelData![0];
    this.g = this.pixelData![1];
    this.b = this.pixelData![2];
    this.a = this.pixelData![3];

    // console.log(this.pixelData);
  }


}