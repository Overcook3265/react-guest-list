import './index.scss';
import styles from './App.module.scss';
import logo from './logo.svg';

export default function App() {
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
              <input value={'Vorname'} id="Vorname"></input>
            </label>
            <label>
              Nachname
              <input value={'Nachname'}></input>
            </label>
          </section>
        </body>
      </div>
    </div>
  );
}
