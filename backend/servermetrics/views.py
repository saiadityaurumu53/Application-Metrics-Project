import random
from datetime import datetime, timedelta
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from servermetrics.InfluxDBClient import write_system_load_data, query_cpu_utilization_sql

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

    return Response({
        "message": f"📊 Hello {request.user.username}, here is your live load data.",
        "authenticated": True,
        "user": {
            "username": request.user.username,
            "email": request.user.email,
            "is_staff": request.user.is_staff,
        },
        "data": data
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