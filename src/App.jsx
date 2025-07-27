import DrawerManager from "@/components/DrawerManager";
import { createDrawer } from "@/components/drawerUtils";

const OpenDrawerButton = () => {
    return (
        <button
            onClick={() => {
                createDrawer({ children: <OpenDrawerButton/> })}
            }
        >
            Open Drawer
        </button>
    );
}

export default function App() {
    return (
        <div>
            <OpenDrawerButton/>
            <DrawerManager/>
        </div>
    )
}