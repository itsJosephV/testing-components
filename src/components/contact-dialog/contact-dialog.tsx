import { Dialog } from "@base-ui/react/dialog";
import styles from "./contact-dialog.module.css";

interface House {
  id: string;
  slug: string;
  label: string;
  promocion: string;
  tipo: string;
  planta: number;
  precio: string;
  habitaciones: number;
  banos: number;
  superficie: number;
}

interface ContactDialogProps {
  house: House;
}

const ContactDialog = ({ house }: ContactDialogProps) => {
  const promotionMessage = `Hola, estoy interesado en la promoción ${house.promocion}, en la vivienda del tipo ${house.tipo} planta ${house.planta}`;

  return (
    <Dialog.Root>
      <Dialog.Trigger className={styles.Button}>Contact</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.Backdrop} />
        <Dialog.Popup className={styles.Popup}>
          <Dialog.Title className={styles.Title}>
            Contacto - {house.label}
          </Dialog.Title>
          <Dialog.Description className={styles.Description}>
            Completa el formulario para recibir más información
          </Dialog.Description>
          <div className="mb-6">
            <form action="" className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400" htmlFor="name">
                  name
                </label>
                <input
                  className="bg-gray-100 border border-gray-200 p-2"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400" htmlFor="email">
                  email
                </label>
                <input
                  className="bg-gray-100 border border-gray-200 p-2"
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="bg-gray-100 text-slate-600 p-2 text-sm"
                  name="message"
                  id="message"
                  value={promotionMessage}
                  readOnly
                  rows={8}
                />
              </div>
            </form>
          </div>
          <div className={styles.Actions}>
            <Dialog.Close className={styles.Button}>Close</Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ContactDialog;
