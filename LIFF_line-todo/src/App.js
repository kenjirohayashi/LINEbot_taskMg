import React , {useState, useEffect} from 'react'
import {LIFF_ID} from './config';
import dayjs from 'dayjs';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { addTodo } from './service/api';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import DatePicker from '@mui/lab/DatePicker';

import liff from '@line/liff';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
    input: {
      marginTop: "30px",
      width:"100%",
      marginLeft:'10%',
    },
    formControl:{
      marginTop: "45px",
      minWidth: 200,
      marginLeft: '10%'
    },
    noticePicker:{
      marginLeft: "10%",
    },
    buttonContainer:{
      textAlign: "center",
      marginTop: "30px",
    },
    button:{
      color: "white",
      backgroundColor: "#0081f0",
    },
    helperText:{
      marginTop: "3px",
      fontSize: "12px",
      // fontWeight: "bold",
      color: "#f44336",
    }
  }),
);

  
function App() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [deadLine, setDeadLine] = useState(null);
  const [notice, setNotice] = useState(null);
  const [uid, setUid] = useState("");

  const [submit , setSubmit] = useState(false);
  const [isNotice, setIsNotice] = useState(false);

  useEffect(() => {
    liff.init({liffId: LIFF_ID})
    .then(() => {
      getProfile();
    })
    .catch((err) => {
      console.log(err.code, err.message);
    })
  }, [])

  const getProfile = () => {
    liff.ready.then( async() => {
        const context = await liff.getContext()
        setUid(context.userId);
    })
  }

  const post = async() => {
    setSubmit(true);
    if(!name || (!notice && isNotice)){
      return false;
    }
    const closed = deadLine ? dayjs(deadLine).format("YYYY年MM月DD日") : "なし";
    const notification = notice ? dayjs(notice).format("YYYY/MM/DD HH:mm") : "なし";
      await addTodo(name, closed, notification, uid);
      liff.closeWindow();
  }

  return (
    <div className={classes.root}>
      <div style={{marginTop: '40px'}}>
        <h1>登録画面</h1>
      </div>
      <div>
        <div className={classes.input}>
          <TextField 
            label="タスク名" 
            value={name} 
            error={!name && submit ? true : false}
            helperText={!name && submit ? "入力してください" : ""}
            onChange={(event) => setName(event.target.value)} 
          />
        </div>
        <div className={classes.input}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              renderInput={(params) => <TextField {...params}/>}
              value={deadLine} 
              onError={console.log}
              label="締め切り"
              inputFormat="yyyy年MM月dd日"
              minDate={new Date()}
              onChange={(value) => setDeadLine(value)}
            />
          </LocalizationProvider>
        </div>
        <div className={classes.formControl}>
          <FormControl>
            <FormLabel>通知</FormLabel>
              <RadioGroup
                defaultValue={false}
                type="radio"
                onChange={() => {setIsNotice(!isNotice);}}
              >
                <FormControlLabel value={false} control={<Radio />} label="通知しない" />
                <FormControlLabel value={true} control={<Radio />} label="通知する" />
              </RadioGroup>
          </FormControl>
        </div>
        <div style={{display: isNotice ? "" : "none"}} className={classes.noticePicker}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateTimePicker
              renderInput={(params) => <TextField {...params} /> }
              label="通知"
              minDateTime={new Date()}
              value={notice}
              inputFormat="MM/dd - HH:mm"
              onChange={(value) => {setNotice(value)}}
            />
            {!notice && isNotice && submit ?
              <p className={classes.helperText}>入力してください</p> : <></>
            }
          </LocalizationProvider>
      </div>        
      <div className={classes.buttonContainer}>
        <Button type="button" variant="contained" className={classes.button} onClick={() => post()}>登録</Button>
      </div>
    </div>
  </div>
  );
}

export default App;
