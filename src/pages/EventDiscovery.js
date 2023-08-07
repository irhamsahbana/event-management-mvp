import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import localforage from 'localforage';

import EventDiscoveryItem from '../components/EventDiscoveryItem';
import Wrapper from '../components/Wrapper';
import linkStyle from '../utils/LinkStyle';

const EventDiscovery = () => {
  const [events, setEvents] = useState([]);
  const [locationSearch, setLocationSearch] = useState('');

  localforage.getItem('events').then((events) => {
    if (events === null) events = [];
    setEvents(events);
  }).catch((err) => {
    console.log(err);
  });

  return (
    <Wrapper>
      <h1>Event Discovery</h1>

      <input
        type="text"
        placeholder="Search by location"
        value={locationSearch}
        onChange={(e) => setLocationSearch(e.target.value)}
      />

      <Stack direction="horizontal" gap={3} className='mt-3'>
        {events
          .filter(event =>
            event.location.toLowerCase().includes(locationSearch.toLowerCase())
          ) // Filter events by location (case-insensitive)
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
