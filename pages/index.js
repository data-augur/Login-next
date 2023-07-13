"client Component"
import { useState, useEffect } from 'react';
import { useSession, signIn , signOut} from 'next-auth/react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(2, 0),
  },
}));


export default function SignIn({ csrfToken }) {
  const { data: session } = useSession()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const [loginFailed, setLoginFailed] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
  };


  if (session) {
    // User is already authenticated, redirect to another page
    return(
    <form className={classes.form}>
        Welcome {session.user.email} <br />
        <Button onClick={() => signOut()} 
        variant="contained"
        color="primary"
        className={classes.button}>Sign out</Button>
        </form>
    )
  }else{

  return (
    <div>
    <form className={classes.form} onSubmit={handleSubmit}>
    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
    <TextField
      label="Email"
      name="email"
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      variant="outlined"
      className={classes.textField}
    />
    <TextField
      label="Password"
      name="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      variant="outlined"
      className={classes.textField}
    />
      <Button onClick={() => signIn("credentials", { redirect: false,username: email, password: password }).then(({ ok, error }) => {
        if (ok) {
          setLoginFailed(false)
        } else {
            console.log(error)
           setLoginFailed(true)
        }
    })}
      variant="contained"
      color="primary"
      className={classes.button}>Sign in
    </Button>

      {loginFailed && (<div>Login Failed. Please try again</div>)}
    </form>
    
    </div>

  );
  }
}