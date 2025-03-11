import { DrawerClose, DrawerContent, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTrigger } from "./styles";

export function NotificationsPanel() {
  return (
    <DrawerRoot open={true} onOpenChange={() => {}}>
        <DrawerTrigger asChild>
            <button>
                test
            </button>
        </DrawerTrigger>
        <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent>
                <div>
                    <h1>Notifications</h1>
                </div>
                <DrawerClose>
                    <span>close</span>
                </DrawerClose>
            </DrawerContent>
        </DrawerPortal>
    </DrawerRoot>
  );
}
