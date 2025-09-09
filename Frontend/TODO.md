# TODO: Rearrange Components on Mobile

- [x] Separate WeeklyStats into its own section in App.jsx
- [x] Add order classes for mobile: Summary (1), TransactionForm (2), WeeklyStats (3), CategoryPieChart (4), GoalsSection (5)
- [x] Add md:col-span-1 to WeeklyStats section
- [x] Add md:col-span-2 to GoalsSection for desktop
- [x] Verify desktop layout remains correct

# TODO: Implement User Authentication and Data Isolation

## Backend Tasks (Completed)
- [x] Install bcryptjs and jsonwebtoken dependencies
- [x] Create authMiddleware.js for JWT verification
- [x] Update User model: add password field, make email required
- [x] Update Transaction model: add user field
- [x] Update Goal model: add user field
- [x] Update userController: add register, login, getProfile, updateProfile functions
- [x] Update transactionController: filter by user, add user to new transactions, check ownership on delete
- [x] Update goalController: filter by user, add user to new goals, check ownership on update/delete
- [x] Update userRoutes: add register, login, profile routes with auth
- [x] Update transactionRoutes: add protect middleware to all routes
- [x] Update goalRoutes: add protect middleware to all routes
- [x] Update server.js: ensure routes are protected (already done via routes)

## Frontend Tasks
- [x] Create Login/Register components
- [x] Update App.jsx to handle authentication state
- [x] Update api.js to include token in requests
- [x] Add logout functionality
- [x] Update components to show user-specific data

## Followup Steps
- [ ] Add JWT_SECRET to Backend/.env file (e.g., JWT_SECRET=your_secret_key_here)
- [ ] Test authentication endpoints
- [ ] Migrate existing data if any (associate with a user)

# TODO: Improve Login/Register Page Design

- [x] Import icons from lucide-react (User, Mail, Lock, AlertCircle)
- [x] Add app logo/title with gradient styling
- [x] Apply .card class for glassmorphism effect
- [x] Add icons to form input fields
- [x] Add password confirmation field for register mode
- [x] Enhance submit button with gradient and hover effects
- [x] Improve error message display with icons
- [x] Add fade-in animation on component load
- [x] Improve responsive design for mobile
- [ ] Test dark mode and overall functionality
