import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './layouts/hero/hero.component';
import { AboutComponent } from "./pages/about/about.component";
import { SkillsComponent } from "./pages/skills/skills.component";
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HeaderComponent } from "./layouts/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent, AboutComponent, SkillsComponent, ProjectsComponent, ContactComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
}
