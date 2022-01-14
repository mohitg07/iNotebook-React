// Context lets us pass a value deep into the component tree without explicitly threading it through every component.
// It makes our task easy
import { createContext } from "react";

const noteContext = createContext();

export default noteContext;