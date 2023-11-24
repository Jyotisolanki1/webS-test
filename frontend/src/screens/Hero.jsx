import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <Card className='mt-3'>      
      <Card.Body>
        <Card.Title>User Authentication</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Link to ='/login'>
        <Button variant="primary" className='me-3'>SignIn</Button>
        </Link>
        <Link to='/register'>
        <Button variant="primary">SignUp</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Hero;