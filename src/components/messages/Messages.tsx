import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Message} from "./message/Message";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {getNewMessagesTC, setFavoritesTC} from "../../state/message-reducer/message-reducer";
import style from './Messages.module.css'
import {Scroll} from "../../common/scroll/Scroll";
import {RiArrowUpDownFill} from "react-icons/ri";

export const Messages = () => {
    const [isTurned, setIsTurned] = useState(false)
    const messages = useAppSelector(state => state.messages.messages)
    const dispatch = useAppDispatch();
    const lastId = messages[messages.length - 1]?.id
        ? messages[messages.length - 1].id
        : '0'
    const editFavorites = useCallback((id: string, isFavorites: boolean) => {
        dispatch(setFavoritesTC(id, isFavorites))
    },[])

    useEffect(() => {
        let interval = setInterval(() => {
            dispatch(getNewMessagesTC(lastId))
        }, 5000)
        return () => clearInterval(interval)
    }, [lastId])


    const messageFeed = useMemo(() => {
        const showMessages = messages.map((m, i) => <Message key={i}
                                                             author={m.author}
                                                             content={m.content}
                                                             channel={m.channel}
                                                             date={m.date}
                                                             attachments={m.attachments}
                                                             id={m.id}
                                                             isTurned={isTurned}
                                                             editFavorites={editFavorites}
                                                             isFavorites={m.isFavorites}
        />)
        isTurned && showMessages.reverse()
        return showMessages
    }, [messages])
    return (
        <>
            <ul className={style.messages}>
                {messageFeed}
                {!isTurned && <Scroll messages={messages}/>}
            </ul>
            <button className={style.revers} onClick={() => setIsTurned(!isTurned)}>
                <RiArrowUpDownFill size={'2em'}/>
            </button>

        </>
    );
};

