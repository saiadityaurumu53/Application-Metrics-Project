# Step 1: Set the InfluxDB token (session only)
$env:INFLUX_TOKEN = "qpKXoKanI4gX0528cZfbwtVRp4EZBBGkp5tLkt0HTUBoi8uVJ5rnM_R69whiMYK1EcSNGSrIoyZIQJ0ghjLv-w=="

# Step 2: Set the remote Telegraf config URL
$telegrafConfigUrl = "https://us-east-1-1.aws.cloud2.influxdata.com/api/v2/telegrafs/0ef74fbac24cb000"

# Step 3: Download the config to local user folder
$localConfigPath = "$env:USERPROFILE\telegraf.conf"
Invoke-WebRequest `
    -Uri $telegrafConfigUrl `
    -Headers @{ Authorization = "Token $env:INFLUX_TOKEN" } `
    -OutFile $localConfigPath

# Step 4: Define Telegraf executable path (update if your version or path differs)
$telegrafExe = "C:\Program Files\InfluxData\telegraf\telegraf-1.34.4\telegraf.exe"

# Step 5: Run Telegraf with the downloaded config
& $telegrafExe --config $localConfigPath
