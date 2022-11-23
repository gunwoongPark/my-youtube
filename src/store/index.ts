import { combineReducers } from "redux";
import theme from "./reducers/theme";

const rootReducer = combineReducers({ theme });

export default rootReducer;
export type RootStateType = ReturnType<typeof rootReducer>;
