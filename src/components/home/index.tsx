import axios from "axios";
import { Button } from "baseui/button";
import { HeadingXXLarge } from "baseui/typography";
import { useSignOut,useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Container } from "../commons";

import { Console } from "console";

function Home() {
  const singOut = useSignOut();
  const navigate = useNavigate();
  const logout = () => {
    singOut();
    navigate("/login");
  };
  const auth = useAuthUser()

console.log(auth);
  return (
    <>
      <Container>
        <div>
        Hello {auth.user}
        </div>
        <Button kind="secondary" onClick={logout}>
          Logout
        </Button>
      </Container>
    </>
  );
}

export { Home };
