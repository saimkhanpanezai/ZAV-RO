import express from 'express';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/payment', (req, res) => {
    const { amount, paymentMethod } = req.body;
    
    // Simulate payment processing
    console.log(`Processing payment of ${amount} via ${paymentMethod}`);
    
    // In a real app, you would integrate with Stripe/PayPal here
    // using process.env.STRIPE_SECRET_KEY
    
    setTimeout(() => {
      res.json({ success: true, transactionId: 'txn_' + Math.random().toString(36).substr(2, 9) });
    }, 1500);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving would go here
    // app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
