import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Stack } from 'react-bootstrap';
import localforage from 'localforage';
import Wrapper from '../components/Wrapper';
import { getUser } from '../utils/auth';
import { Route } from 'react-router-dom';

const EventCreation = () => {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [ticketTypes, setTicketTypes] = useState([
    { name: '', price: '', quantity: '' },
  ]);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    async function fetchData() {
      const user = await getUser();
      if (!user || user.role !== 'admin') {
        Route.navigate('/');
      }

      setUser(user);

      try {
        const categories = await localforage.getItem('categories');
        if (categories) {
          setCategories(categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // user without password
    const u = {
      id: user.id,
      email: user.email,
      name: user.name,
    }

    const category = categories.find((category) => category.id === selectedCategory);

    const event = {
      id: crypto.randomUUID(),
      category,
      eventName,
      date,
      time,
      location,
      description,
      ticketTypes,
      createdBy: u,
    }

    localforage.getItem('events').then((events) => {
      if (events === null) events = [];
      events.push(event);

      localforage.setItem('events', events).then(() => {
        console.log('Event saved!');
      });
    }).catch((err) => {
      console.log(err);
    });

    setEventName('');
    setDate('');
    setTime('');
    setLocation('');
    setDescription('');
    setTicketTypes([{ name: '', price: '', quantity: '' }]);
    setSelectedCategory('');
  };

  const handleTicketTypeChange = (index, field, value) => {
    const updatedTicketTypes = [...ticketTypes];
    updatedTicketTypes[index][field] = value;
    setTicketTypes(updatedTicketTypes);
  };

  const addTicketType = () => {
    setTicketTypes([...ticketTypes, { name: '', price: '', quantity: '' }]);
  };

  return (
    <Wrapper>
      <h1>Event Creation</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Col sm={6}>
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </Col>
          <Col sm={6}>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={6}>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Col>
          <Col sm={6}>
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter event description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="ticketTypes">
          <Form.Label>Ticket Types</Form.Label>
          {ticketTypes.map((ticket, index) => (
            <div key={index}>
              <Stack gap={3} direction="horizontal">
                <Form.Control
                  type="text"
                  placeholder="Enter ticket type"
                  value={ticket.name}
                  onChange={(e) =>
                    handleTicketTypeChange(index, 'name', e.target.value)
                  }
                />
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={ticket.price}
                  onChange={(e) =>
                    handleTicketTypeChange(index, 'price', e.target.value)
                  }
                />
                <Form.Control
                  type="number"
                  placeholder="Enter quantity"
                  value={ticket.quantity}
                  onChange={(e) =>
                    handleTicketTypeChange(index, 'quantity', e.target.value)
                  }
                />
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() =>
                    setTicketTypes(ticketTypes.filter((_, i) => i !== index))
                  }
                >
                  Remove
                </Button>
              </Stack>
            </div>
          ))}

          <Row className='mt-3'>
            <Col xs={12}>
              <Button variant="outline-primary" size="sm" onClick={addTicketType}>
                Add Ticket Type
              </Button>
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-3'>
          Create Event
        </Button>
      </Form>
    </Wrapper>
  );
};

export default EventCreation;
