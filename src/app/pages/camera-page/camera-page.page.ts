import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PhotoService } from 'src/app/services/photo.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-camera-page',
  templateUrl: './camera-page.page.html',
  styleUrls: ['./camera-page.page.scss'],
})
export class CameraPagePage implements OnInit {

  private img?: HTMLImageElement;
  private canvas?: HTMLCanvasElement;
  public pixelData?: Uint8ClampedArray;

  public r: number = 0;
  public g: number = 0;
  public b: number = 0;
  public a: number = 0;

  public hex: string = '#000000';
  public rgb: string = "rgb(0, 0, 0)";

  private redrawCanvas: boolean = false;

  constructor(
    public photoService: PhotoService,
    private sanitizer: DomSanitizer,
    private clipboard: Clipboard,
    private toastController: ToastController,
  ) { }

  ngOnInit(): void {

  }

  // see https://stackoverflow.com/questions/57743966/getting-unsafe-url-error-while-displaying-image
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  addPhoto() {
    this.photoService.takePhoto();
    this.redrawCanvas = true;
  }

  // see https://stackoverflow.com/questions/8751020/how-to-check-if-a-specific-pixel-of-an-image-is-transparent
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

    this.hex = `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}`.toUpperCase();
    this.rgb = `(${this.r}, ${this.g}, ${this.b})`;
  }

  async copyHex() {
    this.clipboard.copy(this.hex);
    console.log('Hex copied');
    const toast = await this.toastController.create({
      message: 'Hex Copied to clipboard',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

  async copyRGB() {
    this.clipboard.copy(this.rgb);
    console.log('RGB copied');
    const toast = await this.toastController.create({
      message: 'RGB copied to clipboard',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}