# Text Analysis Application with Keycloak Authentication

A full-stack application for text analysis with secure authentication using Keycloak. This project demonstrates integration of modern web technologies with enterprise-grade authentication.

## Overview

This application allows users to:

- Create, read, update, and delete text entries
- Analyze text for various metrics (word count, character count, sentence count, paragraph count)
- Find the longest words in a text
- Secure all operations with Keycloak authentication

Originally developed as a company task, I've adapted it into a personal project to showcase my skills in full-stack development and security implementation.

## Features

- **Secure Authentication**: Integration with Keycloak for robust identity and access management
- **Text Analysis**: Comprehensive text metrics including word count, character count, sentence count, and paragraph count
- **Responsive UI**: Modern interface built with React and Tailwind CSS
- **Caching**: Redis implementation for improved performance
- **API Security**: Protected endpoints with token-based authentication
- **Data Persistence**: MongoDB for storing text entries and analysis results

## Technology Stack

### Frontend

- React with TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS with shadcn/ui components
- Vite as build tool

### Backend

- Node.js with Express
- MongoDB for data storage
- Redis for caching
- Joi for validation
- Winston for logging

### Authentication

- Keycloak for identity and access management
- JWT token handling
- Cookie-based authentication

### DevOps

- Docker and Docker Compose for containerization
- Environment configuration

## Keycloak Integration

This project demonstrates a complete integration with Keycloak for authentication and authorization:

- **User Registration and Login**: Secure forms for user creation and authentication
- **Token Management**: Handling of access and refresh tokens
- **Session Management**: Secure cookie-based sessions
- **User Profile**: Access to user information from Keycloak
- **Logout Functionality**: Proper session termination

## Getting Started

### Prerequisites

- Node.js (v16+)
- Docker and Docker Compose
- MongoDB
- Redis

### Installation

1. Clone the repository: `git clone https://github.com/yourusername/text-analysis-keycloak.git cd text-analysis-keycloak`

2. Start the Keycloak and database services: `docker-compose up -d `

3. Import the Keycloak realm:

   - Access Keycloak admin console at http://localhost:8080
   - Login with admin/admin
   - Import the `realm-export.json` file from the project root

4. Install server dependencies: `cd server npm install `

5. Create a `.env` file in the server directory with the following content: `NODE_ENV=development PORT=5000 CORS_ORIGIN=http://localhost:5173,http://localhost:4173,http://localhost:8080 MONGODB_URI=mongodb://yeasir:JTsfy876yK9CfDBd@localhost:27017/ REDIS_URL=redis://localhost:6379 REDIRECT_URL=http://localhost:5173 COOKIE_KEY=WSD REFRESH_KEY=WSD-REFRESH KEYCLOAK_SERVER_URL=http://localhost:8080 KEYCLOAK_REALM=wsd KEYCLOAK_CLIENT_ID=myclient KEYCLOAK_ADMIN_USER_NAME=admin KEYCLOAK_ADMIN_PASSWORD=admin`

6. Start the server: `npm run dev `

7. Install client dependencies: `cd ../client npm install `

8. Create a `.env` file in the client directory: `VITE_PUBLIC_SERVER_URL=http://localhost:5000/api/v1 VITE_PUBLIC_ENV=development`

9. Start the client: `npm run dev `

10. Access the application at http://localhost:5173

## Usage

### Authentication

1. Register a new account using the registration form
2. Login with your credentials
3. Your session will be maintained with secure cookies

### Text Analysis

1. Add a new text entry using the "Add Text" button
2. View text analysis metrics for your entry
3. Edit or delete your text entries as needed
4. View a list of your personal text entries

## Personal Enhancements

I've made several improvements to the original project:

1. **Enhanced Documentation**: Comprehensive README and code comments
2. **Improved Error Handling**: Better error messages and recovery
3. **UI Refinements**: More intuitive user interface
4. **Performance Optimization**: Improved caching strategy
5. **Security Hardening**: Additional protection against common vulnerabilities

## Future Enhancements

- **Advanced Text Analysis**: Sentiment analysis, readability scores
- **Export Functionality**: Export analysis results to PDF or CSV
- **User Preferences**: Customizable dashboard and analysis options
- **Multi-language Support**: Internationalization for the UI
- **OAuth Integration**: Additional authentication providers

## Contributing

While this is a personal project, suggestions and feedback are welcome. Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Original project concept from a company assignment
- Keycloak team for their excellent authentication solution
- The open-source community for the various libraries used
