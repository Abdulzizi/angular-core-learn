import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductService } from "./../../services/product.service";
import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import Swal from "sweetalert2";

@Component({
  selector: "app-list-product",
  templateUrl: "./list-product.component.html",
  styleUrls: ["./list-product.component.scss"],
})
export class ListProductComponent {
  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  listProduct: any;
  titleModal: string;
  productId: string;
  filter = {
    name: "",
  };

  getProducts() {
    this.dtOptions = {
      serverSide: true,
      processing: true,
      ordering: false,
      pageLength: 10,
      ajax: (dtParams: any, callback) => {
        const page = Math.floor(dtParams.start / dtParams.length) + 1;

        const params = {
          name: this.filter.name,
          per_page: dtParams.length,
          page: page,
        };

        this.productService.getProduct(params).subscribe((res: any) => {
          const { list, meta } = res.data;
          let number = dtParams.start + 1;
          list.forEach((val) => {
            val.no = number++;
          });
          this.listProduct = list;
          callback({
            recordsTotal: meta.total,
            recordsFiltered: meta.total,
            data: [],
          });
        });
      },
    };
  }

  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  createProduct(modalId) {
    this.titleModal = "Create Product";
    this.productId = null;
    this.modalService.open(modalId, { size: "lg", backdrop: "static" });
  }

  updateProduct(modalId, product) {
    this.titleModal = "Update Product " + product.name;
    this.productId = product.id;
    this.modalService.open(modalId, { size: "lg", backdrop: "static" });
  }

  deleteProduct(productId) {
    Swal.fire({
      title: "Apakah kamu yakin ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Ya, Hapus data ini !",
    }).then((result) => {
      if (!result.value) return false;

      this.productService.deleteProduct(productId).subscribe((res: any) => {
        this.reloadDataTable();
      });
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnChanges(): void {
    this.getProducts();
  }
}
