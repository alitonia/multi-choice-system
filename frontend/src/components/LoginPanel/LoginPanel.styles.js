import styled from "styled-components";

export const Wrapper = styled.div`
  /* Form */

  position: absolute;
  width: 476px;
  height: 357px;
  left: 540px;
  top: 294px;

  /* White */

  background: #ffffff;
  border-radius: 32px;
`;

export const UsernameInput = styled.div`
  margin-top: 22px;
  margin-left: 42px;

  input {
    /* Rectangle 5 */

    position: relative;
    width: 393px;
    height: 32px;
    /* left: 581px; */
    /* top: 316px; */

    /* Grey */

    border: 2px solid #b5b2b2;
    box-sizing: border-box;
    border-radius: 8px;
  }

  input::placeholder {
    font-family: ABeeZee;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;

    /* Grey */

    color: #b5b2b2;
  }
`;

export const PasswordInput = styled.div`
  margin-top: 24px;
  margin-left: 41px;
  input {
    position: relative;
    width: 393px;
    height: 32px;
    /* left: 581px; */
    /* top: 372px; */

    /* Grey */

    border: 2px solid #b5b2b2;
    box-sizing: border-box;
    border-radius: 8px;
  }

  input::placeholder {
    font-family: ABeeZee;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;

    /* Grey */

    color: #b5b2b2;
  }
`;

export const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ForgotPasswordText = styled.div`
  /* Forgot your password? */

  position: relative;
  width: 151px;
  height: 17px;
  /* left: 581px; */
  /* top: 416px; */

  margin-top: 12px;
  margin-left: 41px;

  font-family: ABeeZee;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  text-decoration-line: underline;

  /* Primary */

  color: #334257;
`;

export const LoginButton = styled.div`
  margin-top: 12px;
  margin-left: 41px;

  button {
    position: relative;
    width: 393px;
    height: 32px;
    /* left: 581px; */
    /* top: 445px; */

    /* Primary */

    background: #334257;
    border-radius: 8px;
  }
`;

export const LoginButtonText = styled.div`
  /* Log in */

  position: relative;
  width: 52px;
  height: 21px;
  /* left: 752px; */
  /* top: 450px; */
  margin: 5px;
  margin-left: 171px;

  font-family: ABeeZee;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  text-align: center;

  /* White */

  color: #ffffff;
`;

export const OrText = styled.div`
  /* or */

  position: relative;
  width: 14px;
  height: 17px;
  /* left: 771px; */
  /* top: 501px; */

  margin-top: 24px;
  margin-left: 231px;

  font-family: ABeeZee;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 17px;
  /* identical to box height */

  text-align: center;

  /* Primary */

  color: #334257;
`;

export const GoogleButton = styled.div`
  margin-top: 24px;
  margin-left: 41px;
  button {
    position: relative;
    width: 393px;
    height: 32px;

    /* border: 1px solid #000000; */
    border-radius: 8px;
  }
`;

export const GoogleButtonText = styled.div`
  margin-top: 5px;
  margin-left: 106px;
  position: relative;
  width: 183px;
  height: 21px;
  /* left: 687px; */
  /* top: 547px; */

  font-family: ABeeZee;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  text-align: center;

  /* Black */

  color: #000000;
`;

export const OutlookButton = styled.div`
  margin-top: 24px;
  margin-left: 41px;
  button {
    position: relative;
    width: 393px;
    height: 32px;

    background: #000000;
    border-radius: 8px;
  }
`;

export const OutlookButtonText = styled.div`
  margin-top: 5px;
  margin-left: 102px;
  position: relative;
  width: 191px;
  height: 21px;
  /* left: 683px; */
  /* top: 603px; */

  font-family: ABeeZee;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  text-align: center;

  /* White */

  color: #ffffff;
`;
