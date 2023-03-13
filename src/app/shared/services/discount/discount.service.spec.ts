import { TestBed } from '@angular/core/testing';

import { DiscountService } from './discount.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';

describe('DiscountService', () => {
  let service: DiscountService;
  let backEnd: HttpTestingController;
  let url = environment.BACKEND_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DiscountService],
    });
    service = TestBed.inject(DiscountService);
    backEnd = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test HttpClient.get ', () => {
    const data = [
      {
        name: 'qqq',
        title: 'qqq',
        description: 'qqq',
        imagePath: 'qqq',
        data: 'qqq',
        id: 1,
      },
    ];
    service.getAll().subscribe((response) => expect(response).toBe(data));
    const req = backEnd.expectOne(url + `/discounts`);
    expect(req.request.method).toBe('GET');
    req.flush(data);
  });

  it('can test HttpClient.getOne ', () => {
    const data = {
      name: 'qqq',
      title: 'qqq',
      description: 'qqq',
      imagePath: 'qqq',
      data: 'qqq',
      id: 1,
    };
    service.getOne(1).subscribe((response) => expect(response).toEqual(data));
    const req = backEnd.expectOne(url + `/discounts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(data);
  });

  it('can test HttpClient.post ', () => {
    const data = {
      name: 'qqq',
      title: 'qqq',
      description: 'qqq',
      imagePath: 'qqq',
      data: 'qqq',
    };
    service.create(data).subscribe((response) => expect(response).toBeNull());
    const req = backEnd.expectOne(url + `/discounts`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(data);
    req.flush(null);
  });

  it('can test HttpClient.delete ', () => {
    const id = 1;
    service.delete(id).subscribe((response) => expect(response).toBeNull());
    const req = backEnd.expectOne(url + `/discounts/` + id);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('can test HttpClient.patch ', () => {
    const data = {
      name: 'qqq',
      title: 'qqq',
      description: 'qqq',
      imagePath: 'qqq',
      data: 'qqq',
    };
    const id = 1;
    service.update(data, id).subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const req = backEnd.expectOne(url + `/discounts/` + id);
    expect(req.request.method).toBe('PATCH');
    req.flush(data);
  });

  afterEach(() => {
    backEnd.verify();
  });
});
