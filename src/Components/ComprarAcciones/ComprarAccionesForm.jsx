import React, {useState, useEffect} from 'react';
import {comprarAcciones, findOrdenDeVenta} from '../../Service/RestService'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Checkbox, FormControlLabel } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  
export default function ComprarAccionesForm() {
    const [orden, setOrden] = useState('')
    const [alert, setAlert] = useState({show: false, variant: "danger", message: '', icon: false});
    const [accept, setAccept] = useState(false)

    const classes = useStyles();
    useEffect(() => {
        findOrdenDeVenta(1).then(response => setOrden(response.data))
    }, [])
    
    function handleAccept(event) {
        setAccept(event.target.checked)
    }

    function comprar(ev, ordenId) {
        ev.preventDefault()
        if (accept) {
            comprarAcciones(1, ordenId)
            .then((response) => {
                setAlert({
                    show: true,
                    variant: "filled",
                    severity: "success",
                    message: "Acciones compradas correctamente!"
                })
            }).catch((error) => {
                setAlert({
                    show: true,
                    severity: "error",
                    variant: "filled",
                    message: error.response.data.message
                })
            })
        } else {
            setAlert({
                show: true,
                severity: "warning",
                variant: "filled",
                message: "Debes aceptar los terminos y condiciones"
            })
        }
    }

    return (
        <div>
            <form className={classes.root}>
                <TextField
                    disabled
                    id="nombre"
                    label="Nombre Empresa"
                    value={orden.nombreEmpresa}
                    variant="outlined"/>
                    <TextField
                    disabled
                    id="cantidad"
                    label="Cantidad de Acciones"
                    value={orden.cantidadDeAcciones}
                    variant="outlined"/>
                    <TextField
                    disabled
                    id="precio"
                    label="Precio"
                    value={orden.precio}
                    variant="outlined"/>
                    <TextField
                    disabled
                    id="creacion"
                    label="Fecha de Creación"
                    value={orden.fechaDeCreacion}
                    variant="outlined"/>
                    <TextField 
                    disabled 
                    id="vencimiento" 
                    label="Fecha de Vencimiento" 
                    value={orden.fechaDeVencimiento} 
                    variant="outlined"/>
            </form>
            <FormControlLabel className="p-2"
                control={<Checkbox checked={accept} onChange={event => handleAccept(event)} />}
                label="Acepto los terminos y condiciones"/>
          <div>
          </div>
            <div>
                <Button className="p-2 ml-1" variant= "contained" color="primary" onClick={ev => comprar(ev, orden.id)}>
                    Comprar
                </Button>
            </div>
            <Alert className= "mt-2" variant={alert.variant} severity={alert.severity} icon={alert.icon}>
                <AlertTitle>{alert.title}</AlertTitle>
                {alert.message}
            </Alert>
        </div>
    )
}



