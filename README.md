# centrapay-checkout-sample

Sample application using Centrapay SDK for the frontend and NodeJS for the backend.

[Centrapay E-commerce Guide](https://docs.centrapay.com/guides/ecommerce-website/)

## Run this project

### Locally

In your terminal run:

`yarn install`

`yarn start` and navigate to [http://localhost:6789/](http://localhost:6789/).

### Frontend

- Open `checkout.html` and replace the `test` string in the script tag with your Centrapay Merchant ID.

### Backend

- Rename the `.env.example` file to `.env`.
- Inside of the `.env` file:
  - Replace `YOUR_API_KEY` with your Centrapay API Key.
  - Replace `YOUR_MERCHANT_CONFIG_ID` your Centrapay Merchant Config ID.
- Run `yarn install` in your terminal
- Run `yarn start` in your terminal

## Legal

Copyright © 2024 [Centrapay][].

This software is licensed under Apache-2.0 License. Please see [LICENSE](/LICENSE) for details.

[Centrapay]: https://centrapay.com/
