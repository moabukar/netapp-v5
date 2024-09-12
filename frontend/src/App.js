import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper, Box, AppBar, Toolbar, IconButton, Menu, MenuItem, Tabs, Tab, Grid, Card, CardContent, Fade, Snackbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import CodeIcon from '@mui/icons-material/Code';
import QuizIcon from '@mui/icons-material/Quiz';
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';

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
    const response = await fetch('http://localhost:5000/api/quiz');
    const data = await response.json();
    setQuizQuestion(data);
  };

  const fetchNetworkInfo = async () => {
    const response = await fetch('http://localhost:5000/api/network_info');
    const data = await response.json();
    setNetworkInfo(data.topics);
  };

  const fetchCommandReference = async () => {
    const response = await fetch('http://localhost:5000/api/command_reference');
    const data = await response.json();
    setCommandReference(data);
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
      const response = await fetch('http://localhost:5000/api/execute', {
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
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Network Simulator Pro
          </Typography>
        </Toolbar>
      </AppBar>
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
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter command"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button type="submit" variant="contained" color="secondary" size="large">
                    Execute
                  </Button>
                </form>
                <Paper sx={{ p: 3, mt: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="h6" gutterBottom>
                    Output:
                  </Typography>
                  <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'monospace' }}>
                    {output}
                  </pre>
                </Paper>
              </div>
            </Fade>
            <Fade in={tabValue === 1}>
              <div hidden={tabValue !== 1}>
                {quizQuestion && (
                  <Card sx={{ p: 3, mt: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>{quizQuestion.question}</Typography>
                      <Grid container spacing={2} sx={{ mt: 2 }}>
                        {quizQuestion.options.map((option, index) => (
                          <Grid item xs={12} sm={6} key={index}>
                            <Button
                              fullWidth
                              variant="outlined"
                              onClick={() => {
                                if (option === quizQuestion.correct_answer) {
                                  showSnackbar('Correct! Well done!');
                                } else {
                                  showSnackbar('Incorrect. Try again!');
                                }
                                fetchQuizQuestion();
                              }}
                            >
                              {option}
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                )}
              </div>
            </Fade>
            <Fade in={tabValue === 2}>
              <div hidden={tabValue !== 2}>
                <Grid container spacing={3}>
                  {networkInfo.map((topic, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Card sx={{ height: '100%' }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>{topic.title}</Typography>
                          <Typography variant="body2">{topic.description}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Fade>
            <Fade in={tabValue === 3}>
              <div hidden={tabValue !== 3}>
                <Grid container spacing={3}>
                  {Object.entries(commandReference).map(([command, description], index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Card sx={{ height: '100%' }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>{command}</Typography>
                          <Typography variant="body2">{description}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
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
