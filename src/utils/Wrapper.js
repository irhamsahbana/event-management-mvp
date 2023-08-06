import Container from "react-bootstrap/Container"
import Navbar from "../components/Navbar"

const Wrapper = (props) => {
  return (
    <>
      <Navbar/>
      <Container className="mt-4">
        {props.children}
      </Container>
    </>
  )
}
export default Wrapper