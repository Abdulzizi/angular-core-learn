import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { ProductService } from "./../../services/product.service";
import { LandaService } from "src/app/core/services/landa.service";
import { CategoryService } from "../../../category/services/category.service";

@Component({
  selector: "app-form-product",
  templateUrl: "./form-product.component.html",
  styleUrls: ["./form-product.component.scss"],
})
export class FormProductComponent implements OnInit, OnChanges {
  @Input() productId: string;
  @Output() afterSave = new EventEmitter<boolean>();

  public Editor = ClassicEditor;

  readonly MODE_CREATE = "add";
  readonly MODE_UPDATE = "update";
  readonly DEFAULT_TYPE = "Color";
  readonly DEFAULT_STATUS = "1";

  actionMode: string = this.MODE_CREATE;
  listCategory: any[] = [];
  showLoading = false;

  formModel = {
    id: null,
    name: "",
    price: null,
    description: "",
    is_available: true,
    product_category_id: null,
    photo_url: "",
    details: [],
    details_deleted: [],
  };

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private landaService: LandaService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["productId"] && this.productId) {
      this.actionMode = this.MODE_UPDATE;
      this.getProductById(this.productId);
    } else {
      this.resetForm();
    }
  }

  resetForm() {
    this.formModel = {
      id: null,
      name: "",
      price: null,
      description: "",
      is_available: null,
      product_category_id: null,
      photo_url: "",
      details: [],
      details_deleted: [],
    };
    this.actionMode = this.MODE_CREATE;
  }

  getProductById(id: string) {
    this.productService.getProductById(id).subscribe({
      next: (res: any) => {
        const data = res.data;
        this.formModel = {
          id: data.id,
          name: data.name,
          price: data.price,
          description: data.description,
          is_available: data.is_available,
          product_category_id: data.product_category_id,
          photo_url: data.photo_url,
          details: data.details || [],
          details_deleted: [],
        };
      },
      error: () => {
        this.landaService.alertError("Gagal", "Gagal mengambil data produk");
      },
    });
  }

  getCategories(keyword: string = "") {
    this.showLoading = true;
    this.categoryService.getCategory({ name: keyword }).subscribe({
      next: (res: any) => {
        this.listCategory = res.data.list;
        this.showLoading = false;
      },
      error: () => {
        this.landaService.alertError("Gagal", "Gagal mengambil data kategori");
        this.showLoading = false;
      },
    });
  }

  getCroppedImage(base64Image: string) {
    this.formModel.photo_url = base64Image;
  }

  addDetail() {
    this.formModel.details.push({
      is_added: true,
      description: "",
      type: this.DEFAULT_TYPE,
      price: 0,
    });
  }

  removeDetail(details: any[], index: number) {
    if (details[index]?.id) {
      this.formModel.details_deleted.push(details[index]);
    }
    details.splice(index, 1);
  }

  changeDetail(detail: any) {
    if (detail?.id) {
      detail.is_updated = true;
    }
  }

  save() {
    if (this.actionMode === this.MODE_CREATE) {
      this.insert(this.formModel);
    } else if (this.actionMode === this.MODE_UPDATE) {
      this.update(this.formModel);
    }
  }

  insert(payload: any) {
    const transformedPayload = {
      ...payload,
      is_available: payload.is_available ? 1 : 0, // true → 1, false → 0
    };

    console.log("FormModel:", transformedPayload);
    this.productService.createProduct(transformedPayload).subscribe({
      next: () => {
        this.afterSave.emit(true);
      },
      error: (err) => {
        this.landaService.alertError("Mohon Maaf", err.error.errors);
      },
    });
  }

  update(payload: any) {
    const transformedPayload = {
      ...payload,
      is_available: payload.is_available ? 1 : 0, // true → 1, false → 0
    };

    console.log("FormModel:", transformedPayload);

    this.productService.updateProduct(transformedPayload).subscribe({
      next: () => {
        this.afterSave.emit(true);
      },
      error: (err) => {
        this.landaService.alertError("Mohon Maaf", err.error.errors);
      },
    });
  }
}
