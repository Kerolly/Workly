// InfoCard.jsx

import {Box, Icon, Text} from "@chakra-ui/react";
import {TrendingUp} from "lucide-react";


/**
 * Card component for displaying a small KPI/metric (title + value + subtitle),
 * with an optional right-side icon.
 *
 * @component
 * @param {string} upperText - Text shown on the first line (label).
 * @param {string|number} text - Main value displayed in the middle (can be number or text).
 * @param {string} lowerText - Text shown on the last line (unit/description).
 * @param {boolean} icon= - Whether to display the icon .
 * @param {string} [iconSize="60px"]
 *  Icon size passed to Chakra `Icon` as `boxSize` (e.g. `"60px"` or `60`).
 * @param {string} [bg="white"]
 *  Background color for the card (e.g. `"white"`, `"var(--white)"`, Chakra token).
 * @returns {import("react").JSX.Element}
 */


export default function InfoCard(
    {
        upperText,
        upperTextColor="black",
        text,
        textColor="black",
        lowerText,
        lowerTextColor="black",
        icon,
        iconSize = "60px",
        bg = "white",
        ...rest
    }) {


    return (

        <Box bg={bg} borderRadius={"15px"} mt={["25px", "35px"]} flex={"1"}
             boxShadow="0px 4px 12px rgba(0, 0, 0, 0.08)" {...rest}>

            <Box width={"100%"} maxWidth={"275px"} p={["10px", "20px"]}
                 display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} gap={"20px"}>

                <Box>
                    <Text color={upperTextColor} fontWeight={"normal"} textStyle={"sm"}>{upperText}
                    </Text>

                    <Text color={textColor} fontWeight={"semibold"}
                          textStyle={"2xl"} mt={"10px"}>{text}</Text>
                    <Text color={lowerTextColor} fontWeight={"normal"} textStyle={"sm"}>{lowerText}</Text>
                </Box>
                {icon ? <Icon as={icon} boxSize={iconSize} color={"primary.500"}/> : null}

            </Box>
        </Box>
    )
}