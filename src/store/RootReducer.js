import { combineReducers } from "redux";
import { messagesReducer } from "./reducers/MessageReducer";

const rootReducer = combineReducers({
    messages: messagesReducer
});

export { rootReducer };
