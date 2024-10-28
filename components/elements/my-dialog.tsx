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
  action?: () => void;
  placeholder?: string;
  onChange?: (text: string) => void;
}

export function MyDialog({
  dialogTrigger,
  dialogTitle,
  action,
  dialogDescription,
  placeholder,
  onChange,
}: MyDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Text>{dialogTrigger}</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Input
          onChangeText={(text) => onChange && onChange(text)}
          placeholder={placeholder}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button onPress={() => action && action()}>
              <Text>Save</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
