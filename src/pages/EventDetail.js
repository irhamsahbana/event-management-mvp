import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Stack, Button } from 'react-bootstrap';
import Wrapper from '../components/Wrapper';
import localforage from 'localforage';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  const handleReservation = (index, name, email, refferalCode) => {
    if (!name || !email) return; // Don't do anything if name or email is empty

    const updatedEvent = { ...event };
    const ticketType = updatedEvent.ticketTypes[index];
    let attendeeReferer;

    // Check if refferalCode is valid
    if (refferalCode) {
      attendeeReferer = updatedEvent.attendees.find((attendee) => attendee.referralCode === refferalCode);
    }

    if (attendeeReferer) {
      attendeeReferer.points += 10;

      // Update event in localforage
      // localforage.getItem('events').then((events) => {
      //   const updatedEvents = events.map((e) => (e.id === id ? updatedEvent : e));

      // })

      updatedEvent.attendees.push(attendeeReferer);

      // Update event in localforage
      localforage.getItem('events').then((events) => {
        const updatedEvents = events.map((e) => (e.id === id ? updatedEvent : e));

        localforage.setItem('events', updatedEvents).then(() => {
          console.log('Event updated with reservation.');
        });
      }).catch((err) => {
        console.log(err);
      });

      setEvent(updatedEvent);
    }

    // Update ticket quantity and add attendee's information
    if (ticketType.quantity > 0) {
      ticketType.quantity--;
      const ticket = ticketType.name;
      const attendee = { name, email, ticket, referralCode: nanoid(5), points: 0 };

      updatedEvent.attendees.push(attendee);

      // Update event in localforage
      localforage.getItem('events').then((events) => {
        const updatedEvents = events.map((e) => (e.id === id ? updatedEvent : e));

        localforage.setItem('events', updatedEvents).then(() => {
          console.log('Event updated with reservation.');
        });
      }).catch((err) => {
        console.log(err);
      });

      setEvent(updatedEvent);
    }
  };

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

                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={ticket.nameInput || ''}
                  onChange={(e) => {
                    const updatedEvent = { ...event };
                    updatedEvent.ticketTypes[index].nameInput = e.target.value;
                    setEvent(updatedEvent);
                  }}
                />
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={ticket.emailInput || ''}
                  onChange={(e) => {
                    const updatedEvent = { ...event };
                    updatedEvent.ticketTypes[index].emailInput = e.target.value;
                    setEvent(updatedEvent);
                  }}
                />
                {/* refferalCOde */}
                <Form.Control
                  type="text"
                  placeholder="Refferal Code"
                  value={ticket.refferalCode || ''}
                  onChange={(e) => {
                    const updatedEvent = { ...event };
                    updatedEvent.ticketTypes[index].refferalCode = e.target.value;
                    setEvent(updatedEvent);
                  }}
                />
                <Button
                  variant="primary"
                  onClick={() =>
                    handleReservation(index, ticket.nameInput, ticket.emailInput, ticket.refferalCode)
                  }
                >
                  Reserve
                </Button>
              </Stack>
            </div>
          ))}
        </Form.Group>
      </Form>
    </Wrapper>
  );
};

export default EventDetail;
