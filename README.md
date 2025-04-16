<div align="center">
  <img src="https://amirsalmani.com/icon.svg" alt="Amir Salmani Logo" width="120" />
  <h1>Amir Salmani - Professional Portfolio & Blog</h1>
  <p>A modern, full-stack Next.js application with AI integration, blog functionality, and client dashboard</p>
  
  <p>
    <a href="https://amirsalmani.com">View Demo</a>
    ·
    <a href="https://github.com/amhousa/amirsalmani.com/issues">Report Bug</a>
    ·
    <a href="https://github.com/amhousa/amirsalmani.com/issues">Request Feature</a>
  </p>
  
  <p>
    <a href="https://github.com/amhousa/amirsalmani.com/stargazers">
      <img src="https://img.shields.io/github/stars/amhousa/amirsalmani.com" alt="Stars" />
    </a>
    <a href="https://github.com/amhousa/amirsalmani.com/network/members">
      <img src="https://img.shields.io/github/forks/amhousa/amirsalmani.com" alt="Forks" />
    </a>
    <a href="https://github.com/amhousa/amirsalmani.com/issues">
      <img src="https://img.shields.io/github/issues/amhousa/amirsalmani.com" alt="Issues" />
    </a>
    <a href="https://github.com/amhousa/amirsalmani.com/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/amhousa/amirsalmani.com" alt="License" />
    </a>
  </p>
</div>

## 📋 Table of Contents

- [About The Project](#about-the-project)
  - [Built With](#built-with)
  - [Key Features](#key-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## 🚀 About The Project

**amirsalmani.com** is a professional portfolio and blog website built with modern web technologies. It showcases a full-stack application with features including authentication, blog functionality, AI-powered chat, and a comprehensive client dashboard.

The project demonstrates best practices in Next.js development, including:
- App Router architecture
- Server and client components
- Server actions
- API routes
- Database integration
- Authentication flows
- Responsive design
- Internationalization (RTL support)

### Built With

#### Frontend
- **Next.js 14** - React framework with App Router
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide Icons** - SVG icons

#### Backend
- **Node.js** - JavaScript runtime
- **Supabase** - Authentication & Database
- **Redis** - Session management & caching
- **Together AI** - AI chat functionality

#### DevOps
- **Vercel** - Hosting & Deployment
- **GitHub Actions** - CI/CD

### Key Features

- **Responsive Design**: Fully responsive layout optimized for all devices
- **Blog System**: Markdown-based blog with categories and tags
- **Dynamic AI Chat**: Integrated AI assistant using Together AI's DeepSeek-V3 model
- **Authentication**: Secure login system with OTP verification
- **Client Dashboard**: Comprehensive dashboard for managing consultations, services, and payments
- **Dark Mode**: Beautiful dark theme optimized for readability
- **RTL Support**: Full right-to-left language support for Persian content
- **SEO Optimized**: Built with best practices for search engine optimization
- **Performance Optimized**: Achieves high scores on Core Web Vitals

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Supabase account
- Redis instance
- Together AI API key

### Installation

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/amhousa/amirsalmani.com.git
cd amirsalmani.com
\`\`\`

2. **Install dependencies**

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Set up environment variables**

Create a `.env.local` file in the root directory (see [Environment Variables](#environment-variables) section below).

4. **Run the development server**

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

### Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Redis
REDIS_URL=your_redis_url

# Together AI
TOGETHER_API_KEY=your_together_ai_key

# Email
MAIL_HOST=your_mail_host
MAIL_PORT=your_mail_port
MAIL_USER=your_mail_user
MAIL_PASSWORD=your_mail_password
MAIL_FROM=your_mail_from
MAIL_TO=your_mail_to

# SMS
SMS_FROM_NUMBER=your_sms_from_number
SMS_USERNAME=your_sms_username
SMS_PASSWORD=your_sms_password
\`\`\`

## 📁 Project Structure

| Directory/File | Description
|-----|-----
| **app/** | Next.js App Router
| **api/** | API routes
| **auth/** | Authentication endpoints
| **blog/** | Blog-related endpoints
| **contact/** | Contact form endpoint
| **consultation/** | Consultation endpoints
| **cron/** | Scheduled tasks
| **dynamic-chat/** | AI chat endpoints
| **payment/** | Payment processing
| **services/** | Services endpoints
| **session/** | Session management
| **blog/** | Blog pages
| **chat-demo/** | AI chat demo page
| **contact/** | Contact page
| **cooperation/** | Cooperation page
| **dashboard/** | Dashboard pages
| **login/** | Authentication pages
| **payment/** | Payment pages
| **portfolio/** | Portfolio page
| **services/** | Services page
| **about/** | About page
| **components/** | Reusable components
| **dashboard/** | Dashboard components
| **ui/** | UI components (shadcn/ui)
| **BottomNavbar.tsx** | Mobile navigation
| **CelebrationPopup.tsx** | Promotional popup
| **DynamicChat.tsx** | AI chat component
| **MdxComponents.tsx** | MDX rendering components
| **MovingBackground.tsx** | Animated background
| **ProfilePhoto.tsx** | Profile photo component
| **ScanningImage.tsx** | Image with scanning effect
| **ScrollIndicator.tsx** | Scroll progress indicator
| **ServiceAdvertisement.tsx** | Service promotion
| **SessionTracker.tsx** | User session tracking
| **Snowfall.tsx** | Snowfall animation
| **ThreeScene.tsx** | 3D scene component
| **lib/** | Utility functions
| **api-rate-limit.ts** | API rate limiting
| **redis.ts** | Redis client
| **sms.ts** | SMS service
| **supabase-client.ts** | Supabase client
| **supabase-server.ts** | Supabase server
| **toast.ts** | Toast notifications
| **posts/** | Markdown blog posts
| **public/** | Static assets
| **scripts/** | Build scripts
| **styles/** | Global styles
| **types/** | TypeScript type definitions

## 🏛️ Architecture

The application follows a modern architecture based on Next.js App Router:

1. **Frontend Layer**:
   - React Server Components for initial rendering
   - Client Components for interactive elements
   - Tailwind CSS for styling
   - Framer Motion for animations

2. **API Layer**:
   - Next.js API Routes for backend functionality
   - Server Actions for form submissions
   - Rate limiting for API protection

3. **Data Layer**:
   - Supabase for database and authentication
   - Redis for caching and session management
   - File system for blog posts (Markdown)

4. **Integration Layer**:
   - Together AI for chat functionality
   - Email service for notifications
   - SMS service for OTP

5. **Deployment Layer**:
   - Vercel for hosting and serverless functions
   - GitHub Actions for CI/CD

## 📚 API Documentation

### Authentication Endpoints

#### `POST /api/auth/otp`
Sends an OTP code to the provided phone number.

**Request Body**:
\`\`\`json
{
  "phone": "09123456789"
}
\`\`\`

**Response**:
\`\`\`json
{
  "success": true
}
\`\`\`

#### `POST /api/auth/verify`
Verifies the OTP code and creates a session.

**Request Body**:
\`\`\`json
{
  "phone": "09123456789",
  "code": "123456"
}
\`\`\`

**Response**:
\`\`\`json
{
  "session": { ... },
  "success": true
}
\`\`\`

### Blog Endpoints

#### `GET /api/blog/cache`
Builds and returns blog posts data.

**Response**:
\`\`\`json
{
  "success": true,
  "posts": [ ... ],
  "tagIndex": { ... },
  "postsCount": 10
}
\`\`\`

#### `GET /api/blog/search`
Searches blog posts based on query parameters.

**Query Parameters**:
- `q`: Search query
- `category`: Category filter

**Response**:
\`\`\`json
[
  {
    "slug": "post-slug",
    "title": "Post Title",
    "date": "1403/12/01",
    "excerpt": "Post excerpt...",
    "tags": ["tag1", "tag2"],
    "image": "/images/blog/image.webp",
    "category": "Category"
  },
  ...
]
\`\`\`

### Chat Endpoints

#### `POST /api/dynamic-chat`
Processes a chat request and returns a response.

**Request Body**:
\`\`\`json
{
  "messages": [
    { "role": "user", "content": "Hello" }
  ],
  "systemPrompt": "You are a helpful assistant."
}
\`\`\`

**Response**:
\`\`\`json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      }
    }
  ]
}
\`\`\`

#### `POST /api/dynamic-chat/stream`
Streams a chat response.

**Request Body**: Same as `/api/dynamic-chat`

**Response**: Server-sent events stream

## 🗄️ Database Schema

The project uses Supabase with the following main tables:

### `profiles`
User profiles and personal information.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |
| full_name | text | User's full name |
| email | text | User's email |
| phone | text | User's phone number |
| address | text | User's address |
| job_title | text | User's job title |
| bio | text | User's biography |
| avatar_url | text | URL to user's avatar |

### `consultations`
Consultation requests from users.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| created_at | timestamp | Creation timestamp |
| user_id | uuid | Foreign key to profiles |
| title | text | Consultation title |
| description | text | Consultation description |
| date | text | Scheduled date |
| time | text | Scheduled time |
| duration | integer | Duration in minutes |
| type | text | Consultation type |
| status | text | Status (pending, scheduled, completed, cancelled) |
| notes | text | Additional notes |

### `services`
Service requests from users.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| created_at | timestamp | Creation timestamp |
| user_id | uuid | Foreign key to profiles |
| title | text | Service title |
| description | text | Service description |
| start_date | text | Service start date |
| end_date | text | Service end date |
| duration | integer | Duration in days |
| status | text | Status (active, expired, pending) |
| price | integer | Service price |

### `payments`
Payment records.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| created_at | timestamp | Creation timestamp |
| user_id | uuid | Foreign key to profiles |
| amount | integer | Payment amount |
| currency | text | Currency code |
| status | text | Payment status |
| payment_method | text | Payment method |
| transaction_id | text | Transaction identifier |
| description | text | Payment description |
| date | text | Payment date |
| related_id | uuid | Related entity ID |
| related_type | text | Related entity type |

## 🚢 Deployment

The project is deployed on Vercel. To deploy your own instance:

1. **Fork the repository**

2. **Create a Vercel account** if you don't have one

3. **Import the project** from your GitHub repository

4. **Configure environment variables** in the Vercel dashboard

5. **Deploy** the project

For detailed deployment instructions, see the [Vercel documentation](https://vercel.com/docs).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Amir Salmani - [info@amirsalmani.com](mailto:info@amirsalmani.com)

Project Link: [https://github.com/amhousa/amirsalmani.com](https://github.com/amhousa/amirsalmani.com)

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/)
- [Vercel](https://vercel.com/)
- [Together AI](https://together.ai/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

<div align="center">
  <p>If you find this project useful, please consider giving it a star! ⭐</p>
  <a href="https://github.com/amhousa/amirsalmani.com">
    <img src="https://img.shields.io/github/stars/amhousa/amirsalmani.com?style=social" alt="Star on GitHub" />
  </a>
</div>
\`\`\`

Now let's create additional documentation files to make your repository more professional:

