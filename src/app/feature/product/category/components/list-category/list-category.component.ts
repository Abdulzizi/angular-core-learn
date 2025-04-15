import { Component, ViewChild } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { DndDropEvent } from 'ngx-drag-drop';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent {
  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal
  ) { }

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  listCategory: any;
  titleModal: string;
  categoryId: string;
  filter = {
    name: ''
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnChanges(): void {
    this.getCategories();
  }

  getCategories() {
    this.dtOptions = {
      serverSide: true,
      processing: true,
      ordering: false,
      pageLength: 10,
      ajax: (dtParams: any, callback) => {
        const params = {
          name: this.filter.name,
          per_page: dtParams.length,
        }

        this.categoryService.getCategory(params).subscribe((res: any) => {
          const { list, meta } = res.data;
          let number = dtParams.start + 1;
          list.forEach(val => {
            val.no = number++;
          });
          this.listCategory = list;
          callback({
            recordsTotal: meta.total,
            recordsFiltered: meta.total,
            data: [],
          });
        });
      }
    }
  }

  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  createCategory(modalId) {
    this.titleModal = 'Create Category';
    this.categoryId = '';
    this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
  }

  updateCategory(modalId, category) {
    this.titleModal = 'Update Category ' + category.name;
    this.categoryId = category.id;
    this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
  }

  deleteCategory(categoryId) {
    Swal.fire({
      title: 'Apakah kamu yakin ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Ya, Hapus data ini !',
    }).then((result) => {
      if (!result.value) return false;
 
      this.categoryService.deleteCategory(categoryId).subscribe((res: any) => {
        this.reloadDataTable();
      });
    });
  }

  
}
