import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {MessageActionsType, messageReducer} from "./message-reducer/message-reducer";

const rootReducer = combineReducers({
    messages: messageReducer
});


export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppActionsType = MessageActionsType

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AppActionsType
    >;
export const useAppDispatch = () => {
    return useDispatch() as ThunkDispatch<AppRootStateType, unknown, AppActionsType>
}
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
// @ts-ignore
window.store = store;
