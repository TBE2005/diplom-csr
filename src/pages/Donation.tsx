import { Center, NumberInput, Textarea, Button, Loader, Text, Paper, Title, Group, Progress } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery, useMutation } from "convex/react";
import { notifications } from "@mantine/notifications";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export default function Donation() {
    const navigate = useNavigate();
    const { id } = useParams();
    const target = useQuery(api.target.getById, { id: id as Id<"targets"> });
    const createDonation = useMutation(api.donation.create);
    const user = useQuery(api.user.getUserByTargetId, { targetId: id as Id<"targets"> });
    const form = useForm({
        initialValues: {
            amount: 0,
            message: "",
            targetId: id as Id<"targets">,
        },
    });

    if (!target || !user) {
        return <Center>
            <Loader />
        </Center>
    }

    const handlePayment = async (values: typeof form.values) => {
        try {
            const paymentResult = await fetch("https://cool-goldfish-200.convex.site/payment", {
                method: "POST",
                body: JSON.stringify({
                    amount: values.amount,
                    comment: values.message,
                    targetAccount: user.account,
                    access_token: localStorage.getItem("access_token") as string,
                })
            });

            const paymentData = await paymentResult.json();
            if (!paymentData || paymentData.error) {
                throw new Error(paymentData?.error?.message || "Payment failed");
            }

            await createDonation({
                amount: values.amount,
                message: values.message,
                targetId: values.targetId,
                access_token: localStorage.getItem("access_token") as string,
                toUserId: user._id as Id<"users">,
            });

            form.reset();
            notifications.show({
                title: "Успешно",
                message: "Донат успешно отправлен",
                color: "green",
            });
        } catch (error) {
            console.error("Payment error details:", error);
            notifications.show({
                title: "Ошибка",
                message: error instanceof Error ? error.message : "Донат не отправлен",
                color: "red",
            });
        }
    }

    const progress = target.total && target.collected && target.total > 0 ? (target.collected / target.total) * 100 : 0;

    return (
        <Center h="100vh" w="100vw" bg="gray.1" >
            <Paper shadow="md" p="xl" radius="md" withBorder maw={500} w="100%">
                <Button onClick={() => navigate(-1)} mb="md" leftSection={<FaArrowLeft />} variant="outline">Назад</Button>
                <Title order={2} mb="md">{target.name}</Title>
                <Text mb="md">Автор: {target.user?.name}</Text>

                <Group mb="md">
                    <Text>{target.collected} ₽ из {target.total} ₽</Text>
                    <Text c="dimmed">({progress.toFixed(1)}%)</Text>
                </Group>

                <Progress value={progress} size="md" radius="xl" mb="xl" />

                <Title order={3} mb="md">Поддержать цель</Title>

                <form onSubmit={form.onSubmit(handlePayment)} >
                    <NumberInput label="Сумма" {...form.getInputProps("amount")} mb="md" />
                    <Textarea label="Сообщение" {...form.getInputProps("message")} mb="md" />
                    <Button loading={form.submitting} type="submit" mt={4} fullWidth>Отправить</Button>
                </form>
            </Paper>
        </Center>
    )
}