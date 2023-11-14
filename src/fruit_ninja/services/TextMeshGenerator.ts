import * as THREE from "three";
import { FontManager } from "../loaders/FontManager";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

export class TextMeshGenerator {
  private _fontManager: FontManager;

  constructor(fontManager: FontManager) {
    this._fontManager = fontManager;
  }

  public createTextMesh(
    text: string,
    size: number,
    color: number
  ): THREE.Mesh | null {
    if (!this._fontManager.isFontLoaded || this._fontManager.font == null) {
      console.warn("Font is not loaded yet.");
      return null;
    }

    const font = this._fontManager.font;
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: 3,
      height: 0.5,
      curveSegments: 12,
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color });
    return new THREE.Mesh(textGeometry, textMaterial);
  }
}
