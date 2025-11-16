An AI-powered quiz application that generates timed multiple-choice questions on any topic using the Gemini API. It features three difficulty levels, individual question timers, and an overall quiz timer for a challenging experience.

This project is a full-stack application:

Frontend: React + Vite (in the root directory)

Backend: Python + FastAPI (in the backend directory)

🚀 How to Run Locally
Follow these instructions to get the project running on your local machine.

Prerequisites

Before you begin, ensure you have the following installed:

Node.js (v18.0.0 or later)

Python (v3.9 or later)

A Google Gemini API Key: You can get one from the AI Studio.

Step-by-Step Instructions

You will need to open two terminals to run both the backend and frontend servers.

1. Clone the Repository

First, clone the repository to your local machine and navigate into the project directory.

Bash
git clone https://github.com/RupamCodes/AI-Quiz-Generator.git
cd AI-Quiz-Generator
2. Set Up the API Key

The backend (Python) needs your Gemini API key.

Navigate into the backend folder:

Bash
cd backend
Create a new file named .env (note the dot at the beginning).

Inside this .env file, add your API key:

GEMINI_API_KEY=YOUR_API_KEY_HERE
This is loaded by main.py.

3. Set Up & Run the Backend (Python)

Leave this terminal running the backend.

From the backend directory, create a Python virtual environment:

Bash
python3 -m venv venv
Activate the virtual environment:

On macOS/Linux:

Bash
source venv/bin/activate
On Windows:

Bash
.\venv\Scripts\activate
Install the required Python packages:

Bash
pip install -r requirements.txt
Start the backend server:

Bash
uvicorn main:app --reload
Your backend is now running on http://localhost:8000.

4. Set Up & Run the Frontend (React)

Open a new, separate terminal for this step.

Go back to the root project directory (AI-Quiz-Generator).

Bash
cd .. 
(Or cd /path/to/AI-Quiz-Generator if you're in a new window)

Install the Node.js dependencies:

Bash
npm install
Run the frontend development server:

Bash
npm run dev
5. You're All Set!

The Vite server will show you a URL, which is usually http://localhost:3000.

Open http://localhost:3000 in your browser to use the app!
