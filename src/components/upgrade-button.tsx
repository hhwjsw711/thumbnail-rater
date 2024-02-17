import { useAction } from "convex/react";
import { Button } from "./ui/button";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";

export function UpgradeButton() {
    const pay = useAction(api.stripe.pay);
    const router = useRouter();

    async function handleUpgradeClick() {
        const url = await pay();
        router.push(url);
    }

    return <Button variant={"secondary"} onClick={handleUpgradeClick}>Upgrade</Button>;
}
