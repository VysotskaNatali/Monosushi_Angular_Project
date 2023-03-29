import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/firebase/image.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit {
  public adminCategories: Array<ICategoryResponse> = [];
  public showForm = true;
  public editStatus = false;
  public categoryForm!: FormGroup;
  public isUploaded = false;
  private currentCategoryId!:string;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.initCategoryForm();
  }

  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe((data) => {
      this.adminCategories = data as ICategoryResponse[];
    });
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required],
    });
  }

  editCategory(category: ICategoryResponse): void {
    this.editStatus = true;
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath,
    });
    this.isUploaded = true;
    this.editStatus = true;
    this.showForm = false;
    this.currentCategoryId = category.id;
  }

  deleteCategory(category: ICategoryResponse): void {
    this.categoryService.deleteFirebase(category.id).then(() => {
      this.loadCategories();
      this.toastr.error('Category successfully deleted');
    });
  }

  saveCategory(): void {
    if (this.editStatus) {
      this.categoryService
        .updateFirebase(this.categoryForm.value, this.currentCategoryId)
        .then(() => {
          this.loadCategories();
          this.toastr.info('Category successfully updated');
        });
    } else {
      this.categoryService.createFirebase(this.categoryForm.value).then(() => {
        this.loadCategories();
        this.toastr.info('Category successfully created');
       
      });
    }
    this.isUploaded = false;
    this.editStatus = false;
    this.showForm = true;
    this.categoryForm.reset();
  }

  //firebase
  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService
      .uploadFile('categories', file.name, file)
      .then((data) => {
        this.categoryForm.patchValue({ imagePath: data });
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
        this.categoryForm.patchValue({ imagePath: null });
      })

      .catch((err) => {
        console.log(err);
      });
  }
  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }
}
