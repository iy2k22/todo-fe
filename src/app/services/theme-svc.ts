import { Service } from '@angular/core';

@Service()
export class ThemeSvc {
  isDark(): boolean {
    const darkVal = localStorage.getItem("isDark");
    if (darkVal === null)
      return false;

    return JSON.parse(darkVal);
  }

  toggleTheme(): boolean {
    const darkVal = localStorage.getItem("isDark");
    const isDark = !darkVal ? true : !JSON.parse(darkVal);
    localStorage.setItem("isDark", JSON.stringify(isDark));
    return isDark;
  }
}
