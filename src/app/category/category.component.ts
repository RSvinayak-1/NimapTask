import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  add = 0;
  catResult: any;
  CategoryName: string;
  CategoryId: string;
  date: string;
  fetchedData: any;
  deleteResult: any;
  editCatId: any = null;
  updateResult: any;
  fetchedData1: any;
  activeTable: any = 0;

  constructor(private myService: UserService) { }

  ngOnInit() {
    this.fetchCategories();
  }

  addCategory() {
    this.add = 1;
  }

  saveExpense(categoryName, categoryId, date) {
    if (categoryName != '' && categoryId != '' && date != undefined) {
      var categoryData = {
        'catName': categoryName,
        'catId': categoryId,
        'date': date
      }
      this.myService.saveCateory(categoryData).subscribe(result => {
        this.catResult = result;
        alert(this.catResult.message);
        this.CategoryName = '';
        this.CategoryId = '';
        this.date = ''
        this.fetchCategories();
      });
    } else {
      alert("Please enter the necessary data");
    }

    // console.log( categoryData)
  }

  fetchCategories() {
    this.myService.findCategories().subscribe(result => {

      this.fetchedData1 = result;
      if (this.fetchedData1.length != 0) {
        this.activeTable = 1;
        this.fetchedData = this.fetchedData1;
      }
      // console.log(this.fetchedData)
    });
  }

  Delete(data, index) {
    console.log(data, index)
    var userPermission = confirm("Are you sure to delete the Category");
    if (userPermission == true) {
      this.myService.deleteCategory(data).subscribe(result => {
        this.deleteResult = result;
        alert(this.deleteResult.message);
        this.fetchCategories();
      })
    } else {
      alert("Category is not deleted");
    }
  }

  editData(data, index) {
    console.log(data)
    this.editCatId = data._id;
    this.CategoryName = data.categoryName;
    this.CategoryId = data.categoryId;
    this.date = data.AddedOn;
  }

  updateCat(catName, catId, date) {
    // alert(this.editCatId);
    console.log(catName + " , " + catId + " , " + date)
    if (catName != "" && catId != null && date != "") {
      var updateObject = {
        id: this.editCatId,
        catName: catName,
        catId: catId,
        date: date
      }
      this.myService.updateCategory(updateObject).subscribe(result => {
        this.updateResult = result;
        alert(this.updateResult.message);
        this.fetchCategories();
      });
    } else {
      alert("Enter the valid Data to update")
    }
  }

}
