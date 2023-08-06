import Card from 'react-bootstrap/Card';

const EventDiscoveryItem = (props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.eventName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.date} at {props.time}</Card.Subtitle>
        <Card.Text>
          {props.description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
export default EventDiscoveryItem