// PersonalInfoCard.jsx

import {Box, Button, Flex, Heading, Icon, Text} from "@chakra-ui/react";
import {CircleUserRound} from "lucide-react";
import InputField from "@/components/shared/InputField.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signUpSchema} from "@/schemas/signUpSchema.js";


export default function PersonalInfoCard() {


    // --------------- Manipulating form ---------------

    // deconstruct useForm hook
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm({resolver: zodResolver(signUpSchema)});

    // submit data
    const onSubmit = async (data) => {
        // Ex: submit to server
        console.log(data);
        reset();
    }

    return (
        <Box bg={"white"} borderRadius={"15px"}
             maxWidth={"700px"}>

            <Box p={"40px"}>


                <Flex direction={"row"} justify={"space-between"} align={"flex-start"}>

                    <Box>
                        <Heading>Personal Information</Heading>
                        <Text>You can view and edit your data</Text>
                    </Box>

                    <Flex align={"center"} gap={"12px"}>
                        <Icon color={"primary.500"}><CircleUserRound size={"50px"} strokeWidth={1.2}/></Icon>
                        <Box>
                            <Heading>Ticarat Andrei</Heading>
                            <Text>Manager</Text>
                        </Box>
                    </Flex>
                </Flex>


                {/* Form section */}
                <form onSubmit={handleSubmit(onSubmit, onError => console.log(onError))}>
                    <InputField register={register} name={"firstName"}
                                label={"First Name"} type={"text"}
                                error={errors.firstName?.message}/>

        </Box>
    )
}