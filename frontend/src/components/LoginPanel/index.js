import { useState } from "react";
import {
  Wrapper,
  UsernameInput,
  PasswordInput,
  LoginButton,
  LoginButtonText,
  ForgotPasswordText,
  Content,
  OrText,
  GoogleButton,
  GoogleButtonText,
  OutlookButton,
  OutlookButtonText,
  // GoogleButton,
  // GoogleButtonText,
  // OutlookButton,
  // OutlookButtonText,
} from "./LoginPanel.styles";

const LoginPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleInput = () => {
    setError();
    setUsername();
    setPassword();
  };
  const handleSubmit = () => {
    setPassword();
  };

  const handleGoogleLogin = () =>{

  }

  const handleOutlookLogin = () =>{

  }

  return (
    <Wrapper>
      <Content>
      {error && <div className="error">There was an error!</div>}
      <UsernameInput>
        <input
          type="text"
          value={username}
          name="username"
          onChange={handleInput}
          placeholder = "E-mail"
        />
      </UsernameInput>
      <PasswordInput>
        <input
          type="password"
          value={password}
          name="password"
          onChange={handleInput}
          placeholder = "Password"
        />
      </PasswordInput>
      <ForgotPasswordText>
        Forgot your password
      </ForgotPasswordText>
      <LoginButton>
        <button onClick={handleSubmit}>
          <LoginButtonText>
            Login
          </LoginButtonText>
        </button>
      </LoginButton>
      <OrText>
      or
      </OrText>

      <GoogleButton>
        <button onClick={handleGoogleLogin}>
          <GoogleButtonText>
            Continue with Google
          </GoogleButtonText>
        </button>
      </GoogleButton>

      <OutlookButton>
        <button onClick = {handleOutlookLogin}>
          <OutlookButtonText>
            Continue with Outlook
          </OutlookButtonText>
        </button>
      </OutlookButton>
      
      </Content>
    </Wrapper>
  );
};

export default LoginPanel;
