import React, { useState, useEffect } from 'react';
import { Container, Box, Menu, MenuItem, Tabs, Tab, Fade, Snackbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CodeIcon from '@mui/icons-material/Code';
import QuizIcon from '@mui/icons-material/Quiz';
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import Header from './components/Header';
import Simulator from './components/Simulator';
import Quiz from './components/Quiz';
import NetworkInfo from './components/NetworkInfo';
import CommandReference from './components/CommandReference';

const API_URL = 'http://localhost:5000';

const darkBlueTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#0d47a1',
    },
    background: {
      default: '#0a1929',
      paper: '#102a43',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e2a3a',
          borderRadius: 16,
          padding: '24px',
          marginTop: '24px',
        },
      },
    },
  },
});

const tools = [
  { name: 'Ping', command: 'ping', icon: '🔔' },
  { name: 'NSLookup', command: 'nslookup', icon: '🔍' },
  { name: 'Dig', command: 'dig', icon: '⛏️' },
  { name: 'Traceroute', command: 'traceroute', icon: '🛤️' },
];

function App() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [networkInfo, setNetworkInfo] = useState([]);
  const [commandReference, setCommandReference] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchQuizQuestion();
    fetchNetworkInfo();
    fetchCommandReference();
  }, []);

  const fetchQuizQuestion = async () => {
    try {
      const response = await fetch(`${API_URL}/api/quiz`);
      const data = await response.json();
      setQuizQuestion(data);
    } catch (error) {
      console.error('Error fetching quiz question:', error);
    }
  };

  const fetchNetworkInfo = async () => {
    try {
      const response = await fetch(`${API_URL}/api/network_info`);
      const data = await response.json();
      setNetworkInfo(data.topics);
    } catch (error) {
      console.error('Error fetching network info:', error);
    }
  };

  const fetchCommandReference = async () => {
    try {
      const response = await fetch(`${API_URL}/api/command_reference`);
      const data = await response.json();
      setCommandReference(data);
    } catch (error) {
      console.error('Error fetching command reference:', error);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToolSelect = (tool) => {
    setCommand(tool.command + ' ');
    handleMenuClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOutput('Executing command...');
    try {
      const response = await fetch(`${API_URL}/api/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      setOutput(`Error: Unable to execute command. Details: ${error.message}`);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={darkBlueTheme}>
      <CssBaseline />
      <Header handleMenuClick={handleMenuClick} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {tools.map((tool) => (
          <MenuItem key={tool.name} onClick={() => handleToolSelect(tool)}>
            <span style={{ marginRight: '8px' }}>{tool.icon}</span>
            {tool.name}
          </MenuItem>
        ))}
      </Menu>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered variant="fullWidth">
            <Tab icon={<CodeIcon />} label="Simulator" />
            <Tab icon={<QuizIcon />} label="Quiz" />
            <Tab icon={<InfoIcon />} label="Network Info" />
            <Tab icon={<MenuBookIcon />} label="Command Reference" />
          </Tabs>
          <Box sx={{ mt: 4 }}>
            <Fade in={tabValue === 0}>
              <div hidden={tabValue !== 0}>
                <Simulator
                  command={command}
                  setCommand={setCommand}
                  handleSubmit={handleSubmit}
                  output={output}
                />
              </div>
            </Fade>
            <Fade in={tabValue === 1}>
              <div hidden={tabValue !== 1}>
                <Quiz
                  quizQuestion={quizQuestion}
                  showSnackbar={showSnackbar}
                  fetchQuizQuestion={fetchQuizQuestion}
                />
              </div>
            </Fade>
            <Fade in={tabValue === 2}>
              <div hidden={tabValue !== 2}>
                <NetworkInfo networkInfo={networkInfo} />
              </div>
            </Fade>
            <Fade in={tabValue === 3}>
              <div hidden={tabValue !== 3}>
                <CommandReference commandReference={commandReference} />
              </div>
            </Fade>
          </Box>
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </ThemeProvider>
  );
}

export default App;
