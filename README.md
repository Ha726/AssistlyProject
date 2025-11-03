# Assistly Care - AI-Powered Customer Support Platform

A comprehensive full-stack web application for businesses providing AI-based customer support and internal communication.

## Project Overview

Assistly Care enables seamless task management, AI-assisted issue handling, supervisor reporting, and automatic chatbot generation for clients.

## User Roles

### 1. Admin
- Username: `assistcareadmin`
- Password: `admin.poiuytrewq`
- Full system control and user management
- Dashboard: `admin.html`

### 2. Supervisor
- Monitor agent activities
- Generate reports
- Dashboard: `supervisor.html` (in development)

### 3. Agent
- Handle customer queries
- Accept and resolve issues
- Dashboard: `agent.html` (in development)

### 4. Client
- Manage custom chatbots
- View performance stats
- Dashboard: `client.html` (in development)

## Technology Stack

- React 18 (production build)
- TailwindCSS for styling
- Lucide icons
- Trickle Database for data persistence

## Database Structure

- `user:admin` - Admin users
- `user:supervisor` - Supervisor users
- `user:agent` - Agent users
- `user:client` - Client users
- `query` - Customer queries (planned)
- `report` - Supervisor reports (planned)
- `chatbot` - Client chatbots (planned)

## Current Status

✅ Authentication system
✅ Admin dashboard with user management
✅ Login interface with role selection
🚧 Supervisor dashboard (planned)
🚧 Agent dashboard (planned)
🚧 Client dashboard (planned)
🚧 AI chatbot integration (planned)

## Next Steps

1. Complete supervisor dashboard
2. Build agent query management
3. Implement client chatbot builder
4. Add AI integration for query handling
5. Create report generation system

## Features by Role

### Admin Features
- Add/Delete/Manage Clients, Agents, Supervisors
- View supervisor reports (spreadsheet format with PDF generation)
- Monitor all agent activities and chat sessions
- Generate and share chatbot links
- Full dashboard analytics and notifications
- Change passwords for all user roles

### Supervisor Features
- Monitor agent activities and performance
- Prepare structured daily/weekly reports
- Upload and store signature for report authorization
- Send reports to Admin (auto-generated PDF)
- Add agents with complete details
- Performance metrics dashboard

### Agent Features
- View and accept customer queries
- Chat interface for customer communication
- Mark queries as resolved with notes
- Dashboard showing accepted, pending, and resolved queries
- Query status visibility (In Progress when accepted by another agent)

### Client Features
- Manage reports from agents
- View performance statistics
- Create custom chatbots with shortcuts and FAQs
- Preview chatbot before publishing
- Generate embed links for websites
- Copy/Download chatbot files

## AI Chatbot Features
- Floating widget UI
- Issue categorization (Payment, Technical, Account, etc.)
- Instant AI responses
- Auto-transfer to agents for follow-up
- Multi-language support (English & Hindi)
- Branded with company logo
