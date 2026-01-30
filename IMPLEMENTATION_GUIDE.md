# Implementation Guide - Authentication Flow

## Overview
This guide explains how the authentication system works and how to extend it.

## Architecture

### 1. Authentication Context (`src/context/AuthContext.jsx`)

The AuthContext manages all authentication state and operations:

```
┌─────────────────────────────────────┐
│      AuthContext                     │
├─────────────────────────────────────┤
│ State:                              │
│  - user: Current user object        │
│  - token: JWT token                 │
│  - loading: API loading state       │
│  - isAuthenticated: Boolean         │
├─────────────────────────────────────┤
│ Methods:                            │
│  - register(name, email, password)  │
│  - login(email, password)           │
│  - logout()                         │
│  - fetchProfile()                   │
└─────────────────────────────────────┘
```

**Key Features:**
- Uses `localStorage` to persist token
- Auto-syncs token with localStorage
- Handles 401 responses by clearing auth state
- Provides loading state for UI feedback

### 2. Token Management

**Storage Location:** `localStorage.authToken`

**Token Lifecycle:**
1. Generated on register/login
2. Stored in localStorage
3. Sent in Authorization header for protected requests
4. Cleared on logout or 401 response

**Implementation:**
```javascript
// Save token
localStorage.setItem('authToken', token);

// Retrieve token
const token = localStorage.getItem('authToken');

// Use in header
headers: {
  'Authorization': `Bearer ${token}`
}

// Clear token
localStorage.removeItem('authToken');
```

### 3. Protected Routes

The `ProtectedRoute` component prevents unauthenticated access:

```javascript
<ProtectedRoute>
  <Profile />
</ProtectedRoute>
```

**How it works:**
1. Checks `isAuthenticated` from AuthContext
2. Redirects to `/login` if not authenticated
3. Renders component if authenticated

### 4. Form Validation

Each form has a `validateForm()` function that checks:

**Register Form:**
- Name: Required, min 2 characters
- Email: Required, valid format
- Password: Required, min 6 characters
- Confirm Password: Must match password

**Login Form:**
- Email: Required, valid format
- Password: Required, min 6 characters

**Validation Flow:**
1. User submits form
2. `validateForm()` runs
3. Errors returned if validation fails
4. Errors displayed with field highlighting
5. Errors clear when user types

### 5. API Error Handling

**Success Flow:**
1. API returns 200-299 status
2. Response parsed to JSON
3. Token and user stored
4. User redirected to profile

**Error Flow:**
1. API returns non-2xx status
2. Response parsed for error message
3. Error displayed to user
4. User can retry

**Special Cases:**
- 401 responses: Clear auth state and logout
- Network errors: Caught and displayed
- Invalid JSON: Handled gracefully

## Component Flow

### Register Page Flow
```
User enters form data
    ↓
Form validation on submit
    ↓
API call to /users/register
    ↓
├─ Success: Store token, redirect to profile
└─ Error: Display error message
```

### Login Page Flow
```
User enters email & password
    ↓
Form validation on submit
    ↓
API call to /users/login
    ↓
├─ Success: Store token, redirect to profile
└─ Error: Display error message
```

### Profile Page Flow
```
User navigates to /profile
    ↓
Check if authenticated
    ├─ Not authenticated: Redirect to /login
    └─ Authenticated: 
        ↓
        Check if user data loaded
        ├─ Loaded: Display profile
        └─ Not loaded: 
            ↓
            Fetch profile from API
            ↓
            Display profile
```

## State Management Details

### Token Persistence
```javascript
useEffect(() => {
  if (token) {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  } else {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  }
}, [token]);
```

### On App Load
1. AuthContext checks localStorage for token
2. If token exists, sets it in state
3. `isAuthenticated` becomes true
4. Profile page can fetch user data using token

## API Integration Details

### Register Endpoint
**URL:** `https://e-commerce-mega-kart.vercel.app/api/users/register`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Response (Success):**
```json
{
  "user": {
    "_id": "123abc",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Login Endpoint
**URL:** `https://e-commerce-mega-kart.vercel.app/api/users/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Response (Success):**
```json
{
  "user": {
    "_id": "123abc",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Profile Endpoint
**URL:** `https://e-commerce-mega-kart.vercel.app/api/users/profile`

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json
```

**Response (Success):**
```json
{
  "_id": "123abc",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "customer",
  "createdAt": "2026-01-28T05:00:32.769Z",
  "updatedAt": "2026-01-28T05:00:32.769Z"
}
```

## Extending the System

### Add More Protected Routes
```javascript
<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>
```

### Add Password Reset
```javascript
const resetPassword = useCallback(async (email) => {
  // API call to /users/reset-password
  // Send reset email
}, []);
```

### Add User Profile Update
```javascript
const updateProfile = useCallback(async (name, email) => {
  // API call to /users/profile (PUT)
  // Update user data
}, [token]);
```

### Add Two-Factor Authentication
```javascript
const verify2FA = useCallback(async (code) => {
  // API call to /users/verify-2fa
  // Verify authentication code
}, [token]);
```

## Debugging

### Check Token in Browser
1. Open DevTools (F12)
2. Go to Application tab
3. Look for "authToken" in Local Storage
4. Should contain JWT string

### Check Network Requests
1. Open DevTools Network tab
2. Perform login/register
3. Check request headers for Authorization
4. Check response status code and body

### Log Authentication State
```javascript
const { user, token, isAuthenticated } = useAuth();

useEffect(() => {
  console.log('Auth State:', { user, token, isAuthenticated });
}, [user, token, isAuthenticated]);
```

## Common Issues & Solutions

### Issue: "useAuth must be used within AuthProvider"
**Cause:** Component using useAuth is outside AuthProvider
**Solution:** Ensure component is wrapped inside `<AuthProvider>`

### Issue: Token not persisting after refresh
**Cause:** localStorage not working or context not checking it
**Solution:** Check localStorage in DevTools, verify useEffect in AuthContext

### Issue: Infinite redirect loop
**Cause:** ProtectedRoute and page both checking auth
**Solution:** Remove redundant checks, use ProtectedRoute consistently

### Issue: 401 errors on every profile request
**Cause:** Invalid or expired token
**Solution:** Clear localStorage manually, login again

### Issue: CORS errors
**Cause:** API doesn't allow requests from your domain
**Solution:** Check API CORS configuration, may need backend update

## Performance Optimizations

### Memoize Auth Context Value
```javascript
const value = useMemo(() => ({
  user, token, loading, isAuthenticated,
  register, login, logout, fetchProfile,
}), [user, token, loading, isAuthenticated]);
```

### Prevent Unnecessary Re-renders
```javascript
const register = useCallback(async (...) => {
  // Implementation
}, []);
```

### Lazy Load Protected Routes
```javascript
const Profile = lazy(() => import('./pages/Profile'));

<Suspense fallback={<LoadingSpinner />}>
  <Profile />
</Suspense>
```

## Testing

### Test Register Flow
```javascript
// 1. Navigate to /register
// 2. Enter valid data
// 3. Submit form
// 4. Verify success message
// 5. Check localStorage has token
// 6. Verify redirect to /profile
```

### Test Login Flow
```javascript
// 1. Navigate to /login
// 2. Enter valid credentials
// 3. Submit form
// 4. Verify success message
// 5. Verify redirected to /profile
```

### Test Protected Route
```javascript
// 1. Clear localStorage (remove token)
// 2. Navigate to /profile
// 3. Verify redirected to /login
```

### Test Validation
```javascript
// Register - Test with:
// - Empty name
// - Invalid email
// - Short password
// - Mismatched passwords
// Should show error for each
```

---

For more information, see [README.md](./README.md)
