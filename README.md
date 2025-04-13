# University Data App

This is a Next.js application that retrieves and displays university data from a local database. The application includes a search page for filtering universities and a favorites page for managing favorite universities.

## Features

- **Search Page**: Filter universities by name and country.
- **Favorites Page**: View and manage favorite universities.
- **Responsive Design**: Works well on both desktop and mobile devices.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (Node package manager)
- MongoDB (running locally or accessible remotely)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd university-data-app
   ```

2. Install the dependencies:

   ```
   npm install
   ```

### Setting Up the Database

1. Ensure MongoDB is running locally or accessible remotely. If MongoDB is not running, start it:

   ```
   mongod
   ```

2. Import the university data into the database:
   - Update the MongoDB connection URI in `src/container/utils/importJSON.ts` if necessary.
   - Run the import script:
     ```
     npx ts-node src/container/utils/importJSON.ts
     ```
   - This will load the data into the `universityDB` database in the `universities` collection.

### Running the Application

1. Start the development server:

   ```
   npm run dev
   ```

2. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

### Building for Production

To create an optimized production build, run:

```
npm run build
```

Then, you can start the production server with:

```
npm start
```

### Docker Instructions

To run the application using Docker, follow these steps:

1. Build the Docker image:

   ```
   docker build -t university-data-app .
   ```

2. Run the Docker container:

   ```
   docker run -p 3000:3000 university-data-app
   ```

3. Access the application at:

   ```
   http://localhost:3000
   ```

## Folder Structure

- `src/components`: Contains React components for the application.
- `src/pages`: Contains the pages of the application.
- `src/styles`: Contains global and module-specific styles.
- `src/container/utils`: Contains utility functions and scripts (e.g., `importJSON.ts` for importing data).
- `src/container/types`: Contains TypeScript interfaces for type safety.

## Contributing

Feel free to submit issues or pull requests for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
