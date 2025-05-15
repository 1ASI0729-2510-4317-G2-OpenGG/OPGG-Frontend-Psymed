import {Component, OnInit} from '@angular/core';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {LocalStorageService} from '../../../shared/service/local-storage.service';

@Component({
  selector: 'app-toolbar',
  imports: [
    NgSwitchCase,
    NgSwitchDefault,
    MatButton,
    NgSwitch
  ],
  templateUrl: './toolbar.component.html',
  standalone: true,
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit{

  constructor(private localStorageService: LocalStorageService) {
  }

  role: string | null = null;

  ngOnInit(): void {
    this.localStorageService.setRole("0");
    this.role = this.localStorageService.getRole();
  }

}
