import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Auth } from '../model/auth.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<Auth> {

  constructor() {
    super();
    this.resourceEndpoint = '/auth';
  }
}
