# MI133 Putzplan Lab Assignment Example

An example implementation of the *Putzplan* lab assignment. This example includes a backend implementation course
participants can use to build their own solution.

## Backend API Docs

### Residents

Residents in the shared housing.

Basic resident data type:

```typescript
class Resident {
    _id: ObjectId
    name: String
    surname: String
    createdAt: Date
}
```

#### List

`GET /api/residents`

List all residents in shared housing.

**return type:**
```typescript
class ResidentList {
    residents: Array<Resident>
}
```

**result example:**
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

#### List in Cyclic Order

`GET /api/resident/:residentId/next`

Get the IDs of all residents in the shared housing in cyclic order, starting with a specific resident.

**parameters:**
- residentId: ID of resident first in cyclic order


**return type:**
```typescript
class ResidentList {
    residentIds: Array<ObjectId>
}
```

**result example:**
```json
{
    "residentIds": [
        "5ade08d55af1423599d5ce9e",
        "5ade08d55af1423599d5ce9c",
        "5ade08d55af1423599d5ce9d"
    ]
}
```

#### Retrieve

`GET /api/resident/:residentId`

Get one specific resident.

**parameters:**
- residentId: ID of resident to retrieve

**return type:**
```
Resident
```

**example result**

```json
{
    "_id": "5ade08d55af1423599d5ce9e",
    "name": "Julie",
    "surname": "Mao",
    "createdAt": "2014-04-22 12:15:24.157Z"
}
```

#### Delete

`DELETE /api/resident/:residentId`

Remove a specific resident. Removes all references to that resident in tasks too. If the resident is marked as first in 
task, she will be replaced with the next resident in line.

**return type:**
```
Object
```

**example result**

```json
{}
```
