import { Component, EventEmitter, Output, Input } from "@angular/core";

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"],
})
export class UploadImageComponent {
  @Input() defaultImage: string | null = null;
  @Output() onSubmit = new EventEmitter<string>();

  isImageCropped: boolean = false;

  imageChangedEvent: any = "";
  croppedImage: string = "";

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.isImageCropped = false;
  }

  imageCropped(event: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Now you have the base64 string
      this.croppedImage = reader.result as string;
      // console.log("Cropped image:", this.croppedImage);
    };

    // Convert the Blob into base64
    reader.readAsDataURL(event.blob);
  }

  submitCroppedImage() {
    this.isImageCropped = true;

    this.onSubmit.emit(this.croppedImage);
  }
}
