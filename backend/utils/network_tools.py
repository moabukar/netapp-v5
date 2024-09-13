import requests
import socket
import whois

def get_ip_info(ip_address):
    try:
        response = requests.get(f"https://ipapi.co/{ip_address}/json/")
        return response.json()
    except Exception as e:
        return {"error": str(e)}

def perform_port_scan(target, ports=range(1, 1025)):
    open_ports = []
    for port in ports:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((target, port))
        if result == 0:
            open_ports.append(port)
        sock.close()
    return {"open_ports": open_ports}

def check_website_status(url):
    try:
        response = requests.get(url)
        return {
            "status_code": response.status_code,
            "reason": response.reason,
            "headers": dict(response.headers)
        }
    except requests.RequestException as e:
        return {"error": str(e)}
