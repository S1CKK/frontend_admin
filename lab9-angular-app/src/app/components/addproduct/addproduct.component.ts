import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  productType: string[] = ['Electronics','Wears','Furniture','Food'];

  productForm = new FormGroup({
    type: new FormControl('',[Validators.required]),
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    price: new FormControl('',[Validators.required,Validators.min(1),Validators.max(100000)]),
    file: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  });

  previewLoaded: boolean = false;

  constructor(private ps: ProductsService) { }

  ngOnInit(): void {
  }
  get detail(){return this.productForm.get('detail');}
  get price(){return this.productForm.get('price');}
  addProduct(){
    this.ps.addProduct(this.productForm.value).subscribe({
      next: data => {
        alert('Product added successfully');
        this.productForm.reset();
      },
      error: err => {
        console.log(err);
      }
  });
  }

  onChangeImg(e:any){
    if(e.target.files.length>0){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.productForm.patchValue({
          img: reader.result?.toString()
        })
      }
    }
  }

  resetForm(){
    this.productForm.reset();
    this.previewLoaded = false;
  }

}
