import mongoose from 'mongoose';
import app from './app.js';
import { env } from './config/env.js';

async function start() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT}`);
      console.log(`   Health: http://localhost:${env.PORT}/api/v1/health`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

start();