import classes from './App.module.scss';
import Main from './components/Main';
import Logo from './logo.png';

function App() {
  return (
    <div className={classes.App}>
      <div className={classes.logo}>
        <img src={Logo} alt="Blue plane logo " />
      </div>
      <Main />
    </div>
  );
}

export default App;
