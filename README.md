# Real-time Communication Demo

A demonstration project showcasing different real-time communication methods in web applications.

## Features

This project implements three different polling methods:
- **Short Polling**: Regular interval-based requests
- **Long Polling**: Server hold request until new data arrives
- **WebSocket**: Full-duplex communication using Socket.IO

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (14.0 or higher)
- [npm](https://www.npmjs.com/) (6.0 or higher)

## Installation

1. Clone the repository
```bash
git clone https://github.com/rebeccaS47/PollingWebsocketDiff.git
```

2. Navigate to the project directory
```bash
cd your-repo-name
```

3. Install dependencies
```bash
npm install
```

## Running the Application

1. Start the server
```bash
node server.js
```
2. Open your browser and visit:
```
http://localhost:3000
```

## Project Structure

```
project-root/
├── server.js          # Main server implementation
├── package.json       # Project configuration and dependencies
├── README.md         # Documentation
└── public/           # Static files
    └── index.html    # Main application page
```

## Usage

The application displays three panels, each demonstrating a different communication method:

1. **Short Polling Panel**
   - Automatically polls server every 5 seconds
   - Simple and straightforward implementation

2. **Long Polling Panel**
   - Maintains connection until new data arrives
   - More efficient than short polling

3. **WebSocket Panel**
   - Real-time bidirectional communication
   - Most efficient for frequent updates

## Technical Implementation

### Server-side
- Built with Express.js
- Socket.IO for WebSocket implementation
- RESTful endpoints for polling methods

### Client-side
- Pure JavaScript implementation
- Socket.IO client for WebSocket
- Responsive design

## 📝 API Endpoints

- `POST /message`: Send a new message
- `GET /messages/short-polling`: Get messages (short polling)
- `GET /messages/long-polling`: Get messages (long polling)
