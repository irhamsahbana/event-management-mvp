import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Form, Row, Col } from 'react-bootstrap';
import localforage from 'localforage';

import EventDiscoveryItem from '../components/EventDiscoveryItem';
import Wrapper from '../components/Wrapper';
import linkStyle from '../utils/LinkStyle';

const EventDiscovery = () => {
  const [events, setEvents] = useState([]);
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    localforage.getItem('events').then((events) => {
      if (events === null) events = [];
      setEvents(events);
    }).catch((err) => {
      console.log(err);
    });

    localforage.getItem('categories').then((categories) => {
      if (categories === null) categories = [];
      setCategories(categories);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <Wrapper>
      <h1>Event Discovery</h1>

      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="category">
              <Form.Label>Filter by Category</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="location">
              <Form.Label>Filter by Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Stack direction="horizontal" gap={3} className='mt-3'>
        {events
          .filter(event =>
            event.location.toLowerCase().includes(locationSearch.toLowerCase())
          ) // Filter events by location (case-insensitive)
          .filter(event => {
            if (selectedCategory === '') return true;
            return event.category.id === selectedCategory;
          })
          .map((event, index) => (
            <Link to={`/event/${event.id}`} key={index} style={linkStyle}>
              <EventDiscoveryItem
                eventName={event.eventName}
                date={event.date}
                time={event.time}
                description={event.description}
              />
            </Link>
          ))}
      </Stack>
    </Wrapper>
  );
};

export default EventDiscovery;
