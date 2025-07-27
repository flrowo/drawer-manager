import EventBus from "@/services/EventBus";

export const DRAWER_EVENT = {
    CREATE: "drawer:create",
    DESTROY: "drawer:destroy",
};

export const createDrawer = ({ children = null, onClose = () => {} }) => {
	const id = Date.now();
	EventBus.emit(DRAWER_EVENT.CREATE, { id, children, onClose });
	return id;
};

export const destroyDrawer = (id) => {
	EventBus.emit(DRAWER_EVENT.DESTROY, id);
};