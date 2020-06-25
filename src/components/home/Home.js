import React, {useEffect, useState} from 'react';
import * as UserService from "../../services/user.service";

const Home = props => {
    const [content, setContent] = useState('');


    // useEffect(() => {
    //     UserService.getPublicContent().then(
    //         res => {
    //             setContent(res.data);
    //         },
    //         err => {
    //             setContent(err.message);
    //         }
    //     )
    // }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>This is home page</h3>
                <p>

                </p>
            </header>
        </div>
    );
};
export default Home;