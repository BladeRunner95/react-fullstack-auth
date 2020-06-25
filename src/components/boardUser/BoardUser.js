import React, {useEffect, useState} from 'react';
import * as UserService from '../../services/user.service';

const BoardUser = props => {
    const [content, setContent] = useState('');

    useEffect(() => {
       UserService.getUserBoard().then(
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
          <h3>sas</h3>
          </header>
      </div>
    );
};

export default BoardUser;