window.centrapay({
  async onClick() {
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
        }),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }

      // Return Payment Request
      return json;
    } catch (error) {
      resultMessage(`🙅‍♀️ Could not create Payment Request: ${error}`);
    }
  },

  async onComplete(data) {
    try {
      const response = await fetch(
        `/api/payment-requests/${data.paymentRequestId}`,
        {
          method: 'GET',
        },
      );

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }

      const paymentRequest = json;
      if (paymentRequest.status === 'new') {
        // Void Payment Request
      }
      resultMessage(
        `ℹ️ Payment Request ID: ${paymentRequest.id}, Status: ${paymentRequest.status}`,
      );
    } catch (error) {
      resultMessage(`🙅‍♀️ Could not get Payment Request: ${error}`);
    }
  },
});

// Example function to show a result to the user. Your site's UI library can be used instead.
function resultMessage(message) {
  const container = document.querySelector('#result-message');
  container.innerHTML = message;
}
