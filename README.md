# Turing Full Stack Challenge - WIP

## Demo

[Live Demo](https://turing-fullstack-challenge.juwal.id/)

**WARNING! You'll receive an email of order confirmation if you complete a checkout.**

### Checkout With PayPal

You can checkout with PayPal with this account:
  - email: tff-buyer@foo.com
  - password: turingfullstack

### Admin Panel

You can access the admin panel by clicking the `Admin` link at the bottom of the page.

Login with:
  - username: admin
  - password: admin

## Requirements

- Node >= 10.0.0 for full ES 2018 support
- ElasticSearch 6.5+

## Setup

### ElasticSearch
 - install and run ElasticSearch

### Backend

- configure both development and test databases in `server/sequelize/config/config.json`
- copy `.env.example` to `.env.development` and configure
- `npm install`
- `npm run initdb` to initialize and populate database
- `node cmd data:create-admin admin admin@foo.com` to create the admin user
- `node cmd es:rebuild` to rebuild ElasticSearch index
- `npm start`

### Frontend

- copy `.env.example` to `.env.development` and configure
- `npm install`
- `npm start`