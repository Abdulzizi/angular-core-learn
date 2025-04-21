import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { CommonModule } from "@angular/common";

import { ListCategoryComponent } from "./category/components/list-category/list-category.component";
import { ListProductComponent } from "./product/components/list-product/list-product.component";

import { DataTablesModule } from "angular-datatables";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreModule } from "src/app/core/core.module";

import { FormCategoryComponent } from "./category/components/form-category/form-category.component";
import { FormsModule } from "@angular/forms";
import { FormProductComponent } from "./product/components/form-product/form-product.component";

import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { ImageCropperModule } from "ngx-image-cropper";
import { UploadImageComponent } from "./product/components/upload-image/upload-image.component";

@NgModule({
  declarations: [
    ListCategoryComponent,
    ListProductComponent,
    FormCategoryComponent,
    FormProductComponent,
    UploadImageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    SharedModule,
    CoreModule,
    CKEditorModule,
    NgSelectModule,
    ImageCropperModule,
  ],
})
export class ProductModule {}
