import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Stack } from 'react-bootstrap';
import Wrapper from '../components/Wrapper';
import localforage from 'localforage';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    localforage.getItem('events').then((events) => {
      if (events === null) events = [];
      const foundEvent = events.find((event) => event.id === id);

      setEvent(foundEvent);
    }).catch((err) => {
      console.log(err);
    });
  }, [id]);

  return (
    <Wrapper>
      <h1>Event Detail</h1>

      <Form>
        <Form.Group as={Row}>
          <Col md={6}>
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              value={event.eventName}
              readOnly
            />
          </Col>
          <Col md={6}>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={event.category?.name}
              readOnly
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col md={6}>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              value={event.date}
              readOnly
            />
          </Col>
          <Col md={6}>
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="text"
              value={event.time}
              readOnly
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            value={event.location}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={event.description}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="ticketTypes">
          <Form.Label>Ticket Types</Form.Label>
          {event.ticketTypes?.map((ticket, index) => (
            <div key={index}>
              <Stack gap={3} direction="horizontal">
                <Form.Control
                  type="text"
                  placeholder="Ticket type"
                  value={ticket.name}
                />
                <Form.Control
                  type="text"
                  placeholder="Price"
                  value={`$${ticket.price}`}
                />
                <Form.Control
                  type="text"
                  placeholder="Quantity"
                  value={`${ticket.quantity} ticket left`}
                />
              </Stack>
            </div>
          ))}
        </Form.Group>
      </Form>
    </Wrapper>
  );
};

export default EventDetail;
