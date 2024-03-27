import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './page-title/page-title.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-error/404/page-not-found.component';

@NgModule({
  declarations: [PageTitleComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    FormsModule,
    ImageCropperModule,
  ],
  exports: [
    PageTitleComponent,
    PageNotFoundComponent
  ]
})
export class SharedModule { }
