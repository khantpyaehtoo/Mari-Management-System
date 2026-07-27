# 🌸 Mari - Booking & Staff Management System

A modern, responsive, and efficient **Booking and Staff Management System** built with React, Vite, Ant Design, and RTK Query. Designed for beauty salons and appointment-based businesses to streamline daily operations, staff schedule tracking, leave assignments, and service package management.

---

## ✨ Features

- 📅 **Interactive Staff Calendar & Schedule**
  - Daily active staff, day-off, and leave overview.
  - Interactive calendar with popover details for date-wise staff attendance.
  - Multi-date range leave assignment (Day Off, Sick Leave, Personal, Maternity).
  - Dynamic user filtering and search with debounce support.

- 👥 **Staff Management**
  - Real-time staff status tracking (Available, In Progress, Unavailable, Terminated).
  - Automated attendance and active staff list updates.

- 💅 **Services & Category Management**
  - Full CRUD operations for categories and services.
  - Soft-delete recovery mechanism for inactive services.
  - Protection against accidental deletion of services tied to active packages.

- ⚡ **Optimized Data Management**
  - RTK Query tag invalidation for automatic UI refetching without needing page refreshes.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 / Vite
- **UI Components:** [Ant Design (antd)](https://ant.design/)
- **Styling:** Tailwind CSS / Lucide React Icons
- **State Management & Data Fetching:** Redux Toolkit & RTK Query
- **Date Handling:** Day.js

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.x` or higher
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/mari-booking-management.git](https://github.com/your-username/mari-booking-management.git)
   cd mari-booking-management
