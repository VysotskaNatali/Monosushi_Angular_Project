import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { ImageService } from 'src/app/shared/services/firebase/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements OnInit {
  public adminCategories: Array<ICategoryResponse> = [];
  public adminProducts!: IProductResponse[];
  public productForm!: FormGroup;
  public editStatus = false;
  public showForm = true;
  public currentCategoryId!: number;
  public currentProductId!: number;
  public isUploaded = false;
  public uploadPercent = 0;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProduct();
    this.initProductForm();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.adminCategories = data;
      this.productForm.patchValue({
        category: this.adminCategories[0].id,
      });
    });
  }

  loadProduct(): void {
    this.productService.getAll().subscribe((data) => {
      this.adminProducts = data;
    });
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1],
    });
  }

  saveProduct(): void {
    if (this.editStatus) {
      this.productService
        .update(this.productForm.value, this.currentProductId)
        .subscribe(() => {
          this.loadProduct();
          this.toastr.info('Product successfully updated');
        });
    } else {
      this.productService.create(this.productForm.value).subscribe(() => {
        this.loadProduct();
        this.toastr.info('Product successfully created');
      });
    }
    this.editStatus = false;
    this.showForm = true;
    this.isUploaded = false;
    this.productForm.reset();
  }

  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      description: product.description,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath,
      count: [1],
    });
    this.isUploaded = true;
    this.editStatus = true;
    this.showForm = false;
    this.currentProductId = product.id;
  }

  deleteProduct(product: IProductResponse): void {
    this.productService.delete(product.id).subscribe(() => {
      this.loadProduct();
      this.toastr.error('Product successfully deleted');
    });
  }

  //firebase
  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService
      .uploadFile('products', file.name, file)
      .then((data) => {
        this.productForm.patchValue({
          imagePath: data,
        });
        this.isUploaded = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteImage(): void {
    this.imageService
      .deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.productForm.patchValue({ imagePath: null });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }
}
