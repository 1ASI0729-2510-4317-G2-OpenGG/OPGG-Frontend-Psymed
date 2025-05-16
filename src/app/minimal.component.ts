import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<h1>Minimal Component Works!</h1>'
})
export class MinimalComponent {
  constructor() {
    console.log('MinimalComponent inicializado');
  }
}
