# Testing Guide

## Manual Testing Scenarios

### 1. Registration Flow ✅

#### Test 1.1: Valid Registration
**Steps:**
1. Go to `/register`
2. Enter:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
   - Confirm: `password123`
3. Click "Create Account"

**Expected:**
- ✅ Success message appears
- ✅ Redirected to profile page
- ✅ User details displayed
- ✅ Token saved in localStorage

#### Test 1.2: Name Validation
**Steps:**
1. Go to `/register`
2. Enter empty name
3. Try to submit

**Expected:**
- ✅ "Name is required" error shown
- ✅ Form not submitted

#### Test 1.3: Email Validation
**Steps:**
1. Go to `/register`
2. Try invalid emails:
   - `notanemail`
   - `@example.com`
   - `user@`
3. Try to submit

**Expected:**
- ✅ "Please enter a valid email address" error shown
- ✅ Form not submitted

#### Test 1.4: Password Validation
**Steps:**
1. Go to `/register`
2. Enter password less than 6 characters (e.g., `pass`)
3. Try to submit

**Expected:**
- ✅ "Password must be at least 6 characters" error shown
- ✅ Form not submitted

#### Test 1.5: Password Confirmation
**Steps:**
1. Go to `/register`
2. Enter:
   - Password: `password123`
   - Confirm: `different123`
3. Try to submit

**Expected:**
- ✅ "Passwords do not match" error shown
- ✅ Form not submitted

#### Test 1.6: Existing Email Error
**Steps:**
1. Go to `/register`
2. Use email from previous registration
3. Fill other fields correctly
4. Submit

**Expected:**
- ✅ Error message: "Email already exists" or similar
- ✅ User not registered
- ✅ Stay on registration page

#### Test 1.7: Already Authenticated
**Steps:**
1. Login successfully
2. Navigate to `/register`

**Expected:**
- ✅ Auto-redirected to `/profile`
- ✅ Cannot access registration page

---

### 2. Login Flow ✅

#### Test 2.1: Valid Login
**Steps:**
1. Clear localStorage (logout first)
2. Go to `/login`
3. Enter email and password from registration
4. Click "Sign In"

**Expected:**
- ✅ Success message appears
- ✅ Redirected to profile page
- ✅ Token saved in localStorage

#### Test 2.2: Invalid Email
**Steps:**
1. Go to `/login`
2. Enter:
   - Email: `notanemail`
   - Password: `password123`
3. Click "Sign In"

**Expected:**
- ✅ "Please enter a valid email address" error shown
- ✅ Form not submitted

#### Test 2.3: Wrong Password
**Steps:**
1. Go to `/login`
2. Enter:
   - Email: `john@example.com`
   - Password: `wrongpassword`
3. Click "Sign In"

**Expected:**
- ✅ Error message from API shown
- ✅ Not logged in
- ✅ Token not saved

#### Test 2.4: Non-existent User
**Steps:**
1. Go to `/login`
2. Enter:
   - Email: `nonexistent@example.com`
   - Password: `password123`
3. Click "Sign In"

**Expected:**
- ✅ Error message from API shown
- ✅ Not logged in

#### Test 2.5: Empty Fields
**Steps:**
1. Go to `/login`
2. Leave fields empty
3. Try to submit

**Expected:**
- ✅ Validation errors shown
- ✅ Form not submitted

#### Test 2.6: Already Authenticated
**Steps:**
1. Login successfully
2. Navigate to `/login`

**Expected:**
- ✅ Auto-redirected to `/profile`
- ✅ Cannot access login page

---

### 3. Profile Page ✅

#### Test 3.1: View Profile When Authenticated
**Steps:**
1. Complete login
2. Check profile page displays
3. Verify all user information:
   - Name
   - Email
   - Role
   - Created date
   - Updated date
   - User ID
   - Avatar with initials

**Expected:**
- ✅ All fields populated correctly
- ✅ Avatar shows user initials
- ✅ Dates formatted properly

#### Test 3.2: Protect Profile Route
**Steps:**
1. Clear localStorage
2. Navigate to `/profile`

**Expected:**
- ✅ Auto-redirected to `/login`
- ✅ Cannot access profile page

#### Test 3.3: Auto-redirect After Login
**Steps:**
1. Login
2. Observe behavior

**Expected:**
- ✅ Auto-redirected to profile
- ✅ Takes ~1.5 seconds
- ✅ Success message shown

---

### 4. Logout Flow ✅

#### Test 4.1: Logout from Profile
**Steps:**
1. Login successfully
2. On profile page, click "Sign Out"

**Expected:**
- ✅ Redirected to `/login`
- ✅ Token removed from localStorage
- ✅ Cannot access profile anymore

#### Test 4.2: Token Cleared
**Steps:**
1. Login
2. Check localStorage for token
3. Logout
4. Check localStorage again

**Expected:**
- ✅ Token present after login
- ✅ Token removed after logout

---

### 5. UI/UX Testing ✅

#### Test 5.1: Loading Indicators
**Steps:**
1. Go to login
2. Click "Sign In" (slow network simulation)
3. Observe loading state

**Expected:**
- ✅ Button shows "Signing In..."
- ✅ Button disabled during request
- ✅ Spinner visible (if slow connection)

#### Test 5.2: Error Messages
**Steps:**
1. Try invalid form submission
2. Observe error display

**Expected:**
- ✅ Clear error messages
- ✅ Red highlighting on fields
- ✅ Easy to understand

#### Test 5.3: Success Messages
**Steps:**
1. Complete successful action (login/register)
2. Observe success message

**Expected:**
- ✅ Green success alert
- ✅ Checkmark icon
- ✅ Clear message
- ✅ Auto-dismiss or closeable

#### Test 5.4: Responsive Design
**Steps:**
1. Resize browser window
2. Test on mobile (DevTools mobile view)
3. Check all pages

**Expected:**
- ✅ Forms stack properly
- ✅ Buttons remain clickable
- ✅ Text readable
- ✅ No overflow

---

### 6. Error Handling ✅

#### Test 6.1: Network Error
**Steps:**
1. Go offline (disconnect internet)
2. Try to login
3. Observe error handling

**Expected:**
- ✅ Error message displayed
- ✅ Clear indication of network issue
- ✅ User can retry

#### Test 6.2: Server Error (500)
**Steps:**
1. Server returns 500 error
2. Check error handling

**Expected:**
- ✅ Error message shown
- ✅ Clear to user that it's a server issue
- ✅ Can retry

#### Test 6.3: Invalid Token
**Steps:**
1. Login
2. Manually modify token in localStorage
3. Navigate to profile
4. Try to fetch profile

**Expected:**
- ✅ 401 error caught
- ✅ User logged out
- ✅ Redirected to login

---

### 7. Form Interaction ✅

#### Test 7.1: Real-time Validation Clearing
**Steps:**
1. Go to login
2. Leave email empty
3. Try to submit (error shown)
4. Start typing in email field
5. Observe error

**Expected:**
- ✅ Error message disappears as you type
- ✅ Red highlighting removed

#### Test 7.2: Field Focus/Blur
**Steps:**
1. Go to registration
2. Click on each field
3. Type something
4. Move to next field

**Expected:**
- ✅ No errors on focus
- ✅ Errors show on blur if invalid
- ✅ Smooth focus state

#### Test 7.3: Form Submission
**Steps:**
1. Fill form correctly
2. Press Enter key
3. Observe submission

**Expected:**
- ✅ Form submits on Enter
- ✅ Submit button works on click

---

### 8. Data Persistence ✅

#### Test 8.1: Token Persistence
**Steps:**
1. Login
2. Refresh page
3. Check if still logged in

**Expected:**
- ✅ Still authenticated
- ✅ Profile displays immediately
- ✅ No need to login again

#### Test 8.2: Token Expiration
**Steps:**
1. Login
2. Wait for token to expire (or manually expire)
3. Try to access profile

**Expected:**
- ✅ 401 error caught
- ✅ Automatic logout
- ✅ Redirected to login

---

### 9. Browser Dev Tools Checks ✅

#### Test 9.1: localStorage
**Steps:**
1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Check for `authToken`

**Expected:**
- ✅ After login: `authToken` present
- ✅ After logout: `authToken` removed
- ✅ Token is valid JWT format

#### Test 9.2: Network Tab
**Steps:**
1. Open DevTools Network tab
2. Clear storage
3. Go to login
4. Fill and submit form
5. Watch network requests

**Expected:**
- ✅ POST to `/users/login`
- ✅ Status 200 on success
- ✅ Response contains token
- ✅ Authorization header present on profile requests

#### Test 9.3: Console
**Steps:**
1. Open DevTools Console
2. Perform actions (login, register, logout)

**Expected:**
- ✅ No JavaScript errors
- ✅ No console warnings (may have some deprecation warnings)
- ✅ API calls logged (if using console.log)

---

### 10. Cross-browser Testing ✅

Test on:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari (if on Mac)
- ✅ Mobile browsers (iOS Safari, Chrome mobile)

**Expected:**
- ✅ All features work the same
- ✅ Styling looks correct
- ✅ No layout issues

---

## Performance Testing

### Test 10.1: Page Load Time
- Registration page should load < 2s
- Login page should load < 2s
- Profile page should load < 3s (including API call)

### Test 10.2: Form Responsiveness
- Form inputs should respond immediately to typing
- Validation should complete instantly
- No lag when submitting

### Test 10.3: API Response Time
- Register/Login should complete within 5s
- Profile fetch should complete within 3s

---

## Accessibility Testing

### Test 11.1: Keyboard Navigation
**Steps:**
1. Don't use mouse
2. Use Tab to navigate between fields
3. Use Enter to submit forms
4. Use Tab to navigate buttons

**Expected:**
- ✅ All elements accessible via keyboard
- ✅ Focus indicators visible
- ✅ Forms submittable with Enter

### Test 11.2: Screen Reader
**Steps:**
1. Use browser screen reader
2. Navigate through page

**Expected:**
- ✅ Labels properly associated with inputs
- ✅ Buttons have descriptive text
- ✅ Errors announced clearly

---

## Test Cases Summary

| Component | Test Case | Status |
|-----------|-----------|--------|
| Registration | Valid submission | ✅ |
| Registration | Email validation | ✅ |
| Registration | Password validation | ✅ |
| Login | Valid credentials | ✅ |
| Login | Invalid credentials | ✅ |
| Profile | Protected route | ✅ |
| Profile | Display user data | ✅ |
| Logout | Token cleared | ✅ |
| UI | Loading states | ✅ |
| UI | Error messages | ✅ |
| Error | Network errors | ✅ |
| Error | 401 handling | ✅ |
| Data | Token persistence | ✅ |

---

## Automated Testing Setup (Optional)

### Jest Unit Tests
```bash
npm install --save-dev @testing-library/react jest @testing-library/jest-dom
```

### Example Test
```javascript
import { render, screen } from '@testing-library/react';
import { Login } from '../pages/Login';

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
});
```

---

## Continuous Testing Checklist

Before deployment:
- [ ] All manual tests pass
- [ ] No console errors
- [ ] localStorage working correctly
- [ ] API endpoints responding
- [ ] Responsive design verified
- [ ] Cross-browser testing done
- [ ] Performance acceptable
- [ ] Accessibility basic checks pass

---

**Good luck with testing! 🚀**
