import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  CardHeader,
  CardContent,
  Card,
  CardActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HeaderComponent from "./HeaderComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '38ch',
    },
  },
  btn: {
    height: '55px',
    float: 'right',
    marginBottom: '15px',
  },
  btn3: {
    height: '55px',
    width: '35px',
    float: 'right',
  },
  btnB: {
    height: '55px',
    marginBottom: '15px',
  },
}));

function DynamicFormComponent() {
  const classes = useStyles();
  const [multiInput, setMultiInput] = useState([
    { firstName: '', lastName: '', phoneNo: '' },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const inputList = [...multiInput];
    inputList[index][name] = value;
    setMultiInput(inputList);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (e, index) => {
    e.preventDefault();
    const inputList = [...multiInput];
    inputList.splice(index, 1);
    setMultiInput(inputList);
  };

  // handle click event of the Add button
  const handleAddClick = (e) => {
    e.preventDefault();
    setMultiInput([
      ...multiInput,
      { firstName: '', lastName: '', phoneNo: '' },
    ]);
  };

  return (
    <Container>
      <Card>
        <CardHeader title='Multi Input Form Handling' />
        <CardContent>
          {multiInput.map((x, i) => {
            return (
              <div className={classes.root} key={i}>
                <TextField
                  id='outlined-basic'
                  label='First Name'
                  name='firstName'
                  variant='outlined'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <TextField
                  id='outlined-basic1'
                  label='Last Name'
                  name='lastName'
                  variant='outlined'
                  onChange={(e) => handleInputChange(e, i)}
                />
                <TextField
                  id='outlined-basic2'
                  label='Phone Number'
                  variant='outlined'
                  name='phoneNo'
                  onChange={(e) => handleInputChange(e, i)}
                />
                {i > 0 && (
                  <Button
                    color='secondary'
                    onClick={(e) => handleRemoveClick(e, i)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            );
          })}

          <hr />
        </CardContent>
        <CardActions>
          <div>
            <Button
              variant='outlined'
              color='primary'
              className={classes.btn}
              onClick={handleAddClick}
            >
              Add Input
            </Button>
          </div>
        </CardActions>
      </Card>
      <hr />
      <Card>
        <CardContent>
          {multiInput.map((x, i) => {
            return x.firstName === '' ||
              x.lastName === '' ||
              x.phoneNo === '' ? (
              ''
            ) : (
              <div className={classes.root} key={i}>
                <b>Name:</b> {x.firstName + ' ' + x.lastName} & <b>Phone no</b>:{' '}
                {x.phoneNo}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </Container>
  );
}

export default DynamicFormComponent;