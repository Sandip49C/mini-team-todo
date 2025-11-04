# Mini Team To-Do App

## Team
- Sandip Thapa — Frontend Lead
- Raymon KC —  Backend Lead
- Roeisha Lwagan — Reviewer & Tester


## Overview
Simple To-Do web app

A collaborative software development project for a To-Do List web application demonstrating teamwork, Git branching, merging workflows, testing, and CI/CD concepts.


## How to run (developer)
### Backend
```bash
cd backend
npm install
npm run dev      # uses nodemon
# or: npm start


**Reason for IDE Choice:**  
VS Code provides Git integration, debugging tools, UI simplicity, and extensions for JavaScript frameworks — ideal for beginners and teamwork.

CI/CD Overview
Continuous Integration (CI)

Automated GitHub Actions workflow triggered on pull requests:

Installs dependencies

Runs backend tests

Builds frontend project

Continuous Delivery (CD)

Planned: deploy to a hosting service automatically after CI success (e.g. Netlify/Render)

Distributed Computing Explanation

We selected the Message Queue (MQ) paradigm (e.g., RabbitMQ, Kafka).

Benefits for scalability:

Decouple frontend requesting from backend task processing

Support multiple worker services

Prevent system overload during heavy usage

This concept supports smooth scaling in larger real-world applications.
