import { LandaService } from "./../../../../core/services/landa.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private landaService: LandaService) {}

  getProduct(arrParameter) {
    return this.landaService.DataGet("/v1/products/", arrParameter);
  }

  getProductById(productId) {
    return this.landaService.DataGet("/v1/products/" + productId);
  }

  createProduct(payload) {
    return this.landaService.DataPost("/v1/products/", payload);
  }

  updateProduct(payload) {
    return this.landaService.DataPut("/v1/products/", payload);
  }

  deleteProduct(productId) {
    return this.landaService.DataDelete("/v1/products/" + productId);
  }
}
