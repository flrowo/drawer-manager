import { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import EventBus from "@/services/EventBus";
import Drawer from "@/components/Drawer";
import { DRAWER_EVENT } from "@/components/drawerUtils";

const cssVars = {
    width: "75vw",
    transitionDuration: 300,
};

const DrawerStyleSheet = () => (
    <style>{`
        .drawer {
            position: fixed;
            right: -${cssVars.width};
            top: 0;
            height: 100%;
            background: #fff;
            display: flex;
            box-shadow: -5px 0 15px rgba(0,0,0,0.2);
            transition: right ${cssVars.transitionDuration}ms ease-in-out, width ${cssVars.transitionDuration}ms ease-in-out;
        }
        .drawer.open {
            right: 0;
        }
        .drawer-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.5);
            opacity: 0;
            transition: opacity ${cssVars.transitionDuration}ms ease-in-out;
            pointer-events: none;
        }
        .drawer-overlay.open {
            opacity: 1;
            pointer-events: auto;
        }
        .drawer-controls {
            width: 60px;
            background-color: #444444;
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-shrink: 0;
        }
        .drawer-controls svg {
            width: 24px;
            height: 24px;
            color: #ffffffff;
        }
        .drawer-content {
            flex-grow: 1;
            overflow-y: auto;
            padding: 20px;
        }
    `}</style>
);

export default function DrawerManager() {
	const [drawers, setDrawers] = useState([]);
    
    const createInstance = useCallback((props) => {
        setDrawers(prev => [
            ...prev.map(d => ({ ...d, isFullScreen: true })),
            { ...props, isFullScreen: false }
        ]);
    }, []);

    const destroyInstance = useCallback((id) => {
        setDrawers(prev => {
            const remaining = prev.filter(d => d.id !== id);
            if (remaining.length > 0) {
                remaining[remaining.length - 1].isFullScreen = false;
            }
            return remaining;
        });
    }, []);

	useEffect(() => {
		EventBus.on(DRAWER_EVENT.CREATE, createInstance);
		EventBus.on(DRAWER_EVENT.DESTROY, destroyInstance);
		return () => {
			EventBus.off(DRAWER_EVENT.CREATE, createInstance);
			EventBus.off(DRAWER_EVENT.DESTROY, destroyInstance);
		};
	}, [createInstance, destroyInstance]);

	return ReactDOM.createPortal(
		<>
			<DrawerStyleSheet/>
			{drawers.map(({ id, children, isFullScreen, onClose }) => (
				<Drawer
					key={id}
					onClose={() => {
						if (onClose) onClose();
						destroyInstance(id);
					}}
					cssVars={cssVars}
					isFullScreen={isFullScreen}
				>
					{children}
				</Drawer>
			))}
		</>,
		document.getElementById("drawer-root")
	);
};