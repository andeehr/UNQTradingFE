import React, { useState, useEffect } from 'react';
import { comprarAcciones, findOrdenDeVenta } from '../../Service/RestService'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


export default function ComprarAccionesForm(props) {
    const [orden, setOrden] = useState('')
    const [alert, setAlert] = useState({ show: false, variant: "danger", message: '', icon: false });
    const [accept, setAccept] = useState(false)
    const [show, setShow] = useState(false)

    const classes = useStyles();
    useEffect(() => {
        findOrdenDeVenta(props.ordenId).then(response => setOrden(response.data))
    }, [])

    function handleAccept(event) {
        setAccept(event.target.checked)
    }

    const handleShow = () => () => {
        setShow(true);
      };
    
      const handleClose = () => {
        setShow(false);
      };

    function comprar(ev, ordenId) {
        ev.preventDefault()
        if (accept) {
            comprarAcciones(props.ordenId, ordenId)
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
                    variant="outlined" />
                <TextField
                    disabled
                    id="cantidad"
                    label="Cantidad de Acciones"
                    value={orden.cantidadDeAcciones}
                    variant="outlined" />
                <TextField
                    disabled
                    id="precio"
                    label="Precio"
                    value={orden.precio}
                    variant="outlined" />
                <TextField
                    disabled
                    id="creacion"
                    label="Fecha de Creación"
                    value={orden.fechaDeCreacion}
                    variant="outlined" />
                <TextField
                    disabled
                    id="vencimiento"
                    label="Fecha de Vencimiento"
                    value={orden.fechaDeVencimiento}
                    variant="outlined" />
            </form>
            <FormControlLabel className="p-2"
                control={<Checkbox checked={accept} onChange={event => handleAccept(event)}/>}
                label={<Button style= {{ textTransform:'none'}} value="justify" onClick={handleShow()}>
                            Acepto los terminos y Condiciones
                        </Button>}/>
            <div>
            </div>
            <div>
                <Button className="p-2 ml-1" variant="contained" color="primary" onClick={ev => comprar(ev, orden.id)}>
                    Comprar
                </Button>
            </div>
            <Alert className="mt-2" variant={alert.variant} severity={alert.severity} icon={alert.icon}>
                {alert.message}
            </Alert>
            <Dialog
                open={show}
                onClose={handleClose}
                scroll="body">
                <DialogTitle id="scroll-dialog-title">Terminos y Condiciones</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText
                        id="scroll-dialog-description">
                            Cras mattis consectetur purus sit amet fermentum.
                            Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                            Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}



