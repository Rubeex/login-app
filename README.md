<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A user authentication REST API built with Node.js, Nestjs, and mysql with security in mind.

<ul>
  <li>JSON Web Token for authentication and authorization.</li>
  <li>Bcrypt for password hashing.</li>
  <li>Using TypeORM.</li>
  <li>Validation Pipes.</li>
</ul>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

<h2>Here is what you need to do</h2>
<ul>
    <li>Create a .env file at the root directory of the project and add these variables to it:</li>
    <ul><li>MYSQL_HOST;USER;PASSWORD;NAME = MYSQL database</li><li>JWT_SECRET_KEY = the secret key for signing and verifying JSON Web Token keys.
</li></ul>
</ul>

<h2>API Endpoints</h2>
<ul>
    <li>POST Requests::</li>
    <ul>
      <li>auth/register</li>
      <li>auth/login</li>
    </ul>
     <li>GET Requests::</li>
    <ul>
      <li>user/profile</li>
      <li>user/</li>
      <li>user/:id</li>
    </ul>
</ul>


