# Turing Full Stack Challenge

## Requirements

- Node >= 10.0.0 for full ES 2018 support

## Setup

### Backend

- configure both development and test databases in `server/sequelize/config/config.json`
- copy `.env.example` to `.env.development` and configure
- `yarn`
- `npm run initdb` to initialize and populate database
- `node cmd data:create-admin admin admin@foo.com` to create the admin user
- `npm start`

### Frontend

- copy `.env.example` to `.env.development` and configure
- `yarn`
- `npm start`