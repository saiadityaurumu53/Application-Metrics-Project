# ===============================
# Telegraf → Local InfluxDB 3 Setup Script
# ===============================

# Step 1: Set your InfluxDB 3 admin token (replace with your actual token)
$env:INFLUX_TOKEN = "apiv3_WjoJ989Hy6NDrLIfv_vq1YPs03-gOyTS8igIwsFmpUAFFsj4xSb_mXlKGvd9d-5Rs0fbUvm1Fn6wFCglnx5frA"

# Step 2: Define path for local Telegraf config file
$localConfigPath = "$env:USERPROFILE\telegraf-local.conf"

# Step 3: Write Telegraf config for local InfluxDB
@"
[agent]
  interval = "10s"
  round_interval = true
  metric_batch_size = 1000
  metric_buffer_limit = 10000
  collection_jitter = "0s"
  flush_interval = "10s"
  flush_jitter = "0s"
  precision = ""
  logfile = ""
  debug = false
  quiet = false
  hostname = ""

[[outputs.influxdb_v2]]
  urls = ["http://localhost:8181"]
  token = "$env:INFLUX_TOKEN"
  organization = "my-org"
  bucket = "localdb"

[[inputs.cpu]]
  percpu = true
  totalcpu = true
  collect_cpu_time = false
  report_active = false

[[inputs.mem]]
[[inputs.disk]]
[[inputs.system]]
"@ | Set-Content -Path $localConfigPath -Encoding UTF8

# Step 4: Define path to Telegraf executable (adjust if yours is different)
$telegrafExe = "C:\Program Files\InfluxData\telegraf\telegraf-1.34.4\telegraf.exe"

# Step 5: Run Telegraf with the new local config
Write-Host "✅ Starting Telegraf with local InfluxDB config..."
& $telegrafExe --config $localConfigPath
