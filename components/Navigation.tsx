import { CommandDialogDemo } from "../components/CommandDialogDemo";
import { ModeToggle } from "./ui/ModeToggle";

export default function Navigation() {
  return (
    <nav className="flex w-full items-center justify-between py-4">
      <div />
      <div className="flex w-full gap-2 sm:w-fiit">
        <CommandDialogDemo />
        <ModeToggle />
      </div>
    </nav>
  );
}
