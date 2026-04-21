## Pages/Navigation
### Home Page:
- Displays information about the website, what features it includes, and instructions on how to use it
- If logged in, includes a button to go to encryption page
- If not logged in, includes a button to go to login page

### Encryption Page:
- Displays form with a message input, dropdown for algorithm choice, and a submit button
- When the form is submitted, it will send the message and algorithm to the server. The server will then send back the ciphertext.
- After submission, the page will redirect to the individual message page

### Message/Cipher Page:
- Originally displays the ciphertext with an button to decrypt.
- Also contains general info like time created, algorithm used, etc.
- If the button is pressed, it will send a request to the server. The server will look up the cipher and key, decrypt the message, then send back the plaintext.
- The plaintext will then be displayed until the user navigates away or the page reloads.
- Revisiting the page, even after decryption, will display the ciphertext again because the plaintext is never stored.
- The page also includes a button to delete the message.

### MyCiphers Page:
- This page will display all ciphers belonging to the current user
- It will include links to navigate to each individual page

### Navigation Bar
- Each page will include a navigation bar.
- The navbar will have a link to the homepage
- If logged in, it will have a link to encryption page and my ciphers page
- If not logged in, it will have a link to the login and registraion pages

### Unauthenticated/Unauthorized
- If a user isn't logged in and tries to access any page other than the home or login pages, then they will be redirected to the login page
- If an authenticated user attempts to access a page they are unauthorized to see, then they will be redirected to the home page and given an unauthorized message.


## Database Schema
- Tables to handle user information and sessions are already included
- There will be an additional table to store the ciphers
- The cipher table will include the ciphertext, key (just text that can be converted to an integer or matrix when necessary), encryption algorithm, and references a user id
- If RSA is implemented, will also include another column for the second key


## Server
### Endpoints:
The server will include several endpoints for ciphers:
- GET / - Displays Home Page
- GET /my-ciphers - Authenticates and displays user's ciphers
- GET /:id - Authorizes and displays cipher information
- GET /encrypt - Authenticates and displays form for encryption
- POST / - Creates a new cipher
- POST /:id - Authorizes and decrypts the cipher
- DELETE /:id - Authorizes and deletes cipher

### Models:
- Function to add a cipher to the database
- Function to delete a cipher from the database
- Function to get all ciphers for a user
- Function to get cipher by id

<br>

- Function to generate a key for each algorithm
- Function to encrypt a message for each algorithm
- Function to decrypt a cipher for each algorithm


## Algorithms
### Caesar Cipher:
- Takes a message of any size
- Converts message into all lower case
- Converts each character into its ASCII representation and shifts so it goes from 0-25
- Generates key (integer offset)
- Adds key to each character mod 26
- Shifts back to ASCII representation
- Converts each character back into text and concatenates message


### Hill Cipher

### RSA Encryption

## NOTES
- Need to decide what characters are valid, and make sure to validate messages before encryption
- Maybe include a page with information about each algorithm like how it works, how secure it is, etc.