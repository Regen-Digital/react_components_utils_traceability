import React from 'react';
import { LoadingButton } from '@mui/lab';
import { credentialsIssue } from '../../schemas';
import RenderJsonSchema from '../RenderJsonSchema/RenderJsonSchema';
import IssuerDropdown from '../IssuerDropdown/IssuerDropdown';
import { Box, Snackbar, SnackbarContent, Typography } from '@mui/material';
import { CredentialPayload, VerifiableCredential } from '@vckit/core-types';
import { ErrorText, JsonFormData, defaultIssueFormValue } from '../../models/common';

interface IIssueFormWrapProps {
    formName: string;
    processor: (
        formData: JsonFormData,
        credentialPayload: CredentialPayload,
    ) => Promise<{ vc: VerifiableCredential }> | any;
    dynamicSchema?: any;
}

const defaultErrorState = {
    jsonSchema: [],
    issuer: ErrorText.required,
};

/**
 * IssueFormWrap component is used to display the json schema form with similar format.
 */
const IssueFormWrap = ({ dynamicSchema, formName, processor }: IIssueFormWrapProps) => {
    const { data } = credentialsIssue[formName];
    const [credentialPayload, setCredentialPayload] = React.useState<CredentialPayload | any>({});
    const [formData, setFormData] = React.useState<JsonFormData>(data);
    const [error, setError] = React.useState<any>(defaultErrorState);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const [vcIssueSuccessData, setVcIssueSuccessData] = React.useState<VerifiableCredential | null>(null);
    const clearRef = React.useRef<any>(null);

    /**
     * change value of the json schema form
     */
    const onChangeJsonSchemaForm = ({ errors, data }: { errors: any[]; data: any }) => {
        setFormData({ ...data });

        setError({
            ...error,
            jsonSchema: errors,
        });
    };

    /**
     * change value of the issuer
     */
    const onChangeIssuerForm = (issuer: string, errorStr: string) => {
        setCredentialPayload({
            ...credentialPayload,
            issuer,
        });

        setError({
            ...error,
            issuer: errorStr,
        });
    };

    /**
     * handle click on issue button
     */
    const handleClickIssueBtn = async () => {
        setLoading(true);
        setVcIssueSuccessData(null);

        const result = await processor(formData, credentialPayload);

        if (result.vc) {
            setVcIssueSuccessData(result?.vc);
            registerDLRSuccess();
        }
        setLoading(false);
    };

    /**
     * Reset form and show alert success after register link resolver success
     */
    const registerDLRSuccess = () => {
        setLoading(false);
        setSuccess(true);

        clearRef!.current!.onClear();
        setCredentialPayload({});
        setError(defaultErrorState);
    };

    /**
     * handle click on download button after issue success
     */
    const handleClickDownloadVC = async () => {
        const element = document.createElement('a');
        const file = new Blob([JSON.stringify(vcIssueSuccessData, null, 2)], {
            type: 'text/plain',
        });
        element.href = URL.createObjectURL(file);
        element.download = `${defaultIssueFormValue[formName].listNameFile}.json`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    return (
        <>
            <Typography
                sx={{
                    paddingTop: '20px',
                    fontSize: '1.5rem',
                }}
            >
                {defaultIssueFormValue[formName].title} Passport
            </Typography>
            <RenderJsonSchema
                onChangeJsonSchemaForm={onChangeJsonSchemaForm}
                schema={dynamicSchema}
                initialData={formData}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <IssuerDropdown onChangeIssuerForm={onChangeIssuerForm} error={error.issuer} ref={clearRef} />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    marginTop: '24px',
                }}
            >
                <LoadingButton
                    loading={loading}
                    onClick={handleClickIssueBtn}
                    variant='outlined'
                    disabled={error.jsonSchema?.length > 0 || !!error.issuer}
                >
                    Issue
                </LoadingButton>

                {vcIssueSuccessData && (
                    <LoadingButton sx={{ ml: 1 }} onClick={handleClickDownloadVC} variant='outlined'>
                        Download
                    </LoadingButton>
                )}
            </Box>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={success}
                autoHideDuration={2000}
                onClose={() => {
                    setSuccess(false);
                }}
            >
                <SnackbarContent
                    style={{
                        backgroundColor: 'green',
                    }}
                    message={<span id='client-snackbar'>Issue passport success</span>}
                />
            </Snackbar>
        </>
    );
};

export default IssueFormWrap;
