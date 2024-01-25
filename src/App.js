import './index.scss';
import { useState } from 'react';
import styles from './App.module.scss';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const initialGuests = [{ name: '', last: '' }];
  const handleSubmit = (event) => {
    // this code prevents the website from refreshing
    event.preventDefault();
    event.target.reset();

    console.log(`Submitted ${firstName} ${lastName} `);
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
        <div>{/* {firstName} {lastName} */}</div>
      </div>
    </div>
  );
}
