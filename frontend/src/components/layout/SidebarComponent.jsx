// SidebarComponent.jsx

import {Box, Flex, Icon, Text} from "@chakra-ui/react";
import {ArrowLeft, ArrowRight} from "lucide-react";
import BrandLogo from "@/components/shared/BrandLogo.jsx";
import {useState} from "react";

export default function SidebarComponent() {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        //console.log("Sidebar toggled");
        setIsCollapsed(!isCollapsed); // toggle the sidebar
    }

    return (
        <Box width={ isCollapsed ?  {base: 'none', lg: "50px", xl: "60px"} : {lg: "240px", xl: "260px"}}
             height={"100vh"} bg={"secondary.800"}
             transition={"width 0.5s ease"}
             overflow={"hidden"} whiteSpace={"nowrap"}>

            <Flex>
                <BrandLogo mt={"10px"} ml={"16px"} text={"Portal Manager"} isCollapsed={isCollapsed}/>

                {isCollapsed ?
                    // if the sidebar is collapsed
                    <Icon as={ArrowRight} cursor={"pointer"} color={{base: "secondary.600", _hover: "secondary.300"}}
                          transition={"all 0.2s"} onClick={toggleSidebar}
                          mt={"20px"} ml={"16px"}/> :

                    // if the sidebar isn't collapsed
                    <Icon as={ArrowLeft} cursor={"pointer"} color={{base: "secondary.600", _hover: "secondary.300"}}
                          transition={"all 0.2s"} onClick={toggleSidebar}
                          mt={"20px"} mr={"16px"}/>}

            </Flex>


            <Text>Sidebar</Text>
        </Box>
    )
}