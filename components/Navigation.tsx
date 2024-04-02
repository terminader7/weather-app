import Link from "next/link";
import { CommandDialogDemo } from "../components/CommandDialogDemo";
import { ModeToggle } from "./ui/ModeToggle";
import { Button } from "./ui/Button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Navigation() {
  return (
    <nav className="flex w-full items-center justify-between py-4">
      <div />
      <div className="flex w-full gap-2 sm:w-fiit">
        <CommandDialogDemo />
        <ModeToggle />
        <Link
          passHref
          prefetch={false}
          aria-label="Support project"
          href={"https://github.com/terminader7/weather-app"}
          className="shrink-0"
        >
          <Button variant={"default"} className="h-9">
            <GitHubLogoIcon className="w-6 h-6 md:mr-1" />
            <span className="hidden md:block">Support Project</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
