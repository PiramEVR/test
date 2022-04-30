import React, {FC, useEffect, useRef} from 'react'
import {MessagesResponseType} from "../../api/messageApi";

type ScrollType = {
    messages: MessagesResponseType[]
}

export const Scroll: FC<ScrollType> = ({messages}) => {

    const messagesEndRef = useRef<HTMLInputElement | null>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return  <div ref={messagesEndRef} />
}