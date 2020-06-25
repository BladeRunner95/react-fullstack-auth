import React, {useRef, useState} from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import {isEmail} from 'validator';
import * as AuthService from '../../services/auth.service';


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Invalid Email {value}
            </div>
        )
    }
};

const userNameValidation = value => {
    if (value.length < 3 || value.length > 15) {
        return (
            <div className="alert alert-danger" role="alert">
                Username must be between 3 and 15 characters.
            </div>
        )
    }
};

const userPasswordValidation = value => {
    if (value.length < 6 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                Password must be between 6 and 20 characters.
            </div>
        )
    }
};


const Auth = props => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const onChangeUsername = event => {
        const username = event.target.value;
        setUsername(username);
    };

    const onChangeEmail = event => {
        const email = event.target.value;
        setEmail(email);
    };

    const onChangePassword = event => {
        const password = event.target.value;
        setPassword(password);
    };

    const registerHandler = event => {
        event.preventDefault();

        setMessage('');
        setSuccess(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.auth(username, email, password)
                .then(res => {
                        setMessage(res.data.message);
                        setSuccess(true);
                    },
                    error => {
                        const resMessage = error.response.data.message || error.message || error.toString();
                        setMessage(resMessage);
                        setSuccess(false);
                    })
        }
    };
    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                     alt="profile_image"
                     className="profile-img-card"/>
                <Form onSubmit={registerHandler} ref={form}>
                    {success? success: (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, userNameValidation]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, userPasswordValidation]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    )}
                    { message? (
                        <div className="form-group">
                            <div className={ success? "alert alert-success" : "alert alert-danger"} role="alert">
                                {message}
                            </div>
                        </div>
                    ): null}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
};

export default Auth;