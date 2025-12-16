// EmployeeDashboard.jsx

import Header from "@/components/Header.jsx"
import "@/styles/theme.css";
import {
    AbsoluteCenter,
    Box,
    Button,
    createListCollection,
    Field, Flex,
    Heading,
    Input,
    InputGroup,
    Portal,
    Select, Spinner,
    Stack,
    Table,
    Text, Popover, Alert, Pagination, IconButton, ButtonGroup
} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Calendar, Clock, Clock7, DollarSign, Plus, Trash2, TrendingUp} from "lucide-react"
import {authFetch} from "@/apiClient.js";
import {calculateHours, getHourlyRates, roundTimeQuarterHour} from "@/pages/dashboard/utils/hoursHandler.js";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";


export default function EmployeeDashboard() {

    const dateInputRef = useRef(null)
    const startTimeInputRef = useRef(null)
    const endTimeInputRef = useRef(null)

    // Fetch data from the server
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    // Pagination
    const [page, setPage] = useState(1);



    const getDefaultTime = (add = 0) =>{

        const now = new Date();

        let hour = (now.getHours() + add) % 24;

        const hourString = hour.toString().padStart(2, "0"); // From 9 -> 09

        return `${hourString}:00`;
    }


    const getCurrentDate = () => {
        const today = new Date();

        const day = String(today.getDate()).padStart(2, "0");
        const month = String((today.getMonth() + 1)).padStart(2, "0");
        const year = today.getFullYear();

        //console.log(`${year}-${month}-${day}`)
        return `${year}-${month}-${day}`;

    }

    // --- Getting data from inputs ---
    const [startTime, setStartTime] = useState(""); //getDefaultTime(-2)
    const [endTime, setEndTime] = useState(getDefaultTime(0));
    const [date, setDate] = useState(getCurrentDate());
    const [activity, setActivity] = useState([]);


    // load data function
    const loadData = async () =>{
        try{
            // getting the data from the server
            const data = await authFetch("GET", `/dashboard/employee`);
            setDashboardData(data);
        }catch (err){
            console.log("[Fetch ERROR]: ", err.message);
            setError(err.message);
        }

    }

    // run only once, when load the page
    useEffect( () => {
        const fetchEmployeeUserData = async () => {

            setIsLoading(true);
            loadData().finally(() => setIsLoading(false)); // set the loading to false

        };
        fetchEmployeeUserData();

    }, [])

    if (!dashboardData){
        return (
            <Box bg={"var(--grey)"} minH="100vh">
                <AbsoluteCenter>
                    <Spinner size={"xl"} color={"var(--primary)"}/>
                </AbsoluteCenter>
            </Box>
        )
    }

    //console.log(dashboardData.user_info);



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
            {label: "Make-up lesson", value: "Make-up lesson"},
            {label: "Other", value: "Other"},
        ],
    })

    //console.log(dashboardData.time_entries)

    // Create an array with all the history records
    const historyRecords = []
    for(let i in dashboardData.time_entries){
        //console.log("Entry: ", dashboardData.time_entries[i])
        historyRecords.push(dashboardData.time_entries[i])
    }

    // Pagination
    const pageSize = 5;
    const startPage = (page - 1) * pageSize;
    const endPage = startPage + pageSize;
    const visibleHistoryRecords = historyRecords.slice(startPage, endPage);

    //console.log("Rates: ", dashboardData.rates_map["Course"])


    const checkInputs = () =>{
        if (startTime === "" || endTime === "" || date === "" || activity[0] === ""){
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // stop reloading page
        setError(null);
        setIsLoading(true);

        // console.log("Start time: ", startTime);
        // console.log("End time: ", endTime);
        // console.log("Date: ", date);
        // console.log("Activity: ", activity);
        // console.log("Time: ", calculateHours(startTime, endTime, date));

        // check if all inputs are filled
        if (checkInputs() === false){
            setError("Please fill all the inputs!");
            return
        }

        // check if the time is valid
        if (calculateHours(startTime, endTime, date).error != null){
            setError(calculateHours(startTime, endTime, date).error);
            return
        }

        const data = {
            time_start: `${date}T${startTime}`,
            time_end: `${date}T${endTime}`,
            activity: activity[0],

        }

        try{
            setIsLoading(true)
            // send the date to the server
            const response = await authFetch("POST", "/dashboard/employee/time-entry", data);

            // set a success message
            setSuccessMsg("Time recorded successfully!");

            // empty the inputs
            setStartTime(""); //getDefaultTime(-2)
            setEndTime(getDefaultTime(0));
            setDate(getCurrentDate());
            setActivity([]);
            await loadData(); //reload only the data


            // set a timer for success message, 5s
            setTimeout(() => setSuccessMsg(null), 5000)
            //console.log("Saved successfully: ", response);
            //alert("Recorded successfully!");


        } catch(err){
            console.log(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }


    }





    const handleDeleteRecord = async(idActivity) => {
        console.log("Delete record clicked");

        setError(null);
        setIsLoading(true);

        try{

            // send delete method
            const response = await authFetch("DELETE", `/dashboard/employee/time-entry/${idActivity}`);

            console.log("Delete successful: ", response);
            window.location.reload();
        }catch(err){
            console.log("There were some errors: ", err.message);
            setError(err.message);
        }finally {
            setIsLoading(false);
        }


    }





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
                        <Text textAlign={"start"} textStyle={["2xl", "3xl"]} fontWeight={"bold"}>Welcome, {dashboardData.user_info.first_name}</Text>
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
                                            <Input type={"time"} ref={startTimeInputRef}
                                            value={startTime} onChange={(e) => setStartTime(e.target.value)}/>
                                        </InputGroup>
                                    </Field.Root>


                                    <Field.Root required color={"var(--black)"}>
                                        <Field.Label>Time End<Field.RequiredIndicator/></Field.Label>
                                        <InputGroup
                                            endElement={<Clock7 onClick={() => handleOpenPicker(endTimeInputRef)}
                                                                color="var(--primary)" cursor={"pointer"}/>}>
                                            <Input type={"time"} ref={endTimeInputRef} step={"900"}
                                            value={endTime} onChange={(e) => setEndTime(e.target.value)}/>
                                        </InputGroup>
                                    </Field.Root>

                                </Stack>

                                {/*--- Date-Hour Section ---*/}
                                <Stack direction={{base: "column", md: "row"}} gap={10} mt={"30px"}>

                                    <Field.Root required color={"var(--black)"}>
                                        <Field.Label>Date <Field.RequiredIndicator/></Field.Label>
                                        <InputGroup endElement={<Calendar onClick={() => handleOpenPicker(dateInputRef)}
                                                                          color="var(--primary)" cursor={"pointer"}/>}>
                                            <Input type={"date"} ref={dateInputRef}
                                            value={date} onChange={(e) => setDate(e.target.value)}/>
                                        </InputGroup>
                                    </Field.Root>

                                    <Field.Root color={"var(--black)"}>
                                        <Field.Label>Total Hours</Field.Label>
                                        <InputGroup endElement={<Clock color="var(--primary)"/>}>
                                            <Input disabled type={"text"} placeholder={calculateHours(startTime, endTime, date).hours+" h"}/>
                                        </InputGroup>
                                    </Field.Root>

                                </Stack>

                                {/*--- Job-Pay Section ---*/}
                                <Stack direction={{base: "column", md: "row"}} gap={10} mt={"30px"}>

                                    <Select.Root required collection={activities} size="sm"
                                                 value={activity}
                                                 onValueChange={(e) =>
                                                 {setActivity(e.value)}} >
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
                                            <Input disabled type={"text"} placeholder={getHourlyRates(dashboardData, activity)+" RON"}/>
                                        </InputGroup>
                                    </Field.Root>

                                </Stack>

                                {/*--- Error Section ---*/}
                                {error && (
                                    <Alert.Root mt={"20px"} status="error" size={"sm"} variant="solid">
                                        <Alert.Indicator />
                                        <Alert.Title>{error}</Alert.Title>
                                    </Alert.Root>
                                )}

                                {/*--- Success Section ---*/}
                                {successMsg && (
                                    <Alert.Root mt={"20px"} status="success" size={"sm"} variant="solid">
                                        <Alert.Indicator />
                                        <Alert.Title>{successMsg}</Alert.Title>
                                    </Alert.Root>
                                )}

                                <Button mt={["20px", "30px"]} w={"100%"} variant="subtle" type="submit"
                                        bg={"var(--primary)"} _hover={{
                                    bg: "var(--primary-600)", transform: "translateY(1px)",
                                    shadow: "sm",
                                }} textStyle={["md", "lg"]} onClick={handleSubmit}><Plus/>Record Time</Button>

                            </Box>
                        </Box>

                        {/*--- Right-Side-Info Section ---*/}
                        <Box width={{base: "100%", md: "30%"}}>

                            {/*--- Total Hours Section ---*/}
                            <Box bg={"var(--white)"} rounded={"lg"} mt={["25px", "35px"]}
                                 boxShadow="0px 4px 12px rgba(0, 0, 0, 0.08)">
                                <Box width={"100%"} p={["10px", "20px"]}>
                                    <Text textAlign={"center"} color={"var(--primary)"} fontWeight={"bold"}
                                          textStyle={"2xl"}>{dashboardData.total_hours.toFixed(1)}</Text>
                                    <Text textAlign={"center"} color={"var(--black)"} fontWeight={"normal"}
                                          textStyle={"md"}>Total Hours Worked</Text>
                                </Box>
                            </Box>

                            {/*--- Gross Estimate Section ---*/}
                            <Box bg={"var(--white)"} rounded={"lg"} mt={["25px", "35px"]}
                                 boxShadow="0px 4px 12px rgba(0, 0, 0, 0.08)">
                                <Box width={"100%"} p={["10px", "20px"]}>
                                    <Text textAlign={"center"} color={"var(--accent)"} fontWeight={"bold"}
                                          textStyle={"2xl"}>{dashboardData.total_gross_salary.toFixed(2)}</Text>
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
                                          textStyle={"2xl"} mt={"10px"}>{dashboardData.total_hours.toFixed(1)}</Text>
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
                                          textStyle={"2xl"} mt={"10px"}>{dashboardData.total_gross_salary.toFixed(2)}</Text>
                                    <Text color={"var(--black)"} fontWeight={"normal"} textStyle={"sm"}>RON per
                                        month</Text>
                                </Box>
                                <DollarSign color={"var(--accent)"} size={"60px"}/>
                            </Box>
                        </Box>

                        {/*--- Hourly Average Section ---*/}
                        <Box bg={"var(--white)"} rounded={"lg"} mt={["25px", "35px"]} flex={"1"}
                             boxShadow="0px 4px 12px rgba(0, 0, 0, 0.08)">

                            <Box width={"100%"} p={["10px", "20px"]}
                                 display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"40px"}>

                                <Box width={"100%"}>
                                    <Text color={"var(--black)"} fontWeight={"normal"} textStyle={"sm"}>Hourly average
                                    </Text>
                                    <Text color={"var(--black)"} fontWeight={"semibold"}
                                          textStyle={"2xl"} mt={"10px"}>{dashboardData.hourly_average.toFixed(2)}</Text>
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



                        <Stack>
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
                                {visibleHistoryRecords.map((item) => (
                                    <Table.Row bg={"var(--white)"} key={item.id}>
                                        <Table.Cell>{item.activity_date}</Table.Cell>
                                        <Table.Cell>{item.activity_name}</Table.Cell>
                                        <Table.Cell>{item.activity_hours}</Table.Cell>
                                        <Table.Cell>{item.rate_hour} RON</Table.Cell>
                                        <Table.Cell>{item.activity_total} RON</Table.Cell>
                                        <Table.Cell><Flex justify={"end"} width={"100%"}>

                                            <Popover.Root lazyMount unmountOnExit closeOnEscape={true} closeOnInteractOutside={true}>
                                                <Popover.Trigger asChild>
                                                    <Trash2 size={"18px"} cursor={"pointer"}/>
                                                </Popover.Trigger>
                                                <Portal>
                                                    <Popover.Positioner>
                                                        <Popover.Content width={"auto"} css={{"--popover-bg": "var(--primary)"}}>
                                                            <Popover.Arrow />
                                                            <Popover.Body display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                                                <Popover.Title fontWeight="medium">Are you sure?</Popover.Title>
                                                                <Button size={"sm"} mt={"10px"} onClick={() => {handleDeleteRecord(item.id)}}
                                                                >Yes</Button>
                                                            </Popover.Body>
                                                        </Popover.Content>
                                                    </Popover.Positioner>
                                                </Portal>
                                            </Popover.Root>

                                        </Flex></Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>

                            <Pagination.Root count={historyRecords.length} pageSize={pageSize} page={page}
                                onPageChange={(e) => setPage(e.page)}>
                                <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                                    <Pagination.PrevTrigger asChild>
                                        <IconButton>
                                            <LuChevronLeft />
                                        </IconButton>
                                    </Pagination.PrevTrigger>

                                    <Pagination.Items
                                        render={(page) => (
                                            <IconButton color={{ base: "var(--primary)", _hover: "var(--white)" }}
                                                        bg={{base: "ghost", _hover: "var(--primary)"}}>
                                                {page.value}
                                            </IconButton>
                                        )}
                                    />

                                    <Pagination.NextTrigger asChild>
                                        <IconButton>
                                            <LuChevronRight />
                                        </IconButton>
                                    </Pagination.NextTrigger>
                                </ButtonGroup>
                            </Pagination.Root>

                        </Stack>




                </Box>

            </Box>


        </>
    )

}