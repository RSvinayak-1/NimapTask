import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  add: any = 0;
  categoryList: any;
  selectedCatName: any;
  productResult1: any;
  productResult: any;
  activatePTable: number = 0;
  products: any;
  productDelete: any;
  selectedProdctId: any;
  ProductName: any;
  ProductId: any;
  ProductUpdate: any;
  categoryName: string;
  productName: string;
  productId: string;
  constructor(private myService: UserService) { }

  ngOnInit() {
    this.fetchProducts();
  }
  addProduct() {
    this.add = 1;
    this.fetchCategory();
  }

  fetchCategory() {
    // alert("hi")
    this.myService.findCategories().subscribe(result => {
      this.categoryList = result;
      console.log(this.categoryList);
    });
  }

  selectedCategory(cName) {
    // alert(cName);
    this.selectedCatName = cName;
  }

  saveProduct(pName, pId, cName) {
    console.log(pName + " , " + pId + " , " + cName);
    if (pName != "" && pId != undefined && cName != "") {
      var productObj = {
        pName: pName,
        Pid: pId,
        cName: cName
      }
      this.myService.productInsert(productObj).subscribe(result => {
        this.productResult = result;
        alert(this.productResult.message)
        this.productName = '';
        this.productId = '';
        this.categoryName = '';
        this.fetchProducts()

        // console.log(this.productResult1)/
      });
    } else {
      alert("Please Enter the Valid Data");
    }
  }

  fetchProducts() {
    this.myService.fetchProductPresent().subscribe(result => {
      this.products = result;
      if (this.products.length != 0) {
        this.activatePTable = 1;
        this.productResult = this.products;
        console.log(this.productResult);
      }
    })
  }

  deletePro(data) {
    this.myService.deleteSelectedPro(data).subscribe(result => {
      this.productDelete = result;
      alert(this.productDelete.message);
      this.fetchProducts();
    });
  }

  editProduct(data) {
    // console.log(data)
    this.selectedProdctId = data._id;
    this.ProductName = data.productName;
    this.ProductId = data.productId;
    // alert(this.selectedProdctId);
  }

  updatePro(pName, pId) {
    var updateObj = {
      Id: this.selectedProdctId,
      pName: pName,
      pId: pId
    }
    this.myService.updateProduct(updateObj).subscribe(result => {
      this.ProductUpdate = result;
      alert(this.ProductUpdate.message);
      this.fetchProducts();
    });
  }

}
