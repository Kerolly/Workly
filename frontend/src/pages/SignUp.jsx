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
    InputGroup, Portal, Select, createListCollection, HStack, Flex, Link
} from "@chakra-ui/react";


export default function SignUp() {

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
                      mb={["20px", "30px"]}>Start managing your time now</Text>

                <VStack gap={"6"}>

                    <Field.Root>
                        <Field.Label color={"var(--black)"}>First Name</Field.Label>
                        <InputGroup flex={"1"} startElement={<User size={"17px"}/>}>
                            <Input color={"var(--black)"} placeholder="Ion"/>
                        </InputGroup>
                    </Field.Root>

                    <Field.Root>
                        <Field.Label color={"var(--black)"}>Last Name</Field.Label>
                        <InputGroup flex={"1"} startElement={<Users size={"17px"}/>}>
                            <Input color={"var(--black)"} placeholder="Popescu"/>
                        </InputGroup>
                    </Field.Root>


                    <Field.Root>
                        <Field.Label color={"var(--black)"}>Email Address</Field.Label>
                        <InputGroup flex={"1"} startElement={<Mail size={"17px"}/>}>
                            <Input color={"var(--black)"} placeholder="me@workly.com"/>
                        </InputGroup>
                    </Field.Root>

                    <Field.Root>
                        <Field.Label color={"var(--black)"}>Password</Field.Label>
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


                    <Select.Root collection={roles} size="md" defaultValue={["Employee"]}>
                        <Select.HiddenSelect />
                        <Select.Label color={"var(--black)"} >Role</Select.Label>

                        <Select.Control>
                            <Select.Trigger>
                                <HStack>
                                    <Users size={17} color={"gray"}/>
                                <Select.ValueText color={"var(--black)"}  />
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
                                        <Select.Item item={role} key={role.value}>
                                            {role.label}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>


                    <Button mt={"10px"} w={"100%"} variant="subtle" type="submit"
                            bg={"var(--primary)"} _hover={{
                        bg: "var(--primary-600)", transform: "translateY(1px)",
                        shadow: "sm",
                    }}
                            textStyle={["md", "lg"]}>Sign Up</Button>

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