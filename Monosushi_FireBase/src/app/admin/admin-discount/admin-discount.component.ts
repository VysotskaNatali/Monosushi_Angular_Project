import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { ImageService } from 'src/app/shared/services/firebase/image.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss'],
})
export class AdminDiscountComponent implements OnInit {
  public adminDiscounts!: IDiscountResponse[];
  public editStatus = false;
  public showForm = true;
  public discountForm!: FormGroup;
  public currentId!: number | string;
  public isUploaded = false;
  public uploadPercent = 0;

  constructor(
    private discountService: DiscountService,
    private fb: FormBuilder,
    private imageService: ImageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initDiscountForm();
    this.loadDiscounts();
  }

  loadDiscounts(): void {
    this.discountService.getAllFirebase().subscribe((data) => {
      this.adminDiscounts = data as IDiscountResponse[];
    });
  }

  initDiscountForm(): void {
   const d = new Date();
   const date= `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`

    this.discountForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required],
      data: date,
    });
  }

  saveDiscount(): void {
    this.showForm = true;
    if (this.editStatus) {
      this.discountService
        .updateFirebase(this.discountForm.value, this.currentId as string)
        .then((data) => {
          this.loadDiscounts();
          this.toastr.info('Discount successfully updated');
        });
    } else {
      this.discountService.createFirebase(this.discountForm.value).then(() => {
        this.loadDiscounts();
        this.toastr.info('Discount successfully created');
      });
    }
    this.editStatus = false;
    this.isUploaded = false;
    this.discountForm.reset();
    this.discountForm.patchValue({ data: new Date() });
  }

  editDiscount(discount: IDiscountResponse): void {
    const d = new Date();
    const date= `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`
    this.editStatus = true;
    this.discountForm.patchValue({
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath,
      data: date,
    });
    this.isUploaded = true;
    this.showForm = false;
    this.editStatus = true;
    this.currentId = discount.id ;
  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.discountService.deleteFirebase(discount.id ).then(() => {
      this.loadDiscounts();
      this.toastr.error('Discount successfully deleted');
    });
  }
  //firebase
  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService
      .uploadFile('discounts', file.name, file)
      .then((data) => {
        this.discountForm.patchValue({
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
        this.discountForm.patchValue({ imagePath: null });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }
}
