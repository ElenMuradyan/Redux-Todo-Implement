import { createStore } from "../../node_modules";
import { reducers } from "../reducer/rootReducer";

export const store = createStore(reducers);