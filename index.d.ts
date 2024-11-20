import type { IControl, Map } from 'maplibre-gl';

type VisibilityControlOption = {
  baseLayers: Record<string, string>,
  overLayers: any,
  opacityControl: boolean,
}

export default class VisibilityControl implements IControl {
  constructor(options: Partial<VisibilityControlOption>);
  onAdd(map: Map): HTMLElement;
  onRemove(): void;
}

export {}