import React, {useEffect, useState} from 'react';
import * as UserService from '../../services/user.service';

const BoardModer = props => {
    const [content, setContent] = useState('');

    useEffect(() => {
        UserService.getModeratorBoard().then(
            res => {
                setContent(res.data)
            },
            err => {
                setContent(err.message);
            }
        )
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>Moderator-2000</h3>
            </header>
        </div>
    );
};

export default BoardModer;