import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

 const Dialog = ({title, desc, confirm, cancel, open, setOpen, onConfirm}) => (
  <AlertDialog.Root open={open}>
    <AlertDialog.Trigger>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay" />
      <AlertDialog.Content className="AlertDialogContent">
        <AlertDialog.Title className="AlertDialogTitle">{title}</AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
            {desc}
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <button className="Button mauve" onClick={()=>{setOpen(false)}}>{cancel}</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button className="Button red" onClick={()=>{ onConfirm(), setOpen(false) }}>{confirm}</button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default Dialog;
