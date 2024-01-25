import './index.scss';
import { useState } from 'react';
import styles from './App.module.scss';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const initialGuests = [{ name: '', family: '' }];
  return (
    <div className={styles.app}>
      <div className="Wrapper">
        <header className={styles.header}>
          <h1>Who's Coming?</h1>
        </header>
        <body>
          <section className={styles.inputfields}>
            <label>
              Vorname
              <input
                placeholder={'Vorname'}
                onChange={(event) => {
                  setFirstName(event.currentTarget.value);
                }}
              />
            </label>
            <label>
              Nachname
              <input
                placeholder={'Nachname'}
                onChange={(event) => {
                  setFamilyName(event.currentTarget.value);
                }}
              />
            </label>
          </section>
          <div>
            {firstName} {familyName}
          </div>
        </body>
      </div>
    </div>
  );
}
