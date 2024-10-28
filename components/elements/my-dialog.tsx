import * as React from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Text } from "~/components/ui/text";
import { Input } from "../ui/input";

interface MyDialogProps {
  dialogTrigger: string;
  dialogTitle: string;
  dialogDescription?: string;
}

export function MyDialog({
  dialogTrigger,
  dialogTitle,
  dialogDescription,
}: MyDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Text>{dialogTrigger}</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] w-[400px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Input />
        <DialogFooter>
          <DialogClose asChild>
            <Button>
              <Text>Save</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
