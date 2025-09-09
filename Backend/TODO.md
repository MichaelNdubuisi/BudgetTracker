# Backend TODO: Implement User Authentication and Data Isolation

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

## Followup Steps
- [ ] Add JWT_SECRET to .env file (e.g., JWT_SECRET=your_secret_key_here)
- [ ] Test authentication endpoints
- [ ] Update frontend to handle login/register, store token, send in requests
- [ ] Migrate existing data if any (associate with a user)
