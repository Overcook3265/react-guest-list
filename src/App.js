import './index.scss';
import { useState } from 'react';
import styles from './App.module.scss';
import GuestArray from './GuestArray';

const initialGuests = [{ name: '', last: '', id: 0 }];

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState(initialGuests);
  const handleSubmit = (event) => {
    const newGuestId = guests[guests.length - 1].id + 1;
    const newGuest = { name: firstName, last: lastName, id: newGuestId };
    setGuests([...guests, newGuest]);
    // initialGuests.name = firstName;
    // initialGuests.last = lastName;
    // initialGuests.id++;
    // console.log(`Submitted ${firstName} ${lastName} `);
    // this code prevents the website from refreshing
    event.preventDefault();
    // reset input fields
    event.target.reset();
    console.log(guests);
  };
  return (
    <div className={styles.app}>
      <div className="Wrapper">
        <header className={styles.header}>
          <h1>Who's Coming?</h1>
        </header>
        <form className={styles.inputFields} onSubmit={handleSubmit}>
          <label>
            Vorname
            <input
              placeholder="Vorname"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </label>
          <label>
            Nachname
            <input
              placeholder="Nachname"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </label>
          <button>Submit</button>
        </form>
        <div>
          <GuestArray firstName={firstName} lastName={lastName} />
        </div>
      </div>
    </div>
  );
}
