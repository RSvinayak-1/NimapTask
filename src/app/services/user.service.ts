import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  saveCateory(data) {
    return this.http.post('http://localhost:4444/insertCategory', data);
  }

  findCategories() {
    return this.http.get('http://localhost:4444/getCetgories', {});
  }

  deleteCategory(data) {
    return this.http.delete('http://localhost:4444/deleteCategory' + data._id, {})
  }

  updateCategory(dataObj) {
    return this.http.put('http://localhost:4444/updateCat', dataObj)
  }

  productInsert(data) {
    return this.http.post('http://localhost:4444/insertProduct', data)
  }

  fetchProductPresent() {
    return this.http.get('http://localhost:4444/getProducts', {})
  }

  deleteSelectedPro(data) {
    return this.http.delete('http://localhost:4444/deleteProduct' + data._id, {})
  }

  updateProduct(data) {
    return this.http.put("http://localhost:4444/updatePro", data)
  }

  fetchCompleteData() {
    return this.http.get("http://localhost:4444/getList", {})
  }
}
