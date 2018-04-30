# MI133 Putzplan Lab Assignment Example

An example implementation of the *Putzplan* lab assignment. This example includes a backend implementation course
participants can use to build their own solution.

# Backend API Docs

## Residents

Residents are the people currently residing in the shared housing.

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
