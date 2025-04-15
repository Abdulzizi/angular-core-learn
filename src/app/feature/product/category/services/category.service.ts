import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private landaService: LandaService) { }

  getCategory(arrParameter) {
    return this.landaService.DataGet('/v1/categories/', arrParameter);
  }

  getCategoryById(categoryId) {
    return this.landaService.DataGet('/v1/categories/' + categoryId);
  }

  createCategory(payload) {
    return this.landaService.DataPost('/v1/categories/', payload);
  }

  updateCategory(payload) {
    return this.landaService.DataPut('/v1/categories/', payload);
  }

  deleteCategory(categoryId) {
    return this.landaService.DataDelete('/v1/categories/' + categoryId);
  }
}
