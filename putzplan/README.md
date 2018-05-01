# MI133 Putzplan Lab Assignment Example

An example implementation of the *Putzplan* lab assignment. This example includes a backend implementation course
participants can use to build their own solution.

NOTE: Due to problems with symbolic links on Windows you may need to replace the `script` directory and the `.babelrc`
file with copies of the actual files in the repositorie's root directory.

## Running

To run the backend with your own frontend, use `<repo-root>/putzplan/src/app/index.jsx` as your UI entry point and run
```
$ npm start
```

This will run the Webpack dev server and the backend.

# Backend API Docs

## Residents

Residents are the people currently residing in the shared housing. Residents have a name and a surname and the date
they were added. 

The date they were added provides a natural ordering of residents, starting with the earliest and
ending with the latest. With this ordering we can define a cyclic order. Starting at a specific resident, first we take
the residents next in the natural order and then start from the beginning until we reach the starting point.

Resident data types:

```typescript
class Resident {
    name: String
    surname: String
    createdAt: Date
}

class ResdientWithId extends Resident {
    _id: ObjectId
}
```

### List

`GET /api/residents`

List all residents in shared housing.

**result:**
```typescript
class ResidentList {
    residents: Array<ResidentWithId>
}
```

**example:**

path:
```
GET /api/residents
```

result:
```json
{
    "residents": [
        {
            "_id": "5ade08d55af1423599d5ce9c",
            "name": "Chrisjen",
            "surname": "Avasarala",
            "createdAt": "2015-08-26 09:11:17.111Z"
        },
        {
            "_id": "5ade08d55af1423599d5ce9d",
            "name": "Jim",
            "surname": "Holden",
            "createdAt": "2014-04-22 12:15:24.157Z"
        }
    ]
}
```

### List in Cyclic Order

`GET /api/resident/:residentId/next`

Get the IDs of all residents in the shared housing in cyclic order, starting with a specific resident.

**parameters:**
- residentId: ID of resident first in cyclic order


**result:**
```typescript
class ResidentList {
    residentIds: Array<ObjectId>
}
```

**example:**

path:
```
GET /api/resident/5ade08d55af1423599d5ce9e/next
```

result:
```json
{
    "residentIds": [
        "5ade08d55af1423599d5ce9e",
        "5ade08d55af1423599d5ce9c",
        "5ade08d55af1423599d5ce9d"
    ]
}
```

### Retrieve

`GET /api/resident/:residentId`

Get one specific resident.

**parameters:**
- residentId

**result:**
```
ResidentWithId
```

**example:**

path:
```
GET /api/resident/5ade08d55af1423599d5ce9e
```

result:
```json
{
    "_id": "5ade08d55af1423599d5ce9e",
    "name": "Julie",
    "surname": "Mao",
    "createdAt": "2014-04-22 12:15:24.157Z"
}
```

### Create

`POST /api/resident`

Add a resident to shared housing.

**body:**
```
Resident
```

**result:**
```
ResidentWithId
```

**example:**

path:
```POST /api/resident```

body:
```json
{
    "name": "Anderson",
    "surname": "Dawes",
    "createdAt": "2018-04-30T14:35:24.738Z"
}
```

result:
```json
{
    "_id": "5ae729ac27dd8203d383e848",
    "name": "Anderson",
    "surname": "Dawes",
    "createdAt": "2018-04-30T14:35:24.738Z"
}
```

### Change Name

`PUT /api/resident/:residentId/name`

Change the name of an existing resident.

**parameters:**
- residentId

**body:**
```typescript
class ChangeResidentNameRequest {
    name: String
}
```

**result:**
```
ResidentWithId
```

**example:**

path: 
```
PUT /api/resident/5ade08d55af1423599d5ce9e/name
```
body:
```json
{
    "name": "Juliette"
}
```
result:
```json
{
    "_id": "5ade08d55af1423599d5ce9e",
    "name": "Juliette",
    "surname": "Mao",
    "createdAt": "2014-04-22 12:15:24.157Z"
}
```

### Change Surname

`GET /api/resident/:residentId/surname`

Change the surname of an existing resident.

**parameters:**
- residentId

**body:**
```typescript
class ChangeResidentSurnameRequest {
    surname: String
}
```

**result:**
```
ResidentWithId
```

**example:**

path:
```
PUT /api/resident/5ade08d55af1423599d5ce9e/surname
```
body:
```json
{
    "surname": "Lenin"
}
```
result:
```json
{
    "_id": "5ade08d55af1423599d5ce9e",
    "name": "Julie",
    "surname": "Lenin",
    "createdAt": "2014-04-22 12:15:24.157Z"
}
```

### Delete

`DELETE /api/resident/:residentId`

Remove a specific resident. Removes all references to that resident in tasks too. If the resident is marked as first in 
task, she will be replaced with the next resident in line.

**parameters:**
- residentId

**result:**
```
Object
```

**example:**

path:
```
DELETE /api/resident/5ade08d55af1423599d5ce9e
```

result:
```json
{}
```

## Tasks

Tasks are housing related jobs that have to be done once a week. A task has a description, a start date, a first
resident and a date when it was last done. From these properties the task status can be derived.

Each week a different resident has to do the task. This list of people in charge is the cyclic ordering of residents, 
starting with the first resident in the week of the start date.
 
As each week ends its the next resident in the cyclic order of residents turn to do the task. The last time someone  
completed the task is stored, but there is no logic to track if residents did not fullfill their obligation in previous 
weeks. At the end of each week everything just moves on.

Task data types:

```typescript
class Task {
    description: String
    firstResident: ObjectId
    startDate: Date
    lastDone: Date
}

class TaskWithId extends Task {
    _id: ObjectId
}

class TaskStatus {
    done: boolean
    queue: Array<ObjectId>
}


class TaskWithStatus extends TaskWithId {
    status: TaskStatus
}
```


### List

`GET /api/tasks`

List all tasks in shared housing.

**result:**
```typescript
class TaskList {
    tasks: Array<Task>
}
```

**example:**

path:
```
GET /api/tasks
```

result:
```json
{
    "tasks": [
        {
            "_id": "5ade08e5eaf1423599d5ce9c",
            "description": "clean epstein drive",
            "firstResident": "5ade08d55af1423599d5ce9d",
            "startDate": "2017-01-26T09:11:17.111Z",
            "lastDone": "2016-01-26T09:11:17.111Z"
        },
        {
            "_id": "5ae8861ae838bf5eddbc80cf",
            "description": "hack transponder",
            "firstResident": "5ade08d55af1423599d5ce9e",
            "startDate": "2018-05-01T15:22:02.228Z",
            "lastDone": null
        },
        {
            "_id": "5ae8861ae838bf5eddbc80d0",
            "description": "find all batteries",
            "firstResident": "5ade08d55af1423599d5ce9e",
            "startDate": "2018-05-01T15:22:02.236Z",
            "lastDone": null
        }
    ]
}
```

### List with Status

`GET /api/tasks/status`

List all tasks in shared housing with their status.

**result:**
```typescript
class TaskList {
    tasks: Array<TaskWithStatus>
}
```

**example:**

path:
```
GET /api/tasks/status
```

result:
```json
{
    "tasks": [
        {
            "_id": "5ade08e5eaf1423599d5ce9c",
            "description": "clean epstein drive",
            "firstResident": "5ade08d55af1423599d5ce9d",
            "startDate": "2017-01-26T09:11:17.111Z",
            "lastDone": "2016-01-26T09:11:17.111Z",
            "status": {
                "done": false,
                "queue": [
                    "5ade08d55af1423599d5ce9d",
                    "5ade08d55af1423599d5ce9e",
                    "5ade08d55af1423599d5ce9c"
                ]
            }
        },
        {
            "_id": "5ae8861ae838bf5eddbc80cf",
            "description": "hack transponder",
            "firstResident": "5ade08d55af1423599d5ce9e",
            "startDate": "2018-05-01T15:22:02.228Z",
            "lastDone": null,
            "status": {
                "done": false,
                "queue": [
                    "5ade08d55af1423599d5ce9e",
                    "5ade08d55af1423599d5ce9c",
                    "5ade08d55af1423599d5ce9d"
                ]
            }
        },
        {
            "_id": "5ae8861ae838bf5eddbc80d0",
            "description": "find all batteries",
            "firstResident": "5ade08d55af1423599d5ce9e",
            "startDate": "2018-05-01T15:22:02.236Z",
            "lastDone": null,
            "status": {
                "done": false,
                "queue": [
                    "5ade08d55af1423599d5ce9e",
                    "5ade08d55af1423599d5ce9c",
                    "5ade08d55af1423599d5ce9d"
                ]
            }
        }
    ]
}
```

### Retrieve

`GET /api/task/:taskId`

Get one specific task.

**parameters:**
- taskId

**result:**
```
TaskWithId
```

**example:**

path:
```
GET /api/task/5ae8861ae838bf5eddbc80cf
```

result:
```json
{
    "_id": "5ae8861ae838bf5eddbc80cf",
    "description": "hack transponder",
    "firstResident": "5ade08d55af1423599d5ce9e",
    "startDate": "2018-05-01T15:22:02.228Z",
    "lastDone": null
}
```


### Retrieve with Status

`GET /api/task/:taskId/status`

Get one specific task with status.

**parameters:**
- taskId

**result:**
```
TaskWithStatus
```

**example:**

path:
```
GET /api/task/5ae8861ae838bf5eddbc80cf/status
```

result:
```json
{
    "_id": "5ae8861ae838bf5eddbc80cf",
    "description": "hack transponder",
    "firstResident": "5ade08d55af1423599d5ce9e",
    "startDate": "2018-05-01T15:22:02.228Z",
    "lastDone": null,
    "status": {
        "done": false,
        "queue": [
            "5ade08d55af1423599d5ce9e",
            "5ade08d55af1423599d5ce9c",
            "5ade08d55af1423599d5ce9d"
        ]
    }
}
```

### Create

`POST /api/task`

Add a resident to shared housing.

**body:**
```
Task
```

**result:**
```
TaskWithId
```

**example:**

path:
```POST /api/task```

body:
```json
{
    "description": "add gas tanks",
    "firstResident": "5ade08d55af1423599d5ce9e",
    "startDate": "2018-05-01T15:22:02.243Z",
    "lastDone": null
}
```

result:
```json
{
    "_id": "5ae8861ae838bf5eddbc80d1",
    "description": "add gas tanks",
    "firstResident": "5ade08d55af1423599d5ce9e",
    "startDate": "2018-05-01T15:22:02.243Z",
    "lastDone": null
}
```

### Change Description

`PUT /api/task/:taskId/description`

Change the description of an existing task.

**parameters:**
- taskId

**body:**
```typescript
class ChangeTaskDescriptionRequest {
    description: String
}
```

**result:**
```
TaskWithId
```

**example:**

path: 
```
PUT /api/task/5ae8861ae838bf5eddbc80cf/description
```
body:
```json
{
    "description": "hack transponders again"
}
```
result:
```json
{
    "_id": "5ae8861ae838bf5eddbc80cf",
    "description": "hack transponders again",
    "firstResident": "5ade08d55af1423599d5ce9e",
    "startDate": "2018-05-01T15:22:02.228Z",
    "lastDone": null
}
```

### Update Last Done

`GET /api/task/:taskId/lastDone`

Update the time the task was last done.

**parameters:**
- taskId

**body:**
```typescript
class UpdateTaskLastDoneRequest {
    lastDone: Date
}
```

**result:**
```
TaskWithId
```

**example:**

path:
```
PUT /api/task/5ae8861ae838bf5eddbc80cf/lastDone
```
body:
```json
{
    "lastDone": "2018-05-02T15:22:02.228Z"
}
```
result:
```json
{
    "_id": "5ae8861ae838bf5eddbc80cf",
    "description": "hack transponders again",
    "firstResident": "5ade08d55af1423599d5ce9e",
    "startDate": "2018-05-01T15:22:02.228Z",
    "lastDone": "2018-05-02T15:22:02.228Z"
}
```

### Delete

`DELETE /api/task/:taskId`

Remove a task.

**parameters:**
- taskId

**result:**
```
Object
```

**example:**

path:
```
DELETE /api/task/5ae8861ae838bf5eddbc80d0
```

result:
```json
{}
```
