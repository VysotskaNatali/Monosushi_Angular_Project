import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ILogin } from 'src/app/shared/interfaces/account/acount.interface';
import { environment } from 'src/environments/environment';

describe('AccountService', () => {
  let service: AccountService;
  let backEnd: HttpTestingController;
  const apiUrl = environment.BACKEND_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService],
    });
    service = TestBed.inject(AccountService);
    backEnd = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    backEnd.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test HttpClient.get ', () => {
    const credentials: ILogin = {
      email: 'test@example.com',
      password: 'password',
    };
    service.login(credentials).subscribe();

    const req = backEnd.expectOne(
      `${apiUrl}/auth?email=${credentials.email}&password=${credentials.password}`
    );
    expect(req.request.method).toEqual('GET');
  });
});
