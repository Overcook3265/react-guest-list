import { useState } from 'react';

export default function GuestArray(props) {
  return (
    <>
      {props.guests.map((guest) => {
        return (
          <div key={`guest-${guest.id}`}>
            <h2>
              {guest.name} {guest.last}
            </h2>
          </div>
        );
      })}
    </>
  );
}
