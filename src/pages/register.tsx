import { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { FormContainer, InputField, SubmitButton } from "../components/form";
import { createUser } from "../services/userManagement";

// TODO: Getting a Bad Request console error when creating user, look into it.
// TODO: Can create account without verifying email. How should verification be enforced?
// TODO: No user feedback when creating an account.

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");

  const [notification, setNotification] = useState<string>("");

  const history = useHistory();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== passwordConf) {
      tempNotification(
        "Passordet stemmer ikke med bekreftelses passordet",
        3000
      );

      setPassword("");
      setPasswordConf("");
      return;
    }

    await createUser
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        /*
        userCredential?.user
          ?.sendEmailVerification()
          .then(() => {
            console.log("Sent email verification");
          })
          .catch(() => {
            console.log("Could not send email verification");
          });
          */

        console.log(user);

        //history.replace({ pathname: "/verify", state: { user: "lol" } });
        //history.push("/verify");
      })
      .catch((errorCode) => {
        const {
          ERROR_EMAIL_ALREADY_USED,
          ERROR_EMAIL_NOT_VALID,
          ERROR_UNDEFINED,
          ERROR_WEAK_PASSWORD,
        } = createUser.createUserErrors;
        switch (errorCode) {
          case ERROR_EMAIL_ALREADY_USED:
            tempNotification("E-posten er allerede i bruk", 3000);
            break;
          case ERROR_EMAIL_NOT_VALID:
            tempNotification("E-posten er ikke gydlig", 3000);
            break;
          case ERROR_WEAK_PASSWORD:
            tempNotification("Passordet er for svakt", 3000);
            break;
          case ERROR_UNDEFINED:
            tempNotification("Noe gikk galt...", 3000);
            break;
        }
      });
  };

  const tempNotification = (message: string, duration: number) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, duration);
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <InputField
          label="E-post"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <InputField
          label="Passord"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <InputField
          label="Bekreft passord"
          type="password"
          value={passwordConf}
          onChange={(event) => setPasswordConf(event.target.value)}
        />
        <SubmitButton label="Registrer deg" />
      </FormContainer>

      <h4> {notification} </h4>
    </>
  );
};

export default Register;
