import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();

// CORS Configuration for Production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000', // Local development
      'https://infinahub.netlify.app', // Your Netlify frontend URL
      'https://*.netlify.app' // All Netlify subdomains
    ];
    
    // Check if the origin is in allowed list
    if (allowedOrigins.some(allowedOrigin => origin === allowedOrigin || origin.endsWith('.netlify.app'))) {
      callback(null, true);
    } else {
      console.log('CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// routes
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import developerRoute from "./routes/developerRoutes.js";
import collabRoutes from "./routes/collabRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";  
import searchRoutes from "./routes/searchRoutes.js";

// use routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/developers", developerRoute);
app.use("/api/collab", collabRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/user", userRoutes);
app.use("/api/search", searchRoutes);

// Health check route (for monitoring)
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: 'Server is running!', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    frontend: 'https://infinahub.netlify.app'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Collab API Server', 
    version: '1.0.0',
    status: 'active',
    frontend: 'https://infinahub.netlify.app',
    endpoints: {
      auth: '/api/auth',
      posts: '/api/posts',
      projects: '/api/projects',
      users: '/api/user',
      upload: '/api/upload'
    }
  });
});

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: [
      '/api/auth',
      '/api/posts', 
      '/api/projects',
      '/api/user',
      '/api/upload',
      '/api/health'
    ]
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  
  if (error.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      error: 'CORS policy: Access denied',
      message: 'Your origin is not allowed to access this API',
      allowedOrigins: [
        'http://localhost:3000',
        'https://infinahub.netlify.app'
      ],
      yourOrigin: req.headers.origin
    });
  }
  
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : error.message
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`🌐 Frontend: https://infinahub.netlify.app`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});
