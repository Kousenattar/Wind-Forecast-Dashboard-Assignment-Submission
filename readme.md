# Wind Forecast Dashboard – Assignment Submission

Hi, my name is **Kousen Attar**. I am passionate about **Full-Stack Development**, and I really enjoyed building this application.

I am confident that you will like my work. I have completed the given assignment, and below I have provided the complete setup guide, project explanation, and details about how AI was used during development.

---

## Backend Setup

To run the backend:

```bash
cd backend
npm install
npm run dev
```

The backend uses the following Elexon BMRS API base URL:

```text
https://data.elexon.co.uk/bmrs/api/v1
```

For wind generation forecast data, I used:

```text
forecast/generation/wind
```

---

## Frontend Setup

To run the frontend:

```bash
cd frontend
npm install
npm run dev
```

After starting the frontend, open the following URL in your browser:

```text
http://localhost:5173
```

---

# Application Working

The application is a **Wind Forecast Dashboard** that compares forecasted wind generation with actual wind generation.

### 1. Select Analysis Period

When the dashboard is opened, the user can select:

- From Date
- To Date

After selecting the date range, the user clicks **Apply**.

The selected date range is sent to the backend, which fetches and processes the required data.

---

### 2. Dashboard Metrics

Based on the selected date range, the dashboard displays the following metrics:

- **MAPE (Mean Absolute Percentage Error)**
- **Average Forecast**
- **Average Actual**
- **MAE (Mean Absolute Error)**
- **Accuracy**

These metrics provide a quick overview of how accurately the wind generation was forecasted.

---

### 3. Forecast vs Actual Generation

The dashboard contains a **Forecast vs Actual Generation** graph.

This graph compares:

- Forecasted wind generation
- Actual wind generation

The X-axis represents the time, while the Y-axis represents wind generation in MW.

This makes it easy to understand how closely the forecast followed the actual generation.

---

### 4. Forecast Error

Below the comparison graph, I added a **Forecast Error** graph.

The error is calculated as:

```text
Error = Actual - Forecast
```

This helps identify whether the forecast was higher or lower than the actual wind generation.

- **Positive error** → Actual generation was higher than forecast.
- **Negative error** → Actual generation was lower than forecast.

---

### 5. Forecast Analysis

The dashboard also provides a **Forecast Analysis** section.

This section analyzes the relationship between forecasted and actual generation and provides useful insights based on the selected date range.

---

# API Used

For this project, I used the Elexon BMRS API.

### Base URL

```text
https://data.elexon.co.uk/bmrs/api/v1
```

### Wind Forecast API

```text
forecast/generation/wind
```

The API provides forecasted wind generation data, which is then processed by the backend and used by the frontend dashboard.

---

# AI Usage During Development

I used AI as a development assistant throughout the project, mainly for understanding the requirements, exploring the API, and solving implementation problems.

### 1. Understanding the Assignment

Initially, I read the assignment and partially understood the requirement. I understood that the project involved **UK electricity data**, but I needed more clarity about exactly what needed to be built and how the different requirements were connected.

I used AI to help me break down the assignment and understand:

- What the actual problem was
- What the dashboard should contain
- What data was required
- How the forecast and actual generation should be compared

---

### 2. Understanding the APIs

I was not initially familiar with the Elexon APIs or which API would be most suitable for this project.

I used AI to explore the available APIs and identify the API that best matched the assignment requirements.

Based on the requirements, I selected:

```text
forecast/generation/wind
```

This allowed me to retrieve the required wind generation forecast data.

---

### 3. Development Assistance

During development, I also used AI to help with:

- Understanding API responses
- Designing the backend API structure
- Connecting the frontend with the backend
- Handling date ranges
- Calculating dashboard metrics
- Debugging errors
- Designing charts
- Handling empty data and invalid date ranges
- Improving the overall dashboard UI

AI was mainly used as a **development and learning assistant**, while I implemented and integrated the application myself.

---

# Project Flow

The overall application flow is:

```text
User selects From and To dates
            ↓
        Frontend
            ↓
    Backend API Request
            ↓
     Elexon BMRS API
            ↓
   Wind Forecast Data
            ↓
     Backend Processing
            ↓
 Forecast + Actual Comparison
            ↓
        Frontend
            ↓
 ┌─────────────────────────┐
 │ Dashboard Metrics       │
 │ Forecast vs Actual     │
 │ Forecast Error         │
 │ Forecast Analysis      │
 └─────────────────────────┘
```

---

## Conclusion

Building this application was a great learning experience for me. It helped me understand how to work with real-world energy data, external APIs, backend data processing, frontend visualization, and analytical metrics.

I also enjoyed exploring the Elexon BMRS API and turning the raw data into a useful dashboard for understanding wind generation forecasting performance.

Thank you for reviewing my assignment.