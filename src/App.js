import './index.scss';
import { useState } from 'react';
import styles from './App.module.scss';

// import CheckBox from './CheckBox';
// import GuestArray from './GuestArray';

const initialGuests = [{ name: '', last: '', id: 0, isComing: false }];
export default function App() {
  const [isGuestComing, setIsGuestComing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState(initialGuests);
  // const [attendance, setAttendance] = useState(false);
  const handleSubmit = () => {
    const newGuestId = guests[guests.length - 1].id + 1;
    const newGuest = {
      name: firstName,
      last: lastName,
      id: newGuestId,
      isComing: isGuestComing,
    };
    setGuests([...guests, newGuest]);
    // IDEA:maybe put button into component, pass down props of array to specify which one it deletes. Insert button into array?
    // IDEA: make a component out of checkbox too. LINE 18 as prop!
    // this code prevents the website from refreshing
    // event.preventDefault();
    // reset input fields

    console.log(guests);
  };
  return (
    <div className={styles.app}>
      <div className="Wrapper">
        <header className={styles.header}>
          <h1>Who's Coming?</h1>
        </header>
        <form
          className={styles.inputFields}
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
            setFirstName('');
            setLastName('');
          }}
        >
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
          <label>
            <input
              type="checkbox"
              // 2. Connect the state variable to the form fields
              checked={isGuestComing}
              // 3. Update the values of the state variables based on user input
              onChange={(event) =>
                setIsGuestComing(event.currentTarget.checked)
              }
            />
            Actually showing up
          </label>
        </form>
        <div>
          {guests.map((guest) => {
            return (
              <div key={`guest-${guest.id}`}>
                <h3>
                  {guest.name} {guest.last} {JSON.stringify(guest.isComing)}
                </h3>
                <label>
                  <input
                    type="checkbox"
                    checked={guest.isComing}
                    onChange={() => {
                      const updatedGuests = guests.map((g) =>
                        g.id === guest.id ? { ...g, isComing: !g.isComing } : g,
                      );

                      setGuests(updatedGuests);
                    }}
                  />
                  Actually showing up
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
