import { Button, Card, ColorInput, SimpleGrid, Skeleton } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useMutation, useQuery } from "convex/react";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect } from "react";
import { notifications } from '@mantine/notifications';
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";
import { AlertTemplate } from "../components/AlertTemplate";
export default function Alerts() {
    const alerts = useQuery(api.alert.getByUser, {
        access_token: localStorage.getItem("access_token") as string
    });
    const createAlert = useMutation(api.alert.create);
    return (
        <>
            <Button onClick={() => createAlert({
                access_token: localStorage.getItem("access_token") as string
            })}>Добавить оповещение</Button>
            <SimpleGrid mt={'md'} cols={{ sm: 1, md: 2, lg: 3 }}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}>
                {alerts ? alerts?.map((alert) => (
                    <AlertCard key={alert._id} {...alert} />
                )) : (
                    <>
                        {[1, 2, 3].map((i) => (
                            <Card key={i} shadow="sm" padding="lg" radius="md" withBorder>
                                <Card.Section>
                                    <Skeleton height={150} radius={0} />
                                </Card.Section>
                                <SimpleGrid cols={2} mt="md">
                                    <Skeleton height={36} mt="sm" />
                                    <Skeleton height={36} mt="sm" />
                                </SimpleGrid>
                                <Skeleton height={36} mt="md" width="40%" />
                            </Card>
                        ))}
                    </>
                )}
            </SimpleGrid>
        </>
    )
}

function AlertCard(initialValues: Doc<"alerts">) {
    const form = useForm({
        initialValues: {
            _id: initialValues._id,
            _creationTime: initialValues._creationTime,
            backgroundColor: initialValues.backgroundColor,
            textColor: initialValues.textColor,
            userId: initialValues.userId,
        },
    });
    const updateAlert = useMutation(api.alert.update);
    const deleteAlert = useMutation(api.alert.remove);

    const [debouncedValues] = useDebouncedValue(form.values, 500);

    useEffect(() => {
        async function update() {
            if (
                debouncedValues.backgroundColor !== initialValues.backgroundColor ||
                debouncedValues.textColor !== initialValues.textColor
            ) {
                try {
                    await updateAlert({
                        id: initialValues._id,
                        backgroundColor: debouncedValues.backgroundColor,
                        textColor: debouncedValues.textColor,
                        access_token: localStorage.getItem("access_token") as string
                    });
                    notifications.show({
                        title: "Оповещение обновлено",
                        message: "Оповещение обновлено успешно",
                        color: "green"
                    });
                } catch (error) {
                    notifications.show({
                        title: "Ошибка",
                        message: "Ошибка при обновлении оповещения" + error,
                        color: "red"
                    });
                }
            }
        }
        update();
    }, [
        debouncedValues
    ]);

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <AlertTemplate {...form.values} name="Template" message="Template" amount={1000} />
            </Card.Section>
            <SimpleGrid cols={2} mt="md">
                <ColorInput description="Цвет фона" key={form.key('backgroundColor')} {...form.getInputProps('backgroundColor')} />
                <ColorInput description="Цвет текста" key={form.key('textColor')} {...form.getInputProps('textColor')} />
            </SimpleGrid>
            <Button variant="outline" color="red" mt="md" onClick={() => deleteAlert({ id: initialValues._id })}>Удалить</Button>
        </Card>
    )
}
