import {ValidationErrors} from "final-form";
import {Field, Form as FinalForm} from "react-final-form";
import React from "react";
import {url} from "../queries";
import {useNavigate} from "react-router-dom";

type RegistrationFormValues = {
    login: string;
    password: string;
    repeatPassword: string;
};

export default function Signup() {
    const isValid = (values: RegistrationFormValues): ValidationErrors => {
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

        if (values?.repeatPassword !== values?.password) {
            errors.repeatPassword = "Пароли должны совпадать.";
        }

        return errors;
    };
    const navigate = useNavigate();

    const onSubmit = async (values: RegistrationFormValues) => {
        const registrationRequest = async () => {
            const responce = await fetch(`${url}/user/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            return responce
        };
        await registrationRequest();
        const resp = await registrationRequest();
        console.log(resp);
        if (resp) {
            navigate("/threads/")
        }
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
                    <Field name="repeatPassword">
                        {({input, meta}) => (
                            <div>
                                <label>Пароль:
                                    <input type="password" {...input} placeholder="Повторите пароль"/>
                                </label>
                                {meta.touched && meta.error && <div>{meta.error}</div>}
                            </div>
                        )}
                    </Field>
                    <button type="submit">Зарегистрироваться</button>
                </form>
            )}>
        </FinalForm>
    </div>)
}
