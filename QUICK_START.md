# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Step 3: Test the Application

#### Register a New Account
1. Navigate to `http://localhost:5173/register`
2. Fill in the form:
   - **Name**: John Doe
   - **Email**: john@example.com
   - **Password**: password123
   - **Confirm Password**: password123
3. Click "Create Account"
4. Success! You'll be redirected to your profile

#### Login
1. Navigate to `http://localhost:5173/login`
2. Enter credentials:
   - **Email**: john@example.com
   - **Password**: password123
3. Click "Sign In"
4. Success! You'll see your profile

#### View Profile
- Your profile shows all user information
- User ID, name, email, role
- Account creation and update timestamps
- Click "Sign Out" to logout

---

## 📂 What's Included

### Pages
- ✅ **Login Page** - `/login` - Login with email and password
- ✅ **Register Page** - `/register` - Create a new account
- ✅ **Profile Page** - `/profile` - View user profile (protected)

### Features
- ✅ Form validation with error messages
- ✅ Loading spinners during API calls
- ✅ JWT token management
- ✅ Protected routes
- ✅ Responsive design
- ✅ Clean, modern UI
- ✅ Error handling

### Code Structure
```
src/
├── components/          # Reusable UI components
├── context/             # Authentication state management
├── pages/               # Page components (Login, Register, Profile)
├── App.jsx              # Main app with routing
└── main.jsx             # Entry point
```

---

## 🔌 API Endpoints Used

All requests go to: `https://e-commerce-mega-kart.vercel.app/api`

1. **POST /users/register** - Create new account
2. **POST /users/login** - Login to account
3. **GET /users/profile** - Get user profile (requires token)

---

## 💾 How Authentication Works

1. **Register/Login** → API returns JWT token
2. **Token Storage** → Saved in browser's localStorage
3. **API Requests** → Token sent in `Authorization` header
4. **Protected Routes** → Checked before accessing profile
5. **Logout** → Token removed from storage

---

## 🎨 UI Components

### FormInput
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
```jsx
<Alert
  type="success"
  message="Login successful!"
  onClose={() => setAlert(null)}
/>
```

### LoadingSpinner
```jsx
<LoadingSpinner message="Loading..." />
```

---

## 🔐 Security Features

✅ JWT token stored in localStorage  
✅ Protected routes prevent unauthorized access  
✅ Form validation prevents invalid data  
✅ Automatic logout on token expiration  
✅ Secure password confirmation  

---

## 🛠️ Environment Setup

### Requirements
- Node.js (v14 or higher)
- npm or yarn

### Install Dependencies
```bash
npm install
```

This installs:
- `react@^19.2.0` - UI library
- `react-dom@^19.2.0` - React for web
- `react-router-dom@^6.20.0` - Routing
- `axios@^1.6.2` - HTTP client

---

## 📱 Browser Compatibility

Works on:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

---

## 🎯 Key Features Checklist

### Required Features ✓
- [x] Register functionality
- [x] Login functionality
- [x] Protected profile page
- [x] Form validation
- [x] JWT token management
- [x] Error handling
- [x] Loading states
- [x] Responsive design
- [x] Logout functionality

### Optional Features ✓
- [x] Reusable form components
- [x] Better folder structure
- [x] CSS Modules styling
- [x] Clean UI with animations
- [x] Comprehensive error messages

---

## 🚨 Troubleshooting

### Problem: Page won't load
**Solution**: 
```bash
npm install
npm run dev
```

### Problem: API errors
**Solution**: 
- Check network in DevTools (F12 → Network)
- Verify API URL is correct
- Check if device has internet connection

### Problem: Token not saving
**Solution**:
- Check DevTools → Application → Local Storage
- Make sure localStorage is enabled
- Clear browser cache and try again

### Problem: Stuck on loading
**Solution**:
- Check browser console (F12 → Console)
- Verify API endpoint is responding
- Try refreshing the page

---

## 📚 Documentation

- **[README.md](./README.md)** - Complete project documentation
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Technical implementation details

---

## 💡 Tips

1. **Test the form validation** - Try submitting with invalid data
2. **Check localStorage** - DevTools → Application → Local Storage
3. **Monitor network requests** - DevTools → Network tab
4. **Try on mobile** - Responsive design works great!
5. **Logout and login** - Verify token persistence

---

## 🎉 You're All Set!

The authentication system is ready to use. Start with the registration page and create an account to see everything in action!

**Default Route**: `http://localhost:5173/register`

Happy coding! 🚀
