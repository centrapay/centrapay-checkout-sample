'use strict';

document.getElementById('centrapay-button').addEventListener('click', async function(event) {
  try {
    const response = await fetch('/api/payment-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Use the 'body' param to optionally pass information
      // like preAuth and lineItems
      body: JSON.stringify({
        value: {
          amount: '1',
          currency: 'NZD',
        },
        lineItems: [
          {
            name: 'Coffee Grounds',
            sku: 'GH1234',
            qty: '1',
            price: '1',
            tax: '15.00',
          },
        ],
        redirectPaidUrl: 'http://localhost:6789/paid',
        redirectCancelUrl: 'http://localhost:6789/cancel',
      }),
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message);
    }

    window.location.replace(json.url);
  } catch (error) {
    resultMessage(`🙅‍♀️ Could not create Payment Request: ${error}`);
  }
});