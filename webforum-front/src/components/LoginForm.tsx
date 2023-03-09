import {ValidationErrors} from "final-form";
import {Field, Form as FinalForm} from "react-final-form";
import React from "react";
import {url} from "../queries";
import {useNavigate} from "react-router-dom";

type LoginFormValues = {
    login: string;
    password: string;
};

export default function Login() {
    const isValid = (values: LoginFormValues): ValidationErrors => {
        const errors: ValidationErrors = {}
        if (!/^([a-zA-Z0-9]{6,20})$/.test(values?.login)) {
            errors.login = "Логин должен содержать от 6 до 20 символов латинского алфавита и цифры.";
        }

        if (!values?.login) {
            errors.login = "Логин не может быть пустым.";
        }

        if (!values?.password) {
            errors.password = "Пароль не может быть пустым.";
        }

        return errors;
    };

    const navigate = useNavigate();

    const onSubmit = async (values: LoginFormValues) => {
        const loginRequest = async () => {
            return fetch(`${url}/login/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
        };
        const resp = await loginRequest();
        console.log(resp);
        if (resp) {
            navigate("/threads/")
        }
        console.log(values);
    };

    return (<div>
        <FinalForm
            onSubmit={onSubmit}
            validate={isValid}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <Field name="login">
                        {({input, meta}) => (
                            <div>
                                <label>Логин:
                                    <input type="text" {...input} placeholder="Логин"/>
                                </label>
                                {meta.touched && meta.error && <div>{meta.error}</div>}
                            </div>
                        )}
                    </Field>
                    <Field name="password">
                        {({input, meta}) => (
                            <div>
                                <label>Пароль:
                                    <input type="password" {...input} placeholder="Пароль"/>
                                </label>
                                {meta.touched && meta.error && <div>{meta.error}</div>}
                            </div>
                        )}
                    </Field>
                    <button type="submit">Войти</button>
                </form>
            )}>
        </FinalForm>
    </div>)
}
