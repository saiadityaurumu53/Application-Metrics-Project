import random
from datetime import datetime, timedelta
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from servermetrics.InfluxDBClient import write_system_load_data, query_cpu_utilization_sql
from servermetrics.generateAISummary import generate_ai_summary_groq
from influxdb_client_3 import InfluxDBClient3

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_system_metrics(request):
    # Generate 30 days of random load data
    start_date = datetime.today()
    data = []
    for i in range(30):
        date = (start_date - timedelta(days=i)).strftime("%Y-%m-%d")
        load1 = round(random.uniform(0.5, 5.0), 2)
        load5 = round(random.uniform(1.0, 6.0), 2)
        data.append({"date": date, "load1": load1, "load5": load5})

    # Reverse to have chronological order
    data.reverse()
    note = generate_ai_summary_groq(data)

    return Response({
        "message": f"📊 Hello {request.user.username}, here is your live load data.",
        "authenticated": True,
        "user": {
            "username": request.user.username,
            "email": request.user.email,
            "is_staff": request.user.is_staff,
        },
        "data": data,
        "note": note
    })





@api_view(["GET"])
@permission_classes([IsAuthenticated])
def write_systemmetrics_influx_data_view(request):
    result = write_system_load_data()
    return Response({"message": result})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_cpu_metrics_sql(request):
    df = query_cpu_utilization_sql()
    data = df.to_dict(orient="records")
    return Response(data)



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def load_internal_system(request):
    client = InfluxDBClient3(
        host="http://localhost:8181",
        token="apiv3_WjoJ989Hy6NDrLIfv_vq1YPs03-gOyTS8igIwsFmpUAFFsj4xSb_mXlKGvd9d-5Rs0fbUvm1Fn6wFCglnx5frA",
        org="my-org",
        database="localdb"
    )

    query = "SELECT time, usage_user, usage_system FROM cpu WHERE cpu = 'cpu-total' LIMIT 20"
    result = client.query(query)
    usage_user = result["usage_user"].to_pylist()
    usage_system = result["usage_system"].to_pylist()
    times = result["time"].to_pylist()

    data = []
    for u1, u5, t in zip(usage_user, usage_system, times):
        data.append({
            "load1": round(u1 or 0, 2),
            "load5": round(u5 or 0, 2),
            "time": t.isoformat() if isinstance(t, datetime) else t,
        })
    # for row in results:
    #     row["time"] = row["time"].isoformat() if isinstance(row["time"], datetime) else row["time"]
    print(data)
    note = generate_ai_summary_groq(data)

    return Response({
        "metrics": data,
        "note": note
    })
