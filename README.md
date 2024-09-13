# Network Sim Pro

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

## Setup and Running (Containerized Environment)

```bash
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
