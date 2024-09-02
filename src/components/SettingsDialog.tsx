"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function SettingsDialog({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [fontSize, setFontSize] = useState(16);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajustes</DialogTitle>
          <DialogDescription>Cambia los ajustes de la web</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Tamaño de la letra</label>
          <Slider
            value={[fontSize]}
            onValueChange={(value) => setFontSize(value[0])}
            min={12}
            max={24}
            step={1}
          />
          <div className="mt-2 text-sm">Tamaño actual: {fontSize}px</div>
        </div>
        <DialogClose asChild>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Cerrar</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
