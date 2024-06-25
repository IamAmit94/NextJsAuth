## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

# for email verification
copy the token from the email.
create the account in the mailtrap and copy paste the user and password to the .env file

# module used in this project
-axios
-bcryptjs
-jsonwebtoken
-mongoose
-nodemailer
-react-hot-toast
-tailwindcss
-typescript

# The backend code is 
/src/app/api/users

# The frontend code is
/src/app  || all the folder in the app folder is for frontend except the api folder which is for backend.

# All the modules used in this project
/models/userModel


# backend URL route
http://localhost:3000 == baseUrl
/api/users             == subDomain URL

signup ==> http://localhost:3000/api/users/signup
Login ==> http://localhost:3000/api/users/login 
Logout ==> http://localhost:3000/api/users/logout
UserProfile ==> http://localhost:3000/api/users/me
VerifyUser ==> http://localhost:3000/api/users/verifyemail
All user details ==> http://localhost:3000/api/users/userdetail


# frontEnd URL route

signup ==> http://localhost:3000/signup
login ==> http://localhost:3000/login
profile ==> http://localhost:3000/profile



# to run the project
npm run dev

