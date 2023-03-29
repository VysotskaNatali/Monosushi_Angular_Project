import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';
import { Storage } from '@angular/fire/storage';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireStorageModule],
      providers: [{ provide: Storage, useValue: {} }],
    });
    service = TestBed.inject(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
