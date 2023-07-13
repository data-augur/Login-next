This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requirements

node 18.0.0 or higher

yarn for dependency management is recommended

## Getting Started


After pulling the code run the following to install dependencies

```bash
npm install
# or
yarn 
```
Create a .env file in the root directory and add the following to it.

NEXT_PUBLIC_BACKEND_URL=http://localhost:3002
JWT_SECRET=jwtvsecret

If the Nest.js project is hosted somewhere else we need to provide the url for it.

To run the development server:

```bash
npm run dev
# or
yarn dev
```

To run in production:

```bash

npm run build
npm run start
# or
yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

