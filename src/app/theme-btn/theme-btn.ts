import { Component, DOCUMENT, inject, OnInit } from '@angular/core';
import { ThemeSvc } from '../services/theme-svc';

@Component({
  selector: 'app-theme-btn',
  imports: [],
  templateUrl: './theme-btn.html',
  styleUrl: './theme-btn.css',
})
export class ThemeBtn implements OnInit {
  document = inject(DOCUMENT);
  themeSvc = inject(ThemeSvc);


  ngOnInit() {
    const isDark = this.themeSvc.isDark();
    const body = this.document.getElementsByTagName("body")[0];
    body.setAttribute("data-bs-theme", isDark ? 'dark' : 'light');
  }

  toggleTheme() {
    const isDark = this.themeSvc.toggleTheme();
    const body = this.document.getElementsByTagName("body")[0];
    body.setAttribute("data-bs-theme", isDark ? 'dark' : 'light');
  }
}
