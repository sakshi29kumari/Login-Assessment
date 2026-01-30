# E-Commerce Authentication & Profile System

A complete authentication flow and profile management system built with React, featuring user registration, login, and protected profile pages.

## 🚀 Features

- **User Authentication**
  - Register new user accounts
  - Login with email and password
  - Secure JWT token storage
  - Logout functionality

- **Profile Management**
  - View user profile information
  - Protected route - requires authentication
  - Display user details (name, email, role, timestamps)
  - Avatar with user initials

- **Form Validation**
  - Required field validation
  - Email format validation
  - Password length validation (minimum 6 characters)
  - Password confirmation matching
  - Real-time error messages

- **User Experience**
  - Loading spinners during API calls
  - Clear error and success messages
  - Responsive design for all devices
  - Smooth transitions and animations
  - Auto-redirect for authenticated users

- **Security**
  - JWT token stored in localStorage
  - Protected routes prevent unauthorized access
  - Token validation on profile fetch
  - Automatic logout on token expiration

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── FormInput.jsx       # Form input with validation
│   ├── FormInput.module.css
│   ├── Alert.jsx           # Alert/notification component
│   ├── Alert.module.css
│   ├── LoadingSpinner.jsx  # Loading indicator
│   ├── LoadingSpinner.module.css
│   └── ProtectedRoute.jsx  # Route protection wrapper
├── context/                # Context API for state management
│   └── AuthContext.jsx     # Auth state and methods
├── pages/                  # Page components
│   ├── Login.jsx          # Login page
│   ├── Login.module.css
│   ├── Register.jsx       # Registration page
│   ├── Register.module.css
│   ├── Profile.jsx        # Profile page
│   └── Profile.module.css
├── App.jsx                # Main app with routing
├── App.css
├── main.jsx
└── index.css
```

## 🔌 API Integration

### Base URL
```
https://e-commerce-mega-kart.vercel.app/api
```

### Endpoints

1. **Register User**
   - Method: `POST`
   - Endpoint: `/users/register`
   - Body: `{ name, email, password }`
   - Returns: `{ user, token }`

2. **Login User**
   - Method: `POST`
   - Endpoint: `/users/login`
   - Body: `{ email, password }`
   - Returns: `{ user, token }`

3. **Get Profile** (Protected)
   - Method: `GET`
   - Endpoint: `/users/profile`
   - Headers: `Authorization: Bearer <token>`
   - Returns: User object with timestamps

## 🛠️ Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

This will install:
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing
- `axios` - HTTP client (optional, can use fetch)

### 2. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

## 💻 Usage Guide

### Registration Flow
1. Navigate to `/register`
2. Fill in name, email, password, and confirm password
3. Click "Create Account"
4. On success, automatically redirected to profile page

### Login Flow
1. Navigate to `/login`
2. Enter email and password
3. Click "Sign In"
4. JWT token is stored in localStorage
5. Redirected to profile page

### Profile Page
1. Only accessible when authenticated
2. Displays user information
3. Shows account creation and update timestamps
4. Click "Sign Out" to logout and return to login

### Logout
- Click the "Logout" or "Sign Out" button
- Token is cleared from localStorage
- User is redirected to login page

## 🔐 Authentication Context

The `AuthContext` provides these methods and values:

```javascript
const auth = useAuth();

// Values
auth.user              // Current user object
auth.token             // JWT token
auth.loading           // Loading state
auth.isAuthenticated   // Boolean

// Methods
auth.register(name, email, password)    // Register new user
auth.login(email, password)              // Login user
auth.logout()                            // Logout user
auth.fetchProfile()                      // Fetch user profile
```

## 📱 Component Documentation

### FormInput
Reusable input component with built-in validation feedback.

```jsx
<FormInput
  label="Email"
  type="email"
  value={email}
  onChange={handleChange}
  error={errors.email}
  placeholder="email@example.com"
  required
/>
```

### Alert
Display success/error/warning/info messages.

```jsx
<Alert
  type="success"
  message="Login successful!"
  onClose={() => setAlert(null)}
/>
```

### LoadingSpinner
Show loading state during async operations.

```jsx
<LoadingSpinner message="Loading profile..." />
```

### ProtectedRoute
Wrap routes that require authentication.

```jsx
<ProtectedRoute>
  <Profile />
</ProtectedRoute>
```

## 🎨 Styling

- **CSS Modules** for component-scoped styles
- **Gradient backgrounds** for modern look
- **Responsive design** with media queries
- **Smooth animations** and transitions
- **Consistent color scheme**: Purple gradient (#667eea to #764ba2)

## 🔄 State Management

Using React Context API with hooks:
- `AuthProvider` wraps the entire app
- `useAuth` hook provides auth state and methods
- localStorage persists token across sessions
- Automatic authentication check on app load

## ✅ Form Validation Rules

### Name
- Required
- Minimum 2 characters

### Email
- Required
- Must be valid email format

### Password
- Required
- Minimum 6 characters
- Must match confirmation password

## 🚨 Error Handling

- Network errors are caught and displayed
- Invalid credentials show clear messages
- Token expiration triggers automatic logout
- Form validation prevents invalid submissions
- 401 responses clear auth state

## 📦 Environment Variables

Currently, the API URLs are hardcoded. To add environment variables:

Create `.env` file:
```
VITE_API_BASE_URL=https://e-commerce-mega-kart.vercel.app/api
```

Update AuthContext.jsx to use `import.meta.env.VITE_API_BASE_URL`

## 🎯 Key Features Implementation

### ✓ React Best Practices
- Functional components with hooks
- Custom hooks (useAuth)
- Context API for state management
- Proper dependency arrays in useEffect
- Component composition

### ✓ Security
- JWT token handling
- Protected routes
- Secure token storage
- Auto-logout on 401
- Password validation

### ✓ UX/UI
- Loading states
- Error boundaries
- Form validation feedback
- Responsive design
- Smooth animations

### ✓ Code Quality
- Modular components
- Reusable logic
- Clean file structure
- Proper error handling
- Clear variable names

## 🔮 Future Enhancements

- [ ] Remember me functionality
- [ ] Password reset flow
- [ ] Social login integration
- [ ] Two-factor authentication
- [ ] User profile editing
- [ ] Email verification
- [ ] Axios interceptors for token refresh
- [ ] Dark mode support
- [ ] Internationalization (i18n)
- [ ] Unit tests

## 🐛 Troubleshooting

### Issue: Token not persisting
**Solution**: Check browser localStorage in DevTools → Application → Local Storage

### Issue: Routes not working
**Solution**: Ensure `react-router-dom` is installed and BrowserRouter wraps the app

### Issue: API errors
**Solution**: Check network tab in DevTools, verify API endpoint URLs

### Issue: CORS errors
**Solution**: API should have CORS enabled; if not, implement proxy or backend CORS headers

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes

## 👨‍💻 Support

For issues or questions, please check the API documentation or contact support.

---

**Built with React, React Router, and Context API** ✨

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
