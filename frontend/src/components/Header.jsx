// Header.jsx

import worklyIcon from "@/assets/workly.svg";
import "@/styles/theme.css";
import {
    Box,
    Button,
    Input,
    Text,
    HStack, Flex, Alert
} from "@chakra-ui/react";
import {logout} from "@/authHandler.js";
import {useNavigate, Link} from "react-router";
import {LogOut} from "lucide-react"

export default function Header(){

    // Navigator
    const navigate = useNavigate();

    const handleLogout = () => {
        logout() // call logout
        navigate("/login")
    }

    return (
        <Flex direction="row" justify="space-between" alignItems={"center"} px={"50px"} height={"70px"} bg={"var(--primary-50)"}
              shadow={"1px 1px 3px 0 rgba(0, 0, 0, 1)"}>

            {/*--- Logo Section ---*/}
            <Box gap={"4"} display={"flex"} alignItems={"center"}>
                <img src={worklyIcon} alt="workly" width="12%" height="12%"/>
                <Text color={"var(--black)"} textStyle={["lg", "2xl"]} fontWeight="bold">Workly</Text>
            </Box>

            {/*--- Menu Section ---*/}
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                <Link to={"/profile"}><Text>Profile</Text></Link>
                <Button variant="plain" bg={{ base: "transparent", _hover: "var(--primary)" }}
                        color={{ base: "var(--black)", _hover: "var(--primary-50)" }}
                        onClick={handleLogout}><LogOut/> Logout</Button>
            </Box>

        </Flex>
    )

}
