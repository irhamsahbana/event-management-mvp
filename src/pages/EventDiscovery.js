import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import localforage from 'localforage';

import EventDiscoveryItem from '../components/EventDiscoveryItem';
import Wrapper from '../utils/Wrapper';
import linkStyle from '../utils/LinkStyle';

const EventDiscovery = () => {
  const [events, setEvents] = useState([]);

  localforage.getItem('events').then((events) => {
    if (events === null) events = [];
    setEvents(events);
  }).catch((err) => {
    console.log(err);
  });

  return (
    <Wrapper>
      <h1>Event Discovery</h1>

      <Stack direction="horizontal" gap={3}>
        {events.map((event, index) => (
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
}
export default EventDiscovery