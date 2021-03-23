import { Container } from "reactstrap";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  function handleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <Container>
      <Button
        variant="secondary"
        size="lg"
        block
        onClick={() => handleClick("signup")}
      >
        Signup
      </Button>

      <Button
        variant="primary"
        size="lg"
        block
        onClick={() => handleClick("login")}
      >
        Login
      </Button>
    </Container>
  );
}
