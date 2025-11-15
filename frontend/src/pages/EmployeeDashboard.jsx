// EmployeeDashboard.jsx

import Header from "@/pages/components/Header.jsx"
import {
    Box,
    Button,
    Input,
    Text,
    HStack, Flex, Link, Alert
} from "@chakra-ui/react";
import {useState} from "react";
import {useParams} from "react-router-dom";


export default function EmployeeDashboard() {


    const employeeId = useParams().employeeId;

    return (
        // Header
        <>
        <Header />
        <Text>Here is the employeeId: {employeeId}</Text>
        </>
    )

}