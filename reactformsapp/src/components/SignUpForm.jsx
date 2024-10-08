import { useState } from "react";

/*create a SignUpForm component, and ensure it is the default 
export. for now you can have it render a simple <h2> with a message 
saying , "SignUp".*/
/*
was unsure what was being exported here, but a bit of research
never hurts. As i understand it, the 'export default' statement is used to be made available in other files, or rather it specifies what will be exported from a 'module' so other fules can import it. I thought the syntax meant that it would be exporting some 'data' directly, but thats not quite right. The function in the module is being exported
and can be 'imported' (made available to use or shared) in other files (or other parts of my code). So in order to 'export' my function, i would need to use the 'import' statement to make the
SignUpForm component available in App.jsx 
*/
export default function SignUpForm() {
    /* create three state variables for our form inputs: username, 
    password, and error. Their default values should be "", "" and 
    null, respectively.
    */
    
    /* 
    needed to research line 17-19 to understand how to interpret 
    the code here.
    [] the square brackets refer to a concept called 'array 
     destructuring. is JS its used to extract values from an array 
     and assign them to variables in a single line. but to 
     understand this is to understand useState.
     
     useState - a React Hook / "add state" to functional components
     
     State - a way to store data that change over time in a 
     component (so things like user input, this form below/or the 
     current state of it, or a status of a button like toggling on 
     or off or enabled/disabled). when the state changes, the 
     component itself rerenders to reflect the updated data.
     when i use the useState hook, i provide it the initial value 
     - which as shown below, the value is set to 'empty'
     [ useState("") / useState(null) ]
     and react returns an array of two items so as shown below it 
     would be the current state of username and a fdunction to 
     update the state value.
     so when we call the function setUsername, React will rerender 
     the component with the new state value

     Now in this workshop, im using a 'controlled component' (the 
     submission form) 
     Controlled Components are input elements in React and the 
     values are controlled by the components state. so what does this mean? the value of the input field is always determined by the state (the workshop asks us to set it to empty and null initially - we basically have a blank form until some data is provided and the state is updated), any changes to the input update the state using the update function. full control over the input behavior.
     
     username and password - both are state variables
     setUsername and setPassword - both are functions used to updatethe values when the user types into the input fields of username and password   
    */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  /*
  async - going back to block 21 - a keyword used to define a 
  function that works iwth asynchonopus code
  creating a function with async, means the function can perform tasks that take time (ie, fetching data) all without blocking the rest of my code
  can use the await keyword within async to wait for the result of the performed task before continuing to another line of code. (written like const data = await response.json())

  aight so boom, lines 62 and 78. We using event (which is an object) to identify what happened. when the user clicks the "Submit" button,
  the "onsubmit" event is triggered and when its triggered, its handled by handleSubmit()
  */
  async function handleSubmit(event) {
    event.preventDefault(); /* stops whatever default action of an 
    event from happening. in this workshop preventDefault method 
    just stops the page from refreshing when the form is submitted.*/
    setError(null);
    try {

        const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  

        const data = await response.json();
  

        if (!response.ok) {
          throw new Error(data.message || "Signup failed.");
        }
  
        console.log(data); 
  
      } catch (error) {

        setError(error.message);
      }
    }

  return (
    /*
    react fragment [ <> ] - allows the grouping of child 
    elements without adding an extra node; returns multiple 
    elements withoput wrapping in a parent container - keepss the 
    HTML structure clean. so if i were to use someting like <div>  
    here, this would mean i added an extra node to the dom which 
    isnt necessary
    */

  <>
  <h2>Sign Up!</h2>
  <form onSubmit={handleSubmit}>
    <label>
      Username:
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </label>
    <label>
      Password:
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </label>
    <button type="submit">Submit</button>
  </form>
</>
);
}
