import './App.css';
import Table from './components/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
function App() {
  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">LRU Cache Visualizer</Navbar.Brand>
        </Container>
      </Navbar>
      <Table />
    </div>
  );
}

export default App;
