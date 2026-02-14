// PersonalInfoCard.jsx

import {Box, Button, Flex, Heading, Icon, Text} from "@chakra-ui/react";
import {CircleUserRound, Lock, Mail, Phone, UserRoundPen} from "lucide-react";
import InputField from "@/components/shared/InputField.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signUpSchema} from "@/schemas/signUpSchema.js";
import {useEffect, useState} from "react";
import "@/styles/effects.css";


export default function PersonalInfoCard(
    {...rest}
) {

    // --------------- useState declaration ---------------
    const [isEditable, setIsEditable] = useState(false);

    // --------------- Manipulating form ---------------

    // deconstruct useForm hook
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "", lastName: "", email: "", phone: "", role: "", contractType: "",
        }
    });

    // submit data
    const onSubmit = async (data) => {
        // Ex: submit to server
        console.log(data);
        reset();
    }

    useEffect(() => {
        // Get data from db
        // ...

        setTimeout(() => {
            const data = {
                firstName: "Ticarat",
                lastName: "Andrei",
                email: "abc@gmail.com",
                phone: "0721234567",
                role: "Manager",
                contractType: "Full-time"
            };
            reset(data);

        }, 1000)

    }, [reset]);

    return (
        <Box bg={"white"} borderRadius={"15px"} border={"1px solid secondary.300"}
             maxWidth={"700px"} {...rest} className={"floating-card"}>

            <Box p={{base: "25px", lg: "30px", xl: "40px"}}>


                <Flex direction={{base: "column", lg: "row"}} justify={"space-between"} align={"flex-start"}>

                    <Box display={{base: "none", lg: "block"}}>
                        <Heading>Personal Information</Heading>
                        <Text>You can view and edit your data</Text>
                    </Box>

                    <Flex align={"center"} gap={"12px"} my={{base: "15px", lg: "0px"}}>
                        <Icon color={"primary.500"}><CircleUserRound size={"50px"} strokeWidth={1.2}/></Icon>
                        <Box>
                            <Heading>Ticarat Andrei</Heading>
                            <Text>Manager</Text>
                        </Box>
                    </Flex>
                </Flex>


                {/* Form section */}
                <form onSubmit={handleSubmit(onSubmit, onError => console.log(onError))}>

                    <Flex direction={"column"}>
                        <Flex direction={{base: "column", lg:"row"}} justify={"space-between"} gap={"20px"} mt={"12px"}>
                            <InputField register={register} name={"firstName"}
                                        label={"First Name"} type={"text"} readOnly={!isEditable}
                                        error={errors.firstName?.message} startElement={<UserRoundPen size={"16px"}/>}/>

                            <InputField register={register} name={"lastName"}
                                        label={"Last Name"} type={"text"} readOnly={!isEditable}
                                        error={errors.lastName?.message} startElement={<UserRoundPen size={"16px"}/>}/>
                        </Flex>

                        <Flex direction={{base: "column", lg:"row"}} justify={"space-between"} gap={"20px"} mt={"12px"}>
                            <InputField register={register} name={"email"}
                                        label={"Email"} type={"text"} readOnly={!isEditable}
                                        error={errors.email?.message} startElement={<Mail size={"16px"}/>}/>

                            <InputField register={register} name={"phone"}
                                        label={"Phone Number"} type={"tel"} readOnly={!isEditable}
                                        error={errors.phone?.message} startElement={<Phone size={"16px"}/>}/>
                        </Flex>

                        <Flex direction={{base: "column", lg:"row"}} justify={"space-between"} gap={"20px"} mt={"12px"}>
                            <InputField register={register} name={"role"}
                                        label={"Role"} type={"text"} readOnly={true}
                                        error={errors.role?.message} startElement={<Lock size={"16px"}/>}/>

                            <InputField register={register} name={"contractType"}
                                        label={"Contract Type"} type={"text"} readOnly={true}
                                        error={errors.contractType?.message} startElement={<Lock size={"16px"}/>}/>
                        </Flex>

                        <Box alignSelf={"flex-end"} mt={"20px"}>

                            {/*--- Edit button ---*/}
                            <Button onClick={() => {
                                setIsEditable(!isEditable)
                            }}
                                    display={isEditable ? "none" : null}
                                    bg={{base: "secondary.800", _hover: "secondary.700"}} height={"30px"}
                                    color={"white"} className={"btn-jelly"} >Edit</Button>

                            {/*--- Send button ---*/}
                            <Button onClick={() => setIsEditable(!isEditable)}
                                type={"submit"} display={isEditable ? null : "none"}
                                    bg={{base: "secondary.800", _hover: "secondary.700"}} height={"30px"}
                                    color={"white"} className={"btn-shine"}
                            >Send</Button>
                        </Box>
                    </Flex>
                </form>


            </Box>

        </Box>
    )
}