import './index.scss';
import { useState } from 'react';
import styles from './App.module.scss';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`Submitted ${firstName} ${lastName} `);
  };
  const initialGuests = [{ name: '', last: '' }];
  return (
    <div className={styles.app}>
      <div className="Wrapper">
        <header className={styles.header}>
          <h1>Who's Coming?</h1>
        </header>
        <form className={styles.inputfields} onSubmit={handleSubmit}>
          <label>
            Vorname
            <input
              placeholder={'Vorname'}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </label>
          <label>
            Nachname
            <input
              placeholder={'Nachname'}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <div>{/* {firstName} {lastName} */}</div>
      </div>
    </div>
  );
}
