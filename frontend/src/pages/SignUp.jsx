// Login.jsx

import {useState} from "react";
import { Link as RouterLink} from "react-router-dom"
import '../styles/theme.css';
import worklyIcon from "@/assets/workly.svg";
import {Lock, Mail, EyeClosed, Eye, User, Users} from "lucide-react";
import {
    Box,
    Button,
    Input,
    Text,
    Field,
    VStack,
    InputGroup, Portal, Select, createListCollection, HStack, Flex, Link, Alert
} from "@chakra-ui/react";
import {useNavigate} from "react-router";


export default function SignUp() {
    const API_URL = import.meta.env.VITE_API_URL;


    const [show, setShow] = useState(false);
    const handleClickPassword = () => {
        setShow(!show);
    }

    const roles = createListCollection({
        items: [
            { label: "Employee", value: "employee" },
            { label: "Manager", value: "manager" },
        ],
    })

    // Get data from inputs
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("employee");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // create navigate
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault(); // stop reloading page
        setError(null);
        setIsLoading(true);

        // console.log("First name:", first_name);
        // console.log("Last name:", last_name);
        // console.log("Email:", email);
        // console.log("Password:", password);
        // console.log("Role:", role[0]);

        const userData = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            role: role[0].toLowerCase(),
        }

        console.log("Send data...", userData);

        try{

            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // send JSON
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                console.log("Error occured: ", data);
                const errorMsg = data.detail[0].msg;
                throw new Error(errorMsg || "Registration Failed");

            }

            // success
            console.log("Successfull registration!", data);
            alert("Account successfully registered!\nYou can now log in.");

            navigate("/login");


        }catch(err){

            console.log("Registraion error: ", err);
            setError(err.message);
        }finally {
            setIsLoading(false);
        }

    }

    return (

        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}
             bgGradient="to-tr" minH="100vh" w="100%" gradientFrom="#e7f7fe" gradientTo="#e6f6ff"
            py={["70px", "90px"]}>

            {/*--- Logo Section ---*/}
            <Box width={['90%', '400px']} gap={"4"} display={"flex"} alignItems={"center"} justifyContent={"center"}
                 mb={["50px", "55px"]}>
                <img src={worklyIcon} alt="workly" width="14%" height="14%"/>
                <Text color={"var(--black)"} textStyle={["2xl", "3xl"]} fontWeight="bold">Workly</Text>
            </Box>

            {/*--- Signup Section ---*/}
            <Box width={['90%', '400px']} p={['24px', '32px']} bg="#FFFFFF"
                 rounded={"xl"} shadow={"0 4px 6px rgba(0,0,0,0.1), 0 10px 15px rgba(0,0,0,0.1)"}>

                <Text textAlign={"center"} textStyle={["xl", "2xl"]} fontWeight="bold" color="#21252C">Welcome to
                    Workly</Text>
                <Text textAlign={"center"} textStyle="sm" fontWeight="light" color="#5C6470"
                      mb={["20px", "30px"]}>Start managing your time now</Text>

                <VStack gap={"6"}>

                    {/*--- First name Section ---*/}
                    <Field.Root required>
                        <Field.Label color={"var(--black)"}>First Name <Field.RequiredIndicator /></Field.Label>
                        <InputGroup flex={"1"} startElement={<User size={"17px"}/>}>
                            <Input color={"var(--black)"} placeholder="Ion"
                                value={first_name} onChange={(e) => setFirst_name(e.target.value)} disabled={isLoading}/>
                        </InputGroup>
                    </Field.Root>

                    {/*--- Last name Section ---*/}
                    <Field.Root required>
                        <Field.Label color={"var(--black)"}>Last Name <Field.RequiredIndicator /></Field.Label>
                        <InputGroup flex={"1"} startElement={<Users size={"17px"}/>}>
                            <Input color={"var(--black)"} placeholder="Popescu"
                                   value={last_name} onChange={(e) => setLast_name(e.target.value)} disabled={isLoading}/>
                        </InputGroup>
                    </Field.Root>

                    {/*--- Email Section ---*/}
                    <Field.Root required>
                        <Field.Label color={"var(--black)"}>Email Address <Field.RequiredIndicator /></Field.Label>
                        <InputGroup flex={"1"} startElement={<Mail size={"17px"}/>}>
                            <Input color={"var(--black)"} placeholder="me@workly.com"
                                   value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading}/>
                        </InputGroup>
                    </Field.Root>

                    {/*--- Password Section ---*/}
                    <Field.Root required>
                        <Field.Label color={"var(--black)"}>Password <Field.RequiredIndicator /></Field.Label>
                        <InputGroup flex={"1"}
                                    startElement={<Lock size={"17px"}/>}
                                    endElement={show ?
                                        <Eye size={"17px"} cursor={"pointer"} onClick={handleClickPassword}
                                             transition="all 0.5s ease" _hover={{transform: "scale(1.5)"}}/> :
                                        <EyeClosed size={"17px"} cursor={"pointer"} onClick={handleClickPassword}
                                                   transition="all 0.5s ease" _hover={{transform: "scale(1.5)"}}/>}>
                            <Input color={"var(--black)"} type={show ? "text" : "password"} placeholder="password"
                                   value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading}/>
                        </InputGroup>
                    </Field.Root>

                    {/*--- Role Section ---*/}
                    <Select.Root required collection={roles} disabled={isLoading}
                                 value={role}
                                 onValueChange={(e) =>
                                 {const [firstElement] = e.value;
                                     setRole(e.value)}} size="md">
                        <Select.HiddenSelect />
                        <Select.Label color={"var(--black)"} >Role </Select.Label>

                        <Select.Control>
                            <Select.Trigger>
                                <HStack>
                                    <Users size={17} color={"gray"}/>
                                <Select.ValueText color={"var(--black)"}/>
                                </HStack>
                            </Select.Trigger>

                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>

                        </Select.Control>

                        <Portal>
                            <Select.Positioner>
                                <Select.Content >
                                    {roles.items.map((role) => (
                                        <Select.Item item={role} key={role.value} >
                                            {role.label}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>

                    {/*--- Error Section ---*/}
                    {error && (
                        <Alert.Root status="error" size={"sm"} variant="solid">
                            <Alert.Indicator />
                            <Alert.Title>Please complete all fields</Alert.Title>
                        </Alert.Root>
                    )}

                    {/*--- Button Section ---*/}
                    <Button mt={"10px"} w={"100%"} variant="subtle" type="submit"
                            bg={"var(--primary)"} _hover={{
                        bg: "var(--primary-600)", transform: "translateY(1px)",
                        shadow: "sm",
                    }}
                            textStyle={["md", "lg"]}
                    onClick={handleSubmit}>Sign Up</Button>

                    <Flex align="center" justify="center" gap="3" w="full" my="6">
                        <Box flex="1" h="1px" bg="gray.400" />
                        <Text color="gray.500">or</Text>
                        <Box flex="1" h="1px" bg="gray.400" />
                    </Flex>

                    <Flex gap={"3"}>
                        <Text color={"var(--black)"}>Already have an account?</Text>
                        <Link as={RouterLink} to="/login" color={"var(--primary)"}>Log In</Link>
                    </Flex>

                </VStack>
            </Box>
        </Box>

    )
}