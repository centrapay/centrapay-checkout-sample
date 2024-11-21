import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
import path from 'path';

const {
  CENTRAPAY_MERCHANT_API_KEY,
  CENTRAPAY_MERCHANT_CONFIG_ID,
  PORT = 6789,
} = process.env;
const base = 'https://service.centrapay.com';
const app = express();

// Host static files
app.use('/redirect-client', express.static('redirect-client'));
app.use('/popup-client', express.static('popup-client'));

// Parse post params sent in body in json format
app.use(express.json());

// Create a Payment Request
// https://docs.centrapay.com/api/payment-requests/#create-a-payment-request
const createPaymentRequest = async (props) => {
  const url = `${base}/api/payment-requests`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': CENTRAPAY_MERCHANT_API_KEY,
    },
    method: 'POST',
    body: JSON.stringify({
      configId: CENTRAPAY_MERCHANT_CONFIG_ID,
      ...props,
    }),
  });

  return handleResponse(response);
};

// Get a Payment Request
// https://docs.centrapay.com/api/payment-requests/#get-a-payment-request
const getPaymentRequest = async (props) => {
  const { paymentRequestId } = props;
  const url = `${base}/api/payment-requests/${paymentRequestId}`;
  const response = await fetch(url, {
    headers: {
      'X-Api-Key': CENTRAPAY_MERCHANT_API_KEY,
    },
  });
  return handleResponse(response);
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

app.post('/api/payment-requests', async (req, res) => {
  try {
    const { jsonResponse, httpStatusCode } = await createPaymentRequest(
      req.body,
    );
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error('Failed to create payment request:', error);
    res.status(500).json({ error: 'Failed to create payment request.' });
  }
});

app.get('/api/payment-requests/:paymentRequestId', async (req, res) => {
  try {
    const { jsonResponse, httpStatusCode } = await getPaymentRequest(
      req.params,
    );
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error('Failed to get payment request:', error);
    res.status(500).json({ error: 'Failed to get payment request.' });
  }
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'));
});

// Serve redirect client
app.get('/redirect', (req, res) => {
  res.sendFile(path.resolve('./redirect-client/checkout.html'));
});
app.get('/paid', (req, res) => {
  res.sendFile(path.resolve('./redirect-client/paid.html'));
});
app.get('/cancel', (req, res) => {
  res.sendFile(path.resolve('./redirect-client/cancel.html'));
});

// Serve popup client
app.get('/popup', (req, res) => {
  res.sendFile(path.resolve('./popup-client/checkout.html'));
});

app.listen(PORT, () => {
  console.log(`Node server listening at http://localhost:${PORT}/`);
});
