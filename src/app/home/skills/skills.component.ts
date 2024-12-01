import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { SkillService } from '../../admin-dashboard/skill/skill.service';
import { environment } from '../../../environment';
interface Skill {
  name: string;
  id: number;
  category: string;
  icon: string;
}

interface SkillCategories {
  "frontend": Skill[];
  "backend": Skill[];
  "database": Skill[];
  "Controll Version": Skill[];
  "Methodology & Project Manager": Skill[];
  "language": Skill[];
  "others": Skill[];
}
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',

})

export class SkillsComponent implements OnInit {
  constructor(private service: SkillService) {

  }
  ngOnInit(): void {
    this.getSkills()
  }
  categories: (keyof SkillCategories)[] = ['frontend', 'backend', 'database', 'Controll Version', 'Methodology & Project Manager', 'language', 'others'];
  apiUrl: string = environment.apiUrl.replace(/\/+$/, '')
  skills: SkillCategories = {
    "frontend": [
      { name: "ReactJS", category: "frontend", id: 1, icon: "" },
      { name: "Angular", category: "frontend", id: 1, icon: "" },
      { name: "VueJs", category: "frontend", id: 1, icon: "" },
      { name: "AstroJS", category: "frontend", id: 1, icon: "" },
      { name: "NextJs", category: "frontend", id: 1, icon: "" },
      { name: "GatsbyJs", category: "frontend", id: 1, icon: "" },
    ],
    "backend": [
      { name: "NodeJS", category: "backend", id: 1, icon: "" },
      { name: "ExpressJs", category: "backend", id: 1, icon: "" },
      { name: "SpringBoot", category: "backend", id: 1, icon: "" },
      { name: "Laravel", category: "backend", id: 1, icon: "" },
      { name: "Symfony", category: "backend", id: 1, icon: "" },
      { name: "ZendFramework", category: "backend", id: 1, icon: "" },
    ],
    "database": [
      { name: "MongoDB", category: "database", id: 1, icon: "" },
      { name: "MySql", category: "database", id: 1, icon: "" },
      { name: "Postgress", category: "database", id: 1, icon: "" },
      { name: "Redis", category: "database", id: 1, icon: "" },
      { name: "SqLite", category: "database", id: 1, icon: "" },
    ],
    "Controll Version": [
      { name: "GitHub", category: "database", id: 1, icon: "" },
      { name: "Gitlab", category: "database", id: 1, icon: "" },
      { name: "Gitlab", category: "database", id: 1, icon: "" },

    ],
    "Methodology & Project Manager": [
      { name: "Zoho CRM", category: "crm", id: 1, icon: "" },
      { name: "Jira", category: "crm", id: 1, icon: "" },
      { name: "Salesforce", category: "crm", id: 1, icon: "" },
      { name: "Agile CRM", category: "crm", id: 1, icon: "" },
      { name: "DevOps", category: "crm", id: 1, icon: "" },
      { name: "Scrum", category: "crm", id: 1, icon: "" },

    ],
    "language": [
      { name: "Frensh", category: "language", id: 1, icon: "" },

      { name: "English", category: "language", id: 1, icon: "" },

      { name: "Deutsh", category: "language", id: 1, icon: "" },

    ],
    "others": [
      { name: "Wordpress", category: "others", id: 1, icon: "" },
      { name: "Java", category: "others", id: 1, icon: "" },
      { name: "Ionic", category: "others", id: 1, icon: "" },
      { name: ".Net", category: "others", id: 1, icon: "" },

    ]
  }
  getSkills() {
    this.service.getSkills().subscribe({
      next: (res: any) => {
        const data: any = {}; // Initialize an empty object to hold categories
        console.log(res)
        for (let s of res) {
          // Check if the category already exists; if not, initialize it as an array
          if (!data[s.category]) {
            data[s.category] = [];
          }

          // Push the skill to the appropriate category
          data[s.category].push(s);
        }
        this.skills = data
        console.log(this.skills)
      },
      error: (err) => {

      }
    })

  }
}


