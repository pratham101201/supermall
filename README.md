# SuperMall Web Application

A comprehensive mall management system with beautiful UI, real-time features, and complete backend integration.

## 🚀 Features

### Frontend
- **Modern React Application** with TypeScript support
- **Beautiful UI/UX** with Tailwind CSS and Framer Motion animations
- **Responsive Design** that works on all devices
- **Firebase Integration** for authentication and real-time data
- **API Integration** with custom hooks and services

### Backend
- **Flask REST API** with SQLAlchemy ORM
- **JWT Authentication** system
- **Database Models** for Users, Shops, Products, Offers, Reviews
- **Search Functionality** across shops and products
- **CORS enabled** for frontend integration

### Integration Features
- **Unified Authentication** between Firebase and Backend
- **Real-time Data Sync** between Firebase and PostgreSQL/SQLite
- **API Service Layer** with automatic token management
- **Error Handling** and loading states
- **Custom Hooks** for data fetching

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Firebase account
- Git

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Enable Storage
6. Get your Firebase config from Project Settings

### 3. Environment Configuration

1. Copy `.env.example` to `.env`
2. Update Firebase configuration in `src/firebase/config.js`
3. Update environment variables in `.env`

```env
# Frontend
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# Backend
SECRET_KEY=your-super-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
DATABASE_URL=sqlite:///supermall.db
```

### 4. Database Setup

```bash
# Initialize the database
cd backend
python app.py
# This will create the database tables automatically
```

### 5. Run the Application

```bash
# Option 1: Run both frontend and backend together
npm run start:all

# Option 2: Run separately
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend
npm run dev
```

## 🏗️ Architecture

### Frontend Structure
```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Header, Footer, Layout
│   └── Home/           # Home page components
├── pages/              # Page components
├── services/           # API services
├── hooks/              # Custom React hooks
├── contexts/           # React contexts
├── firebase/           # Firebase configuration
└── utils/              # Utility functions
```

### Backend Structure
```
backend/
├── app.py              # Main Flask application
├── config.py           # Configuration settings
├── models/             # Database models
├── requirements.txt    # Python dependencies
└── run.py             # Application entry point
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Shops
- `GET /api/shops` - Get all shops
- `POST /api/shops` - Create new shop (authenticated)
- `GET /api/shops/:id` - Get shop by ID

### Products
- `GET /api/products` - Get products (with filters)
- `POST /api/products` - Create product (authenticated)

### Offers
- `GET /api/offers` - Get active offers
- `POST /api/offers` - Create offer (authenticated)

### Reviews
- `POST /api/reviews` - Create review (authenticated)

### Search
- `GET /api/search` - Search shops and products

## 🎨 Design Features

- **Apple-level aesthetics** with clean, sophisticated design
- **Gradient color schemes** (blue to purple primary theme)
- **Micro-interactions** and hover effects
- **Professional typography** and spacing
- **Consistent 8px spacing system**
- **Comprehensive color system**

## 🔐 Security Features

- **JWT Authentication** with secure token management
- **Password hashing** with Werkzeug
- **CORS protection** with specific origins
- **Input validation** and sanitization
- **Error handling** without exposing sensitive data

## 📱 Responsive Design

- **Mobile-first approach**
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible grid system**
- **Touch-friendly interactions**

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in deployment platform

### Backend (Heroku/Railway)
1. Set up database (PostgreSQL recommended for production)
2. Set environment variables
3. Deploy using Git or Docker

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@supermall.com or create an issue in the repository.