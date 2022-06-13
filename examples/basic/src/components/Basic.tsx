import { createSignal } from "solid-js";

export const Basic = () => {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <h1>Count: {count()}</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase count</button>
    </>
  );
};
