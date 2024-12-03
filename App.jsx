
import './App.css'
import Test from './Test';

function App() {

  // let age = 20;
  // let name = 'Vusal';
  let users = [
    {id:1, name: "Vusal", age: 22 },
    {id:2, name: "Xaliq", age: 18 },
    {id:3, name: "Sadiq", age: 21 },
    {id:4, name: "Elshan", age: 23 },
  ];
  return (
    <>
      {/* <p style={{color: "blue"}}>name: {name}</p>
      <p style={{fontSize: "30px"}}>age: {age}</p> */}
      <ul>
        {
          users.map((user) => {
            return (
              <li key={user.id}>
                name: {user.name} - age: {user.age}
              </li>
            );
          })
        }
      </ul>
    <Test/>
    </>
  );
}

export default App;
