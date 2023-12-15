# Introduction

Express.js API for a e-commerce app management system.
The API allows users to perform CRUD operations on products, categories, orders, payment, shipment and user domains.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
---

## Table of content

- [Group 4](#group-4)
- [Getting started](#getting-started)
- [Running tests](#running-tests)
- [Project structure](#project-structure)
- [Deployment](#deployment)

## Group 4

- [Svetlana Korneeva](https://github.com/svet-ko) - Products, Payment, Shipment
- [Ieva Vyliaudaite](https://github.com/microieva) - Users, Orders
- [Md Touhidul Islam](https://github.com/mdtouhidulislam136) - Categories

## Technologies

- Typescript
- Node.js
- Express.js
- MongoDB (Mongoose)
- Jest

## Getting started

- Clone this project using `git clone https://github.com/svet-ko/backend-group4.git` command;
- Create your `.env` from `.env.example` either by hand or with `cp .env.example .env` (macOS/Linux/WSL);
- Fill the `.env` file with your MongoDB cluster credentials and JWT encoding secret;
- Install the project dependencies with `yarn install`;
- Run the project in dev mode with `yarn start`;
- To compile possible enhancements of the project files run `yarn ts-watch`.

## Running tests

- Use `yarn test` command to run test cases;

## Project structure

```
.
├── schemas
├── src
    ├── controllers
    ├── errors
    ├── middlewares
    ├── models
    ├── routes
│   └── services
├── test
│   ├── __fixtures__
│   ├── controllers
│   └── services
├── types
└── utils
```

## Deployment

Access this project live [here](https://e-commerce-svet-ko.onrender.com/api/v1).
