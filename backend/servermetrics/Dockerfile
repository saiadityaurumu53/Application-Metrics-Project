FROM python:3.10

WORKDIR /app
COPY . .

RUN pip install influxdb3-python pyarrow pandas

CMD ["python", "InfluxDBClient.py"]