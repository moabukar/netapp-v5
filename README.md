# Network Simulator Pro

Network Simulator Pro is an interactive web application designed to help users learn about networking concepts, practice network commands, and test their knowledge through quizzes.

## Notes

- Backend is hosted on Heroku
- Frontend is hosted on Vercel

## Features

- Network command simulator
- Interactive quizzes on networking topics
- Detailed network information section
- Command reference guide

## Prerequisites

- Python 3.8+
- Node.js 14+
- Docker and Docker Compose (for containerized setup)

## Setup and Running (Raw Environment)

### Backend Setup

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/network-simulator-pro.git
   cd network-simulator-pro
   ```

2. Set up a virtual environment:

   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install backend dependencies:

   ```
   cd backend
   pip install -r requirements.txt
   ```

4. Run the Flask application:

   ```
   python app.py
   ```

The backend should now be running on `http://localhost:5000`.

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install frontend dependencies:

   ```
   npm install
   ```

3. Start the React development server:

   ```
   npm start
   ```

The frontend should now be accessible at `http://localhost:3000`.

## Setup and Running (Containerized Environment)

1. Ensure Docker and Docker Compose are installed on your system.

2. Clone the repository:

   ```
   git clone https://github.com/yourusername/network-simulator-pro.git
   cd network-simulator-pro
   ```

3. Build and run the containers:

   ```
   docker-compose up --build
   ```

The application should now be accessible at `http://localhost:3000`.

## Using the Application

1. **Network Simulator**: Enter network commands (e.g., ping, traceroute) to see their simulated output.

2. **Quiz**: Test your networking knowledge with interactive quizzes.

3. **Network Info**: Explore detailed information about various networking concepts.

4. **Command Reference**: Quick reference for common networking commands.

## Development

- Backend code is located in the `backend` directory.
- Frontend code is in the `frontend` directory.
- To add new quiz questions, edit `backend/quiz_questions.json`.
- To update network information, modify `backend/network_info.json`.

## Troubleshooting

- If you encounter CORS issues, ensure the backend CORS settings are correctly configured.
- For container issues, check Docker logs: `docker-compose logs`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
