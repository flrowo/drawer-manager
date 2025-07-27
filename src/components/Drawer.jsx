import { useEffect, useState } from "react";
import { delay } from "@/utils/drawerUtils";
import { CloseIcon } from "./drawerControllers/CloseIcon";
import { ChevronIcon } from "./drawerControllers/ChevronIcon";

const CloseButton = ({ onClick }) => {
    return <div
        onClick={onClick}
        style={{
            lineHeight: 0,
            padding: 8,
            margin: 2,
            marginTop: 8,
            borderRadius: 8,
            backgroundColor: "#636363",
            cursor: "pointer",
        }}
    >
        <CloseIcon/>
    </div>;
}

const CollapseButton = ({ isToggled, onClick }) => {
    return <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <div
            style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                lineHeight: 0,
                padding: 5,
                margin: 5,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
            }}
        >
            <ChevronIcon
                onClick={onClick}
                style={{
                    transform: isToggled ? 'none' : 'scaleX(-1)',
                    transition: 'transform 150ms ease',
                    color: "#444444",
                }}
            />
        </div>
    </div>
}

export default function Drawer({ onClose, children, cssVars, isFullScreen = false }) {
    const { transitionDuration, width } = cssVars;
    const [isMaximized, setIsMaximized] = useState(isFullScreen);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true);
    }, []);

    useEffect(() => {
        setIsMaximized(isFullScreen);
    }, [isFullScreen]);

    const close = async () => {
        setIsOpen(false);
        setIsMaximized(false);
        await delay(transitionDuration + 10); // Add margin for animation to finish
        onClose();
    };

    return (<>
        <div
            className={"drawer-overlay" + (isOpen ? " open" : "")}
            onClick={close}
        />
        <div
            className={`drawer ${isOpen ? "open" : ""}`}
            style={{
                width: isMaximized ? "100%" : width,
            }}
        >
            <div className="drawer-controls">
                <CloseButton onClick={close}/>
                <CollapseButton
                    isToggled={isMaximized}
                    onClick={() => setIsMaximized(!isMaximized)}
                />
            </div>
            <div className="drawer-content">{children}</div>
        </div>
    </>);
};