// EmployeeDashboard.jsx

import Header from "@/pages/components/Header.jsx"
import "@/styles/theme.css";
import {
    Box,
    Button,
    createListCollection,
    Field, Flex,
    Heading,
    Input,
    InputGroup,
    Portal,
    Select,
    Stack,
    Table,
    Text
} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import {useRef} from "react";
import {Calendar, Clock, Clock7, DollarSign, Plus, Trash2, TrendingUp} from "lucide-react"


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

    const activities = createListCollection({
        items: [
            {label: "Course", value: "Course"},
            {label: "Demo", value: "Demo"},
            {label: "Meeting", value: "Meeting"},
            {label: "Make-up Class", value: "Make-up Class"},
            {label: "Other", value: "Other"},
        ],
    })

    const historyRecords = [
        {id: 1, date: "lun. 15 ian. 2025", activity: "Course", hours: 8.0, ratesHour: "45 RON", total: "360.00 RON"},
        {id: 2, date: "mar. 16 ian. 2025", activity: "Demo", hours: 2.5, ratesHour: "60 RON", total: "150.00 RON"},
        {id: 3, date: "mie. 17 ian. 2025", activity: "Meeting", hours: 1.5, ratesHour: "30 RON", total: "45.00 RON"},
        {id: 4, date: "joi 18 ian. 2025", activity: "Course", hours: 4.0, ratesHour: "45 RON", total: "180.00 RON"},
        {
            id: 5,
            date: "vin. 19 ian. 2025",
            activity: "Development",
            hours: 6.0,
            ratesHour: "50 RON",
            total: "300.00 RON"
        },
        {id: 6, date: "lun. 22 ian. 2025", activity: "Demo", hours: 3.0, ratesHour: "60 RON", total: "180.00 RON"}
    ]


    return (
        // Header
        <>
            <Header/>

            <Box bg={"var(--background)"} minH="100vh" px={["20px", "60px"]}
                 display={"flex"} flexDirection={"column"} alignItems={"center"}
                 position={"relative"} boxShadow="0px 4px 12px rgba(0, 0, 0, 0.08)">

                <Box maxW={"1144px"} w={"100%"}>

                    {/*--- Welcome Section ---*/}
                    <Box color={"var(--black)"} pt={["40px", "60px"]}>
                        <Text textAlign={"start"} textStyle={["2xl", "3xl"]} fontWeight={"bold"}>Welcome,
                            Andrei</Text>
                        <Text textAlign={"start"} textStyle={["sm", "md"]} mt={"5px"}
                              color={"var(--grey-600)"}>Manage your timesheets and view salary information</Text>
                    </Box>

                    {/*--- Work Time Registration Section ---*/}
                    <Box display={"flex"} gap={"20px"} width={"100%"} flexDirection={{base: "column", md: "row"}}>
                        <Box color={"var(--black)"} bg={"var(--white)"} rounded={"lg"} mt={["25px", "35px"]}
                             width={{base: "100%", md: "70%"}}>

                            <Box p={["10px", "20px"]}>

                                <Text textStyle={["lg", "xl"]}
                                      display={"flex"} gap={"1"} alignItems={"center"}><Plus color={"var(--primary)"}/>Record
                                    worked hours</Text>

                                <Stack direction={{base: "column", md: "row"}} gap={10} mt={"30px"}>

                                    {/*--- Time Start-End Section ---*/}
                                    <Field.Root required color={"var(--black)"}>
                                        <Field.Label>Time Start<Field.RequiredIndicator/></Field.Label>
                                        <InputGroup
                                            endElement={<Clock onClick={() => handleOpenPicker(startTimeInputRef)}
                                                               color="var(--primary)" cursor={"pointer"}/>}>
                                            <Input type={"time"} ref={startTimeInputRef}/>
                                        </InputGroup>
                                    </Field.Root>


                                    <Field.Root required color={"var(--black)"}>
                                        <Field.Label>Time End<Field.RequiredIndicator/></Field.Label>
                                        <InputGroup
                                            endElement={<Clock7 onClick={() => handleOpenPicker(endTimeInputRef)}
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

                                    <Select.Root collection={activities} size="sm">
                                        <Select.HiddenSelect/>
                                        <Select.Label>Select Activity</Select.Label>
                                        <Select.Control>
                                            <Select.Trigger>
                                                <Select.ValueText placeholder="Select Activity"
                                                                  _placeholder={{color: "var(--grey)"}}/>
                                            </Select.Trigger>
                                            <Select.IndicatorGroup>
                                                <Select.Indicator/>
                                            </Select.IndicatorGroup>
                                        </Select.Control>

                                        <Portal>
                                            <Select.Positioner>
                                                <Select.Content>
                                                    {activities.items.map((activity) => (
                                                        <Select.Item item={activity} key={activity.value}>
                                                            {activity.label}
                                                            <Select.ItemIndicator/>
                                                        </Select.Item>
                                                    ))}
                                                </Select.Content>
                                            </Select.Positioner>
                                        </Portal>
                                    </Select.Root>

                                    <Field.Root color={"var(--black)"}>
                                        <Field.Label>Hourly Rates</Field.Label>
                                        <InputGroup endElement={<DollarSign color="var(--primary)"/>}>
                                            <Input disabled type={"text"}/>
                                        </InputGroup>
                                    </Field.Root>

                                </Stack>

                                <Button mt={["30px", "50px"]} w={"100%"} variant="subtle" type="submit"
                                        bg={"var(--primary)"} _hover={{
                                    bg: "var(--primary-600)", transform: "translateY(1px)",
                                    shadow: "sm",
                                }} textStyle={["md", "lg"]}><Plus/>Record Time</Button>

                            </Box>
                        </Box>

                        {/*--- Right-Side-Info Section ---*/}
                        <Box width={{base: "100%", md: "30%"}}>

                            {/*--- Total Hours Section ---*/}
                            <Box bg={"var(--white)"} rounded={"lg"} mt={["25px", "35px"]}
                                 boxShadow="0px 4px 12px rgba(0, 0, 0, 0.08)">
                                <Box width={"100%"} p={["10px", "20px"]}>
                                    <Text textAlign={"center"} color={"var(--primary)"} fontWeight={"bold"}
                                          textStyle={"2xl"}>0.0</Text>
                                    <Text textAlign={"center"} color={"var(--black)"} fontWeight={"normal"}
                                          textStyle={"md"}>Total Hours Worked</Text>
                                </Box>
                            </Box>

                            {/*--- Gross Estimate Section ---*/}
                            <Box bg={"var(--white)"} rounded={"lg"} mt={["25px", "35px"]}
                                 boxShadow="0px 4px 12px rgba(0, 0, 0, 0.08)">
                                <Box width={"100%"} p={["10px", "20px"]}>
                                    <Text textAlign={"center"} color={"var(--accent)"} fontWeight={"bold"}
                                          textStyle={"2xl"}>0.0</Text>
                                    <Text textAlign={"center"} color={"var(--black)"} fontWeight={"normal"}
                                          textStyle={"md"}>RON Estimative Gross</Text>
                                </Box>
                            </Box>

                            {/*--- Tricks Section ---*/}
                            <Box bg={"var(--accent)"} rounded={"lg"} mt={["25px", "35px"]}
                                 boxShadow="0px 4px 12px rgba(0, 0, 0, 0.08)">
                                <Box width={"100%"} p={["10px", "20px"]}>
                                    <Text textAlign={"start"} color={"var(--black)"} fontWeight={"semibold"}
                                          textStyle={"md"} mb={"10px"}>Tips & Tricks</Text>
                                    <Box as={"ul"} listStyleType={"disc"} color={"var(--black)"} fontWeight={"light"}
                                         textStyle={"sm"} pl={"8px"}>
                                        <li>Complete your daily timesheet</li>
                                        <li>Review your monthly totals</li>
                                    </Box>
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                </Box>


                {/*---Monthly Summary Section ---*/}
                <Box width={"100%"} mt={["40px", "60px"]} display={"flex"}
                     flexDirection={"column"} alignItems={{base: "center", md: "start"}}>

                    <Box color={"var(--black)"}>
                        <Heading size={"lg"} textAlign={"start"}>Monthly Summary</Heading>
                    </Box>


                    <Box width={"100%"} display={"flex"} gap={"20px"} flexDirection={{base: "column", md: "row"}}>

                        {/*--- Total worked hours per month Section ---*/}
                        <Box bg={"var(--white)"} rounded={"lg"} mt={["25px", "35px"]} flex={"1"}
                             boxShadow="0px 4px 12px rgba(0, 0, 0, 0.08)">

                            <Box width={"100%"} p={["10px", "20px"]}
                                 display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"40px"}>

                                <Box width={"100%"}>
                                    <Text color={"var(--black)"} fontWeight={"normal"} textStyle={"sm"}>Total worked
                                        hours:</Text>
                                    <Text color={"var(--black)"} fontWeight={"semibold"}
                                          textStyle={"2xl"} mt={"10px"}>0.0</Text>
                                    <Text color={"var(--black)"} fontWeight={"normal"} textStyle={"sm"}>Hours per
                                        month</Text>
                                </Box>
                                <Clock color={"var(--primary)"} size={"60px"}/>
                            </Box>
                        </Box>

                        {/*--- Estimative gross salary per month Section ---*/}
                        <Box bg={"var(--white)"} rounded={"lg"} mt={["25px", "35px"]} flex={"1"}
                             boxShadow="0px 4px 12px rgba(0, 0, 0, 0.08)">

                            <Box width={"100%"} p={["10px", "20px"]}
                                 display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"40px"}>

                                <Box width={"100%"}>
                                    <Text color={"var(--black)"} fontWeight={"normal"} textStyle={"sm"}>Estimative gross
                                        salary
                                    </Text>
                                    <Text color={"var(--black)"} fontWeight={"semibold"}
                                          textStyle={"2xl"} mt={"10px"}>0.0</Text>
                                    <Text color={"var(--black)"} fontWeight={"normal"} textStyle={"sm"}>RON per
                                        month</Text>
                                </Box>
                                <DollarSign color={"var(--accent)"} size={"60px"}/>
                            </Box>
                        </Box>

                        {/*--- Estimative gross salary per month Section ---*/}
                        <Box bg={"var(--white)"} rounded={"lg"} mt={["25px", "35px"]} flex={"1"}
                             boxShadow="0px 4px 12px rgba(0, 0, 0, 0.08)">

                            <Box width={"100%"} p={["10px", "20px"]}
                                 display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"40px"}>

                                <Box width={"100%"}>
                                    <Text color={"var(--black)"} fontWeight={"normal"} textStyle={"sm"}>Hourly average
                                    </Text>
                                    <Text color={"var(--black)"} fontWeight={"semibold"}
                                          textStyle={"2xl"} mt={"10px"}>0.0</Text>
                                    <Text color={"var(--black)"} fontWeight={"normal"} textStyle={"sm"}>RON/hour</Text>
                                </Box>
                                <TrendingUp color={"var(--primary)"} size={"60px"}/>
                            </Box>
                        </Box>

                    </Box>

                </Box>


                {/*---History Table Section ---*/}
                <Box width={"100%"} mt={["40px", "60px"]} bg={"var(--white)"} rounded={"lg"} p={["20px", "30px"]}
                     color={"var(--black)"} boxShadow="0px 4px 12px rgba(0, 0, 0, 0.08)" mb={"50px"}>

                    <Heading size={"lg"} textAlign={"start"} display={"flex"} gap={"10px"}>
                        <Calendar color={"var(--primary)"}/>History Records</Heading>


                    <Table.ScrollArea rounded="md" height="260px">
                        <Table.Root size="sm" stickyHeader>
                            <Table.Header>
                                <Table.Row bg="var(--white)">
                                    <Table.ColumnHeader color={"var(--black)"}>Date</Table.ColumnHeader>
                                    <Table.ColumnHeader color={"var(--black)"}>Activity</Table.ColumnHeader>
                                    <Table.ColumnHeader color={"var(--black)"}>Hours</Table.ColumnHeader>
                                    <Table.ColumnHeader color={"var(--black)"}>Rate/Hour</Table.ColumnHeader>
                                    <Table.ColumnHeader color={"var(--black)"}>Total</Table.ColumnHeader>
                                    <Table.ColumnHeader color={"var(--black)"}
                                                        textAlign="end">Actions</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body color={"var(--black)"}>
                                {historyRecords.map((item) => (
                                    <Table.Row bg={"var(--white)"} key={item.id}>
                                        <Table.Cell>{item.date}</Table.Cell>
                                        <Table.Cell>{item.activity}</Table.Cell>
                                        <Table.Cell>{item.hours}</Table.Cell>
                                        <Table.Cell>{item.ratesHour}</Table.Cell>
                                        <Table.Cell>{item.total}</Table.Cell>
                                        <Table.Cell><Flex justify={"end"} width={"100%"}>
                                            <Trash2 size={"18px"} cursor={"pointer"}/>
                                        </Flex></Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Table.ScrollArea>


                </Box>

            </Box>


        </>
    )

}