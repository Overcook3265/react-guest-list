import './index.scss';
import { useEffect, useState } from 'react';
import styles from './App.module.scss';

const initialGuests = [{ name: '', last: '', id: 0, isComing: false }];
// Definition of variables
export default function App() {
  const [isGuestComing, setIsGuestComing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState(initialGuests);
  const [isLoading, setIsLoading] = useState(true);
  // function defining how to add new guest to guest array.
  // Create ascending ID, create new object with input content inside.
  // set isComing to state variable so it can be changed
  const baseUrl = 'http://localhost:4000';

  useEffect(() => {
    async function firstRenderFetch() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();

      // setUsers([data.results[0]]);

      setGuests(allGuests);
      setIsLoading(false);
    }

    firstRenderFetch().catch((error) => {
      console.log(error);
    });
  }, []);

  const saveGuest = async () => {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const createdGuest = await response.json();
    setGuests([...guests, createdGuest]);
    console.log(guests);
  };

  // const handleSubmit = () => {
  //   const newGuestId = guests[guests.length - 1].id + 1;
  //   const newGuest = {
  //     name: firstName,
  //     last: lastName,
  //     id: newGuestId,
  //     isComing: isGuestComing,
  //   };

  //   // IDEA:maybe put button into component, pass down props of array to specify which one it deletes. Insert button into array?
  //   // IDEA: make a component out of checkbox too. LINE 18 as prop!
  //   // this code prevents the website from refreshing
  //   // event.preventDefault();
  //   // reset input fields

  //   console.log(guests);
  // };

  // add JSX html structure
  if (isLoading) {
    return 'Loading...';
  }

  return (
    <div data-test-id="guest" className={styles.app}>
      <div className="Wrapper">
        <header className={styles.header}>
          <h1>Who's Coming?</h1>
        </header>
        <form
          className={styles.inputFields}
          // onSubmit: Reacts ot "Enter" button in form element
          onSubmit={(event) => {
            //preventDefault stops site from refreshing
            event.preventDefault();
            // handleSubmit();
            saveGuest();
            setFirstName('');
            setLastName('');
          }}
        >
          <label>
            Vorname
            <input
              placeholder="Vorname"
              // set value to firstName to connect it to variable
              value={firstName}
              // change the variable when input field chanes
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
            {/* Connect attendance checkbox to guest object value */}
            <input
              type="checkbox"
              checked={isGuestComing}
              onChange={(event) =>
                setIsGuestComing(event.currentTarget.checked)
              }
            />
            Actually showing up
          </label>
        </form>
        <br />
        <div>
          {guests.map((guest) => {
            {
              /* // show guest array, set guest.id as identifier */
            }
            return (
              <div key={`guest-${guest.id}`}>
                <h4>
                  {guest.firstName} {guest.lastName}
                  {/* {JSON.stringify(guest.isComing)} */}
                  {/* Show element if guest id is not 0 (empty initial object) */}
                  {guest.id !== 0 ? (
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          checked={guest.isComing}
                          // Implement change mechanism
                          onChange={async () => {
                            // create a new array, set it equal to guest. Map the guests array to check if the new array's id is identical to the guest id. If yes, spread array and set value of element to opposite
                            const updatedGuests = guests.map((g) =>
                              g.id === guest.id
                                ? { ...g, isComing: !g.isComing }
                                : g,
                            );

                            setGuests(updatedGuests);
                          }}
                        />
                        Attending
                      </label>
                      <button
                        onClick={async () => {
                          // create new variable, use .filter method to fill it with all elements that are NOT the current id.
                          const updatedGuests = guests.filter(
                            (g) => g.id !== guest.id,
                          );
                          setGuests(updatedGuests);
                          console.log(guests);
                          const response = await fetch(
                            `${baseUrl}/guests/${guest.id}`,
                            {
                              method: 'DELETE',
                            },
                          );
                          const deletedGuest = await response.json();
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                </h4>
              </div>
            );
          })}
        </div>
        {/* <button
          onClick={async () => {
            const response = await fetch(`${baseUrl}/guests`);
            const allGuests = await response.json();
            setGuests([...guests, allGuests]);
          }}
        >
          Load Guest List
        </button> */}
      </div>
    </div>
  );
}
