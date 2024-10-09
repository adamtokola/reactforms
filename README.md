# Block 27: React Form Notes

## SignUpForm Component Notes

```
export default function SignUpForm() {}
```

I was unsure what was being exported here, didnt fully grasp the concept of the `export` statement, but a bit of research never hurts. As i understand it, the `export default` statement is used to be made available in other files, or rather it specifies what will be exported from a 'module' so other files can import it. I thought the syntax meant that it would be exporting some 'data' directly, but thats not quite right. The `function SignUpForm()` in the module is being exported and can be 'imported' (made available to use or shared) in other files (or other parts of my code). So in order to 'export' my function, i would need to use the 'import' statement to make the `SignUpForm.jsx` component available in `App.jsx`

Task: Create three state variables for our form inputs: username, password, and error. Their default values should be "", "" and null, respectively.

To understand how to interpret the code here, i needed to research. The square brackets [] refer to a concept called 'array destructuring.' In JavaScript, it's used to extract values from an array and assign them to variables in a single line. 

```
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);
```

To fully grasp this, it's essential to understand useState.
- `useState` - a React Hook / "add state" to functional components

State is a way to store data that changes over time in a component, like user input, the current state of a form, or the status of a button (e.g., toggling on/off or enabled/disabled). When the state changes, the component re-renders to reflect the updated data.

When I use the `useState` hook, I provide it with an initial value (like `""` or `null`). React returns an array with two items: the current state value (e.g., `username`) and a function to update that value (e.g., `setUsername`). When we call the update function, React re-renders the component with the new state value.

In this workshop, I'm using a 'controlled component' for the form. Controlled components in React are input elements and the values of the elemenets are controlled by the component's state. So what does this mean exactly? This means that the input field's value is always determined by the state. Initially, the form is set to be empty (`""`) or `null` until data is provided and the state is updated (the workshop asks us to set it to empty and null   initially - so we pretty much have a blank form until some data is provided and the state is updated). Any changes to the input fields automatically update the state using the update function, giving us full control over the input behavior.

So technically speaking:
- `username` and `password` are the state variables.
- `setUsername` and `setPassword` are the functions used to update these values when typing into the input fields.

async - Referring back to block 21, the 'async' keyword is used to define a function that works with asynchronous code. Creating a function with 'async' means that the function can perform tasks that take time (e.g., fetching data) without blocking the rest of my code. 

Within an async function, I can use the 'await' keyword to wait for the result of a task before moving on to the next line of code. For example:
const data = await response.json()

Next, we're using 'event' (which is an object) to identify what happened. When the user clicks the "Submit" button, the 'onsubmit' event is triggered, and when it's triggered, it's handled by the handleSubmit() function.

When we first learned about React fragments, i was confused for a while. The whole idea behind adding html in javascript through me for a loop which led to analys paralysis and tutorial hell. But after some practice, I've made piece with it.

react fragment [ <> ] 
- allows the grouping of child elements without adding an extra node to the DOM; 
- returns multiple elements without wrapping them in a parent container 
- keeps the HTML structure clean. 

So if i were to use someting like a <div> here, this would mean i added an extra node to the dom which isn't necessary
```
return (
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
```

## Authenticate Component Notes

In this component, I'm tasked with passing the token I received from `SignUpForm` and share it with `Authenticate`.

I needed to recap tokens and their behaviors. What I understand about them is that its kind of like a "temporary key" that the server gives me when I log in or sign up somewhere. Web apps may use it to keep me logged into their sites.

I can think of this as my highschool teacher (webapp) giving me a hall pass (token). If i see my principal (server) while walking throughout the hallway, he'll identify the hallpass as proof that my teacher has authorized me to access certain areas of the school [data or features].

Committing that to memory helped me understand how to navigate the ask: "share token between the compnonents".

- SignUpForm component: after signing up successfully, receive a token and store it
- Authenticate component: use token to make authorized requests

The other thing i needed to consider here is where to share the token/information and WHY. The concept to understand and research was knowing that React components ONLY pass data downwards (parent to child). the `App.jsx` file is the parent component that will manage the shared state and the send, pass, distribute (cant find the right word) to its children `SignUpForm.jsx` and `Authenticate.jsx`.

## App.jsx

I've been practicing how to interpret code to form some muscle memory and conditioning. Heres how I understand it:

- we're storing the `token`
- we created a function called `setToken` which updates the token when I receive a new one from the API
- then we pass `setToken` as a prop to `SignUpForm` - saves the token to the state
- and finally we pass token as a prop to `Authenticate`

```
  return (
    <>
      <SignUpForm setToken={setToken} />
      <Authenticate token={token} />
    </>
  );
```

## Authenticate.jsx
I had to go back and revisit block 25 and review the material on props. I guess to summarize, props (properties) are a way to pass data from one component to another; parent component will have the ability to send info to child components. To simplify this concept, i needed another analogy. Ill stick with the school theme:

My mom would send me off to school with a lunch box. I never decided what was in it, i just took what was provided to me. So in the case of props:

- Mom = Parent = `App.jsx`
- Child = `Authenticate.jsx`
- Lunchbox = Props
- Food in lunchbox = Data

Breaking this down more technically:
`Authenticate token={token}`

- the `Authenticate.jsx` component gets the token data from `App.jsx`
- the token prop holds the value of the token received after sign up

Trying to understand the concept of destructuring was a struggle. I think its because I was more focused on remembering the syntax, figuring out where and when to place it in the code, how to write it out and when to use it. I overshot my thought process. Again, i just had to keep my understanding of simple. Destructurin is just unpacking values from objects or arrays and putting them into variables. When on vacation, I'd unpack a suitcase, and takeout the items I need. Imaging carrying a suitcase everywhere you went while on vacation. Not efficient or fun. i just need direct access to my stuff (data) quickly so i wont have to keep digging into my suitcase trying to find what i need. The concept of destructuring is similar in the sense that we specify the values we want directly. in return we get clean code and get to have more fun on vacation.

With that being said, we're extracting the {token} prop from the props the parent component passed to `Authenticate.jsx`
`export default function Authenticate({ token })`

And of course, to conclude these notes and this workshop, we receive an error. A developer's dream.

![React Forms](./imgs/REACTFORMS.gif)
