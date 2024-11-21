# centrapay-checkout-sample

Sample application using Centrapay SDK for the frontend and NodeJS for the backend.

[Centrapay E-commerce Guide](https://docs.centrapay.com/guides/ecommerce-website/)

## Run this project

## Install Dependencies

```
yarn install
docker compose run script yarn install
```

## Configuration

### Backend

- Rename the `.env.example` file to `.env`.
- Inside of the `.env` file:
  - Replace `YOUR_API_KEY` with your Centrapay API Key.
  - Replace `YOUR_MERCHANT_CONFIG_ID` your Centrapay Merchant Config ID.

### Client
- Redirect method: There is nothing further to configure ✅
- Popup method: Open `popup-client/checkout.html` and replace the `YOUR_MERCHANT_ID` string in the script tag with your Centrapay Merchant ID.


## Running

```
yarn start
```

Optionally, to run in docker:
```
docker compose up
```

View the app at http://localhost:6789

## Legal

Copyright © 2024 [Centrapay][].

This software is licensed under Apache-2.0 License. Please see [LICENSE](/LICENSE) for details.

[Centrapay]: https://centrapay.com/
