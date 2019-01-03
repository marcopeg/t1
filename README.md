# t1

## Development with Docker

Terminal 1 - postgres & backend API

    make dev

Terminal 2 - frontend with Webpack

    make app

Terminal 3 - build the frontend project

    make build

When you are done and want to quit:

    make undev

## Production with Docker

Create `.env.local` to run the solution with Docker:

    PG_DATABASE=postgres
    PG_USERNAME=postgres
    PG_PASSWORD=postgres
    PG_MAX_CONN_ATTEMPTS=10
    PG_CONN_ATTEMPTS_DELAY=2500

    SERVER_PORT=8080
    BCRYPT_ROUNDS=5
    JWT_SECRET=12345
    JWT_DURATION=30d
    LOGIN_DURATION=30d
    GRAPHQL_TEST_TOKEN=12345
    REACT_SSR_USE_CACHE=no

Then you can run:

    make prod

