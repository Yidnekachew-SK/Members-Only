# Members-Only

A simple **Members Only** message club built with Node.js, Express, and PostgreSQL.    
Users can view messages anonymously, but only club members can see the **author** and **date** of each post.

## Live Demo
[Live Demo](https://members-only-kvpd.onrender.com/)

## Features
- Public message board with anonymous view
- User authentication with **Passport.js (local strategy)**
- Password hashing using **bcryptjs**
- Membership status (e.g., `new member`, `admin`)
- Conditional rendering in **EJS templates**
- **PostgreSQL** database integration

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js (for Routes)
- **Database:** PostgreSQL
- **Authentication & Security:** Passport.js (local strategy), bcryptjs, express-session
- **Validation:** express-validator
- **Template Engine:** EJS
- **Styling:** CSS 

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/Yidnekachew-SK/members-only.git
cd members-only
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Varaibles
Create **.env** file in the root directory.  
```bash
PG_HOST=DB-host
PG_DB=DB-name
PG_USER=DB-user
PG_PASSWORD=DB-password
PG_PORT=DB-port
DB_URL=Full_connection_string_of_DB_connection
MEMBERSHIP_CODE=Membership_code_for_the_joining_the_club
SECRET=session-secret
```

### 4. Populate the DB
Run the command below to create the DB tables.  
```bash
npm run populate
```

### 5. Start the server
```bash
npm run start
#or
npm run watch (like nodemon)
```
Visit **http://localhost:3000** in your browser.

