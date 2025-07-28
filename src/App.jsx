import DrawerManager from "@/components/DrawerManager";
import { createDrawer } from "@/components/drawerUtils";
import Button from "./components/Button";

const OpenDrawerButton = () => {
    return (
        <Button onClick={() => createDrawer({ children: <OpenDrawerButton /> })}>
            Open Drawer
        </Button>
    );
}

export default function App() {
    return (
        <div>
            <OpenDrawerButton />
            <DrawerManager />
        </div>
    )
}