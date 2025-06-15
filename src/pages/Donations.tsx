import { useQuery } from "convex/react";
import { Card, Text, Group, Badge, Stack, Container, Title, Divider, Loader, Center } from "@mantine/core";
import { FaMoneyBillWave } from "react-icons/fa";
import { Tabs } from '@mantine/core';
import { api } from "../../convex/_generated/api";

export default function Donations() {
    const myDonations = useQuery(api.donation.getMyDonations, { access_token: localStorage.getItem("access_token") as string });
    const myDonationsTo = useQuery(api.donation.getMyDonationsTo, { access_token: localStorage.getItem("access_token") as string });
    if (!myDonations) {
        return <Center>
            <Loader />
        </Center>
    }
    if (myDonations.length === 0) {
        return <Center>
            <Text>Донатов нет</Text>
        </Center>
    }
    return (
        <Container size="xl" p="md">
            <Title order={2} mb="md">Донаты</Title>
            <Divider mb="lg" />
            <Tabs defaultValue="from">
                <Tabs.List>
                    <Tabs.Tab value="from">Отправленные</Tabs.Tab>
                    <Tabs.Tab value="to">Полученные</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="from" mt="md">
                    <Stack gap="md">
                        {myDonations?.map(donation => (
                            <Card key={donation._id} withBorder shadow="sm" radius="md" p="md" w="100%">
                                <Group justify="space-between" mb="xs">
                                    <Group>
                                        <FaMoneyBillWave size={20} />
                                        <Text fw={700} size="lg">{donation.amount} руб.</Text>
                                    </Group>
                                    {donation.target?.name && (
                                        <Badge color="blue" variant="light">
                                            {donation.target.name}
                                        </Badge>
                                    )}
                                </Group>
                                <Text fw={700} size="lg">{donation.toUser?.name}</Text>
                                {donation.message && (
                                    <Text c="dimmed" size="sm">
                                        {donation.message}
                                    </Text>
                                )}
                            </Card>
                        ))}
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel value="to" mt="md">
                    {myDonationsTo?.map(donation => (
                        <Card key={donation._id} withBorder shadow="sm" radius="md" p="md" mt="md" w="100%">
                            <Group justify="space-between" mb="xs">
                                <Group>
                                    <FaMoneyBillWave size={20} />
                                    <Text fw={700} size="lg">{donation.amount} руб.</Text>
                                </Group>
                                {donation.target?.name && (
                                    <Badge color="blue" variant="light">
                                        {donation.target.name}
                                    </Badge>
                                )}
                            </Group>
                            <Text fw={700} size="lg">{donation.fromUser?.name}</Text>
                            {donation.message && (
                                <Text c="dimmed" size="sm">
                                    {donation.message}
                                </Text>
                            )}
                        </Card>
                    ))}
                </Tabs.Panel>
            </Tabs>
            <Stack gap="md">


            </Stack>
        </Container>
    );
}
