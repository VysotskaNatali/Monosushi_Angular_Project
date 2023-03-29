import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryComponent } from './admin-category.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { ICategoryResponse } from '../../shared/interfaces/category/category.interface';

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;

  const categories: ICategoryResponse[] = [
    { id: 1, name: 'qqq', path: 'qqq', imagePath: 'iqq' },
    { id: 2, name: 'qqq', path: 'qqq', imagePath: 'iqq' },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CategoryService', ['getAll']);
    await TestBed.configureTestingModule({
      declarations: [AdminCategoryComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadCategories', () => {
    spyOn(component, 'loadCategories');
    component.ngOnInit();
    expect(component.loadCategories).toHaveBeenCalled();
  });

  it('should initialize category form', () => {
    expect(component.categoryForm.value).toEqual({
      name: null,
      path: null,
      imagePath: null,
    });
  });

  it('should set form values when editing a category', () => {
    const category: ICategoryResponse = categories[0];
    component.editCategory(category);
    expect(component.isUploaded).toBe(true);
    expect(component.editStatus).toBe(true);
    expect(component.showForm).toBe(false);
  });

  it('should set form values when save a category', () => {
    component.saveCategory();
    expect(component.isUploaded).toBe(false);
    expect(component.editStatus).toBe(false);
    expect(component.showForm).toBe(true);
  });

  it('should set form values when delete a category', () => {
    const category: ICategoryResponse = categories[0];
    component.deleteCategory(category);
    expect(component.loadCategories).toBeTruthy();
  });
});
