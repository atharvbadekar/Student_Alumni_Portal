# Student Alumni Portal

## Overview

The Student Alumni Portal is a web application built using the MERN stack (MongoDB, Express, React, Node.js) that allows students and alumni to connect, share information, and stay updated on events and news. The portal provides a platform for users to create profiles, post updates, and interact with each other through various features.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Profile creation and management
- Posting updates and news
- Viewing posts and updates from other users
- Commenting and liking posts
- Searching for users and posts
- Responsive design

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

    ```bash
    [git clone https://github.com/atharvbadekar/Student_Alumni_Porta.git
    cd Student_Alumni_Portal
    ```

2. **Install server dependencies**:

    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies**:

    ```bash
    cd ../client
    npm install
    ```

4. **Set up environment variables**:

    Create a `.env` file in the `server` directory and add the following:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

5. **Run the server and client**:

    In the `server` directory:

    ```bash
    npm run server
    ```

    In the `client` directory:

    ```bash
    npm start
    ```

    The server will run on `http://localhost:5000` and the client on `http://localhost:3000`.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register as a new user or log in with an existing account.
3. Create and update your profile.
4. Start posting updates, liking, and commenting on posts.
5. Use the search feature to find other users and posts.

## Project Structure

## Technologies Used

- **Frontend**: React, Redux, React Router, Axios
- **Backend**: Node.js, Express, JWT, bcryptjs
- **Database**: MongoDB, Mongoose
- **Other**: Socket.io, Bootstrap (for styling)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the project's coding standards and includes appropriate tests.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a pull request

## License

This project is licensed under the Sinhgad License.


