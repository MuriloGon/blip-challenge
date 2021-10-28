## API Documentation

### <b>`GET`</b> /languages/{name}

List all main projects languages to a given github repository name.

#### Code example

> Shell

```bash
  curl \
  http://localhost:3000/languages/{name}
```

#### Parameters

| Name |  Type  |    In |                                                                 Description |
| ---- | :----: | ----: | --------------------------------------------------------------------------: |
| name | string | param | `Required` <br/> Github repository name used to find the projects languages |

### <b>`GET`</b> /projects/{name}

Get all projects in a github repository based on its language and repo's creation date.

#### Code example

> Shell

```bash
  curl \
  http://localhost:3000/projects/{name}?lang={C# || C++ || ...}
```

#### Parameters

| Name |  Type  |    In |                                                                                              Description |
| ---- | :----: | ----: | -------------------------------------------------------------------------------------------------------: |
| name | string | param |             `Required` <br/> Github repository name used to find the projects with a determined language |
| lang | string | query |                           `Required` <br/> `Case Insensitive` <br/> Set language used to find in `repo`. |
| qty  | number | query |                                         `Optional` <br/> `Default: 5` <br/> Number of projects to return |
| sort | number | query | `Optional` <br/> `Default: desc` <br/> Define projects sort by `name`. Accepted entries `desc` and `asc` |

#### Default Response

```bash
Status: 200 Ok
```

```json
{
  "name": "",
  "img": "",
  "description": "",
  "url": "",
  "language": "",
  "createdAt": ""
}
```
