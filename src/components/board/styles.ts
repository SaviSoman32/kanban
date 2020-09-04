import { makeStyles } from '@material-ui/core/styles';

export const useProjectsStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#b1a5a5',
    padding: '50px',
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
  },
  menu: {
    padding: theme.spacing(3)
  },
  image: {
    position: 'relative',
    top: 50
  }
}));

export const useProjectStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex'
  },
  dialog: {
    padding: theme.spacing(2)
  }
}));
