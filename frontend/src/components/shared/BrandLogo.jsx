// BrandLogo.jsx


import StafyLogo from "@/assets/stafy_logo.svg";
import {Flex, Heading, Text} from "@chakra-ui/react";

export default function BrandLogo(props) {
    return (
        <Flex direction={"row"} gap={"10px"} align={"center"}
              mt={props.mt} mb={props.mb} ml={props.ml} mr={props.mr}
                display={props.isCollapsed ? "none" : "flex"}>

            <img src={StafyLogo} alt={"Stafy Logo"} width="18%" height="18%"/>

            <Flex direction={"column"}>
                <Heading color={"white"}>Stafy</Heading>
                <Text color={"white"} fontSize={"10px"}>{props.text}</Text>
            </Flex>

        </Flex>
    )
}