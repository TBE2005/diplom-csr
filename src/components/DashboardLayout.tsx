import { Group, NavLink, TextInput, Badge, AppShell, Burger } from '@mantine/core';
import { useMutation, useQuery } from 'convex/react';
import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { api } from '../../convex/_generated/api';
import { Outlet, useLocation } from 'react-router';
import { NavLink as Link } from 'react-router';

const links = [
    { label: 'Цели', href: '/dashboard', isIndex: true },
    { label: 'Донаты', href: '/dashboard/donations', isIndex: false },
    { label: 'Сборы', href: '/dashboard/goals', isIndex: false },
    { label: 'Оповещения', href: '/dashboard/alerts', isIndex: false },
]


export default function DashboardContent() {
    const location = useLocation();
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    console.log(location)
    const user = useQuery(api.user.getUserByAccessToken, {
        access_token: localStorage.getItem('access_token') as string
    });

    const updateUser = useMutation(api.user.update);

    const form = useForm({
        initialValues: {
            name: user?.user?.name || '',
        },
    });
    useEffect(() => {
        if (user?.user?.name) {
            form.setValues({ name: user?.user?.name });
        }
    }, [user?.user?.name]);

    const [debouncedValues] = useDebouncedValue(form.values, 500);

    useEffect(() => {
        if (user?.user?._id && debouncedValues.name !== user?.user.name && debouncedValues.name !== '') {
            updateUser({ access_token: localStorage.getItem('access_token') as string, name: debouncedValues.name });
            notifications.show({
                title: "Успешно",
                message: "Имя обновлено",
                color: "green",
            });
        }
    }, [debouncedValues, user]);


    return (
        <AppShell
            header={{ height: 70 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" pt="xs" pb="xs">
                    <Group>
                        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                    </Group>
                    <Group visibleFrom="sm">
                        <Badge>Собрано: {user?.sum}</Badge>
                        <TextInput {...form.getInputProps("name")} />
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Group hiddenFrom="sm" mb="md">
                    <Badge>Собрано: {user?.sum}</Badge>
                    <TextInput {...form.getInputProps("name")} />
                </Group>
                {links.map((link) => (
                    <NavLink 
                        label={link.label} 
                        to={link.href} 
                        component={Link} 
                        key={link.href} 
                        active={
                            link.isIndex 
                                ? location.pathname === '/dashboard' 
                                : location.pathname === link.href
                        } 
                    />
                ))}
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}