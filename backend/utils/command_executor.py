import subprocess
import shlex
import logging
import threading

logger = logging.getLogger(__name__)

def execute_command(command, timeout=30):
    try:
        tool = command.split()[0].lower()
        allowed_tools = ['ping', 'nslookup', 'dig', 'traceroute', 'whois']
        
        if tool not in allowed_tools:
            return f'Error: {tool} is not an allowed command.'
        
        # Modify ping command to limit the number of pings
        if tool == 'ping':
            command = f"ping -c 4 {' '.join(command.split()[1:])}"
        
        # Modify traceroute command to limit hops and set a timeout
        if tool == 'traceroute':
            command = f"{command} -m 15 -w 2"  # Max 15 hops, 2 second wait per hop
        
        logger.info(f"Executing command: {command}")
        args = shlex.split(command)
        
        process = subprocess.Popen(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        
        output = []
        error = []

        def read_output():
            for line in process.stdout:
                output.append(line)
            process.stdout.close()

        def read_error():
            for line in process.stderr:
                error.append(line)
            process.stderr.close()

        output_thread = threading.Thread(target=read_output)
        error_thread = threading.Thread(target=read_error)
        
        output_thread.start()
        error_thread.start()
        
        process.wait(timeout=timeout)
        
        output_thread.join(timeout=0.1)
        error_thread.join(timeout=0.1)
        
        if process.returncode == 0:
            result = ''.join(output)
            logger.info(f"Command result: {result[:100]}...")
            return result
        else:
            error_msg = ''.join(error)
            logger.error(f"Command error: {error_msg}")
            return f"Error: {error_msg}"
    
    except subprocess.TimeoutExpired:
        process.kill()
        logger.error("Command execution timed out")
        return "Error: Command execution timed out"
    except Exception as e:
        logger.error(f"Error executing command: {str(e)}")
        return f"Error: {str(e)}"
