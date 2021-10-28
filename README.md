## About

Technical challenge to TakeBlip. The objetive is use the BlipBot that consume a custom made API to list projects based on its main language and sort by the date of creation.

## Demo

https://user-images.githubusercontent.com/45644220/139341028-e5e5d28d-1883-4dfa-bcb3-27b3be833064.mp4

## API Documentation

```bash
export BASE_URL=https://murilo-take-challenge.herokuapp.com/
```

### <b>`GET`</b> /languages/{orgName}

List all repositories main language given a github organization name (`orgName`).

#### Code example

> Shell

```bash
  curl \
  $BASE_URL/languages/{orgName}
```

#### Parameters

| Name    |  Type  |    In |                                                                                                                                                                   Description |
| ------- | :----: | ----: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| orgName | string | param | `Required` <br/> Github organization name used to find the projects main language. It is returned the language name and its encodedForm that must be used in the query params |

#### Default Response

```bash
Status: 200 Ok
```

```json
[
  {
    "language": "C#",
    "encoded": "C%23"
  },
  {
    "language": "CSS",
    "encoded": "CSS"
  },
  {
    "language": "HTML",
    "encoded": "HTML"
  }
]
```

#### Errors

```bash
Status: 404 Not Found
```

```json
{
  "error": "Org not found"
}
```

### <b>`GET`</b> /repositories/{orgName}/{language}

List all repositories to a github organization and sort it based on repo's creation date.

#### Code example

> Shell

```bash
  curl \
  $BASE_URL/repositories/{orgName}/{language}
```

#### Parameters

| Name     |  Type  |    In |                                                                                                       Description |
| -------- | :----: | ----: | ----------------------------------------------------------------------------------------------------------------: |
| orgName  | string | param |         `Required` <br/> Github organization name used to find the repositories with a determined main `language` |
| language | string | param |               `Required` <br/> `Case Insensitive` <br/> Language to find all repos in a organization (`orgName`). |
| qty      | number | query |                                             `Optional` <br/> `Default: 10` <br/> Number of repositories to return |
| sort     | string | query | `Optional` <br/> `Default: desc` <br/> Define projects sort by repository name. Accepted entries `desc` and `asc` |

#### Default Response

```bash
Status: 200 Ok
```

```json
[
  {
    "name": "library.data",
    "img": "https://avatars.githubusercontent.com/u/4369522?v=4",
    "description": "Provides a simple abstraction for implementing the repository and unit of work patterns for data-enabled applications",
    "url": "https://github.com/takenet/library.data",
    "language": "C#",
    "createdAt": "2013-10-25T13:04:51.000Z"
  },
  {
    "name": "library.logging",
    "img": "https://avatars.githubusercontent.com/u/4369522?v=4",
    "description": "Provides a simple logging interface for applications and some basic implementations of this interface",
    "url": "https://github.com/takenet/library.logging",
    "language": "C#",
    "createdAt": "2013-10-25T15:18:07.000Z"
  }
]
```

#### Errors

```bash
Status: 404 Not Found
```

```json
{
  "error": "Org not found"
}
```

```bash
Status: 400 Bad Request
```

```json
{
  "error": "\"sort\" must be one of [asc, desc]"
}
```

```json
{
  "error": "\"qty\" must be a number"
}
```

```json
{
  "error": "\"qty\" must be greater than 0"
}
```
