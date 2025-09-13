# Mini Seller Web App

A lightweight console to triage Leads and convert them into Opportunities.

## Features

- **Leads Management**: Search, filter, sort, and paginate through leads
- **Lead Details**: View and edit lead information in a responsive panel
- **Convert to Opportunity**: Transform qualified leads into opportunities
- **Responsive Design**: Mobile-first approach with dark theme
- **Real-time Updates**: Powered by json-server for API simulation

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Start the API server (json-server)
pnpm api

# In another terminal, start the development server
pnpm dev
```

### API Server

The application uses json-server to simulate a REST API. The API server runs on `http://localhost:3001` and provides:

- **GET /leads**: Fetch leads with pagination, search, and filtering
- **PATCH /leads/:id**: Update lead information
- **GET /opportunities**: Fetch opportunities
- **POST /opportunities**: Create new opportunities

#### API Endpoints

- `GET /leads?_page=1&_limit=10&_sort=score&_order=desc&q=search&status=New`
- `PATCH /leads/1` with JSON body for updates
- `GET /opportunities`
- `POST /opportunities` with JSON body for creation

### Development

```bash
# Run linting
pnpm lint

# Fix linting issues
pnpm lint-fix

# Build for production
pnpm build
```

## Project Structure

```
src/
├── components/
│   ├── leads/           # Lead management components
│   ├── ui/              # Reusable UI components
│   └── layout/          # Layout components
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── types/               # TypeScript type definitions
├── data/                # Mock data files
└── utils/               # Utility functions
```

## Technologies Used

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/UI** for components
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **json-server** for API simulation
- **Recharts** for data visualization

## Features Implemented

### ✅ MVP Requirements

1. **Leads List**
   - Load from API with pagination
   - Search by name/company
   - Filter by status
   - Sort by score (desc), name, company

2. **Lead Detail Panel**
   - Responsive slide-over panel
   - Inline edit for status and email
   - Email validation
   - Save/cancel actions

3. **Convert to Opportunity**
   - One-click conversion
   - Creates opportunity with lead data
   - Integrated with opportunities management

4. **UX/States**
   - Loading states with custom loader
   - Empty states with helpful messages
   - Error handling with retry options
   - Handles 100+ leads smoothly

### 🎨 Design Features

- **Dark Theme**: Consistent with tailwind.config.js palette
- **Mobile-First**: Responsive design for all screen sizes
- **Component Library**: Shadcn/UI components throughout
- **Accessibility**: Proper ARIA labels and keyboard navigation

## API Configuration

The json-server is configured to:
- Watch `db.json` for changes
- Run on port 3001
- Support pagination with `_page` and `_limit`
- Support sorting with `_sort` and `_order`
- Support search with `q` parameter
- Support filtering with field-specific parameters

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

## License

MIT License