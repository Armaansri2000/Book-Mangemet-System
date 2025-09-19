Book Management Dashboard

A modern React.js application to manage books with full CRUD capabilities. Built with Vite, TailwindCSS, Redux Toolkit, Context API, and structured using the MVP pattern.

##SetUp--
1)Copy the .env.example to your .env
2)Fill in Your api credeentials from crudcrud.com
3)VITE_API_BASE_URL= Your Api
4)npm install
5)nom run

 Key Features

Dashboard View: Browse books in either a table or grid layout with a toggle option.

Search & Filter: Quickly search by title or author and filter by genre or status.

Pagination: View 10 books per page with intuitive arrow navigation.

Add/Edit Books: Dedicated pages with form validation using React Hook Form.

Delete Functionality: Confirmation prompt before removing books.

Notifications: Feedback for all actions through toast notifications.

Loading Indicators: Skeleton loaders and animated spinners for better UX.

Responsive Design: Mobile-first approach using TailwindCSS.

Persistent Storage: Data saved via CrudCrud API.

🛠 Technology Stack
Frontend

React.js 18 – Functional components and hooks

Vite – Fast development server and build system

Styling & UI

TailwindCSS – Utility-first responsive design

Framer Motion – Smooth animations for transitions and loaders

State Management

Redux Toolkit – Centralized state for books, filters, and pagination

Context API – Handles UI states like modals and confirmations

Routing

React Router DOM – Navigation for dashboard and add/edit pages

Forms & Validation

React Hook Form – Lightweight form handling and validation

Controller – Connects custom components to forms

API & HTTP

Fetch API – Native HTTP requests

CrudCrud API – Backend storage for book records

Notifications

React Hot Toast – Quick success/error alerts

Architecture

MVP Pattern – Separation of concerns: Model, View, Presenter

Custom Hooks – useApi and useBookPresenter for reusable logic

Component-Based Design – Modular and reusable components
 Features Implementation

Dashboard

Toggle between grid/table

Shows title, author, genre, published year, and status

Pagination with 10 items per page

Search by title/author

Filters for genre and status

Add/Edit Books

Separate routes for forms

Form validation using React Hook Form

Data submitted to API

Delete Books

Confirmation dialog before deletion

Feedback via toast notifications

UX & Styling

Mobile-first design

Smooth animations using Framer Motion

Skeleton loaders during data fetch

API Integration

CRUD operations with proper HTTP methods

Error handling and loading states

🚀 Getting Started
Prerequisites

Node.js v16+

npm or yarn

Setup
git clone <repository-url>
cd book-management
npm install
npm run dev

Production Build
npm run build

API Configuration

Get a unique CrudCrud API endpoint from CrudCrud.com

Replace API_BASE_URL in src/api/bookApi.jsx


Contributing---

Fork the repository

Create a branch

Commit your changes

Push to the branch

Open a Pull Request
