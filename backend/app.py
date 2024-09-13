from flask import Flask, request, jsonify
from flask_cors import CORS
from redis import Redis
import os
import logging
import random
from utils.command_executor import execute_command
from utils.network_tools import get_ip_info, perform_port_scan, check_website_status
from utils.data_loader import load_quiz_questions, load_network_info

app = Flask(__name__)
CORS(app)

redis = Redis.from_url(os.environ.get("REDIS_URL", "redis://localhost:6379"))


logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@app.route('/api/execute', methods=['POST'])
def api_execute_command():
    data = request.json
    command = data['command']
    logger.info(f"Received command: {command}")
    output = execute_command(command)
    logger.info(f"Command output: {output}")
    return jsonify({'output': output})

@app.route('/api/quiz', methods=['GET'])
def get_quiz_question():
    questions = load_quiz_questions()
    logger.info(f"Loaded questions: {questions}")
    if questions is None or not questions:
        logger.error("Failed to load quiz questions or questions are empty")
        return jsonify({"error": "Failed to load quiz questions"}), 500
    selected_question = random.choice(questions)
    logger.info(f"Selected question: {selected_question}")
    return jsonify(selected_question)

@app.route('/api/network_info', methods=['GET'])
def get_network_info():
    info = load_network_info()
    if info is None:
        return jsonify({"error": "Failed to load network info"}), 500
    return jsonify(info)

@app.route('/api/ip_info', methods=['POST'])
def api_get_ip_info():
    data = request.json
    ip_address = data['ip_address']
    info = get_ip_info(ip_address)
    return jsonify(info)

@app.route('/api/port_scan', methods=['POST'])
def api_perform_port_scan():
    data = request.json
    target = data['target']
    result = perform_port_scan(target)
    return jsonify(result)

@app.route('/api/website_status', methods=['POST'])
def api_check_website_status():
    data = request.json
    url = data['url']
    status = check_website_status(url)
    return jsonify(status)

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


leaderboard = []

@app.route('/api/submit_score', methods=['POST'])
def submit_score():
    data = request.json
    score = data.get('score')
    # You might want to add a user identifier here in a real app
    redis.zadd('leaderboard', {f"Anonymous_{redis.incr('user_counter')}": score})
    return jsonify({"message": "Score submitted successfully"}), 200

@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    leaderboard = redis.zrevrange('leaderboard', 0, 9, withscores=True)
    return jsonify([{"name": name.decode(), "score": score} for name, score in leaderboard])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
