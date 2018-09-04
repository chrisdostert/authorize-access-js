[![Build Status](https://travis-ci.org/chrisdostert/authorize-access-js.svg?branch=master)](https://travis-ci.org/chrisdostert/authorize-access-js)
[![Coverage](https://codecov.io/gh/chrisdostert/authorize-access-js/branch/master/graph/badge.svg)](https://codecov.io/gh/chrisdostert/authorize-access-js)

> *Be advised: this project is currently at Major version zero. Per the
> semantic versioning spec: "Major version zero (0.y.z) is for initial
> development. Anything may change at any time. The public API should
> not be considered stable."*

Javascript library which authorizes access based on pipeline of plugable async stages

# Why? 

## Problem
Authorization logic typically differs between calls. 

In a codebase of reasonable size, this can result in considerable LOC, much of which is similar or repeated.

## Solution
Create a library which authorizes access by processing a pipeline of plugable async stages.

Each stage:
  - receives the most recently returned accessCtx or the default accessCtx object, along w/ the original request
  - can return an updated accessCtx
  - can throw to end further pipeline stages being called & deny access
  - can call accessCtx.grant() to end further pipeline stages being called & grant access

If no stages call accessCtx.grant(), an error will be thrown. 

In this way the boilerplate code goes away & only the authorization rules remain, defined in a standard/re-useable way. 

# Installation

## NPM
```shell
npm install --save authorize-access
```

## Yarn
```shell
yarn add authorize-access
```

# Examples

# Basic usage

```javascript
// define your stages in some common location
const jsonWebToken = require('jsonwebtoken')
const jwtStage = (accessCtx, request) => jsonWebToken.verify(request.accessToken, 'XXXX' {algorithms: ['HS256']})

const userIdStage = (accessCtx, request) => {
  if (accessCtx.userId === request.userId) {
    accessCtx.grant()
  }
}

// then, for some incomming request you want to authorize access for...
const authorizeAccess = require('authorize-access')

const accessCtx = await authorizeAccess(
  {userId: 'XXX'},
  [jwtStage, userIdStage]
)

// either accessCtx of granted access or error thrown
```

# Support

[open an issue](https://github.com/chrisdostert/authorize-access-js/issues)

# Releases

releases are versioned according to
[![semver 2.0.0](https://img.shields.io/badge/semver-2.0.0-brightgreen.svg)](http://semver.org/spec/v2.0.0.html)
and [tagged](https://git-scm.com/book/en/v2/Git-Basics-Tagging); see
[CHANGELOG.md](CHANGELOG.md) for release notes

# Contributing

see [CONTRIBUTING.md](CONTRIBUTING.md)
