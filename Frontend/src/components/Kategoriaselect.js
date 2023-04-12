import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

  
export default function KategoriaSelect() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
        fetch('http://localhost:5000/api/kirjat/kategoria')
        .then(r => r.json())
        .then(d => setOptions(d.kategoriat))
    }, [open]);

    return (
    <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 300 }}
        open={open}
        multiple
        onOpen={() => {
        setOpen(true);
        }}
        onClose={() => {
        setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.nimi === value.nimi}
        getOptionLabel={(option) => option?.nimi??''}
        options={options}
        loading={loading}
        freeSolo
        renderInput={(params) => (
        <TextField
            {...params}
            label="Kategoria"
            name='kategoria'
            InputProps={{
            ...params.InputProps,
            endAdornment: (
                <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
                </React.Fragment>
            ),
            }}
        />
        )}
    />
    );
}
