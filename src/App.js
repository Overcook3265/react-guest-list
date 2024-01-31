import './index.scss';
import { useEffect, useState } from 'react';
import styles from './App.module.scss';

// const initialGuests = [{ name: '', last: '', id: 0, isComing: false }];
// Definition of variables
export default function App() {
  const [isNewGuestComing, setIsNewGuestComing] = useState(false);
  const [attending, setAttending] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // const [currentGuestId, setCurrentGuestId] = useState(0);
  // function defining how to add new guest to guest array.
  // Create ascending ID, create new object with input content inside.
  // set isComing to state variable so it can be changed
  const baseUrl =
    'https://036fb3d5-640c-4e3b-b297-df9c9b9d3029-00-2km9e7ak1boea.worf.replit.dev';

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
  //     isComing: attending,
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
    <div className={styles.app}>
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
            First name
            <input
              placeholder="Vorname"
              // set value to firstName to connect it to variable
              value={firstName}
              // change the variable when input field changes
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </label>
          <label>
            Last name
            <input
              placeholder="Nachname"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </label>
          <button>Submit</button>
          {/* <label>
            Connect attendance checkbox to guest object value
            <input
              type="checkbox"
              checked={attending}
              onChange={(event) => setAttending(event.currentTarget.checked)}
            />
            Actually attending
          </label> */}
        </form>
        <br />
        <div>
          {guests.map((guest) => {
            {
              /* // show guest array, set guest.id as identifier */
            }
            return (
              <div key={`guest-${guest.id}`} data-test-id="guest">
                {/* {guest.id !== 0 ? ( */}
                <h4>
                  {/* {JSON.stringify(guest.isComing)} */}
                  {guest.firstName} {guest.lastName}
                  {/* Show element if guest id is not 0 (empty initial object) */}
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        aria-label="attending"
                        checked={guest.attending}
                        // Implement change mechanism
                        onChange={async (event) => {
                          // create a new array, set it equal to guest. Map the guests array to check if the new array's id is identical to the guest id. If yes, spread array and set value of element to opposite

                          // setCurrentGuestId(guest.id);
                          setAttending(event.currentTarget.checked);
                          // setGuests(updatedGuests);
                          const response = await fetch(
                            `${baseUrl}/guests/${guest.id}`,
                            {
                              method: 'PUT',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({ attending: !attending }),
                            },
                          );
                          const updatedGuest = await response.json();
                          console.log(updatedGuest);

                          const updatedGuests = guests.map((g) =>
                            g.id === updatedGuest.id
                              ? { ...g, attending: !g.attending }
                              : g,
                          );
                          setGuests(updatedGuests);
                        }}
                      />
                      attending
                    </label>
                    <button
                      onClick={async () => {
                        // create new variable, use .filter method to fill it with all elements that are NOT the current id.
                        const updatedGuests = guests.filter(
                          (g) => g.id !== guest.id,
                        );
                        setGuests(updatedGuests);
                        console.log(guests);
                        await fetch(`${baseUrl}/guests/${guest.id}`, {
                          method: 'DELETE',
                        });
                        // const deletedGuest = await response.json();
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </h4>
                {/* ) : ( */}
                {/* '' */}
                {/* )} */}
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
