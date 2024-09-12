FROM python:3.9-slim

# Install networking tools
RUN apt-get update && apt-get install -y iputils-ping dnsutils traceroute && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "app.py"]
