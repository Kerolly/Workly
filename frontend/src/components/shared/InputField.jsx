// InputField.jsx

import {Field, Input, Box, Flex} from "@chakra-ui/react";


/**
 * Reusable Chakra UI input field wired to react-hook-form via `register(name)`.
 *
 * @param {string} label - Label displayed above the input.
 * @param {string} name - Field name used by react-hook-form (e.g. "firstName").
 * @param {(name: string) => Object} register - react-hook-form `register` function.
 * @param {string} error - Validation error message to display.
 * @param {string} [type="text"] - HTML input type (text, email, password, etc.).
 * @param {string | undefined} helperText - Helper text displayed under the label.
 * @param {string | undefined} placeholder - Input placeholder.
 * @param {*} value - Optional controlled value (avoid mixing with RHF unless intended).
 * @param rest - Additional props passed to the Chakra UI component.
 */

export default function InputField(
    {
        label,
        name,
        value,
        register,
        error,
        type="text",
        helperText,
        placeholder,
        ...rest
    }
){

    if (!register)
        console.error("Register is not transmitted!");
    if (!name)
        console.error("Name is not transmitted!");


    return(

        <Box>
            <Field.Root invalid={!!error} {...rest}>
                <Field.Label>{label}</Field.Label>
                <Field.HelperText>{helperText}</Field.HelperText>
                <Input {...register(name)} type={type} placeholder={placeholder} />
                <Field.ErrorText>{error}</Field.ErrorText>
            </Field.Root>

        </Box>

    )
}