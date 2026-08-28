# Cooperative Platform API Documentation

## Base URL

http://localhost:5000

---

# 1. Authentication

## Register

POST /api/auth/register

Creates a new user account.

### Request Body

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123",
  "phone": "9999999999",
  "role": "CUSTOMER"
}

Required:
- name
- email
- password

Optional:
- phone
- role

Default role: CUSTOMER

### Response

{
  "message": "Registration successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "Test User",
    "email": "test@example.com",
    "role": "CUSTOMER"
  }
}

---

## Login

POST /api/auth/login

Logs an existing user into the platform.

### Request Body

{
  "email": "test@example.com",
  "password": "test123"
}

### Response

{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "Test User",
    "email": "test@example.com",
    "role": "CUSTOMER"
  }
}

---

# 2. JWT Authentication

Protected endpoints require a JWT token.

Add this header:

Authorization: Bearer YOUR_JWT_TOKEN

The JWT contains:

{
  "id": "USER_ID",
  "role": "CUSTOMER"
}

Token expiry: 7 days.

Protected endpoints:

- GET /api/protected
- POST /api/bookings
- GET /api/bookings
- GET /api/bookings/:id
- PATCH /api/bookings/:id/status

---

# 3. Services

## Get All Services

GET /api/services

Returns all available services.

Authentication: Not required.

### Response Example

[
  {
    "id": "SERVICE_ID",
    "name": "Plumbing",
    "description": "General plumbing services",
    "price": 500,
    "createdAt": "2026-08-27T16:12:58.200Z"
  }
]

---

## Create Service

POST /api/services

Creates a new service.

Authentication: Not required.

### Request Body

{
  "name": "Plumbing",
  "description": "General plumbing services",
  "price": 500
}

Required:
- name
- price

### Response

{
  "message": "Service created successfully",
  "service": {
    "id": "SERVICE_ID",
    "name": "Plumbing",
    "description": "General plumbing services",
    "price": 500
  }
}

---

# 4. Workers

## Create Worker Profile

POST /api/workers

Creates a worker profile for an existing user.

Authentication: Not required.

### Request Body

{
  "userId": "USER_ID",
  "skills": "Plumbing, Pipe Repair",
  "experience": 5,
  "location": "Delhi"
}

Required:
- userId
- skills

Optional:
- experience
- location

### Response

{
  "message": "Worker profile created successfully",
  "worker": {
    "id": "WORKER_ID",
    "userId": "USER_ID",
    "skills": "Plumbing, Pipe Repair",
    "experience": 5,
    "location": "Delhi",
    "isAvailable": true,
    "rating": 0
  }
}

---

## Get All Workers

GET /api/workers

Returns all worker profiles.

Authentication: Not required.

---

## Get Worker By ID

GET /api/workers/:id

Returns a specific worker.

Authentication: Not required.

Example:

GET /api/workers/WORKER_ID

---

## Update Worker Availability

PATCH /api/workers/:id/availability

Updates worker availability.

### Request Body

{
  "isAvailable": false
}

### Response

{
  "message": "Availability updated",
  "worker": {
    "id": "WORKER_ID",
    "isAvailable": false
  }
}

---

# 5. Bookings

Booking endpoints require JWT authentication.

Use:

Authorization: Bearer YOUR_JWT_TOKEN

---

## Create Booking

POST /api/bookings

Creates a new booking.

Authentication: Required.

### Request Body

IMPORTANT: Do NOT send customerId.

The customer ID is taken from the authenticated user's JWT.

{
  "workerId": "WORKER_ID",
  "serviceId": "SERVICE_ID",
  "bookingDate": "2026-08-28T10:00:00.000Z"
}

### Response

{
  "message": "Booking created successfully",
  "booking": {
    "id": "BOOKING_ID",
    "customerId": "CUSTOMER_ID",
    "workerId": "WORKER_ID",
    "serviceId": "SERVICE_ID",
    "status": "PENDING",
    "bookingDate": "2026-08-28T10:00:00.000Z"
  }
}

New bookings have status:

PENDING

---

## Get Bookings

GET /api/bookings

Returns bookings according to the logged-in user's role.

Authentication: Required.

Customer:
- Sees their own bookings.

Worker:
- Sees bookings assigned to them.

Admin:
- Can see all bookings.

---

## Get Booking By ID

GET /api/bookings/:id

Returns details of a specific booking.

Authentication: Required.

Example:

GET /api/bookings/BOOKING_ID

---

## Update Booking Status

PATCH /api/bookings/:id/status

Updates the status of a booking.

Authentication: Required.

### Request Body

{
  "status": "ACCEPTED"
}

Available statuses:

- PENDING
- ACCEPTED
- REJECTED
- IN_PROGRESS
- COMPLETED
- CANCELLED

Customer:
- Can cancel their booking.

Worker:
- Can ACCEPT, REJECT, start, or COMPLETE a booking.

Admin:
- Can update booking status.

---

# 6. Reviews

## Create Review

POST /api/reviews

Creates a review for a completed booking.

Authentication: Not currently required.

### Request Body

{
  "bookingId": "BOOKING_ID",
  "customerId": "CUSTOMER_ID",
  "rating": 5,
  "comment": "Excellent service!"
}

Requirements:

- Booking must exist.
- Booking must have COMPLETED status.
- Customer must own the booking.
- Rating must be between 1 and 5.
- A booking can only have one review.

### Response

{
  "message": "Review added successfully",
  "review": {
    "id": "REVIEW_ID",
    "bookingId": "BOOKING_ID",
    "customerId": "CUSTOMER_ID",
    "rating": 5,
    "comment": "Excellent service!"
  },
  "workerRating": 4.5
}

Worker rating is recalculated after a review.

---

## Get Worker Reviews

GET /api/reviews/worker/:workerId

Returns reviews for a specific worker.

Authentication: Not currently required.

Example:

GET /api/reviews/worker/WORKER_ID

Reviews are ordered newest first.

---

# 7. Protected Route

## Test Authentication

GET /api/protected

Authentication: Required.

Use:

Authorization: Bearer YOUR_JWT_TOKEN

### Response

{
  "message": "You accessed a protected route!",
  "user": {
    "id": "USER_ID",
    "role": "CUSTOMER",
    "iat": 1234567890,
    "exp": 1234567890
  }
}

This endpoint can be used to verify that JWT authentication is working.

---

# 8. Health Check

## GET /api/health

Checks whether the backend is running and the database is connected.

Authentication: Not required.

### Response

{
  "status": "OK",
  "message": "Backend and database are connected"
}

---

# 9. Common Error Responses

## 400 Bad Request

Used when required information is missing or invalid.

Example:

{
  "message": "Name, email and password are required"
}

---

## 401 Unauthorized

Used when authentication is missing or the token is invalid/expired.

Example:

{
  "message": "Invalid or expired token"
}

---

## 403 Forbidden

Used when the user does not have permission.

Example:

{
  "message": "Access denied"
}

---

## 404 Not Found

Used when the requested resource does not exist.

Example:

{
  "message": "Worker not found"
}

---

## 500 Internal Server Error

Used when an unexpected server or database error occurs.

---

# 10. API Summary

| Module | Method | Endpoint | JWT |
|---|---|---|---|
| Auth | POST | /api/auth/register | No |
| Auth | POST | /api/auth/login | No |
| Services | GET | /api/services | No |
| Services | POST | /api/services | No |
| Workers | POST | /api/workers | No |
| Workers | GET | /api/workers | No |
| Workers | GET | /api/workers/:id | No |
| Workers | PATCH | /api/workers/:id/availability | No |
| Bookings | POST | /api/bookings | Yes |
| Bookings | GET | /api/bookings | Yes |
| Bookings | GET | /api/bookings/:id | Yes |
| Bookings | PATCH | /api/bookings/:id/status | Yes |
| Reviews | POST | /api/reviews | No |
| Reviews | GET | /api/reviews/worker/:workerId | No |
| Protected | GET | /api/protected | Yes |
| Health | GET | /api/health | No |

---

# 11. For Frontend Team

## Authentication Flow

1. Register using:

POST /api/auth/register

2. Or login using:

POST /api/auth/login

3. Save the JWT token returned by the server.

4. For protected endpoints, send:

Authorization: Bearer YOUR_JWT_TOKEN

---

## Customer Flow

1. Login/Register.
2. View available services using GET /api/services.
3. View workers using GET /api/workers.
4. Select a worker and service.
5. Create a booking using POST /api/bookings.
6. View bookings using GET /api/bookings.
7. Wait for worker to accept the booking.
8. After completion, submit a review using POST /api/reviews.

---

## Worker Flow

1. Register/Login.
2. Create a worker profile using POST /api/workers.
3. View assigned bookings using GET /api/bookings.
4. Accept or reject booking requests.
5. Update booking status to IN_PROGRESS.
6. Complete the booking using COMPLETED.
7. Worker rating is updated when customers submit reviews.

---

## Useful Endpoints for Frontend

Services:

GET /api/services

Workers:

GET /api/workers

Bookings:

GET /api/bookings

Create Booking:

POST /api/bookings

Update Booking:

PATCH /api/bookings/:id/status

Worker Reviews:

GET /api/reviews/worker/:workerId

---

# End of API Documentation