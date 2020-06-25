import React, {useEffect, useState} from 'react';
import * as UserService from '../../services/user.service';

const BoardAdmin = props => {
    const [content, setContent] = useState('');

    useEffect(() => {
        UserService.getAdminBoard().then(
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
                <h3>{content}</h3>
            </header>
        </div>
    );
};

export default BoardAdmin;