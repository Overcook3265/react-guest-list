// import { useState } from 'react';

// export default function GuestArray(props) {
//   const [isGuestAttending, setIsGuestAttending] = useState(false);
// }
// return (
//   <>
//     {props.guests.map((guest) => {
//       return (
//         <div key={`guest-${guest.id}`}>
//           <input
//             type="checkbox"
//             // 2. Connect the state variable to the form fields
//             checked={isGuestAttending}
//             // 3. Update the values of the state variables based on user input
//             onChange={(event) =>
//               setIsGuestAttending(event.currentTarget.checked)
//             }
//           />
//         </div>
//       );
//     })}
//   </>
// );
