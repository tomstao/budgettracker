# Expense Tracker Frontend

A modern, responsive expense tracking application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **User Authentication**: Secure login and registration system
- **Dashboard**: Overview of financial metrics and recent transactions
- **Transaction Management**: Add, edit, and delete transactions with categories
- **Category Management**: Organize transactions with custom categories
- **Budget Tracking**: Set and monitor spending limits by category
- **Analytics**: Visual insights into spending patterns and trends
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Shadcn UI components and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI + Radix UI
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Form Handling**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── transactions/     # Transaction components
│   ├── categories/       # Category components
│   ├── budgets/          # Budget components
│   ├── analytics/        # Analytics components
│   ├── layout/           # Layout components
│   └── shared/           # Shared components
├── lib/                  # Utility libraries
│   ├── api/              # API client and services
│   ├── store/            # Zustand stores
│   ├── utils/            # Utility functions
│   └── validators/       # Zod validation schemas
└── types/                # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd expensetracker_frontend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Key Features Implementation

### Authentication

- JWT-based authentication with Zustand for state management
- Protected routes with automatic redirect
- Form validation with React Hook Form and Zod

### Dashboard

- Real-time overview cards with key metrics
- Recent transactions list
- Interactive charts for spending trends
- Budget progress tracking

### Transactions

- CRUD operations for transactions
- Advanced filtering and search
- Category-based organization
- Date-based sorting

### Categories

- Custom category creation with colors and icons
- Type-based categorization (income/expense)
- Transaction count tracking

### Budgets

- Monthly and yearly budget setting
- Progress tracking with visual indicators
- Over-budget alerts
- Category-specific budgets

### Analytics

- Multiple chart types (line, bar, pie)
- Spending pattern analysis
- Category breakdown
- Trend analysis
- Data export functionality

## Component Architecture

The application follows a modular component architecture:

- **UI Components**: Reusable Shadcn UI components
- **Feature Components**: Domain-specific components
- **Layout Components**: Navigation and layout structure
- **Shared Components**: Common utilities and patterns

## State Management

- **Zustand**: Global state management for authentication and UI state
- **React Query**: Server state management for API data
- **React Hook Form**: Form state management with validation

## API Integration

The frontend is designed to work with a RESTful API backend. Key endpoints:

- Authentication: `/api/auth/*`
- Transactions: `/api/transactions`
- Categories: `/api/categories`
- Budgets: `/api/budgets`
- Analytics: `/api/analytics`

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Pre-built component library
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Ready for future implementation

## Performance Optimizations

- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Component-level lazy loading
- **Caching**: React Query caching strategies
- **Bundle Optimization**: Tree shaking and minification

## Testing

The project is set up for testing with:

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **TypeScript**: Type safety and IntelliSense

## Deployment

The application can be deployed to:

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative deployment platform
- **Docker**: Containerized deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
