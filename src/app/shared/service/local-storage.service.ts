import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }

  setRole(role: string): void {
    this.setItem('role', role);
  }

  getRole(): string {
    const role = this.getItem<string>('role');
    return role ?? "0"; // Valor por defecto "0" para usuarios sin autorización
  }

  removeRole(): void {
    this.removeItem('role');
  }
}
