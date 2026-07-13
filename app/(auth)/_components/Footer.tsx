import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
    isPending: boolean;
    href: string;
    linkText: string;
    linkTitle: string;
    primaryButtonText: string;
}

export default function Footer({ isPending, href, linkText, linkTitle, primaryButtonText }: Props) {
    return (
        <div className="flex w-full flex-col items-center gap-3">
            <Button type="submit" className="w-full" loading={isPending}>
                {primaryButtonText}
            </Button>
            <div className="flex items-start gap-2">
                <span className="text-body2 text-neutral-fg1">{linkTitle}</span>
                <Button variant="link" asChild>
                    <Link href={href}>{linkText}</Link>
                </Button>
            </div>
        </div>
    )
}
