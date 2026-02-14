// InputField.jsx

import {Box, Field, Input, InputGroup} from "@chakra-ui/react";


/**
 * Reusable Chakra UI input field wired to react-hook-form via `register(name)`.
 *
 * @param {string} label - Label displayed above the input.
 * @param {string} name - Field name used by react-hook-form (e.g. "firstName").
 * @param {(name: string, option?: Object) => Object} register - react-hook-form `register` function.
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
        type = "text",
        helperText,
        placeholder,
        startElement,
        endElement,
        readOnly = false,
        ...rest
    }
) {

    if (!register)
        console.error("Register is not transmitted!");
    if (!name)
        console.error("Name is not transmitted!");


    return (

        <Box>
            <Field.Root invalid={!!error} {...rest}>
                <Field.Label mb={"-7px"} fontSize={"14px"}>{label}</Field.Label>
                <Field.HelperText>{helperText}</Field.HelperText>
                <InputGroup  startElement={startElement} endElement={endElement}>
                <Input {...register(name, {valueAsNumber: type === "number"})}
                       type={type} placeholder={placeholder} readOnly={readOnly}
                    height={"32px"} borderRadius={"7px"}/>
                </InputGroup>
                <Field.ErrorText>{error}</Field.ErrorText>
            </Field.Root>

        </Box>

    )
}