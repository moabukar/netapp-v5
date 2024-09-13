import subprocess
import shlex
import logging

logger = logging.getLogger(__name__)

def execute_command(command):
    try:
        tool = command.split()[0].lower()
        allowed_tools = ['ping', 'nslookup', 'dig', 'traceroute', 'whois']
        
        if tool not in allowed_tools:
            return f'Error: {tool} is not an allowed command.'
        
        # Modify ping command to limit the number of pings
        if tool == 'ping':
            command = f"ping -c 4 {' '.join(command.split()[1:])}"
        
        logger.info(f"Executing command: {command}")
        args = shlex.split(command)
        result = subprocess.run(args, capture_output=True, text=True, timeout=30)
        logger.info(f"Command result: {result.stdout[:100]}...")
        return result.stdout if result.returncode == 0 else f"Error: {result.stderr}"
    except subprocess.TimeoutExpired:
        return "Error: Command execution timed out"
    except Exception as e:
        logger.error(f"Error executing command: {str(e)}")
        return f"Error: {str(e)}"
