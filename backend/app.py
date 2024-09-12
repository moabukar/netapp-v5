from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import shlex
import logging
import platform
import random

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)

def run_command(command):
    try:
        use_shell = platform.system() == "Windows"
        
        if use_shell:
            output = subprocess.check_output(command, shell=True, universal_newlines=True, stderr=subprocess.STDOUT, timeout=30)
        else:
            args = shlex.split(command)
            output = subprocess.check_output(args, universal_newlines=True, stderr=subprocess.STDOUT, timeout=30)
        
        return output.strip()
    except subprocess.CalledProcessError as e:
        return f"Error: {e.output.strip()}"
    except subprocess.TimeoutExpired:
        return "Error: Command execution timed out"
    except Exception as e:
        return f"Error: {str(e)}"

@app.route('/api/execute', methods=['POST'])
def execute_command():
    data = request.json
    command = data['command']
    tool = command.split()[0].lower()
    
    allowed_tools = ['ping', 'nslookup', 'dig', 'traceroute']
    
    if tool not in allowed_tools:
        return jsonify({'output': f'Error: {tool} is not an allowed command.'})
    
    if tool == 'ping':
        command = f"ping -c 4 {' '.join(command.split()[1:])}" if platform.system() != "Windows" else f"ping -n 4 {' '.join(command.split()[1:])}"
    elif tool == 'traceroute' and platform.system() == "Windows":
        command = f"tracert {' '.join(command.split()[1:])}"
    
    app.logger.info(f"Executing command: {command}")
    output = run_command(command)
    app.logger.info(f"Command execution result: {output[:100]}...")
    
    return jsonify({'output': output})

quiz_questions = [
    {
        "question": "What does IP stand for?",
        "options": ["Internet Protocol", "Internal Process", "Integrated Platform", "Information Provider"],
        "correct_answer": "Internet Protocol"
    },
    {
        "question": "Which layer of the OSI model does the IP protocol operate on?",
        "options": ["Physical", "Data Link", "Network", "Transport"],
        "correct_answer": "Network"
    },
    {
        "question": "What is the purpose of DNS?",
        "options": ["To assign IP addresses", "To translate domain names to IP addresses", "To encrypt network traffic", "To route network packets"],
        "correct_answer": "To translate domain names to IP addresses"
    },
    {
        "question": "What is the default port for HTTP?",
        "options": ["80", "443", "8080", "21"],
        "correct_answer": "80"
    },
    {
        "question": "Which protocol is used for secure web browsing?",
        "options": ["HTTP", "FTP", "HTTPS", "SMTP"],
        "correct_answer": "HTTPS"
    }
]

@app.route('/api/quiz', methods=['GET'])
def get_quiz_question():
    question = random.choice(quiz_questions)
    return jsonify(question)

@app.route('/api/network_info', methods=['GET'])
def get_network_info():
    info = {
        "topics": [
            {
                "title": "OSI Model",
                "description": "The OSI (Open Systems Interconnection) model is a conceptual framework used to describe the functions of a networking system. It consists of seven layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application."
            },
            {
                "title": "IP Addressing",
                "description": "IP addressing is a fundamental concept in networking that involves assigning unique identifiers to devices on a network. IPv4 uses 32-bit addresses, while IPv6 uses 128-bit addresses to accommodate the growing number of devices on the internet."
            },
            {
                "title": "Subnetting",
                "description": "Subnetting is the practice of dividing a network into two or more networks. This helps in creating a more efficient and secure network structure by controlling network traffic and optimizing address allocation."
            },
            {
                "title": "DNS (Domain Name System)",
                "description": "DNS is a hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet or a private network. It translates human-readable domain names to IP addresses."
            }
        ]
    }
    return jsonify(info)

@app.route('/api/command_reference', methods=['GET'])
def get_command_reference():
    reference = {
        "ping": "Tests connectivity between two nodes by sending ICMP echo request packets to the target host and waiting for an ICMP echo reply.",
        "traceroute": "Displays the route and measures transit delays of packets across an IP network. It helps identify the path that data takes from source to destination.",
        "nslookup": "Query Internet name servers interactively. It's used to obtain domain name or IP address mapping, or other DNS records.",
        "dig": "DNS lookup utility. It performs DNS lookups and displays the answers that are returned from the queried name server(s).",
        "ifconfig": "Used to configure, or view the configuration of, a network interface. On newer systems, it's often replaced by the 'ip' command.",
        "netstat": "Displays network connections, routing tables, interface statistics, masquerade connections, and multicast memberships.",
        "arp": "Manipulates or displays the kernel's IPv4 network neighbour cache. It can add entries to the table, delete entries, or display current entries."
    }
    return jsonify(reference)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
