# Doduo 🐦

Welcome to **Doduo**, an open-source, web-based task management tool inspired by [Blitzit](https://www.blitzit.app/). Our project aims to enhance productivity with a modern tech stack and sleek design. This README provides an overview of the project, setup instructions, and a development roadmap.

## 🚀 Project Overview

Doduo is a task scheduling application designed to help users organize their daily tasks, track time, and generate reports. Our initial MVP (Minimum Viable Product) includes:

- 📝 **Task Scheduling for Today**: Plan and prioritize tasks for the day.
- ⏱ **Timers**: Track time spent on tasks with precision.
- 📊 **Reports**: View and analyze your productivity data.

## 🛠️ Tech Stack

### Frontend

- **Shadcn**: UI component library for building beautiful interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **React**: JavaScript library for building user interfaces.
- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Superset of JavaScript for type-safe development.
- **Framer Motion**: Animation library for React.

### Backend

- **Golang**: Robust and performant language for backend development.

## 📅 Timeline & Milestones

### Milestone 1: Design in Figma

- **Goal**: Design the user interface and user experience in Figma.
- **Tools**: Figma for design and prototyping.
- **Duration**: 2 days

### Milestone 2: Backend Development

- **Goal**: Create a robust backend to support frontend requests.
- **Tools**: Golang for API development.
- **Duration**: 1 week

### Milestone 3: Build Initial Prototype

- **Goal**: Implement the design and create an initial prototype based on Figma designs.
- **Tools**: React, Next.js, Tailwind, Shadcn, Framer Motion.
- **Duration**: 5 days

- **User Feedback**: Gather initial reactions and feedback from users to refine the product.

## 📂 Project Structure

```
doduo/
├── backend/        # Golang backend
├── frontend/       # React frontend
└── README.md       # Project documentation
```

## 🛠️ Setup & Installation

### Prerequisites

- **Node.js** and **npm**: For frontend development.
- **Go**: For backend development.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/doduo.git
   ```

2. **Install frontend dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**:
   ```bash
   cd backend
   go mod tidy
   ```

4. **Run the application**:
    - **Frontend**:
      ```bash
      npm run dev
      ```
    - **Backend**:
      ```bash
      go run main.go
      ```

## 📝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙌 Acknowledgements

Special thanks to the creators of [Blitzit](https://www.blitzit.app/) for the inspiration.

---

Feel free to customize this README based on the project's progress and specific needs.