import React, {FC, memo} from 'react';
import style from './StarRating.module.css'
import {FaStar} from 'react-icons/fa'

type PropsType = {
    editFavorites?: (id: string, isFavorites: boolean) => void
    id: string
    isFavorites: boolean
}

export const StarRating: FC<PropsType> = memo(({editFavorites, id, isFavorites}) => {

    return (
        <label>
            <input
                type={"checkbox"}
                checked={isFavorites}
                name={'rating'}
                onChange={() => {
                    editFavorites && editFavorites(id, !isFavorites)
                }}

            />
            <FaStar
                className={style.star}
                size={'1.4em'}
                color={isFavorites ? '#21268F' : '#D7D8EF'}
            />
        </label>
    );
});
