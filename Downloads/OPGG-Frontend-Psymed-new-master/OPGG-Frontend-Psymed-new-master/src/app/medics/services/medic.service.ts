import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Medic } from '../model/medic.entity';

@Injectable({
  providedIn: 'root'
})
export class MedicService extends BaseService<Medic> {

  constructor() {
    super();
    this.resourceEndpoint = '/medics';
  }
}
