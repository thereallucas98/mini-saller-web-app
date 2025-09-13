# Mini Seller Web App

A lightweight console to triage Leads and convert them into Opportunities. Built with React 19, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** 
- **pnpm** (recommended) or npm/yarn

### Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd mini-seller-web-app

# Install dependencies
pnpm install

# Start the API server (json-server) - Terminal 1
pnpm api

# Start the development server - Terminal 2
pnpm dev
```

### 🔐 Login Credentials

**Default User Account:**
- **Email**: `admin@utilify.com`
- **Password**: `password`

> 💡 This is a demo account for testing purposes. In a production environment, authentication would be handled by a proper auth service.

### 🌐 Access URLs

- **Application**: http://localhost:5173
- **API Server**: http://localhost:3001
- **API Documentation**: http://localhost:3001 (json-server auto-generated)

## ✨ Features

- **🔍 Leads Management**: Search, filter, sort, and paginate through 100+ leads
- **📝 Lead Details**: View and edit lead information in a responsive panel
- **🎯 Convert to Opportunity**: Transform qualified leads into opportunities
- **📱 Responsive Design**: Mobile-first approach with dark theme
- **⚡ Real-time Updates**: Optimistic updates with rollback on failure
- **💾 Persistence**: Filter/sort preferences saved in localStorage
- **🔄 API Simulation**: Powered by json-server for realistic data flow

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev          # Start Vite dev server
pnpm api          # Start json-server API

# Code Quality
pnpm lint         # Run ESLint
pnpm lint-fix     # Fix ESLint issues
pnpm lint-check   # Check without fixing

# Build & Deploy
pnpm build        # Build for production
pnpm preview      # Preview production build

# Formatting
pnpm prettier-format  # Format code with Prettier
```

### 🔧 API Server

The application uses **json-server** to simulate a REST API. The API server runs on `http://localhost:3001` and provides:

#### Available Endpoints

- **GET /leads**: Fetch leads with pagination, search, and filtering
- **PATCH /leads/:id**: Update lead information
- **GET /opportunities**: Fetch opportunities
- **POST /opportunities**: Create new opportunities

#### Query Parameters

```bash
# Pagination
GET /leads?_start=0&_end=10

# Sorting
GET /leads?_sort=score&_order=desc

# Filtering
GET /leads?status=Qualified

# Search (client-side filtering)
GET /leads (then filter by name/company)
```

#### Sample Data

The API includes **100 sample leads** with realistic data:
- Names, companies, emails
- Lead scores (60-95)
- Status (New, Contacted, Qualified, Unqualified)
- Sources (Website, Referral, Cold Call, LinkedIn)

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn/UI components (Button, Card, Table, etc.)
│   └── layout/          # Layout components (TopNav, BottomNav)
├── pages/
│   ├── auth/            # Authentication pages
│   ├── dashboard/       # Dashboard with metrics and charts
│   ├── leads/           # Leads management
│   │   └── components/  # Lead-specific components
│   └── opportunities/   # Opportunities management
├── hooks/               # Custom React hooks
│   ├── use-leads-api.ts      # API integration
│   ├── use-leads-preferences.ts # localStorage persistence
│   └── use-leads-url-params.ts  # URL parameter management
├── contexts/            # React Context providers
├── types/               # TypeScript definitions
├── data/                # Mock data (db.json)
└── utils/               # Utility functions
```

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Shadcn/UI** for component library
- **React Router DOM** for navigation
- **React Hook Form** with Zod validation
- **Recharts** for data visualization
- **Lucide React** for icons

### Backend Simulation
- **json-server** for REST API simulation
- **100 sample leads** with realistic data
- **Pagination, search, filtering** support

### Development Tools
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

## ✅ Features Implemented

### 🎯 Core MVP Requirements

#### **1. Leads Management**
- ✅ **100+ Sample Leads**: Realistic data with names, companies, emails
- ✅ **Pagination**: Server-side pagination with 10 leads per page
- ✅ **Search**: Real-time search by name and company
- ✅ **Filtering**: Filter by status (New, Contacted, Qualified, Unqualified)
- ✅ **Sorting**: Sort by score (desc), name, company
- ✅ **Responsive Table**: Desktop table → Mobile cards

#### **2. Lead Detail Panel**
- ✅ **Responsive Panel**: Bottom sheet (mobile) → Modal (desktop)
- ✅ **Inline Editing**: Edit email and status with validation
- ✅ **Form Validation**: React Hook Form + Zod schema validation
- ✅ **Save/Cancel**: Proper form state management

#### **3. Convert to Opportunity**
- ✅ **One-Click Conversion**: Transform leads into opportunities
- ✅ **Duplicate Prevention**: Prevents multiple opportunities per lead
- ✅ **Opportunities Management**: View and manage created opportunities

#### **4. UX & States**
- ✅ **Loading States**: Custom loader component
- ✅ **Empty States**: Standardized with Lucide icons
- ✅ **Error States**: Retry functionality with proper error handling
- ✅ **Optimistic Updates**: Immediate UI updates with rollback on failure

### 🚀 Advanced Features

#### **📱 Responsive Design**
- ✅ **Mobile-First**: Tailwind breakpoints (sm:, lg:)
- ✅ **Adaptive Navigation**: TopNav (desktop) + BottomNav (mobile)
- ✅ **Responsive Sheets**: Different behaviors for mobile/desktop
- ✅ **Grid Layouts**: Adaptive dashboard and card layouts

#### **💾 Data Persistence**
- ✅ **localStorage**: Filter/sort preferences persist between sessions
- ✅ **URL Parameters**: Shareable URLs with current state
- ✅ **Hybrid Approach**: URL params + localStorage fallback

#### **⚡ Performance**
- ✅ **Debounced Search**: Prevents excessive API calls
- ✅ **Optimistic Updates**: Immediate UI feedback
- ✅ **Memoization**: useMemo/useCallback for performance
- ✅ **Efficient Pagination**: Server-side with proper total count

#### **🎨 Design System**
- ✅ **Dark Theme**: Consistent color palette
- ✅ **Shadcn/UI**: Professional component library
- ✅ **Lucide Icons**: Consistent iconography
- ✅ **Accessibility**: ARIA labels and keyboard navigation

## 🔧 Troubleshooting

### Common Issues

#### **Port Already in Use**
```bash
# If port 3001 is busy (API server)
lsof -ti:3001 | xargs kill -9

# If port 5173 is busy (dev server)
lsof -ti:5173 | xargs kill -9
```

#### **API Server Not Responding**
```bash
# Check if json-server is running
curl http://localhost:3001/leads

# Restart API server
pnpm api
```

#### **Build Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clear Vite cache
rm -rf .vite
pnpm dev
```

### 🧪 Testing the Application

1. **Login**: Use `admin@utilify.com` / `password`
2. **Navigate**: Dashboard → Leads → Opportunities
3. **Test Features**:
   - Search leads by name/company
   - Filter by status
   - Sort by different criteria
   - Edit lead details
   - Convert leads to opportunities
   - Test responsive design (resize browser)

### 📊 Sample Data

The application includes **100 realistic leads** with:
- **Names**: João Silva, Maria Santos, Pedro Costa, etc.
- **Companies**: TechCorp Solutions, InnovateLab, DigitalFlow, etc.
- **Scores**: 60-95 (with color-coded badges)
- **Status**: New, Contacted, Qualified, Unqualified
- **Sources**: Website, Referral, Cold Call, LinkedIn

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting (`pnpm lint-fix`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Shadcn/UI components when possible
- Maintain responsive design principles
- Write meaningful commit messages
- Test on multiple screen sizes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using React 19, TypeScript, and Tailwind CSS**
