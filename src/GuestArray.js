import { useState } from 'react';

export default function GuestArray(props) {
  // const [isGuestAttending, setIsGuestAttending] = useState(false);
  // props.setAttendance = isGuestAttending;
  return (
    <>
      {props.guests.map((guest) => {
        return (
          <div key={`guest-${guest.id}`}>
            <h3>
              {guest.name} {guest.last} {JSON.stringify(guest.isComing)}{' '}
              <div>
                {/* <input
                  type="checkbox"
                  checked={isGuestAttending}
                  onChange={(event) =>
                    setIsGuestAttending(event.currentTarget.checked)
                  }
                /> */}
              </div>
            </h3>
          </div>
        );
      })}
    </>
  );
}
