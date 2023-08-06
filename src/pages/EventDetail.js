import { Row, Col } from "react-bootstrap"
import Wrapper from "../utils/Wrapper"
import { useParams } from "react-router-dom"
import localforage from "localforage"
import { useState } from "react"


const EventDetail = () => {

  const { id } = useParams()
  let [event, setEvent] = useState({})

  localforage.getItem('events').then((events) => {
    if (events === null) events = [];
    const event = events.find((event) => event.id === id);

    setEvent(event);
  }).catch((err) => {
    console.log(err);
  });

  return (
    <Wrapper>
      <h1>Event Detail</h1>

      <Row>
        <Col md={4}>
          <h4>Event Name</h4>
          <p>{event.eventName}</p>

          <h4>Date</h4>
          <p>{event.date}</p>

          <h4>Time</h4>
          <p>{event.time}</p>

          <h4>Location</h4>
          <p>{event.location}</p>

          <h4>Description</h4>
          <p>{event.description}</p>

          <h4>Ticket Types</h4>
          {event.ticketTypes?.map((ticketType, index) => (
            <div key={index}>
              <h5>{ticketType.name}</h5>
              <p>Price: {ticketType.price}</p>
              <p>Quantity: {ticketType.quantity}</p>
            </div>
          ))}
        </Col>
      </Row>
    </Wrapper>
  )
}
export default EventDetail