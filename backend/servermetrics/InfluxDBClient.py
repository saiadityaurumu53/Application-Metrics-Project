import os, time
from influxdb_client_3 import InfluxDBClient3, Point


from datetime import datetime, timezone

# token = os.environ.get("INFLUXDB_TOKEN")
# token = "4TsNciUc5b5tC_o1lji_dRHcKyVMIh_-Ic5iA4mNftLVuvYgLzMpmTOofekDvqNihgY8AG4CWq-woNkPSgThGQ=="
token = "fdR8YWinGvf5ENoX-YRzAs91XWqctqgXjUEDugrZvrg1Y47ZzL9Hznv1e4olp9BrI5pPGZ5xTAVFnwxrD_Y8gQ=="
org = "InfluxDB Hackathon"
host = "https://us-east-1-1.aws.cloud2.influxdata.com"

datetime.now(timezone.utc)


def get_influxdb_client():
    client = InfluxDBClient3(host=host, token=token, org=org)
    return client


import os
import time
from influxdb_client_3 import Point


import random

def generate_mock_cpu_utilization_data():
    hosts = ["Aditya-Laptop", "Dell-Server"]
    data = []

    for host in hosts:
        for _ in range(20):  # 3 data points per host
            load1 = round(random.uniform(10, 95), 2)
            load5 = round(load1 - random.uniform(0.5, 5), 2)
            load15 = round(load5 - random.uniform(0.5, 5), 2)

            data_point = {
                "host": host,
                "load1": min(max(load1, 0), 100),     # Clamp to 0–100%
                "load5": min(max(load5, 0), 100),
                "load15": min(max(load15, 0), 100)
            }
            data.append(data_point)

    return data


def write_system_load_data():
    bucket = "SystemCPU"
    client = get_influxdb_client()
    data = generate_mock_cpu_utilization_data()

    for i, entry in enumerate(data):
        point = (
            Point("system_cpu_utilization")
            .tag("host", entry["host"])
            .field("load1", entry["load1"])
            .field("load5", entry["load5"])
            .field("load15", entry["load15"])
        )
        try:
            client.write(database=bucket, record=point)
            print(f"Written point {i+1} for host {entry['host']}")
            time.sleep(1)
        except Exception as e:
            print(f"Failed to write point {i+1}: {e}")

    return "CPU Utilization Data Write Complete"

def write_system_load_data_sample():
    bucket = "SystemCPU"
    client = get_influxdb_client()

    # You can loop and capture actual values or use simulated entries
    data = [
        {"host": "Aditya-Laptop", "load1": 0.52, "load5": 0.48, "load15": 0.47},
        {"host": "Aditya-Laptop", "load1": 0.60, "load5": 0.55, "load15": 0.50},
        {"host": "Aditya-Laptop", "load1": 0.49, "load5": 0.50, "load15": 0.51},
        {"host": "Dell-Server", "load1": 0.80, "load5": 0.75, "load15": 0.70},
        {"host": "Dell-Server", "load1": 0.82, "load5": 0.79, "load15": 0.73},
        {"host": "Dell-Server", "load1": 0.78, "load5": 0.70, "load15": 0.68},
    ]

    for i, entry in enumerate(data):
        point = (
            Point("system_load")
            .tag("host", entry["host"])
            .field("load1", entry["load1"])
            .field("load5", entry["load5"])
            .field("load15", entry["load15"])
        )
        try:
            client.write(database=bucket, record=point)
            print(f"Written point {i+1} for host {entry['host']}")
            time.sleep(1)
        except Exception as e:
            print(f"Failed to write point {i+1}: {e}")

    return "System Load Data Write Complete"


def query_cpu_utilization_sql():
    database = "SystemCPU"  # Bucket name

    client = get_influxdb_client()

    client = InfluxDBClient3(host=host, token=token, org=org)

    query = """
    SELECT time, host, load1, load5, load15
    FROM "system_cpu_utilization"
    WHERE time >= now() - interval '24 hours'
    ORDER BY time ASC
    """

    df = client.query(query=query, language="sql", database=database)
    return df




def write_system_load_to_influxdb():
    host = "http://localhost:8181"
    token = "apiv3_WjoJ989Hy6NDrLIfv_vq1YPs03-gOyTS8igIwsFmpUAFFsj4xSb_mXlKGvd9d-5Rs0fbUvm1Fn6wFCglnx5frA"
    org = "my-org"           # Use any string (ignored in local mode)
    database = "localdb"     # You can use or create this name

    try:
        client = InfluxDBClient3(
            host=host,
            token=token,
            org=org,
            database=database
        )

        point = Point("system_load") \
            .tag("host", "aditya-laptop") \
            .field("load1", round(random.uniform(0.5, 1.5), 2)) \
            .field("load5", round(random.uniform(1.0, 2.5), 2)) \
            .time(datetime.now(timezone.utc))

        client.write(point)
        print("✅ Data written to InfluxDB 3 Enterprise!")

    except Exception as e:
        print(f"❌ Failed to write data: {e}")


def get_influxdata():
    client = InfluxDBClient3(
    host="http://localhost:8181",
    token="apiv3_WjoJ989Hy6NDrLIfv_vq1YPs03-gOyTS8igIwsFmpUAFFsj4xSb_mXlKGvd9d-5Rs0fbUvm1Fn6wFCglnx5frA",
    org="my-org",
    database="localdb"
    )

    result = client.query("SELECT * FROM cpu LIMIT 5")
    for row in result:
        print(row)



if __name__ == "__main__":
    # result = query_cpu_utilization_sql()
    # result = write_system_load_data()
    # result = query_cpu_utilization_sql()
    # write_system_load_to_influxdb()
    # print(result)
    get_influxdata()

