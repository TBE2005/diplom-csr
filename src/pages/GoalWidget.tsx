import { useQuery } from "convex/react";
import { Card, Center, Text } from "@mantine/core";
import { useParams } from "react-router";
import { api } from "../../convex/_generated/api";
import { GoalTemplate } from "../components/GoalTemplate";
import type { Id } from "../../convex/_generated/dataModel";


export default function GoalWidget() {
    const { id } = useParams();

    const target = useQuery(api.target.getWithGoal, { targetId: id as Id<"targets"> });
    if (!target || !target.goal) {
        return <Center h="100vh" w="100vw">
            <Text>Goal not found</Text>
        </Center>
    }
    return (
        <Center h="100vh" w="100vw">
            <Card bg="none" p={0} m={0} w={250}>
                <GoalTemplate {...target.goal} collected={target.collected || 0} total={target.total || 0} name={target.name || ""} />
            </Card>
        </Center>

    )
}