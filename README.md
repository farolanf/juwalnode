# Turing Full Stack Challenge

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