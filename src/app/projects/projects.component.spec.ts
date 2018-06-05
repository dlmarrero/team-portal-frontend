import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { ProjectsService } from "./projects.service";

describe('ProjectsComponent', () => {
  let testProjects = [
    {
      "id": 1,
      "progress": 0,
      "categories": "Programming",
      "description": "Description of test project",
      "priority": "normal",
      "title": "Test Project",
      "team": "Training",
      "complete": false,
      "attachments": [],
      "links": [
        {
          "id": 2,
          "projectId": 1,
          "title": "Test",
          "url": "C:\\users\\dleef\\desktop\\disc1.txt"
        }
      ],
      "teamMembers": [
        {
          "id": 1,
          "workItemId": null,
          "projectLead": true,
          "sailorId": "7418e080-e7f8-4e93-8355-8609aa39825a",
          "userName": "Portal.Admin",
          "rateName": "ADM Admin"
        },
        {
          "id": 2,
          "workItemId": null,
          "projectLead": null,
          "sailorId": "c8ecee2a-dc09-40d5-b771-57f0236ac22a",
          "userName": "Simon.Cyberguy",
          "rateName": "CTNSA Cyberguy"
        },
        {
          "id": 3,
          "workItemId": null,
          "projectLead": false,
          "sailorId": "046ae4aa-30b9-426d-a0b8-38d085290edf",
          "userName": "Sylvester.Skates",
          "rateName": "CTN2 Skates"
        }
      ],
      "workItems": [
        {
          "id": 1,
          "projectId": 1,
          "title": "Test Task",
          "description": "Description of test task",
          "priority": "normal",
          "complete": true,
          "assignedUsers": [
            {
              "id": 15,
              "workItemId": 1,
              "projectLead": null,
              "sailorId": "37cc6f92-155b-4d70-97e2-eb865b448b4d",
              "userName": "Larry.Lippo",
              "rateName": "CTN1 Lippo"
            }
          ],
          "comments": [
            {
              "id": 4,
              "workItemId": 1,
              "author": "ADM Admin",
              "body": "test comment 3",
              "created": "2017-08-27T17:41:59.44",
              "stuck": false
            },
            {
              "id": 5,
              "workItemId": 1,
              "author": "CTNC Sailor",
              "body": "a comment",
              "created": "2017-08-27T18:08:58.2733333",
              "stuck": false
            }
          ]
        },
        {
          "id": 2,
          "projectId": 1,
          "title": "Test task 2",
          "description": "Description of test task 2",
          "priority": "normal",
          "complete": true,
          "assignedUsers": [],
          "comments": []
        },
        {
          "id": 3,
          "projectId": 1,
          "title": "Test task 3",
          "description": "Description for test task 3",
          "priority": "high",
          "complete": false,
          "assignedUsers": [
            {
              "id": 6,
              "workItemId": 3,
              "projectLead": null,
              "sailorId": "3",
              "userName": "Sylvester.Skates",
              "rateName": "CTN2 Skates"
            }
          ],
          "comments": []
        },
        {
          "id": 31,
          "projectId": 1,
          "title": "4",
          "description": "asdf",
          "priority": "Normal",
          "complete": true,
          "assignedUsers": [
            {
              "id": 39,
              "workItemId": 31,
              "projectLead": null,
              "sailorId": "587b249c-57c1-4258-bab3-0e5145cdaf83",
              "userName": "Michael.Middleman",
              "rateName": "CTN2 Middleman"
            },
            {
              "id": 40,
              "workItemId": 31,
              "projectLead": null,
              "sailorId": "046ae4aa-30b9-426d-a0b8-38d085290edf",
              "userName": "Sylvester.Skates",
              "rateName": "CTN2 Skates"
            }
          ],
          "comments": []
        },
        {
          "id": 32,
          "projectId": 1,
          "title": "5",
          "description": "asdf",
          "priority": "Normal",
          "complete": true,
          "assignedUsers": [
            {
              "id": 41,
              "workItemId": 32,
              "projectLead": null,
              "sailorId": "587b249c-57c1-4258-bab3-0e5145cdaf83",
              "userName": "Michael.Middleman",
              "rateName": "CTN2 Middleman"
            }
          ],
          "comments": []
        },
        {
          "id": 33,
          "projectId": 1,
          "title": "6",
          "description": "asdf",
          "priority": "Normal",
          "complete": true,
          "assignedUsers": [
            {
              "id": 54,
              "workItemId": 33,
              "projectLead": null,
              "sailorId": "7418e080-e7f8-4e93-8355-8609aa39825a",
              "userName": "Portal.Admin",
              "rateName": "ADM Admin"
            }
          ],
          "comments": []
        },
        {
          "id": 34,
          "projectId": 1,
          "title": "7",
          "description": "asdf",
          "priority": "Normal",
          "complete": true,
          "assignedUsers": [
            {
              "id": 42,
              "workItemId": 34,
              "projectLead": null,
              "sailorId": "046ae4aa-30b9-426d-a0b8-38d085290edf",
              "userName": "Sylvester.Skates",
              "rateName": "CTN2 Skates"
            }
          ],
          "comments": []
        },
        {
          "id": 36,
          "projectId": 1,
          "title": "8",
          "description": "asdf",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [
            {
              "id": 43,
              "workItemId": 36,
              "projectLead": null,
              "sailorId": "7418e080-e7f8-4e93-8355-8609aa39825a",
              "userName": "Portal.Admin",
              "rateName": "ADM Admin"
            }
          ],
          "comments": []
        },
        {
          "id": 37,
          "projectId": 1,
          "title": "9",
          "description": "asdf",
          "priority": "Normal",
          "complete": true,
          "assignedUsers": [
            {
              "id": 44,
              "workItemId": 37,
              "projectLead": null,
              "sailorId": "046ae4aa-30b9-426d-a0b8-38d085290edf",
              "userName": "Sylvester.Skates",
              "rateName": "CTN2 Skates"
            }
          ],
          "comments": []
        },
        {
          "id": 38,
          "projectId": 1,
          "title": "10",
          "description": "asdf",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [],
          "comments": []
        },
        {
          "id": 39,
          "projectId": 1,
          "title": "11",
          "description": "asdfasdf",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [
            {
              "id": 45,
              "workItemId": 39,
              "projectLead": null,
              "sailorId": "37cc6f92-155b-4d70-97e2-eb865b448b4d",
              "userName": "Larry.Lippo",
              "rateName": "CTN1 Lippo"
            },
            {
              "id": 46,
              "workItemId": 39,
              "projectLead": null,
              "sailorId": "587b249c-57c1-4258-bab3-0e5145cdaf83",
              "userName": "Michael.Middleman",
              "rateName": "CTN2 Middleman"
            }
          ],
          "comments": []
        },
        {
          "id": 44,
          "projectId": 1,
          "title": "tesasdf",
          "description": "asdf",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [],
          "comments": []
        },
        {
          "id": 45,
          "projectId": 1,
          "title": "asdf",
          "description": "dd",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [],
          "comments": []
        },
        {
          "id": 46,
          "projectId": 1,
          "title": "ddasdf",
          "description": "fasdf",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [],
          "comments": []
        },
        {
          "id": 47,
          "projectId": 1,
          "title": "dasd",
          "description": "fasdfdaddf",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [],
          "comments": []
        },
        {
          "id": 48,
          "projectId": 1,
          "title": "another",
          "description": "asdf",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [
            {
              "id": 55,
              "workItemId": 48,
              "projectLead": null,
              "sailorId": "046ae4aa-30b9-426d-a0b8-38d085290edf",
              "userName": "Sylvester.Skates",
              "rateName": "CTN2 Skates"
            }
          ],
          "comments": []
        },
        {
          "id": 49,
          "projectId": 1,
          "title": "Test Project",
          "description": "asdf",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [
            {
              "id": 56,
              "workItemId": 49,
              "projectLead": null,
              "sailorId": "587b249c-57c1-4258-bab3-0e5145cdaf83",
              "userName": "Michael.Middleman",
              "rateName": "CTN2 Middleman"
            }
          ],
          "comments": []
        },
        {
          "id": 50,
          "projectId": 1,
          "title": "tes",
          "description": "asdf",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [
            {
              "id": 57,
              "workItemId": 50,
              "projectLead": null,
              "sailorId": "91d3dbac-e8dd-4088-aa2a-d9a810f6846b",
              "userName": "Alexa.Rivinski",
              "rateName": "CTN3 Rivinski"
            }
          ],
          "comments": []
        },
        {
          "id": 51,
          "projectId": 1,
          "title": "a",
          "description": "df",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [
            {
              "id": 58,
              "workItemId": 51,
              "projectLead": null,
              "sailorId": "37cc6f92-155b-4d70-97e2-eb865b448b4d",
              "userName": "Larry.Lippo",
              "rateName": "CTN1 Lippo"
            }
          ],
          "comments": []
        },
        {
          "id": 52,
          "projectId": 1,
          "title": "asdf",
          "description": "asdf",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [],
          "comments": []
        },
        {
          "id": 53,
          "projectId": 1,
          "title": "task",
          "description": "asdf",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [
            {
              "id": 59,
              "workItemId": 53,
              "projectLead": null,
              "sailorId": "587b249c-57c1-4258-bab3-0e5145cdaf83",
              "userName": "Michael.Middleman",
              "rateName": "CTN2 Middleman"
            }
          ],
          "comments": []
        },
        {
          "id": 54,
          "projectId": 1,
          "title": "asdf",
          "description": "daf",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [
            {
              "id": 60,
              "workItemId": 54,
              "projectLead": null,
              "sailorId": "37cc6f92-155b-4d70-97e2-eb865b448b4d",
              "userName": "Larry.Lippo",
              "rateName": "CTN1 Lippo"
            }
          ],
          "comments": []
        },
        {
          "id": 56,
          "projectId": 1,
          "title": "fasdffd",
          "description": "asdf",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [
            {
              "id": 62,
              "workItemId": 56,
              "projectLead": null,
              "sailorId": "046ae4aa-30b9-426d-a0b8-38d085290edf",
              "userName": "Sylvester.Skates",
              "rateName": "CTN2 Skates"
            },
            {
              "id": 63,
              "workItemId": 56,
              "projectLead": null,
              "sailorId": "37cc6f92-155b-4d70-97e2-eb865b448b4d",
              "userName": "Larry.Lippo",
              "rateName": "CTN1 Lippo"
            }
          ],
          "comments": []
        }
      ]
    },
    {
      "id": 8,
      "progress": 0,
      "categories": "",
      "description": "Description of new project",
      "priority": "normal",
      "title": "New Project",
      "team": "Training",
      "complete": false,
      "attachments": [],
      "links": [],
      "teamMembers": [],
      "workItems": [
        {
          "id": 7,
          "projectId": 8,
          "title": "New Task",
          "description": "Task description",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [
            {
              "id": 16,
              "workItemId": 7,
              "projectLead": null,
              "sailorId": "587b249c-57c1-4258-bab3-0e5145cdaf83",
              "userName": "Michael.Middleman",
              "rateName": "CTN2 Middleman"
            },
            {
              "id": 17,
              "workItemId": 7,
              "projectLead": null,
              "sailorId": "046ae4aa-30b9-426d-a0b8-38d085290edf",
              "userName": "Sylvester.Skates",
              "rateName": "CTN2 Skates"
            }
          ],
          "comments": []
        },
        {
          "id": 8,
          "projectId": 8,
          "title": "Task 2",
          "description": "asdfasdf",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [
            {
              "id": 18,
              "workItemId": 8,
              "projectLead": null,
              "sailorId": "587b249c-57c1-4258-bab3-0e5145cdaf83",
              "userName": "Michael.Middleman",
              "rateName": "CTN2 Middleman"
            },
            {
              "id": 19,
              "workItemId": 8,
              "projectLead": null,
              "sailorId": "046ae4aa-30b9-426d-a0b8-38d085290edf",
              "userName": "Sylvester.Skates",
              "rateName": "CTN2 Skates"
            }
          ],
          "comments": []
        },
        {
          "id": 16,
          "projectId": 8,
          "title": "3",
          "description": "asdf",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [
            {
              "id": 25,
              "workItemId": 16,
              "projectLead": null,
              "sailorId": "587b249c-57c1-4258-bab3-0e5145cdaf83",
              "userName": "Michael.Middleman",
              "rateName": "CTN2 Middleman"
            }
          ],
          "comments": []
        },
        {
          "id": 30,
          "projectId": 8,
          "title": "4",
          "description": "asdf",
          "priority": "Normal",
          "complete": false,
          "assignedUsers": [
            {
              "id": 38,
              "workItemId": 30,
              "projectLead": null,
              "sailorId": "587b249c-57c1-4258-bab3-0e5145cdaf83",
              "userName": "Michael.Middleman",
              "rateName": "CTN2 Middleman"
            }
          ],
          "comments": []
        }
      ]
    },
    {
      "id": 10,
      "progress": 0,
      "categories": "",
      "description": "Do it",
      "priority": "normal",
      "title": "Do some computer stuff",
      "team": "Virtualization",
      "complete": true,
      "attachments": [],
      "links": [],
      "teamMembers": [],
      "workItems": [
        {
          "id": 58,
          "projectId": 10,
          "title": "Do step 1",
          "description": "step 1 is to blah blah",
          "priority": "normal",
          "complete": true,
          "assignedUsers": [
            {
              "id": 65,
              "workItemId": 58,
              "projectLead": null,
              "sailorId": "9c62e3ab-eb15-43a0-ba8a-eee60b63f23e",
              "userName": "Frank.Sleepslate",
              "rateName": "CTN3 Sleepslate"
            }
          ],
          "comments": [
            {
              "id": 6,
              "workItemId": 58,
              "author": "ADM Admin",
              "body": "Yo im stuck dawg",
              "created": "2017-11-12T03:47:39.4166667",
              "stuck": true
            }
          ]
        }
      ]
    }
  ]

  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  // Inject service into component
  let projectsService = fixture.debugElement.injector.get(ProjectsService)

  // Setup spy on the 'projects' observable
  let spy = spyOn(projectsService, 'projects')
    .and.returnValue(Promise.resolve(testProjects))

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsComponent],
      providers: [ProjectsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
