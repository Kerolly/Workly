// Login.jsx

import {useState} from "react";
import '../styles/theme.css';
import worklyIcon from "@/assets/workly.svg";
import {Lock, Mail, EyeClosed, Eye} from "lucide-react";
import {
    Box,
    Button,
    Input,
    Text,
    Field,
    VStack,
    InputGroup, Flex, Link, Alert
} from "@chakra-ui/react";
import {Link as RouterLink, useNavigate} from "react-router";


export default function Login() {

    // Password show
    const [show, setShow] = useState(false);
    const handleClickPassword = () => {
        setShow(!show);
    }

    // init navigate
    const navigate = useNavigate();

    // Get data from inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);




        const handleSubmit = async (event) => {
        event.preventDefault(); // stop reloading page
        setError(null);
        setIsLoading(true);

        console.log("Send ... ", {email, password});

        try {

            // create FormData obj
            const formData = new URLSearchParams();
            formData.append("username", email);
            formData.append("password", password);


            // send the data to server
            const response = await fetch('http://127.0.0.1:8000/auth/login',{
                method: "POST",

                // transform js object into a JSON
                body: formData,
            })

            // get the data from server response
            const data = await response.json();

            if (!response.ok){
                // if the server throw an error
                // data.details -> fastapi standard
                throw new Error(data.details || "Authentication failed");
            }

            // log the ath details
            //console.log("Authentication successful", data);
            //console.log("Access token: ", data.access_token);

            // save the token to local storage (for the moment)
            localStorage.setItem("access_token", data.access_token);

            // Auth successes alert
            //alert("Authentication successful");
            //console.log("Id: ", data.id);
            if(data.role === "manager"){
                navigate(`/dashboard/employee/${data.id}`);
            }else{
                navigate(`/dashboard/employee/${data.id}`);
            }




        }catch(error) {

            // get errors
            console.log("Auth error:", error.message);
            setError(error.message);

        }finally {
            setIsLoading(false);
        }

    }


    return (

        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}
             bgGradient="to-tr" minH="100vh" w="100%" gradientFrom="#e7f7fe" gradientTo="#e6f6ff"
             py={["70px", "90px"]}>

            {/*--- Logo ---*/}
            <Box width={['90%', '400px']} gap={"4"} display={"flex"} alignItems={"center"} justifyContent={"center"}
                 mb={["50px", "55px"]}>
                <img src={worklyIcon} alt="workly" width="14%" height="14%"/>
                <Text color={"var(--black)"} textStyle={["2xl", "3xl"]} fontWeight="bold">Workly</Text>
            </Box>

            {/*--- Login Section ---*/}
            <Box width={['90%', '400px']} p={['24px', '32px']} bg="#FFFFFF"
                 rounded={"xl"} shadow={"0 4px 6px rgba(0,0,0,0.1), 0 10px 15px rgba(0,0,0,0.1)"}>
                <Text textAlign={"center"} textStyle={["xl", "2xl"]} fontWeight="bold" color="#21252C">Welcome to
                    Workly</Text>
                <Text textAlign={"center"} textStyle="sm" fontWeight="light" color="#5C6470"
                      mb={["20px", "30px"]}>Sign in to your Workly account</Text>

                {/*--- Inputs Section ---*/}
                <VStack gap={"4"}>
                    {/*--- Email Section ---*/}
                    <Field.Root required>
                        <Field.Label color={"#21252C"}>Email Address <Field.RequiredIndicator /></Field.Label>
                        <InputGroup flex={"1"} startElement={<Mail size={"17px"}/>}>
                            <Input color={"var(--black)"} placeholder="me@workly.com" type={"email"}
                                value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading}/>
                        </InputGroup>
                    </Field.Root>

                    {/*--- Password Section ---*/}
                    <Field.Root required>
                        <Field.Label color={"#21252C"}>Password <Field.RequiredIndicator /></Field.Label>
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

                    {/*--- Error Section ---*/}
                    {error && (
                        <Alert.Root status="error" size={"sm"} variant="solid">
                            <Alert.Indicator />
                            <Alert.Title>Email or password is incorrect</Alert.Title>
                        </Alert.Root>
                    )}

                    {/*--- Button Section ---*/}
                    <Button mt={"10px"} w={"100%"} variant="subtle" type="submit"
                            bg={"var(--primary)"} _hover={{
                        bg: "var(--primary-600)", transform: "translateY(1px)",
                        shadow: "sm",
                    }} textStyle={["md", "lg"]} onClick={handleSubmit}>Login</Button>

                </VStack>
                    <Flex align="center" justify="center" gap="3" w="full" my="6">
                        <Box flex="1" h="1px" bg="gray.400" />
                        <Text color="gray.500">or</Text>
                        <Box flex="1" h="1px" bg="gray.400" />
                    </Flex>

                    <Flex align="center" justify="center" gap={"3"}>
                        <Text color={"var(--black)"}>Already have an account?</Text>
                        <Link as={RouterLink} to="/signup" color={"var(--primary)"}>Sign Up</Link>
                    </Flex>


            </Box>
        </Box>

    )
}