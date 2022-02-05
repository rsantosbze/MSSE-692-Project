import { TestBed } from '@angular/core/testing';
import { MaterialModule } from './../common/material/material.module';

import { SnackBarService } from './snack-bar.service';

describe('SnackBarServiceService', () => {
  let service: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
    });
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
