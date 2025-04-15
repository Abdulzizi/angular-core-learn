import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCategoryComponent } from './category/components/list-category/list-category.component';
import { ListProductComponent } from './product/components/list-product/list-product.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormCategoryComponent } from './category/components/form-category/form-category.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListCategoryComponent,
    ListProductComponent,
    FormCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    SharedModule,
    CoreModule,
  ]
})
export class ProductModule { }
