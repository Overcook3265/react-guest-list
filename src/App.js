import './index.scss';
import { useState } from 'react';
import styles from './App.module.scss';
// import CheckBox from './CheckBox';
import GuestArray from './GuestArray';

const initialGuests = [{ name: '', last: '', id: 0, isComing: false }];
export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState(initialGuests);
  const [attendance, setAttendance] = useState(false);
  const handleSubmit = (event) => {
    const newGuestId = guests[guests.length - 1].id + 1;
    const newGuest = {
      name: firstName,
      last: lastName,
      id: newGuestId,
      isComing: attendance,
    };
    setGuests([...guests, newGuest]);
    // IDEA:maybe put button into component, pass down props of array to specify which one it deletes. Insert button into array?
    // IDEA: make a component out of checkbox too. LINE 18 as prop!
    // this code prevents the website from refreshing
    event.preventDefault();
    // reset input fields
    setFirstName('');
    setLastName('');
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
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </label>
          <label>
            Nachname
            <input
              placeholder="Nachname"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </label>
          <button>Submit</button>
        </form>

        <div>
          <GuestArray
            guests={guests}
            setGuests={setGuests}
            attendance={attendance}
            setAttendance={setAttendance}
          />
        </div>
      </div>
    </div>
  );
}
