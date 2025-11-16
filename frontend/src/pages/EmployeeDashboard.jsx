// EmployeeDashboard.jsx

import Header from "@/pages/components/Header.jsx"
import "@/styles/theme.css";
import {Box, Field, Input, InputGroup, Stack, Text} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import {useRef} from "react";
import {Calendar, Plus, Clock, Clock7} from "lucide-react"


export default function EmployeeDashboard() {


    const employeeId = useParams().employeeId;

    const dateInputRef = useRef(null)
    const startTimeInputRef = useRef(null)
    const endTimeInputRef = useRef(null)

    const handleOpenPicker = (inputRef) => {
        if (inputRef.current) {
            inputRef.current.showPicker()
        }
    }



    return (
        // Header
        <>
            <Header/>

            <Box bg={"var(--background)"} minH="100vh" px={["20px", "60px"]}
                 display={"flex"} flexDirection={"column"} alignItems={"center"}>

                <Box maxW={"1040px"} w={"100%"}>

                    {/*--- Welcome Section ---*/}
                    <Box color={"var(--black)"} pt={["40px", "60px"]}>
                        <Text textAlign={"start"} textStyle={["2xl", "3xl"]} fontWeight={"bold"}>Welcome, Andrei</Text>
                        <Text textAlign={"start"} textStyle={["sm", "md"]} mt={"5px"}
                              color={"var(--grey-600)"}>Manage your timesheets and view salary information</Text>
                    </Box>

                    {/*--- Work Time Registration Section ---*/}
                    <Box color={"var(--black)"} bg={"var(--white)"} rounded={"lg"} mt={["25px", "35px"]}>
                        <Box width={"100%"} p={["10px", "20px"]}>

                            <Text textStyle={["lg", "xl"]}
                                  display={"flex"} gap={"1"} alignItems={"center"}><Plus color={"var(--primary)"}/>Record
                                worked hours</Text>

                            <Stack direction={{base: "column", md: "row"}} gap={10} mt={"30px"}>

                                {/*--- Time Start-End Section ---*/}
                                <Field.Root required color={"var(--black)"}>
                                    <Field.Label>Time Start<Field.RequiredIndicator/></Field.Label>
                                    <InputGroup endElement={<Clock onClick={() => handleOpenPicker(startTimeInputRef)}
                                                                     color="var(--primary)" cursor={"pointer"}/>}>
                                        <Input type={"time"} ref={startTimeInputRef}/>
                                    </InputGroup>
                                </Field.Root>


                                <Field.Root required color={"var(--black)"}>
                                    <Field.Label>Time End<Field.RequiredIndicator/></Field.Label>
                                    <InputGroup endElement={<Clock7 onClick={() => handleOpenPicker(endTimeInputRef)}
                                                                   color="var(--primary)" cursor={"pointer"}/>}>
                                        <Input type={"time"} ref={endTimeInputRef}/>
                                    </InputGroup>
                                </Field.Root>

                            </Stack>

                            {/*--- Date-Hour Section ---*/}
                            <Stack direction={{base: "column", md: "row"}} gap={10} mt={"30px"}>

                                <Field.Root required color={"var(--black)"}>
                                    <Field.Label>Date <Field.RequiredIndicator/></Field.Label>
                                    <InputGroup endElement={<Calendar onClick={() => handleOpenPicker(dateInputRef)}
                                                                      color="var(--primary)" cursor={"pointer"}/>}>
                                        <Input type={"date"} ref={dateInputRef}/>
                                    </InputGroup>
                                </Field.Root>

                                <Field.Root color={"var(--black)"}>
                                    <Field.Label>Total Hours</Field.Label>
                                    <InputGroup endElement={<Clock color="var(--primary)"/>}>
                                        <Input disabled type={"text"}/>
                                    </InputGroup>
                                </Field.Root>

                            </Stack>

                            {/*--- Job-Pay Section ---*/}
                            <Stack direction={{base: "column", md: "row"}} gap={10} mt={"30px"}>

                                <Field.Root required color={"var(--black)"}>
                                    <Field.Label>Activity <Field.RequiredIndicator/></Field.Label>
                                    <InputGroup endElement={<Calendar onClick={() => handleOpenPicker(dateInputRef)}
                                                                      color="var(--primary)" cursor={"pointer"}/>}>
                                        <Input type={"date"} ref={dateInputRef}/>
                                    </InputGroup>
                                </Field.Root>

                                <Field.Root color={"var(--black)"}>
                                    <Field.Label>Hourly Rates</Field.Label>
                                    <InputGroup endElement={<Clock color="var(--primary)"/>}>
                                        <Input disabled type={"text"}/>
                                    </InputGroup>
                                </Field.Root>

                            </Stack>

                        </Box>
                    </Box>
                </Box>
            </Box>


        </>
    )

}