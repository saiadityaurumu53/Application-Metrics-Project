# 🖥️ Application Metrics Dashboard – InfluxDB Hackathon Project

This project is built for the **InfluxDB Hackathon**, providing a full-stack solution to **monitor, store, and visualize server system metrics** like load averages and CPU stats using:

- 🌐 **Next.js (with ShadCN UI + TailwindCSS)** for frontend
- 🐍 **Django + Django REST Framework** for backend
- 📊 **InfluxDB Cloud** as the time-series database
- ⚙️ **Telegraf** for periodic system metrics ingestion

---

## 🎯 Features

### ✅ System Metrics Monitoring
- Collects `load1`, `load5`, `load15`, CPU count and more
- Pushes data to **InfluxDB Cloud** via Telegraf

### 🔐 Authentication
- Full JWT-based sign-up/sign-in flow using Django REST
- Tokens securely stored on the frontend (`localStorage`)
- Role-based access with support for staff and regular users

### 💻 Dashboard & UI
- Responsive pages built with **Next.js App Router**
- Styled using **ShadCN UI + Tailwind CSS**
- Beautiful metric visualizations using **Recharts**

---

## 🔄 Telegraf Ingestion Setup

A PowerShell script is provided to ingest system data into InfluxDB Cloud.

📄 **Script Path**:  
`backend\run_telegraph_cloud.ps1`

### 🛠️ How to Use
1. Install [Telegraf](https://portal.influxdata.com/downloads/)
2. Update the `.ps1` file with your InfluxDB credentials (or use `.env`)
3. Run it:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
cd backend
.\run_telegraph_cloud.ps1
```

This will push system stats to InfluxDB every few seconds.

---

## 🧩 Authentication & Pages (Next.js + ShadCN)

### Frontend Routes

| Route                  | Description                                 |
|------------------------|---------------------------------------------|
| `/signup`              | User registration page                      |
| `/signin`              | User login page (JWT-based)                 |
| `/dashboard`           | User dashboard (protected)                  |
| `/dashboard/profile`   | Profile info: email, username, role         |
| `/dashboard/metrics`   | System metric charts from InfluxDB          |
| `/dashboard/mysystem`  | Per-device metric dashboards                |

### Highlights

- Protected routes with auth redirection (`/signin` on failure)
- Layout includes dynamic sidebar, navbar, and breadcrumbs
- Uses `Card`, `Select`, `Chart`, `Tooltip` from ShadCN UI

---

## 📂 Project Structure

```bash
server-metrics-dashboard/
├── backend/                  # Django project + APIs
│   ├── servermetrics/
│   ├── api/
│   └── run_telegraph_cloud.ps1
├── frontend/
│   └── serverdataapp/        # Next.js frontend with ShadCN
```

---

## 🔧 Getting Started

### 🔙 Backend (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

> Ensure `.env` is set with InfluxDB and Django secret:

```env
INFLUXDB_TOKEN=your_token
INFLUXDB_ORG=InfluxDB Hackathon
INFLUXDB_HOST=https://us-east-1-1.aws.cloud2.influxdata.com
DJANGO_SECRET_KEY=your_django_secret
```

### 🌐 Frontend (Next.js)
```bash
cd frontend/serverdataapp
npm install
npm run dev
```
> Runs on [http://localhost:3000](http://localhost:3000)

---

## 🔐 Sample API Endpoints

| Method | URL                  | Description                   |
|--------|----------------------|-------------------------------|
| POST   | `/api/register/`     | Register new users            |
| POST   | `/api/token/`        | Obtain access/refresh token   |
| GET    | `/api/protected/`    | Auth-protected user endpoint  |
| GET    | `/api/metrics/`      | Fetch InfluxDB system metrics |

---

## 📈 Charts

Charts are rendered with `recharts`, including:

- Line charts for `load1`, `load5`, `load15`
- Device-based CPU stats
- Location-specific breakdown (e.g., Klamath, Portland)

---

## 📋 TODO

- [ ] Add Docker support
- [ ] Enable WebSocket streaming for real-time updates
- [ ] Alerting mechanism for CPU thresholds
- [ ] Role-based dashboard customization

---

## 👨‍💻 Author

**Sai Aditya Urumu**  
📧 saiadityaurumu53@gmail.com
🔗 Project submitted to the **InfluxDB Hackathon 2025**

---

## 📝 License

MIT License – Use and modify freely. Contributions welcome!

---


