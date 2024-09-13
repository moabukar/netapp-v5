import json
import os
import logging

logger = logging.getLogger(__name__)

def load_json_file(filename):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, '..', 'config', filename)
    logger.info(f"Attempting to load file: {file_path}")
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            logger.info(f"Successfully loaded {filename}")
            return data
    except FileNotFoundError:
        logger.error(f"Error: File not found - {file_path}")
        return None
    except json.JSONDecodeError:
        logger.error(f"Error: Invalid JSON in file - {file_path}")
        return None

def load_quiz_questions():
    return load_json_file('quiz_questions.json')

def load_network_info():
    return load_json_file('network_info.json')
