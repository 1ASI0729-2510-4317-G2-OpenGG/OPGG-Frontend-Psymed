import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatTooltipModule
  ],
  template: `
    <div class="dashboard-root">
      <!-- Header -->
      <mat-toolbar class="header" color="primary">
        <button mat-icon-button (click)="sidenav.toggle()" class="menu-button">
          <mat-icon>menu</mat-icon>
        </button>
        <span class="branding" routerLink="/doctor-dashboard">
          <img src="assets/logo.png" alt="Psimed" class="logo" *ngIf="false">
          <span class="app-name">Psimed</span>
        </span>

        <!-- Navigation Actions -->
        <div class="nav-actions">
          <button mat-icon-button
                  routerLink="/doctor-dashboard"
                  matTooltip="Go to Dashboard"
                  class="home-button">
            <mat-icon>home</mat-icon>
          </button>
        </div>

        <span class="spacer"></span>

        <!-- Search (to be implemented) -->
        <button mat-icon-button class="search-button" [matMenuTriggerFor]="searchMenu">
          <mat-icon>search</mat-icon>
        </button>
        <mat-menu #searchMenu="matMenu" class="search-menu">
          <div class="search-container" (click)="$event.stopPropagation()">
            <mat-icon>search</mat-icon>
            <input placeholder="Search patients, appointments...">
          </div>
        </mat-menu>

        <!-- Notifications -->
        <button mat-icon-button [matMenuTriggerFor]="notificationsMenu" class="notification-btn">
          <mat-icon [matBadge]="notificationCount" matBadgeColor="warn" matBadgeSize="small">
            notifications
          </mat-icon>
        </button>
        <mat-menu #notificationsMenu="matMenu" class="notifications-menu">
          <div class="menu-header">
            <h3>Notifications</h3>
            <button mat-button color="primary">Mark all as read</button>
          </div>
          <mat-divider></mat-divider>
          <div class="notification-list">
            <button mat-menu-item class="notification-item unread">
              <mat-icon color="primary">person_add</mat-icon>
              <div class="notification-content">
                <span class="notification-title">New Patient Registration</span>
                <span class="notification-time">30 minutes ago</span>
              </div>
            </button>
            <button mat-menu-item class="notification-item unread">
              <mat-icon color="accent">event_available</mat-icon>
              <div class="notification-content">
                <span class="notification-title">Appointment Reminder</span>
                <span class="notification-time">1 hour ago</span>
              </div>
            </button>
            <button mat-menu-item class="notification-item">
              <mat-icon color="warn">medical_information</mat-icon>
              <div class="notification-content">
                <span class="notification-title">Medical Record Updated</span>
                <span class="notification-time">2 hours ago</span>
              </div>
            </button>
          </div>
          <mat-divider></mat-divider>
          <button mat-menu-item class="view-all">
            <span>View all notifications</span>
          </button>
        </mat-menu>

        <!-- Profile Menu -->
        <button mat-icon-button [matMenuTriggerFor]="profileMenu" class="profile-button">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #profileMenu="matMenu">
          <div class="menu-header user-header">
            <mat-icon class="avatar">account_circle</mat-icon>
            <div class="user-info">
              <h3>{{ doctorName }}</h3>
              <span>Psychiatrist</span>
            </div>
          </div>
          <mat-divider></mat-divider>
          <button mat-menu-item routerLink="./profile">
            <mat-icon>person</mat-icon>
            <span>My Profile</span>
          </button>
          <button mat-menu-item routerLink="./settings">
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </mat-toolbar>

      <!-- Main Content -->
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav [mode]="'side'" [opened]="true" class="sidenav">
          <mat-nav-list>
            <div class="nav-section">
              <h3 matSubheader>Principal</h3>
              <a mat-list-item routerLink="./" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                <mat-icon matListItemIcon>dashboard</mat-icon>
                <span matListItemTitle>Dashboard</span>
              </a>

              <a mat-list-item routerLink="./patients" routerLinkActive="active">
                <mat-icon matListItemIcon>people</mat-icon>
                <span matListItemTitle>Pacientes</span>
              </a>

              <a mat-list-item routerLink="./appointments" routerLinkActive="active">
                <mat-icon matListItemIcon>event</mat-icon>
                <span matListItemTitle>Citas</span>
              </a>

              <a mat-list-item routerLink="./medical-records" routerLinkActive="active">
                <mat-icon matListItemIcon>folder_shared</mat-icon>
                <span matListItemTitle>Historias Clínicas</span>
              </a>
            </div>

            <mat-divider></mat-divider>

            <div class="nav-section">
              <h3 matSubheader>Gestión Clínica</h3>
              <a mat-list-item routerLink="./treatments" routerLinkActive="active">
                <mat-icon matListItemIcon>psychology</mat-icon>
                <span matListItemTitle>Tratamientos</span>
              </a>

              <a mat-list-item routerLink="./evaluations" routerLinkActive="active">
                <mat-icon matListItemIcon>assessment</mat-icon>
                <span matListItemTitle>Evaluaciones</span>
              </a>

              <a mat-list-item routerLink="./reports" routerLinkActive="active">
                <mat-icon matListItemIcon>summarize</mat-icon>
                <span matListItemTitle>Informes</span>
              </a>
            </div>

            <mat-divider></mat-divider>

            <div class="nav-section">
              <h3 matSubheader>Configuración</h3>
              <a mat-list-item routerLink="./profile" routerLinkActive="active">
                <mat-icon matListItemIcon>person</mat-icon>
                <span matListItemTitle>Mi Perfil</span>
              </a>

              <a mat-list-item routerLink="./settings" routerLinkActive="active">
                <mat-icon matListItemIcon>settings</mat-icon>
                <span matListItemTitle>Configuración</span>
              </a>
            </div>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <div class="content-container">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .dashboard-root {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .branding {
      display: flex;
      align-items: center;
      margin-left: 8px;
      cursor: pointer;
      user-select: none;
    }

    .branding:hover {
      opacity: 0.9;
    }

    .logo {
      height: 32px;
      margin-right: 8px;
    }

    .app-name {
      font-size: 1.5rem;
      font-weight: 500;
      letter-spacing: 0.5px;
    }

    .nav-actions {
      margin-left: 16px;
    }

    .home-button {
      background-color: rgba(255, 255, 255, 0.1);
      transition: background-color 0.3s ease;
    }

    .home-button:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .spacer {
      flex: 1 1 auto;
    }

    .search-button {
      margin-right: 8px;
    }

    .search-container {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      background: #f5f5f5;
      border-radius: 4px;
      margin: 8px;
      width: 300px;
    }

    .search-container input {
      border: none;
      background: none;
      padding: 8px;
      width: 100%;
      outline: none;
      font-size: 16px;
    }

    .notification-btn {
      margin: 0 8px;
    }

    .menu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
    }

    .menu-header h3 {
      margin: 0;
      font-size: 1.1rem;
      color: #333;
    }

    .user-header {
      padding: 16px;
      display: flex;
      align-items: center;
    }

    .avatar {
      font-size: 40px;
      width: 40px;
      height: 40px;
      margin-right: 16px;
    }

    .user-info h3 {
      margin: 0;
      font-size: 1rem;
    }

    .user-info span {
      color: #666;
      font-size: 0.9rem;
    }

    .notification-list {
      max-height: 300px;
      overflow-y: auto;
    }

    .notification-item {
      display: flex;
      align-items: flex-start;
      padding: 12px 16px;
    }

    .notification-item.unread {
      background-color: #f5f5f5;
    }

    .notification-content {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
    }

    .notification-title {
      font-weight: 500;
    }

    .notification-time {
      font-size: 0.8rem;
      color: #666;
    }

    .view-all {
      text-align: center;
      color: #1976d2;
    }

    .sidenav-container {
      flex: 1;
      margin-top: 64px; /* Height of toolbar */
    }

    .sidenav {
      width: 250px;
      background-color: #f5f5f5;
      border-right: 1px solid #e0e0e0;
    }

    mat-nav-list {
      padding-top: 16px;
    }

    .mat-list-item {
      margin: 4px 8px;
      border-radius: 4px;
    }

    .active {
      background-color: #e3f2fd !important;
      color: #1976d2;
    }

    .content-container {
      padding: 24px;
      background-color: #fafafa;
      min-height: calc(100vh - 64px);
    }

    .nav-section {
      margin: 16px 0;
    }

    .nav-section h3 {
      color: #666;
      font-size: 0.8rem;
      font-weight: 500;
      margin: 8px 16px;
      text-transform: uppercase;
    }

    mat-divider {
      margin: 8px 0;
    }

    @media (max-width: 768px) {
      .sidenav {
        width: 200px;
      }

      .search-container {
        width: 200px;
      }

      .branding .app-name {
        display: none;
      }
    }
  `]
})
export class DoctorDashboardComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  doctorName = '';
  notificationCount = 2;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return;
    }
    const user = this.authService.currentUserValue;
    this.doctorName = user?.name || 'Dr. John Doe';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
