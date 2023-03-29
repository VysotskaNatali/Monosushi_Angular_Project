import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let backEnd: HttpTestingController;
  let url = environment.BACKEND_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    backEnd = TestBed.inject(HttpTestingController);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test HttpClient.get ', () => {
    const data = [
      {
        id: 1,
        category: { id: 2, name: 'category', path: 'qqq', imagePath: 'qqq' },
        path: 'qqq',
        name: 'qqq',
        description: 'qqq',
        weight: 10,
        price: 10,
        imagePath: 'qqq',
        count: 1,
      },
      {
        id: 2,
        category: { id: 2, name: 'category', path: 'qqq', imagePath: 'qqq' },
        path: 'qqq',
        name: 'qqq',
        description: 'qqq',
        weight: 10,
        price: 10,
        imagePath: 'qqq',
        count: 1,
      },
    ];
    service.getAll().subscribe((response) => expect(response).toBe(data));
    const req = backEnd.expectOne(url + `/products`);
    expect(req.request.method).toBe('GET');
    req.flush(data);
  });

  it('can test HttpClient.getOne ', () => {
    const data = {
      id: 2,
      category: { id: 2, name: 'category', path: 'qqq', imagePath: 'qqq' },
      path: 'qqq',
      name: 'qqq',
      description: 'qqq',
      weight: 10,
      price: 10,
      imagePath: 'qqq',
      count: 1,
    };
    service.getOne(1).subscribe((response) => expect(response).toEqual(data));
    const req = backEnd.expectOne(url + `/products/1`);
    expect(req.request.method).toBe('GET');
    req.flush(data);
  });

  it('can test HttpClient.post ', () => {
    const data = {
      id: 2,
      category: { id: 2, name: 'category', path: 'qqq', imagePath: 'qqq' },
      path: 'qqq',
      name: 'qqq',
      description: 'qqq',
      weight: 10,
      price: 10,
      imagePath: 'qqq',
      count: 1,
    };
    service.create(data).subscribe((response) => expect(response).toBeNull());
    const req = backEnd.expectOne(url + `/products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(data);
    req.flush(null);
  });

  it('can test HttpClient.delete ', () => {
    const id = 1;
    service.delete(id).subscribe((response) => expect(response).toBeNull());
    const req = backEnd.expectOne(url + `/products/` + id);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('can test HttpClient.patch ', () => {
    const data = {
      id: 2,
      category: { id: 2, name: 'category', path: 'qqq', imagePath: 'qqq' },
      path: 'qqq',
      name: 'qqq',
      description: 'qqq',
      weight: 10,
      price: 10,
      imagePath: 'qqq',
      count: 1,
    };
    const id = 1;
    service.update(data, id).subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const req = backEnd.expectOne(url + `/products/` + id);
    expect(req.request.method).toBe('PATCH');
    req.flush(data);
  });

  afterEach(() => {
    backEnd.verify();
  });
});
