import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Profile } from '../model/profile.entity';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService<Profile> {

  constructor() {
    super();
    this.resourceEndpoint = '/profiles';
  }
}
