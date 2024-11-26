import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',

})
export class SkillsComponent {
  skills = {
    frontend: [
      { name: "ReactJS", value: "97" },
      { name: "Angular", value: "95" },
      { name: "VueJs", value: "50" },
      { name: "AstroJS", value: "85" },
      { name: "NextJs", value: "80" },
      { name: "GatsbyJs", value: "70" },
    ],
    backend: [
      { name: "NodeJS", value: "98" },
      { name: "ExpressJs", value: "98" },
      { name: "SpringBoot", value: "94" },
      { name: "Laravel", value: "92" },
      { name: "Symfony", value: "97" },
      { name: "ZendFramework", value: "87" }
    ],
    database: [
      { name: "MongoDB", value: "99" },
      { name: "MySql", value: "98" },
      { name: "Postgress", value: "98" },
      { name: "Redis", value: "90" },
      { name: "SqLite", value: "91" },
    ],
    version: [
      { name: "GitHub", value: "99" },
      { name: "Gitlab", value: "99" },
      { name: "Bitbucket", value: "98" },
    ],
    crm: [
      { name: "Zoho CRM", value: "98" },
      { name: "Jira", value: "97" },
      { name: "Salesforce", value: "70" },
      { name: "Agile CRM", value: "65" },
      { name: "DevOps", value: "97" },
      { name: "Agile", value: "90" },
      { name: "Scrum", value: "93" }
    ],
    language: [
      { name: "Frensh", value: "90" },
      { name: "English", value: "85" },
      { name: "Deutsh", value: "64" },
    ],
    other: [
      { name: "Wordpress", value: "90" },
      { name: "Java", value: "92" },
      { name: "Ionic", value: "80" },
      { name: ".Net", value: "70" },
    ]
  }
}
