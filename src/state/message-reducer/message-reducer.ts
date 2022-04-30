import {messageApi, MessagesResponseType} from "../../api/messageApi";
import {AppThunk} from "../store";


const initialState = {
    messages: [] as MessagesResponseType[]
}

type InitialStateType = typeof initialState

export const messageReducer = (state: InitialStateType = initialState, action: MessageActionsType): InitialStateType => {
    switch (action.type) {
        case 'ADD_MESSAGES':
            return {...state, messages: [...state.messages, ...action.messages]}
        case 'SET_FAVORITES':
            return {
                ...state, messages: state.messages
                    .map(m => m.id === action.id ? {...m, isFavorites: action.isFavorites} : m)
            }
        default:
            return state
    }
}

//actions
const setMessages = (messages: MessagesResponseType[]) => {
    return {
        type: 'SET_MESSAGES',
        messages,
    } as const
}
const addMessages = (messages: MessagesResponseType[]) => {
    return {
        type: 'ADD_MESSAGES',
        messages,
    } as const
}
export const setFavorites = (id: string, isFavorites: boolean) => {
    return {
        type: 'SET_FAVORITES',
        id,
        isFavorites,
    } as const
}
export const getNewMessagesTC = (id: string): AppThunk => (dispatch) => {
    messageApi.getNewMessages(id)
        .then(response => response.json())
        .then(result => {
            dispatch(getFavoritesTC(result.Messages))
        })
        .catch(error => console.log('error', error))
}

export const setFavoritesTC = (id: string, isFavorites: boolean): AppThunk => (dispatch) => {
    const obj = {
        id,
        isFavorites
    }
    localStorage.setItem(id, JSON.stringify(obj))
    dispatch(setFavorites(id, isFavorites))
}

export const getFavoritesTC = (responseMessages: MessagesResponseType[]): AppThunk => (dispatch) => {
    const messages = responseMessages.map((m) => {
        let isFavorites = localStorage.getItem(m.id)
        if (isFavorites) {
            let parseStringToBoolean = JSON.parse(isFavorites);
            return {...m, isFavorites: parseStringToBoolean.isFavorites}
        } else {
            return {...m, isFavorites: false}
        }
    })
    dispatch(addMessages(messages))
}

export type MessageActionsType =
    | ReturnType<typeof addMessages>
    | ReturnType<typeof setFavorites>