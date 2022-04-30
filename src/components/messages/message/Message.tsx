import React, {FC} from 'react';
import style from './Message.module.css'

import avatar from '../../../assets/images/avatar.svg'
import sendIcon from '../../../assets/icons/send.svg'
import hideMessageIcon from '../../../assets/icons/hideMessage.svg'
import parametersIcon from '../../../assets/icons/parameters.svg'
import {StarRating} from "../../../common/starRating/StarRating";
import {AttachmentsType} from "../../../api/messageApi";
import {formatDate} from "../../../utils/formatDate";

type MessageType = {
    author: string
    content: string
    channel: string
    date: string
    attachments?: AttachmentsType[]
    id: string
    isFavorites: boolean
    editFavorites?: (id:string, isFavorites: boolean)=>void
    isTurned:boolean
}

export const Message: FC<MessageType> = React.memo(({
                                                        author,
                                                        content,
                                                        date,
                                                        channel,
                                                        attachments,
                                                        id,
                                                        isFavorites,
                                                        editFavorites,
                                                        isTurned
                                                    }) => {

    // console.log('render message')
    return (
        <li className={isTurned ? style.lastItemUp : style.lastItemDown}>
            <div className={style.header}>
                <div className={style.profileData}>
                    <img className={style.avatar} src={avatar} alt="avatar"/>
                    <div className={style.profileName}>
                        <p style={{marginBottom:'5px'}}>{author}</p>
                    </div>
                </div>
                <div className={style.buttonsBlock}>
                    <div className={style.buttons}>
                        <button>Левый</button>
                        <button>Центр</button>
                        <button>Правый</button>
                    </div>
                    <div className={style.iconBlock}>
                        <img src={sendIcon} alt="send"/>
                        <img src={hideMessageIcon} alt="hide message"/>
                        <img src={parametersIcon} alt="parameters"/>
                        <StarRating editFavorites={editFavorites} id={id} isFavorites={isFavorites}/>
                    </div>
                </div>
            </div>
            <div className={style.message}>
                <span className={style.time}>{formatDate(date)}</span>
                <div className={style.text}>
                    <p className={style.content}>
                        {content}
                    </p>
                    {
                        attachments?.length &&
                        <>
                            {attachments[0].type === 'image' &&
                                <img width="750" height="500" src={attachments[0].url}/>}
                            {attachments[0].type === 'video' &&
                                <video width="750" height="500" controls >
                                    <source src={attachments[0].url} type="video/mp4"/>
                                </video>}
                        </>
                    }
                </div>
            </div>
            <p className={style.channel}>{channel}</p>
        </li>
    );
});
