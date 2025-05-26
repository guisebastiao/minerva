import { Toaster as ToasterSonner } from "sonner";

export const Toaster = () => {
  return (
    <ToasterSonner
      visibleToasts={10}
      position="bottom-right"
      theme="dark"
      closeButton={true}
    />
  );
};
