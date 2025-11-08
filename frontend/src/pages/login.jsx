// login.jsx

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
    InputGroup, Flex, Link
} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router";


export default function Login() {

    const [show, setShow] = useState(false);
    const handleClickPassword = () => {
        setShow(!show);
    }

    return (

        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}
             bgGradient="to-tr" minH="100vh" w="100%" gradientFrom="#e7f7fe" gradientTo="#e6f6ff"
             py={["70px", "90px"]}>

            <Box width={['90%', '400px']} gap={"4"} display={"flex"} alignItems={"center"} justifyContent={"center"}
                 mb={["50px", "55px"]}>
                <img src={worklyIcon} alt="workly" width="14%" height="14%"/>
                <Text color={"var(--black)"} textStyle={["2xl", "3xl"]} fontWeight="bold">Workly</Text>
            </Box>

            <Box width={['90%', '400px']} p={['24px', '32px']} bg="#FFFFFF"
                 rounded={"xl"} shadow={"0 4px 6px rgba(0,0,0,0.1), 0 10px 15px rgba(0,0,0,0.1)"}>
                <Text textAlign={"center"} textStyle={["xl", "2xl"]} fontWeight="bold" color="#21252C">Welcome to
                    Workly</Text>
                <Text textAlign={"center"} textStyle="sm" fontWeight="light" color="#5C6470"
                      mb={["20px", "30px"]}>Sign in to your Workly account</Text>
                <VStack gap={"4"}>
                    <Field.Root>
                        <Field.Label color={"#21252C"}>Email Address</Field.Label>
                        <InputGroup flex={"1"} startElement={<Mail size={"17px"}/>}>
                            <Input color={"var(--black)"} placeholder="me@workly.com"/>
                        </InputGroup>
                    </Field.Root>
                    <Field.Root>
                        <Field.Label color={"#21252C"}>Password</Field.Label>
                        <InputGroup flex={"1"}
                                    startElement={<Lock size={"17px"}/>}
                                    endElement={show ?
                                        <Eye size={"17px"} cursor={"pointer"} onClick={handleClickPassword}
                                             transition="all 0.5s ease" _hover={{transform: "scale(1.5)"}}/> :
                                        <EyeClosed size={"17px"} cursor={"pointer"} onClick={handleClickPassword}
                                                   transition="all 0.5s ease" _hover={{transform: "scale(1.5)"}}/>}>
                            <Input color={"var(--black)"} type={show ? "text" : "password"} placeholder="password"/>
                        </InputGroup>
                    </Field.Root>
                    <Button mt={"10px"} w={"100%"} variant="subtle" type="submit"
                            bg={"var(--primary)"} _hover={{
                        bg: "var(--primary-600)", transform: "translateY(1px)",
                        shadow: "sm",
                    }}
                            textStyle={["md", "lg"]}>Login</Button>

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