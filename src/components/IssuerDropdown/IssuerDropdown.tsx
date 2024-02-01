import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

interface IssuerFormClear {
    onClear: () => void;
}

interface IssuerForm {
    onChangeIssuerForm: (issue: string, error: string) => void;
    error: string;
}

/**
 * IssueDropbox component is used to display the issuer.
 */
const IssuerDropdown = React.forwardRef(
    ({ onChangeIssuerForm: onChangeIssueForm, error }: IssuerForm, ref: React.ForwardedRef<IssuerFormClear>) => {
        const [issue, setIssue] = React.useState('');

        /*
         * handleChange is used to handle the change of the issuer
         */
        const handleChange = (event: SelectChangeEvent) => {
            if (event.target.value === '') {
                onChangeIssueForm(event.target.value, 'is a required property');
            } else {
                onChangeIssueForm(event.target.value, '');
            }

            setIssue(event.target.value);
        };

        /**
         * onClear is used to reset the issuer when register link resolver success
         */
        React.useImperativeHandle(ref, () => ({
            async onClear() {
                handleChange({ target: { value: '' } } as SelectChangeEvent);
            },
        }));

        return (
            <>
                <FormControl variant='standard' sx={{ minWidth: 240 }}>
                    <InputLabel id='issue-label'>Issuer</InputLabel>
                    <Select
                        labelId='issue-select-label'
                        id='issue-select'
                        value={issue}
                        onChange={handleChange}
                        label='issue'
                    >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {process.env.REACT_APP_LIST_ISSUERS?.split(',')?.map((issuer: string) => (
                            <MenuItem key={issuer} value={issuer}>
                                {issuer}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText error={error?.length > 0}>{error}</FormHelperText>
                </FormControl>
            </>
        );
    },
);

export default IssuerDropdown;
