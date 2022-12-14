This is a [Next.js](https://nextjs.org/) project developed using [next-auth with credentials](https://next-auth.js.org/providers/credentials) to register and authenticate user

# User Registration

**RF**

- Must be possible to register a new account.

**RN**

- Must not be possible to register an account with an already existing email in the application;
- Must not be possible to register a user if your email is nonexistent;
- All users must be registered with first name, last name, username, email and password.

# User Authentication

**RF**

- Must be possible to authenticate a user.

**RN**

- Must not be possible to authenticate a user if your password is incorrect;
- Must not be possible to authenticate a user if your email is incorrect;
- Must not be possible to authenticate a user if your email is nonexistent in the application;

# User Edit

**RF**

- Must be possible to edit a user.

**RN**

- The user must be logged into the application.
