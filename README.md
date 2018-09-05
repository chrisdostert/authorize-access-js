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

In a codebase of reasonable size/complexity, this results in
  - bloat due to boilerplate/repeated code
  - hard to follow logic due to lack of standardization

## Solution
Authorize access via a standardized processing pipeline of plugable async stages a.k.a middleware.

Each middlware is called in order &:
  - receives the most recently returned accessCtx or the default accessCtx object, along w/ the original request
  - can return an updated accessCtx
  - can throw to skip all other middleware & deny access
  - can call accessCtx.grant() to skip all other middleware & grant access

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

```javascript
// for some business logic you want to authorize access to...
const authorizeAccess = require('authorize-access')
const jsonWebToken = require('jsonwebtoken')

const accessCtx = await authorizeAccess(
  {userId: 'XXX'},
  [
    // You should put middleware in some common location & re-use it; inlined here for demo purposes
    // 
    // middleware to verify JWT
    (accessCtx, request) => jsonWebToken.verify(request.accessToken, 'XXXX' {algorithms: ['HS256']}),
    // middleware to verify request is from auth'd user
    (accessCtx, request) => (accessCtx.userId === request.userId) && accessCtx.grant()
  ]
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
