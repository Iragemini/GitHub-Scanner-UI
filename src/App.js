import { Container, Typography, Box } from '@mui/material';
import RepositoriesTable from './components/RepositoriesTable';

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          GitHub Scanner
        </Typography>
        <RepositoriesTable />
      </Box>
    </Container>
  );
}

export default App;
