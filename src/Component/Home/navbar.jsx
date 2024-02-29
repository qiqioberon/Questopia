// import { Plus } from "lucide-react";
import React from "react";
// import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Logo } from "../logo";
import { FontStyles } from "../Font/Font";
// import { Logo } from "@/components/logo";
// import { Button } from "@/components/ui/button";
// import { FormPopover } from "@/components/form/form-popover";

//import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
	return (
		<nav className="fixed z-30 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
			{/* <MobileSidebar /> */}
			<div className="flex items-center gap-x-4">
				<div className="hidden md:flex" style={FontStyles.ExtraBold}><Logo /></div>

				{/* <FormPopover align="start" side="bottom" sideOffset={18}>
					<Button
						variant="primary"
						size="sm"
						className="rounded-sm hidden md:block h-auto  py-1.5 px-2"
					>
						Create
					</Button>
				</FormPopover>
				<FormPopover>
					<Button
						variant="primary"
						size="sm"
						className="rounded-sm block md:hidden"
					>
						<Plus className="h-4 w-4" />
					</Button>
				</FormPopover> */}
			</div>
			<div className="ml-auto flex items-center gap-x-2">
				{/* <UserButton
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox: {
								height: 30,
								width: 30,
							},
						},
					}}
				/> */}
			</div>
		</nav>
	);
};


