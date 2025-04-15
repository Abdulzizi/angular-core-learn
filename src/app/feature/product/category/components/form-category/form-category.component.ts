import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { LandaService } from 'src/app/core/services/landa.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent {
  constructor(private categoryService: CategoryService, private landaService: LandaService) { }

  @Input() categoryId: string;
  @Output() afterSave = new EventEmitter<Boolean>();

  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';

  actionMode: string;
  formModel = {
    name: ''
  }

  ngOnChanges(): void {
    this.resetForm();
  }

  resetForm() {
    this.formModel = {
      name: ''
    }

    if(this.categoryId !== '') {
      this.actionMode = this.MODE_UPDATE;
      this.getCategory(this.categoryId);
      return true;
    }

    this.actionMode = this.MODE_CREATE;
    return false;
  }

  getCategory(categoryId) {
    this.categoryService.getCategoryById(categoryId).subscribe((res: any) => {
      this.formModel = res.data;
    });
  }

  save() {
    switch(this.actionMode) {
      case this.MODE_CREATE:
        this.insert(this.formModel);
        break;
      case this.MODE_UPDATE:
        this.update(this.formModel);
        break;
    }
  }

  insert(payload) {
    this.categoryService.createCategory(payload).subscribe((res:any) => {
      this.afterSave.emit(true);
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  update(payload) {
    this.categoryService.updateCategory(payload).subscribe((res:any) => {
      this.afterSave.emit(true);
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }
}
