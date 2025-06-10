# 🖥️ Application Metrics Dashboard – InfluxDB Hackathon Project

This project is built for the **InfluxDB Hackathon**, providing a full-stack solution to **monitor, store, and visualize server system metrics** like load averages and CPU stats using:

* 🌐 **Next.js (with ShadCN UI + TailwindCSS)** for the frontend
* 🐍 **Django + Django REST Framework** for the backend
* 📊 **Local InfluxDB 3** time-series database for storing system metrics
* ⚙️ **Telegraf** for periodic system metrics ingestion

---

## 🎯 Features

### ✅ System Metrics Monitoring

* Collects `load1`, `load5`, CPU count, and more
* Pushes data to **local InfluxDB 3** using Telegraf
* Fetches both external and internal system data via API endpoints

### 🔐 Authentication

* Full JWT-based sign-up/sign-in flow using Django REST
* Tokens securely stored on the frontend (`localStorage`)
* Role-based access with support for staff and regular users

### 💻 Dashboard & UI

* Responsive pages built with **Next.js App Router**
* Styled using **ShadCN UI + Tailwind CSS**
* Beautiful metric visualizations using **Recharts**

---

## 🔄 Telegraf Ingestion Setup

A PowerShell script is provided to ingest system data into your **local InfluxDB 3** instance.

📄 **Ingestion Script**:
`backend\run_telegraf_local.ps1`

🛠️ **Installation Script**:
A separate script for installing InfluxDB 3 locally is also provided:
📄 `backend\run_telegraph_local.ps1`

### 🛠️ How to Use

1. Install [Telegraf](https://portal.influxdata.com/downloads/)
2. Ensure **local InfluxDB 3** is running (default port `8181`)
3. Customize `run_telegraf_local.ps1` if needed
4. Run it:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
cd backend
.\run_telegraf_local.ps1
```

---

## 🧩 Authentication & Pages (Next.js + ShadCN)

### Frontend Routes

| Route                         | Description                                  |
| ----------------------------- | -------------------------------------------- |
| `/signup`                     | User registration page                       |
| `/signin`                     | User login page (JWT-based)                  |
| `/dashboard`                  | User dashboard (protected)                   |
| `/dashboard/profile`          | Profile info: email, username, role          |
| `/dashboard/metrics`          | System metric charts from InfluxDB           |
| `/dashboard/mysystem`         | Per-device metric dashboards                 |
| `/dashboard/mysysteminternal` | View data collected via **local InfluxDB 3** |

> 🔒 Protected routes redirect to `/signin` if not authenticated

---

## 📂 Project Structure

```bash
server-metrics-dashboard/
├── backend/                      # Django project + APIs
│   ├── servermetrics/
│   ├── api/
│   ├── run_telegraf_local.ps1
│   └── run_telegraph_local.ps1
├── frontend/
│   └── serverdataapp/            # Next.js frontend with ShadCN
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

> Ensure `.env` is configured:

```env
INFLUXDB_TOKEN=your_local_token
INFLUXDB_ORG=your_local_org
INFLUXDB_BUCKET=your_bucket_name
INFLUXDB_HOST=http://localhost:8181
DJANGO_SECRET_KEY=your_django_secret
```

---

### 🌐 Frontend (Next.js)

```bash
cd frontend/serverdataapp
npm install
npm run dev
```

> Accessible at [http://localhost:3000](http://localhost:3000)

---

## 🔐 API Endpoints

Your current Django `urlpatterns`:

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('authapi.urls')),
    path("api/load-system-data/", get_system_metrics),
    path("write-metrics/", write_systemmetrics_influx_data_view, name="write-metrics"),
    path("api/load-internal-system/", load_internal_system),
]
```

### 🧪 Available Endpoints

| Method | URL                          | Description                                  |
| ------ | ---------------------------- | -------------------------------------------- |
| GET    | `/api/load-system-data/`     | Fetch system metrics from InfluxDB           |
| POST   | `/write-metrics/`            | Write metrics manually to InfluxDB           |
| GET    | `/api/load-internal-system/` | Fetch internal system metrics (local system) |
| POST   | `/api/register/`             | Register new users                           |
| POST   | `/api/token/`                | Obtain access/refresh token (JWT auth)       |

---

## 📈 Charts

Charts are rendered using `recharts`, including:

* Line charts for `load1`, `load5`
* Device-level CPU statistics

---

## 📋 TODO

* [ ] Add Docker support
* [ ] Enable WebSocket streaming for real-time updates
* [ ] Alerting mechanism for CPU thresholds
* [ ] Role-based dashboard customization

---

## 👨‍💻 Author

**Sai Aditya Urumu**
📧 [saiadityaurumu53@gmail.com](mailto:saiadityaurumu53@gmail.com)
🔗 Project submitted to the **InfluxDB Hackathon 2025**

---

## 📝 License

MIT License – Use and modify freely. Contributions welcome!

