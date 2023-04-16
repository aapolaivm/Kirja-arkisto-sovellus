import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
  
export default function KategoriaSelect() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [value, setValue] = useState(null)
    const loading = open && options.length === 0;
    const filter = createFilterOptions();

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
        onChange={(event, value) => {
            console.log(value, arguments)
            value = value.map(i => {
                if (i.inputValue != null){
                    i.nimi = i.inputValue
                }
                return i
            })
            setValue(value.map(i => i.nimi).join('|'))
        }}                 
        filterOptions={(options, params) => {
            const filtered = filter(options, params)
            const {inputValue} = params
            const isExisting = options.some(option => inputValue === option.nimi)
            if (inputValue !== '' && !isExisting){
                filtered.push({
                    inputValue,
                    nimi: `lisää "${inputValue}"`
                })
            }
            return filtered
        } }
        renderInput={(params) => (
            <>
                <TextField
                    {...params}
                    label="Kategoria"                    
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
                <input hidden name='kategoria' value={value}></input>
            </>        
        )}
    />
    );
}
